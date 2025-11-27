/**
 * @swagger
 * components:
 *   schemas:
 *     Article:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: 게시글 ID
 *         title:
 *           type: string
 *           description: 제목
 *         content:
 *           type: string
 *           description: 내용
 *         owner:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *               format: uuid
 *               description: 작성자 ID
 *             nickname:
 *               type: string
 *               description: 작성자 닉네임
 *         likeCount:
 *           type: integer
 *           description: 좋아요 수
 *         isLiked:
 *           type: boolean
 *           description: 현재 사용자가 좋아요를 눌렀는지 여부 (상세 조회 시에만 포함)
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: 생성일시
 *     ArticleRequest:
 *       type: object
 *       required:
 *         - title
 *         - content
 *       properties:
 *         title:
 *           type: string
 *           minLength: 1
 *           description: 제목
 *           example: 게시글 제목입니다
 *         content:
 *           type: string
 *           minLength: 1
 *           description: 내용
 *           example: 게시글 내용입니다
 *     ArticleListResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: 게시글 목록 조회 성공
 *         data:
 *           type: object
 *           properties:
 *             articles:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Article'
 *         pagination:
 *           type: object
 *           properties:
 *             nextCursor:
 *               type: string
 *               format: uuid
 *               nullable: true
 *               description: 다음 페이지 조회를 위한 cursor (null이면 마지막 페이지)
 *               example: 123e4567-e89b-12d3-a456-426614174000
 *             hasNextPage:
 *               type: boolean
 *               description: 다음 페이지 존재 여부
 *               example: true
 *     ArticleResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: 게시글 상세 조회 성공
 *         data:
 *           type: object
 *           properties:
 *             article:
 *               $ref: '#/components/schemas/Article'
 *
 * tags:
 *   - name: Article
 *     description: 게시글 관련 API
 */

/**
 * @swagger
 * /articles:
 *   get:
 *     tags:
 *       - Article
 *     summary: 게시글 목록 조회
 *     description: Cursor 기반 페이지네이션과 검색, 정렬 기능을 지원하는 게시글 목록을 조회합니다. 첫 요청 시 cursor를 생략하고, 다음 페이지 조회 시 응답의 nextCursor 값을 사용하세요.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: cursor
 *         schema:
 *           type: string
 *           format: uuid
 *         description: 다음 페이지 조회를 위한 cursor (첫 요청 시 생략 가능)
 *         example: 123e4567-e89b-12d3-a456-426614174000
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *         description: 페이지당 항목 수 (최대 100)
 *         example: 10
 *       - in: query
 *         name: searchQuery
 *         schema:
 *           type: string
 *         description: 검색어 (제목 또는 내용에서 검색)
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
 *         description: 게시글 목록 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ArticleListResponse'
 *       401:
 *         description: 인증되지 않은 접근
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *
 *   post:
 *     tags:
 *       - Article
 *     summary: 게시글 생성
 *     description: 새로운 게시글을 생성합니다.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ArticleRequest'
 *           example:
 *             title: 게시글 제목입니다
 *             content: 게시글 내용입니다
 *     responses:
 *       201:
 *         description: 게시글 생성 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ArticleResponse'
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
 * /articles/{id}:
 *   get:
 *     tags:
 *       - Article
 *     summary: 게시글 상세 조회
 *     description: 특정 게시글의 상세 정보를 조회합니다.
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
 *         description: 게시글 상세 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ArticleResponse'
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
 *
 *   patch:
 *     tags:
 *       - Article
 *     summary: 게시글 수정
 *     description: 게시글의 제목과 내용을 수정합니다. (작성자만 수정 가능)
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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ArticleRequest'
 *           example:
 *             title: 수정된 제목
 *             content: 수정된 내용
 *     responses:
 *       200:
 *         description: 게시글 수정 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ArticleResponse'
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
 *         description: 권한 없음 (작성자가 아님)
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
 *
 *   delete:
 *     tags:
 *       - Article
 *     summary: 게시글 삭제
 *     description: 게시글을 삭제합니다. (작성자만 삭제 가능)
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
 *         description: 게시글 삭제 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ArticleResponse'
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
 *         description: 권한 없음 (작성자가 아님)
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
 */

