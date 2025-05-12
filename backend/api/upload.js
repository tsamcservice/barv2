import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: '不支援的請求方法' });
  }
  const form = new formidable.IncomingForm();
  form.uploadDir = path.join(process.cwd(), 'public', 'uploads', 'vip');
  form.keepExtensions = true;
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).json({ success: false, message: '上傳失敗', error: err.message });
    }
    const userId = fields.userId || 'anonymous';
    const type = fields.type || 'other';
    const file = files.file;
    if (!file) {
      return res.status(400).json({ success: false, message: '缺少檔案' });
    }
    // 建立目錄
    const userDir = path.join(form.uploadDir, 'line' + userId);
    if (!fs.existsSync(userDir)) {
      fs.mkdirSync(userDir, { recursive: true });
    }
    // 重新命名檔案
    const ext = path.extname(file.originalFilename || file.newFilename || '');
    const filename = `${type}_${Date.now()}${ext}`;
    const destPath = path.join(userDir, filename);
    fs.renameSync(file.filepath, destPath);
    // 回傳公開連結
    const publicUrl = `/uploads/vip/line${userId}/${filename}`;
    return res.status(200).json({ success: true, url: publicUrl });
  });
} 