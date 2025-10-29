import * as productRepository from "../repositories/productRepository.js";

/**
 * 상품 목록 조회
 */
export const getProducts = async ({ page, pageSize, orderBy, keyword }) => {
  const skip = (page - 1) * pageSize;
  const take = Number(pageSize);

  const sortOption =
    orderBy === "recent"
      ? { createdAt: "desc" }
      : orderBy === "like"
      ? { likeCount: "desc" }
      : { createdAt: "asc" };

  const searchQuery = keyword
    ? {
        OR: [
          { name: { contains: keyword } },
          { description: { contains: keyword } },
        ],
      }
    : {};

  const totalCount = await productRepository.countProducts(searchQuery);
  const products = await productRepository.findAllProducts({
    where: searchQuery,
    skip,
    take,
    orderBy: sortOption,
    select: {
      id: true,
      name: true,
      description: true,
      price: true,
      likeCount: true,
      createdAt: true,
      updatedAt: true,
      images: {
        select: {
          id: true,
          order: true,
          image: {
            select: {
              id: true,
              url: true,
            },
          },
        },
        orderBy: {
          order: "asc",
        },
        take: 1, // 첫 번째 이미지만
      },
      user: {
        select: {
          id: true,
          nickname: true,
          image: true,
        },
      },
    },
  });

  return {
    products,
    totalCount,
  };
};

/**
 * 상품 상세 조회
 */
export const getProductById = async (id, userId = null) => {
  const product = await productRepository.findProductById(id);
  if (!product) {
    throw new Error("상품을 찾을 수 없습니다.");
  }

  // 로그인한 사용자의 경우 좋아요 여부 확인
  let isLiked = false;
  if (userId) {
    isLiked = await productRepository.checkProductLike(id, userId);
  }

  return {
    ...product,
    isLiked,
  };
};

/**
 * 상품 생성
 */
export const createProduct = async (productData) => {
  const newProduct = await productRepository.createProduct(productData);
  return newProduct;
};

/**
 * 상품 업데이트
 */
export const updateProduct = async (id, productData) => {
  // 상품 존재 여부 확인
  const existingProduct = await productRepository.findProductById(id);
  if (!existingProduct) {
    throw new Error("상품을 찾을 수 없습니다.");
  }

  const updatedProduct = await productRepository.updateProduct(id, productData);
  return updatedProduct;
};

/**
 * 상품 삭제
 */
export const deleteProduct = async (id) => {
  // 상품 존재 여부 확인
  const existingProduct = await productRepository.findProductById(id);
  if (!existingProduct) {
    throw new Error("상품을 찾을 수 없습니다.");
  }

  const deletedProduct = await productRepository.deleteProduct(id);
  return deletedProduct;
};
