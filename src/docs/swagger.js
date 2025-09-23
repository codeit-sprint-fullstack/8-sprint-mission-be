/**
 * @openapi
 * tags:
 *   - name: Products
 *     description: 상품 관련 API
 *   - name: Articles
 *     description: 게시글 관련 API
 *   - name: Comments
 *     description: 댓글 관련 API
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         price:
 *           type: number
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *       example:
 *         id: "prod_123"
 *         name: "팬더 인형"
 *         description: "부드러운 대형 팬더 인형"
 *         price: 12900
 *         tags: ["toy", "panda"]
 *         createdAt: "2025-09-23T10:00:00.000Z"
 *         updatedAt: "2025-09-23T10:00:00.000Z"
 *     Article:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         title:
 *           type: string
 *         content:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *       example:
 *         id: "art_123"
 *         title: "판다마켓 공지"
 *         content: "신규 기능이 추가되었습니다."
 *         createdAt: "2025-09-23T10:00:00.000Z"
 *     Comment:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         content:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *       example:
 *         id: "cmt_123"
 *         content: "좋은 글 감사합니다!"
 *         createdAt: "2025-09-23T10:00:00.000Z"
 *         updatedAt: "2025-09-23T10:00:00.000Z"
 */

/**
 * @openapi
 * /products:
 *   get:
 *     tags: [Products]
 *     summary: 상품 목록 조회 (검색/페이지네이션)
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: integer, minimum: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, minimum: 1 }
 *       - in: query
 *         name: q
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 *                 pagination:
 *                   type: object
 *                 search:
 *                   type: object
 *             example:
 *               success: true
 *               data:
 *                 - id: "prod_123"
 *                   name: "팬더 인형"
 *                   description: "부드러운 대형 팬더 인형"
 *                   price: 12900
 *                   tags: ["toy", "panda"]
 *                   createdAt: "2025-09-23T10:00:00.000Z"
 *               pagination:
 *                 currentPage: 1
 *                 totalPages: 5
 *                 totalCount: 42
 *                 limit: 10
 *                 hasNextPage: true
 *                 hasPrevPage: false
 *               search:
 *                 query: "팬더"
 *                 hasSearch: true
 *   post:
 *     tags: [Products]
 *     summary: 상품 생성
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, description, price]
 *             properties:
 *               name: { type: string }
 *               description: { type: string }
 *               price: { type: number }
 *               tags:
 *                 type: array
 *                 items: { type: string }
 *           example:
 *             name: "팬더 인형"
 *             description: "부드러운 대형 팬더 인형"
 *             price: 12900
 *             tags: ["toy", "panda"]
 *     responses:
 *       201:
 *         description: 생성 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean }
 *                 data:
 *                   $ref: '#/components/schemas/Product'
 *             example:
 *               success: true
 *               data:
 *                 id: "prod_123"
 *                 name: "팬더 인형"
 *                 description: "부드러운 대형 팬더 인형"
 *                 price: 12900
 *                 tags: ["toy", "panda"]
 *                 createdAt: "2025-09-23T10:00:00.000Z"
 *                 updatedAt: "2025-09-23T10:00:00.000Z"
 */

/**
 * @openapi
 * /products/{id}:
 *   get:
 *     tags: [Products]
 *     summary: 상품 단건 조회
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean }
 *                 data:
 *                   $ref: '#/components/schemas/Product'
 *             example:
 *               success: true
 *               data:
 *                 id: "prod_123"
 *                 name: "팬더 인형"
 *                 description: "부드러운 대형 팬더 인형"
 *                 price: 12900
 *                 tags: ["toy", "panda"]
 *                 createdAt: "2025-09-23T10:00:00.000Z"
 *   patch:
 *     tags: [Products]
 *     summary: 상품 부분 수정
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: { type: string }
 *               description: { type: string }
 *               price: { type: number }
 *               tags:
 *                 type: array
 *                 items: { type: string }
 *           example:
 *             name: "팬더 인형(업데이트)"
 *             price: 13900
 *     responses:
 *       200:
 *         description: 수정 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean }
 *                 data:
 *                   $ref: '#/components/schemas/Product'
 *             example:
 *               success: true
 *               data:
 *                 id: "prod_123"
 *                 name: "팬더 인형(업데이트)"
 *                 description: "부드러운 대형 팬더 인형"
 *                 price: 13900
 *                 tags: ["toy", "panda"]
 *                 createdAt: "2025-09-23T10:00:00.000Z"
 *                 updatedAt: "2025-09-23T10:05:00.000Z"
 *   delete:
 *     tags: [Products]
 *     summary: 상품 삭제
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: 삭제 성공
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data: null
 */

/**
 * @openapi
 * /articles:
 *   get:
 *     tags: [Articles]
 *     summary: 게시글 목록 조회 (검색/페이지네이션)
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: integer, minimum: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, minimum: 1 }
 *       - in: query
 *         name: q
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: 성공
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 - id: "art_123"
 *                   title: "판다마켓 공지"
 *                   content: "신규 기능이 추가되었습니다."
 *                   createdAt: "2025-09-23T10:00:00.000Z"
 *               pagination:
 *                 currentPage: 1
 *                 totalPages: 3
 *                 totalCount: 21
 *                 limit: 10
 *                 hasNextPage: true
 *                 hasPrevPage: false
 *               search:
 *                 query: "공지"
 *                 hasSearch: true
 *   post:
 *     tags: [Articles]
 *     summary: 게시글 생성
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, content]
 *             properties:
 *               title: { type: string }
 *               content: { type: string }
 *           example:
 *             title: "판다마켓 공지"
 *             content: "신규 기능이 추가되었습니다."
 *     responses:
 *       201:
 *         description: 생성 성공
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 id: "art_123"
 *                 title: "판다마켓 공지"
 *                 content: "신규 기능이 추가되었습니다."
 *                 createdAt: "2025-09-23T10:00:00.000Z"
 */

/**
 * @openapi
 * /articles/{id}:
 *   get:
 *     tags: [Articles]
 *     summary: 게시글 단건 조회
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: 성공
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 id: "art_123"
 *                 title: "판다마켓 공지"
 *                 content: "신규 기능이 추가되었습니다."
 *                 createdAt: "2025-09-23T10:00:00.000Z"
 *   patch:
 *     tags: [Articles]
 *     summary: 게시글 수정
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title: { type: string }
 *               content: { type: string }
 *           example:
 *             title: "업데이트된 제목"
 *             content: "업데이트된 내용"
 *     responses:
 *       200:
 *         description: 수정 성공
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 id: "art_123"
 *                 title: "업데이트된 제목"
 *                 content: "업데이트된 내용"
 *                 createdAt: "2025-09-23T10:00:00.000Z"
 *   delete:
 *     tags: [Articles]
 *     summary: 게시글 삭제
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: 삭제 성공
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data: null
 */

/**
 * @openapi
 * /comments:
 *   get:
 *     tags: [Comments]
 *     summary: 댓글 전체 목록 조회
 *     responses:
 *       200:
 *         description: 성공
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 - id: "cmt_123"
 *                   content: "좋은 글 감사합니다!"
 *                   createdAt: "2025-09-23T10:00:00.000Z"
 *                   updatedAt: "2025-09-23T10:00:00.000Z"
 *   post:
 *     tags: [Comments]
 *     summary: 댓글 생성
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [content]
 *             properties:
 *               content: { type: string }
 *           example:
 *             content: "좋은 글 감사합니다!"
 *     responses:
 *       201:
 *         description: 생성 성공
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 id: "cmt_123"
 *                 content: "좋은 글 감사합니다!"
 *                 createdAt: "2025-09-23T10:00:00.000Z"
 *                 updatedAt: "2025-09-23T10:00:00.000Z"
 */

/**
 * @openapi
 * /comments/{id}:
 *   put:
 *     tags: [Comments]
 *     summary: 댓글 수정(치환)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [content]
 *             properties:
 *               content: { type: string }
 *           example:
 *             content: "수정된 댓글 내용"
 *     responses:
 *       200:
 *         description: 수정 성공
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 id: "cmt_123"
 *                 content: "수정된 댓글 내용"
 *                 createdAt: "2025-09-23T10:00:00.000Z"
 *                 updatedAt: "2025-09-23T10:05:00.000Z"
 *   delete:
 *     tags: [Comments]
 *     summary: 댓글 삭제
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: 삭제 성공
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data: null
 */

/**
 * @openapi
 * /comments/article/{id}:
 *   get:
 *     tags: [Comments]
 *     summary: 특정 게시글의 댓글 커서 기반 페이지네이션 조회
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *       - in: query
 *         name: cursor
 *         schema: { type: string, format: date-time }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, minimum: 1, maximum: 50 }
 *       - in: query
 *         name: direction
 *         schema: { type: string, enum: [next, prev] }
 *     responses:
 *       200:
 *         description: 성공
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 - id: "cmt_123"
 *                   content: "좋은 글 감사합니다!"
 *                   createdAt: "2025-09-23T10:00:00.000Z"
 *                   updatedAt: "2025-09-23T10:00:00.000Z"
 *               pagination:
 *                 hasNextPage: true
 *                 hasPrevPage: false
 *                 nextCursor: "2025-09-23T10:00:00.000Z"
 *                 prevCursor: null
 *                 limit: 10
 *                 direction: "next"
 */
