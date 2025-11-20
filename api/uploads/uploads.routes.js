import multer from 'multer';
import fs from 'fs';
import prisma from '../../config/db.js';
import { Router } from 'express';

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

const router = Router();

//기존에 서버에 저장된 상품 이미지 삭제
async function deleteFile(req, res, next) {
  try {
    const { id } = req.params;
    const result = await prisma.product.findUnique({
      where: { id },
      select: { images: true },
    });

    for (let image of result.images) {
      fs.unlink(`uploads/${image}`, (err) => {
        if (err) {
          console.error('삭제 실패:', err);
        } else {
          console.log('삭제 성공');
        }
      });
    }
  } catch (err) {
    next(err);
  } finally {
    next();
  }
}

router.post('/products/:id/uploads', deleteFile, upload.array('images[]', 3), async (req, res) => {
  try {
    const images = req.files.map((file) => file.path.split(/uploads[\\/]/)[1]); //DB에는 경로(파일 이름)만 저장
    const { id } = req.params;
    const patch = await prisma.product.update({
      where: { id },
      data: { images },
    });

    res.json(patch);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '업로드 실패' });
  }
});

export default router;
