/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: 상품 ID
 *         name:
 *           type: string
 *           description: 상품명
 *         description:
 *           type: string
 *           description: 상품 설명
 *         price:
 *           type: number
 *           description: 가격
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *           description: 태그 목록
 *         ownerId:
 *           type: string
 *           format: uuid
 *           description: 판매자 ID
 *         owner:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *               format: uuid
 *             nickname:
 *               type: string
 *         likeCount:
 *           type: integer
 *           description: 좋아요 수
 *         isLiked:
 *           type: boolean
 *           description: 현재 사용자가 좋아요를 눌렀는지 여부
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: 생성일시
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: 수정일시
 *     ProductRequest:
 *       type: object
 *       required:
 *         - name
 *         - description
 *         - price
 *       properties:
 *         name:
 *           type: string
 *           minLength: 1
 *           description: 상품명
 *           example: 상품명입니다
 *         description:
 *           type: string
 *           minLength: 1
 *           description: 상품 설명
 *           example: 상품 설명입니다
 *         price:
 *           type: number
 *           minimum: 0
 *           description: 가격
 *           example: 10000
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *           description: 태그 목록 (선택사항)
 *           example: ["태그1", "태그2"]
 *     ProductListResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: 상품 목록 조회 성공
 *         data:
 *           type: object
 *           properties:
 *             products:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *         pagination:
 *           type: object
 *           properties:
 *             currentPage:
 *               type: integer
 *               example: 1
 *             limit:
 *               type: integer
 *               example: 10
 *             totalCount:
 *               type: integer
 *               example: 100
 *             totalPages:
 *               type: integer
 *               example: 10
 *             hasNextPage:
 *               type: boolean
 *               example: true
 *             hasPreviousPage:
 *               type: boolean
 *               example: false
 *     ProductResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: 상품 상세 조회 성공
 *         data:
 *           type: object
 *           properties:
 *             product:
 *               $ref: '#/components/schemas/Product'
 *
 * tags:
 *   - name: Product
 *     description: 상품 관련 API
 */

/**
 * @swagger
 * /products:
 *   get:
 *     tags:
 *       - Product
 *     summary: 상품 목록 조회
 *     description: 페이지네이션과 검색, 정렬 기능을 지원하는 상품 목록을 조회합니다.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: 페이지 번호
 *         example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 10
 *         description: 페이지당 항목 수
 *         example: 10
 *       - in: query
 *         name: searchQuery
 *         schema:
 *           type: string
 *         description: 검색어 (상품명 또는 설명에서 검색)
 *         example: 검색어
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: [recent, like]
 *           default: recent
 *         description: "정렬 방식 (recent: 최신순, like: 좋아요순)"
 *         example: recent
 *     responses:
 *       200:
 *         description: 상품 목록 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductListResponse'
 *       401:
 *         description: 인증되지 않은 접근
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *
 *   post:
 *     tags:
 *       - Product
 *     summary: 상품 생성
 *     description: 새로운 상품을 생성합니다.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductRequest'
 *           example:
 *             name: 상품명입니다
 *             description: 상품 설명입니다
 *             price: 10000
 *             tags: ["태그1", "태그2"]
 *     responses:
 *       201:
 *         description: 상품 생성 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductResponse'
 *       400:
 *         description: 잘못된 요청 (유효성 검사 실패)
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
 */

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     tags:
 *       - Product
 *     summary: 상품 상세 조회
 *     description: 특정 상품의 상세 정보를 조회합니다.
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
 *         description: 상품 상세 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductResponse'
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
 *
 *   patch:
 *     tags:
 *       - Product
 *     summary: 상품 수정
 *     description: 상품 정보를 수정합니다. (판매자만 수정 가능)
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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductRequest'
 *           example:
 *             name: 수정된 상품명
 *             description: 수정된 상품 설명
 *             price: 15000
 *             tags: ["태그1", "태그3"]
 *     responses:
 *       200:
 *         description: 상품 수정 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductResponse'
 *       400:
 *         description: 잘못된 요청 (유효성 검사 실패)
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
 *       403:
 *         description: 권한 없음 (판매자가 아님)
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
 *
 *   delete:
 *     tags:
 *       - Product
 *     summary: 상품 삭제
 *     description: 상품을 삭제합니다. (판매자만 삭제 가능)
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
 *         description: 상품 삭제 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductResponse'
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
 *       403:
 *         description: 권한 없음 (판매자가 아님)
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
 */

