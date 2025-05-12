import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
    if (req.method !== 'DELETE') {
        return res.status(405).json({ success: false, message: '不支援的請求方法' });
    }
    try {
        const { promoId, userId } = req.query;
        if (!promoId || !userId) {
            return res.status(400).json({ success: false, message: '缺少必要參數' });
        }
        // 先檢查宣傳卡片是否存在且屬於該使用者
        const { data: promo, error: fetchError } = await supabase
            .from('promo_cards')
            .select('*')
            .eq('id', promoId)
            .eq('user_id', userId)
            .single();
        if (fetchError || !promo) {
            return res.status(404).json({ success: false, message: '找不到宣傳卡片或無權限刪除' });
        }
        // 刪除宣傳卡片
        const { error: deleteError } = await supabase
            .from('promo_cards')
            .delete()
            .eq('id', promoId);
        if (deleteError) throw deleteError;
        return res.status(200).json({ success: true, message: '宣傳卡片已刪除' });
    } catch (error) {
        console.error('刪除宣傳卡片錯誤：', error);
        return res.status(500).json({
            success: false,
            message: '刪除宣傳卡片時發生錯誤',
            error: error.message,
            stack: error.stack
        });
    }
} 