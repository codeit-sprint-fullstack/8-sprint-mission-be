import prisma from "../config/database.js";

/**
 * 모든 상품 조회
 */
export const findAllProducts = async ({
  where,
  skip,
  take,
  orderBy,
  select,
}) => {
  return await prisma.product.findMany({
    where,
    skip,
    take,
    orderBy,
    select,
  });
};

/**
 * ID로 상품 조회
 */
export const findProductById = async (id) => {
  return await prisma.product.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      description: true,
      price: true,
      likeCount: true,
      createdAt: true,
      updatedAt: true,
      tags: {
        select: {
          id: true,
          name: true,
        },
      },
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
};

/**
 * 상품 개수 조회
 */
export const countProducts = async (where) => {
  return await prisma.product.count({ where });
};

/**
 * 상품 생성
 */
export const createProduct = async (data) => {
  const { tags, images, ...productData } = data;

  return await prisma.product.create({
    data: {
      ...productData,
      tags: tags
        ? {
            connectOrCreate: tags.map((tagName) => ({
              where: { name: tagName },
              create: { name: tagName },
            })),
          }
        : undefined,
      images: images
        ? {
            create: images.map((img, index) => ({
              order: index,
              image: {
                connectOrCreate: {
                  where: { url: img.url },
                  create: { url: img.url },
                },
              },
            })),
          }
        : undefined,
    },
    select: {
      id: true,
      name: true,
      description: true,
      price: true,
      likeCount: true,
      createdAt: true,
      tags: {
        select: {
          id: true,
          name: true,
        },
      },
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
};

/**
 * 상품 업데이트
 */
export const updateProduct = async (id, data) => {
  const { tags, images, ...productData } = data;

  // 기존 태그 및 이미지 연결 해제
  if (tags !== undefined) {
    await prisma.product.update({
      where: { id },
      data: {
        tags: {
          set: [],
        },
      },
    });
  }

  if (images !== undefined) {
    await prisma.productImage.deleteMany({
      where: { productId: id },
    });
  }

  // 상품 업데이트
  return await prisma.product.update({
    where: { id },
    data: {
      ...productData,
      tags: tags
        ? {
            connectOrCreate: tags.map((tagName) => ({
              where: { name: tagName },
              create: { name: tagName },
            })),
          }
        : undefined,
      images: images
        ? {
            create: images.map((img, index) => ({
              order: index,
              image: {
                connectOrCreate: {
                  where: { url: img.url },
                  create: { url: img.url },
                },
              },
            })),
          }
        : undefined,
    },
    select: {
      id: true,
      name: true,
      description: true,
      price: true,
      likeCount: true,
      createdAt: true,
      updatedAt: true,
      tags: {
        select: {
          id: true,
          name: true,
        },
      },
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
};

/**
 * 상품 삭제
 */
export const deleteProduct = async (id) => {
  return await prisma.product.delete({
    where: { id },
  });
};

/**
 * 상품 소유자 ID 조회
 * @params id - 상품 ID
 * @returns {Promise<string>} 상품 작성자의 userId
 */
export const getProductOwnerId = async (id) => {
  const product = await prisma.product.findUnique({
    where: { id },
    select: { userId: true },
  });

  if (!product) {
    throw new Error("상품을 찾을 수 없습니다.");
  }

  return product.userId;
};

/**
 * 사용자의 상품 좋아요 여부 확인
 * @params productId - 상품 ID
 * @params userId - 사용자 ID
 * @returns {Promise<boolean>} 좋아요 여부
 */
export const checkProductLike = async (productId, userId) => {
  const like = await prisma.productLike.findUnique({
    where: {
      userId_productId: {
        userId,
        productId,
      },
    },
  });

  return !!like;
};
