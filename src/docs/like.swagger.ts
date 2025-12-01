/**
 * @swagger
 * components:
 *   schemas:
 *     LikeResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: 게시글 좋아요 성공
 *         data:
 *           type: object
 *           properties:
 *             liked:
 *               type: object
 *               description: 좋아요 정보
 *               properties:
 *                 id:
 *                   type: string
 *                   format: uuid
 *                 userId:
 *                   type: string
 *                   format: uuid
 *                 articleId:
 *                   type: string
 *                   format: uuid
 *                   nullable: true
 *                 productId:
 *                   type: string
 *                   format: uuid
 *                   nullable: true
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *     UnlikeResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: 게시글 좋아요 취소 성공
 *         data:
 *           type: object
 *           properties:
 *             unliked:
 *               type: object
 *               description: 좋아요 취소 정보
 *
 * tags:
 *   - name: ArticleLike
 *     description: 게시글 좋아요 관련 API
 *   - name: ProductLike
 *     description: 상품 좋아요 관련 API
 */

/**
 * @swagger
 * /articles/{id}/like:
 *   post:
 *     tags:
 *       - ArticleLike
 *     summary: 게시글 좋아요
 *     description: 특정 게시글에 좋아요를 추가합니다.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: 게시글 ID
 *         example: 123e4567-e89b-12d3-a456-426614174000
 *     responses:
 *       200:
 *         description: 좋아요 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LikeResponse'
 *             example:
 *               success: true
 *               message: 게시글 좋아요 성공
 *               data:
 *                 liked:
 *                   id: "123e4567-e89b-12d3-a456-426614174000"
 *                   userId: "123e4567-e89b-12d3-a456-426614174001"
 *                   articleId: "123e4567-e89b-12d3-a456-426614174000"
 *                   productId: null
 *                   createdAt: "2024-01-01T00:00:00.000Z"
 *       400:
 *         description: 잘못된 요청 (유효하지 않은 ID 형식)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: 인증되지 않은 접근
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: 게시글을 찾을 수 없음
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       409:
 *         description: 이미 좋아요를 누른 게시글
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               message: 이미 좋아요를 누른 게시글입니다.
 *
 *   delete:
 *     tags:
 *       - ArticleLike
 *     summary: 게시글 좋아요 취소
 *     description: 특정 게시글의 좋아요를 취소합니다.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: 게시글 ID
 *         example: 123e4567-e89b-12d3-a456-426614174000
 *     responses:
 *       200:
 *         description: 좋아요 취소 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UnlikeResponse'
 *             example:
 *               success: true
 *               message: 게시글 좋아요 취소 성공
 *               data:
 *                 unliked:
 *                   id: "123e4567-e89b-12d3-a456-426614174000"
 *       400:
 *         description: 잘못된 요청 (유효하지 않은 ID 형식)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: 인증되지 않은 접근
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: 게시글 또는 좋아요를 찾을 수 없음
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /products/{id}/like:
 *   post:
 *     tags:
 *       - ProductLike
 *     summary: 상품 좋아요
 *     description: 특정 상품에 좋아요를 추가합니다.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: 상품 ID
 *         example: 123e4567-e89b-12d3-a456-426614174000
 *     responses:
 *       200:
 *         description: 좋아요 성공
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/LikeResponse'
 *                 - type: object
 *                   properties:
 *                     message:
 *                       example: 상품 좋아요 성공
 *                     data:
 *                       type: object
 *                       properties:
 *                         liked:
 *                           type: object
 *                           properties:
 *                             productId:
 *                               type: string
 *                               format: uuid
 *                             articleId:
 *                               type: "null"
 *             example:
 *               success: true
 *               message: 상품 좋아요 성공
 *               data:
 *                 liked:
 *                   id: "123e4567-e89b-12d3-a456-426614174000"
 *                   userId: "123e4567-e89b-12d3-a456-426614174001"
 *                   articleId: null
 *                   productId: "123e4567-e89b-12d3-a456-426614174000"
 *                   createdAt: "2024-01-01T00:00:00.000Z"
 *       400:
 *         description: 잘못된 요청 (유효하지 않은 ID 형식)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: 인증되지 않은 접근
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: 상품을 찾을 수 없음
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       409:
 *         description: 이미 좋아요를 누른 상품
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               message: 이미 좋아요를 누른 상품입니다.
 *
 *   delete:
 *     tags:
 *       - ProductLike
 *     summary: 상품 좋아요 취소
 *     description: 특정 상품의 좋아요를 취소합니다.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: 상품 ID
 *         example: 123e4567-e89b-12d3-a456-426614174000
 *     responses:
 *       200:
 *         description: 좋아요 취소 성공
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/UnlikeResponse'
 *                 - type: object
 *                   properties:
 *                     message:
 *                       example: 상품 좋아요 취소 성공
 *             example:
 *               success: true
 *               message: 상품 좋아요 취소 성공
 *               data:
 *                 unliked:
 *                   id: "123e4567-e89b-12d3-a456-426614174000"
 *       400:
 *         description: 잘못된 요청 (유효하지 않은 ID 형식)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: 인증되지 않은 접근
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: 상품 또는 좋아요를 찾을 수 없음
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

