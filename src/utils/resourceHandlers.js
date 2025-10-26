// src/utils/resourceHandlers.js

import { getArticleOwnerId } from "../repositories/articleRepository.js";
import { getProductOwnerId } from "../repositories/productRepository.js";
import { getCommentOwnerId } from "../repositories/commentRepository.js";

// 리소스 타입에 따라 소유자 ID를 가져오는 함수와 에러 메시지를 정의한 맵
export const RESOURCE_HANDLERS = {
  article: {
    // req 객체에서 리소스 ID를 추출하는 로직도 핸들러 내에 포함
    getOwnerId: (req) => getArticleOwnerId(req.params.id),
    notFoundMessage: "게시글을 찾을 수 없습니다.",
  },
  product: {
    getOwnerId: (req) => getProductOwnerId(req.params.id),
    notFoundMessage: "상품을 찾을 수 없습니다.",
  },
  comment: {
    // 댓글은 일반적으로 commentId를 사용하므로 params 키를 명시
    getOwnerId: (req) => getCommentOwnerId(req.params.commentId),
    notFoundMessage: "댓글을 찾을 수 없습니다.",
  },
};
