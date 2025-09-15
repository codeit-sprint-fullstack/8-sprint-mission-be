const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: '판다마켓 API',
      version: '1.0.0',
      description: '판다마켓 중고거래 플랫폼 API 문서',
      contact: {
        name: '판다마켓 개발팀',
        email: 'dev@pandamarket.com'
      }
    },
    servers: [
      {
        url: 'https://panda-market-project.onrender.com',
        description: 'Production server'
      },
      {
        url: 'http://localhost:5000',
        description: 'Development server'
      }
    ],
    components: {
      schemas: {
        Product: {
          type: 'object',
          required: ['name', 'description', 'price', 'tags'],
          properties: {
            id: {
              type: 'integer',
              description: '상품 고유 ID'
            },
            name: {
              type: 'string',
              maxLength: 10,
              description: '상품명'
            },
            description: {
              type: 'string',
              minLength: 10,
              maxLength: 100,
              description: '상품 설명'
            },
            price: {
              type: 'integer',
              minimum: 1,
              description: '상품 가격'
            },
            tags: {
              type: 'array',
              items: {
                type: 'string',
                maxLength: 5
              },
              description: '상품 태그'
            },
            images: {
              type: 'array',
              items: {
                type: 'string'
              },
              description: '상품 이미지 URL 배열'
            },
            favoriteCount: {
              type: 'integer',
              description: '좋아요 수'
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: '생성일시'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: '수정일시'
            }
          }
        },
        Article: {
          type: 'object',
          required: ['title', 'content'],
          properties: {
            id: {
              type: 'integer',
              description: '게시글 고유 ID'
            },
            title: {
              type: 'string',
              description: '게시글 제목'
            },
            content: {
              type: 'string',
              description: '게시글 내용'
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: '생성일시'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: '수정일시'
            }
          }
        },
        Comment: {
          type: 'object',
          required: ['content'],
          properties: {
            id: {
              type: 'integer',
              description: '댓글 고유 ID'
            },
            content: {
              type: 'string',
              description: '댓글 내용'
            },
            productId: {
              type: 'integer',
              description: '상품 ID (상품 댓글인 경우)'
            },
            articleId: {
              type: 'integer',
              description: '게시글 ID (게시글 댓글인 경우)'
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: '생성일시'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: '수정일시'
            }
          }
        },
        Error: {
          type: 'object',
          properties: {
            error: {
              type: 'string',
              description: '에러 메시지'
            }
          }
        }
      }
    }
  },
  apis: ['./routes/*.js'] // API 라우트 파일들
};

const specs = swaggerJSDoc(options);

module.exports = specs;
