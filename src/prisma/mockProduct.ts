import { Product } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";

const mockProducts = (userId: string, count = 100): Product[] => {
  const titles = ["상품명 뭐하지", "연휴너무짧다", "테스트", "디저트 세트"];
  const tags = [
    ["상품"],
    ["황금 연휴", "202n", "연휴더줘"],
    ["태그태그", "으아아아"],
    ["디저트", "말차맛"],
  ];
  const images = ["prod_1.jpg", "prod_2.jpg", "prod_3.jpg", "prod_4.jpg"];

  const descs = [
    "22",
    "합리적인 가격에 제공합니다.",
    "상품 소개글 길이 테스트 상품 소개글 길이 테스트 상품 소개글 길이 테스트 상품 소개글 길이 테스트 상품 소개글 길이 테스트 상품 소개글 길이 테스트 상품 소개글 길이 테스트 상품 소개글 길이 테스트 상품 소개글 길이 테스트 상품 소개글 길이 테스트",
    "몽블랑, 크레이프 케이크, 티라미수, 치즈케이크, 호두파이, 고구마케이크, 마카롱, 머랭, 젤라또, 셔벗, 식혜, 양갱, 수정과, 매실, 바람떡, 인절미, 꿀떡, 팥시루떡, 경단, 옥춘당.. 아 당 떨어져",
  ];

  const products: Product[] = [];

  for (let i = 0; i < count; i++) {
    products.push({
      id: uuidv4(),
      userId,
      title: titles[i % titles.length],
      description: descs[i % descs.length],
      price: Math.floor(Math.random() * 50000) + 10000,
      images: [`/images/${images[i % images.length]}`],
      tags: tags[i % tags.length],
      favoriteCount: Math.floor(Math.random() * 501),

      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  return products;
};

export default mockProducts;
