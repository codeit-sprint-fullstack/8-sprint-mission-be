import { Request, Response, NextFunction } from "express";

export const validateArticle = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { title, content, image } = req.body;

  // 필수 필드 존재 여부
  if (!title || !content || image === undefined) {
    return res
      .status(400)
      .json({ message: "모든 항목은 필수 입력 항목입니다." });
  }

  // 제목 길이 제한
  if (title.length > 100) {
    return res
      .status(400)
      .json({ message: "게시글 제목은 50자 이내여야 합니다." });
  }

  // 내용 길이 제한
  if (content.length > 1000) {
    return res
      .status(400)
      .json({ message: "게시글 내용은 1000자 이내여야 합니다." });
  }

  // // 이미지 배열 형식 검사
  // if (image && !Array.isArray(image)) {
  //   return res
  //     .status(400)
  //     .json({ message: "이미지는 배열 형식이어야 합니다." });
  // }

  next();
};
