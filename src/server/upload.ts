import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { Request } from 'express';

// اطمینان از وجود پوشه uploads
const uploadDir = path.join(process.cwd(), 'volume/uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// تنظیمات ذخیره‌سازی
const storage = multer.diskStorage({
    destination: (req: Request, file: any, cb: any) => {
        cb(null, uploadDir);
    },
    filename: (req: Request, file: any, cb: any) => {
        // ایجاد نام فایل منحصر به فرد
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        cb(null, `${uniqueSuffix}${ext}`);
    }
});


// تنظیمات multer
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 10 * 1024 * 1024, // 10MB
        files: 1 // حداکثر 1 فایل
    },
});


export default upload.single('file');
