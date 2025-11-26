import multer from "multer";
import path from "path";
import fs from "fs";
// 업로드 폴더 설정..?
const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir))
    fs.mkdirSync(uploadDir);
// 저장
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const name = `${Date.now()}-${Math.random()
            .toString(36)
            .slice(2, 9)}${ext}`;
        cb(null, name);
    },
});
export const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});
