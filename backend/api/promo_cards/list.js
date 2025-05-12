import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ success: false, message: '不支援的請求方法' });
    }
    try {
        const { userId, cardId } = req.query;
        let query = supabase.from('promo_cards').select('*');
        if (userId) query = query.eq('user_id', userId);
        if (cardId) query = query.eq('card_id', cardId);
        const { data, error } = await query.order('sort_order', { ascending: true });
        if (error) throw error;
        return res.status(200).json({ success: true, promos: data });
    } catch (error) {
        console.error('取得宣傳卡片列表錯誤：', error);
        return res.status(500).json({ success: false, message: '取得宣傳卡片列表時發生錯誤' });
    }
} 