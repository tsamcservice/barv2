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
        const { cardId } = req.query;
        if (!cardId) {
            return res.status(400).json({ success: false, message: '缺少卡片ID' });
        }
        const { data, error } = await supabase
            .from('member_cards')
            .select('*')
            .eq('id', cardId)
            .single();
        if (error || !data) {
            return res.status(404).json({ success: false, message: '找不到卡片' });
        }
        return res.status(200).json({ success: true, card: data });
    } catch (error) {
        console.error('取得卡片錯誤：', error);
        return res.status(500).json({ success: false, message: '取得卡片時發生錯誤' });
    }
} 