import { Request, Response, NextFunction } from "express";

export const validateProduct = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { title, description, price, images, tags } = req.body;

  // 필수 필드 존재 여부 검사
  if (
    !title ||
    !description ||
    price === undefined ||
    images === undefined ||
    tags === undefined
  ) {
    return res
      .status(400)
      .json({ message: "모든 항목은 필수 입력 항목입니다." });
  }

  // 제목·설명 길이 제한
  if (title.length > 50) {
    return res.status(400).json({ message: "상품명은 50자 이내여야 합니다." });
  }

  if (description.length > 300) {
    return res
      .status(400)
      .json({ message: "상품 설명은 300자 이내여야 합니다." });
  }

  // 가격 유효성 검사 (0원 이상 정수)
  if (typeof price !== "number" || price < 0 || !Number.isInteger(price)) {
    return res
      .status(400)
      .json({ message: "가격은 0 이상의 정수로 입력해야 합니다." });
  }

  // // 이미지 배열 형식 검사
  // if (images && !Array.isArray(images)) {
  //   return res
  //     .status(400)
  //     .json({ message: "이미지는 배열 형식이어야 합니다." });
  // }

  // // 태그 배열 형식 검사
  // if (tags && !Array.isArray(tags)) {
  //   return res.status(400).json({ message: "태그는 배열 형식이어야 합니다." });
  // }

  next();
};
