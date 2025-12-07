import multer from "multer";
import fs from "fs";
import prisma from "../../config/db";
import { NextFunction, Request, Response, Router } from "express";
import {
  ERROR_INVALID_MULTER_INPUT,
  ERROR_PRODUCT_NOTFOUND,
} from "../../config/errorTemplate";

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

const router = Router();

//기존에 서버에 저장된 상품 이미지 삭제
async function deleteFile(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const product = await prisma.product.findUnique({
      where: { id },
      select: { images: true },
    });

    if (product) {
      for (let image of product.images) {
        fs.unlink(`uploads/${image}`, (err) => {
          if (err) {
            console.error("삭제 실패:", err);
          } else {
            console.log("삭제 성공");
          }
        });
      }
    } else {
      throw ERROR_PRODUCT_NOTFOUND;
    }
  } catch (err) {
    next(err);
  } finally {
    next();
  }
}

router.post(
  "/products/:id/uploads",
  deleteFile,
  upload.array("images[]", 3),
  async (req: Request, res: Response) => {
    try {
      let files: Express.Multer.File[] = [];
      if (Array.isArray(req.files)) {
        files = req.files;
      } else if (req.files && typeof req.files === "object") {
        //필드 네임으로 관리 안 하기 떄문에 에러 던지기.
        throw ERROR_INVALID_MULTER_INPUT;
      } else {
        throw ERROR_INVALID_MULTER_INPUT;
      }
      const images = req.files.map(
        (file: Express.Multer.File) => file.path.split(/uploads[\\/]/)[1]
      ); //DB에는 경로(파일 이름)만 저장
      const { id } = req.params;
      const patch = await prisma.product.update({
        where: { id },
        data: { images },
      });

      res.json(patch);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "업로드 실패" });
    }
  }
);

export default router;
