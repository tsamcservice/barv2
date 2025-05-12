import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, message: '不支援的請求方法' });
    }

    try {
        const card = req.body;
        if (!card || !card.user_id) {
            return res.status(400).json({ success: false, message: '缺少必要參數' });
        }
        let result;
        if (card.id) {
            // 更新
            const { data, error } = await supabase
                .from('member_cards')
                .update({ ...card, updated_at: new Date() })
                .eq('id', card.id)
                .select();
            if (error) throw error;
            result = data[0];
        } else {
            // 新增
            const { data, error } = await supabase
                .from('member_cards')
                .insert([{ ...card, created_at: new Date(), updated_at: new Date() }])
                .select();
            if (error) throw error;
            result = data[0];
        }
        return res.status(200).json({ success: true, card: result });
    } catch (error) {
        console.error('儲存卡片錯誤：', error);
        return res.status(500).json({ success: false, message: '儲存卡片時發生錯誤' });
    }
} 