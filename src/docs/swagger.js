/**
 * @openapi
 * tags:
 *   - name: Auth
 *     description: 인증 관련 API
 *   - name: Products
 *     description: 상품 관련 API
 *   - name: Articles
 *     description: 게시글 관련 API
 *   - name: ProductComments
 *     description: 상품 댓글 관련 API
 *   - name: ArticleComments
 *     description: 게시글 댓글 관련 API
 *   - name: Likes
 *     description: 좋아요 관련 API
 *   - name: Health
 *     description: 서버 상태 확인 API
 */

/**
 * @openapi
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *       description: JWT Access Token
 *
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: 사용자 고유 ID
 *         email:
 *           type: string
 *           format: email
 *           description: 이메일 주소
 *         nickname:
 *           type: string
 *           description: 닉네임
 *         image:
 *           type: string
 *           description: 프로필 이미지 URL
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: 생성일시
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: 수정일시
 *       example:
 *         id: "123e4567-e89b-12d3-a456-426614174000"
 *         email: "user@example.com"
 *         nickname: "판다마스터"
 *         image: "/uploads/profile.jpg"
 *         createdAt: "2025-01-20T10:00:00.000Z"
 *         updatedAt: "2025-01-20T10:00:00.000Z"
 *
 *     Product:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: 상품 고유 ID
 *         name:
 *           type: string
 *           description: 상품명
 *         description:
 *           type: string
 *           description: 상품 설명
 *         price:
 *           type: integer
 *           description: 가격 (원)
 *         image:
 *           type: string
 *           nullable: true
 *           description: 상품 이미지 URL
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *           description: 상품 태그
 *         owner:
 *           $ref: '#/components/schemas/User'
 *         likeCount:
 *           type: integer
 *           description: 좋아요 수
 *         isLiked:
 *           type: boolean
 *           description: 현재 사용자의 좋아요 여부
 *         comments:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/ProductComment'
 *           description: 댓글 목록
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: 생성일시
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: 수정일시
 *       example:
 *         id: "123e4567-e89b-12d3-a456-426614174001"
 *         name: "팬더 인형"
 *         description: "부드러운 대형 팬더 인형"
 *         price: 12900
 *         image: "/uploads/panda-toy.jpg"
 *         tags: ["toy", "panda", "stuffed"]
 *         likeCount: 15
 *         isLiked: true
 *         createdAt: "2025-01-20T10:00:00.000Z"
 *         updatedAt: "2025-01-20T10:00:00.000Z"
 *
 *     Article:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: 게시글 고유 ID
 *         title:
 *           type: string
 *           description: 제목
 *         content:
 *           type: string
 *           description: 내용
 *         owner:
 *           $ref: '#/components/schemas/User'
 *         likeCount:
 *           type: integer
 *           description: 좋아요 수
 *         isLiked:
 *           type: boolean
 *           description: 현재 사용자의 좋아요 여부
 *         comments:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/ArticleComment'
 *           description: 댓글 목록
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: 생성일시
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: 수정일시
 *       example:
 *         id: "123e4567-e89b-12d3-a456-426614174002"
 *         title: "판다마켓 공지사항"
 *         content: "신규 기능이 추가되었습니다."
 *         likeCount: 8
 *         isLiked: false
 *         createdAt: "2025-01-20T10:00:00.000Z"
 *         updatedAt: "2025-01-20T10:00:00.000Z"
 *
 *     ProductComment:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: 댓글 고유 ID
 *         content:
 *           type: string
 *           description: 댓글 내용
 *         owner:
 *           $ref: '#/components/schemas/User'
 *         productId:
 *           type: string
 *           format: uuid
 *           description: 상품 ID
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: 생성일시
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: 수정일시
 *       example:
 *         id: "123e4567-e89b-12d3-a456-426614174003"
 *         content: "정말 좋은 상품이네요!"
 *         productId: "123e4567-e89b-12d3-a456-426614174001"
 *         createdAt: "2025-01-20T10:00:00.000Z"
 *         updatedAt: "2025-01-20T10:00:00.000Z"
 *
 *     ArticleComment:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: 댓글 고유 ID
 *         content:
 *           type: string
 *           description: 댓글 내용
 *         owner:
 *           $ref: '#/components/schemas/User'
 *         articleId:
 *           type: string
 *           format: uuid
 *           description: 게시글 ID
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: 생성일시
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: 수정일시
 *       example:
 *         id: "123e4567-e89b-12d3-a456-426614174004"
 *         content: "좋은 정보 감사합니다!"
 *         articleId: "123e4567-e89b-12d3-a456-426614174002"
 *         createdAt: "2025-01-20T10:00:00.000Z"
 *         updatedAt: "2025-01-20T10:00:00.000Z"
 *
 *     Pagination:
 *       type: object
 *       properties:
 *         currentPage:
 *           type: integer
 *           description: 현재 페이지
 *         totalPages:
 *           type: integer
 *           description: 전체 페이지 수
 *         totalCount:
 *           type: integer
 *           description: 전체 항목 수
 *         limit:
 *           type: integer
 *           description: 페이지당 항목 수
 *         hasNextPage:
 *           type: boolean
 *           description: 다음 페이지 존재 여부
 *         hasPrevPage:
 *           type: boolean
 *           description: 이전 페이지 존재 여부
 *       example:
 *         currentPage: 1
 *         totalPages: 5
 *         totalCount: 42
 *         limit: 10
 *         hasNextPage: true
 *         hasPrevPage: false
 *
 *     CursorPagination:
 *       type: object
 *       properties:
 *         hasNextPage:
 *           type: boolean
 *           description: 다음 페이지 존재 여부
 *         hasPrevPage:
 *           type: boolean
 *           description: 이전 페이지 존재 여부
 *         nextCursor:
 *           type: string
 *           format: date-time
 *           nullable: true
 *           description: 다음 페이지 커서
 *         prevCursor:
 *           type: string
 *           format: date-time
 *           nullable: true
 *           description: 이전 페이지 커서
 *         limit:
 *           type: integer
 *           description: 페이지당 항목 수
 *         direction:
 *           type: string
 *           enum: [next, prev]
 *           description: 페이지 방향
 *       example:
 *         hasNextPage: true
 *         hasPrevPage: false
 *         nextCursor: "2025-01-20T10:00:00.000Z"
 *         prevCursor: null
 *         limit: 10
 *         direction: "next"
 *
 *     SearchInfo:
 *       type: object
 *       properties:
 *         query:
 *           type: string
 *           nullable: true
 *           description: 검색 쿼리
 *         hasSearch:
 *           type: boolean
 *           description: 검색 여부
 *       example:
 *         query: "팬더"
 *         hasSearch: true
 *
 *     ApiResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           description: 요청 성공 여부
 *         message:
 *           type: string
 *           description: 응답 메시지
 *         data:
 *           type: object
 *           nullable: true
 *           description: 응답 데이터
 *       example:
 *         success: true
 *         message: "요청이 성공적으로 처리되었습니다."
 *         data: {}
 *
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           description: 요청 성공 여부
 *         message:
 *           type: string
 *           description: 에러 메시지
 *       example:
 *         success: false
 *         message: "요청을 처리할 수 없습니다."
 */

/**
 * @openapi
 * /health:
 *   get:
 *     tags: [Health]
 *     summary: 서버 상태 확인
 *     description: 서버가 정상적으로 동작하는지 확인합니다.
 *     responses:
 *       200:
 *         description: 서버 정상 동작
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "OK"
 *                 message:
 *                   type: string
 *                   example: "Server is running"
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-01-20T10:00:00.000Z"
 *             example:
 *               status: "OK"
 *               message: "Server is running"
 *               timestamp: "2025-01-20T10:00:00.000Z"
 */

/**
 * @openapi
 * /auth/signup:
 *   post:
 *     tags: [Auth]
 *     summary: 회원가입
 *     description: 새로운 사용자 계정을 생성합니다.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, nickname, password]
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: 이메일 주소
 *               nickname:
 *                 type: string
 *                 description: 닉네임
 *               password:
 *                 type: string
 *                 description: 비밀번호
 *           example:
 *             email: "user@example.com"
 *             nickname: "판다마스터"
 *             password: "password123"
 *     responses:
 *       201:
 *         description: 회원가입 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *             example:
 *               success: true
 *               data:
 *                 id: "123e4567-e89b-12d3-a456-426614174000"
 *                 email: "user@example.com"
 *                 nickname: "판다마스터"
 *                 image: ""
 *                 createdAt: "2025-01-20T10:00:00.000Z"
 *                 updatedAt: "2025-01-20T10:00:00.000Z"
 *       409:
 *         description: 이메일 중복
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               message: "Email already exists"
 *       400:
 *         description: 잘못된 요청
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               message: "Invalid email address"
 */

/**
 * @openapi
 * /auth/signin:
 *   post:
 *     tags: [Auth]
 *     summary: 로그인
 *     description: 사용자 인증을 수행하고 JWT 토큰을 발급합니다.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: 이메일 주소
 *               password:
 *                 type: string
 *                 description: 비밀번호
 *           example:
 *             email: "user@example.com"
 *             password: "password123"
 *     responses:
 *       200:
 *         description: 로그인 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       $ref: '#/components/schemas/User'
 *                     accessToken:
 *                       type: string
 *                       description: JWT Access Token
 *             example:
 *               success: true
 *               data:
 *                 user:
 *                   id: "123e4567-e89b-12d3-a456-426614174000"
 *                   email: "user@example.com"
 *                   nickname: "판다마스터"
 *                   image: ""
 *                   createdAt: "2025-01-20T10:00:00.000Z"
 *                   updatedAt: "2025-01-20T10:00:00.000Z"
 *                 accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       401:
 *         description: 인증 실패
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               message: "Invalid credentials"
 *       400:
 *         description: 잘못된 요청
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               message: "Invalid email address"
 */

/**
 * @openapi
 * /auth/refresh:
 *   post:
 *     tags: [Auth]
 *     summary: 토큰 갱신
 *     description: Refresh Token을 사용하여 새로운 Access Token을 발급받습니다.
 *     security: []
 *     responses:
 *       200:
 *         description: 토큰 갱신 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     accessToken:
 *                       type: string
 *                       description: 새로운 JWT Access Token
 *             example:
 *               success: true
 *               data:
 *                 accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       401:
 *         description: 인증 실패
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               message: "Unauthorized"
 */

/**
 * @openapi
 * /products:
 *   get:
 *     tags: [Products]
 *     summary: 상품 목록 조회
 *     description: 상품 목록을 페이지네이션과 검색 기능으로 조회합니다.
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: 페이지 번호
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 10
 *         description: 페이지당 항목 수
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         description: 검색 쿼리
 *     responses:
 *       200:
 *         description: 상품 목록 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 *                 pagination:
 *                   $ref: '#/components/schemas/Pagination'
 *                 search:
 *                   $ref: '#/components/schemas/SearchInfo'
 *             example:
 *               success: true
 *               data:
 *                 - id: "123e4567-e89b-12d3-a456-426614174001"
 *                   name: "팬더 인형"
 *                   description: "부드러운 대형 팬더 인형"
 *                   price: 12900
 *                   image: "/uploads/panda-toy.jpg"
 *                   tags: ["toy", "panda", "stuffed"]
 *                   likeCount: 15
 *                   isLiked: true
 *                   createdAt: "2025-01-20T10:00:00.000Z"
 *                   updatedAt: "2025-01-20T10:00:00.000Z"
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
 *     description: 새로운 상품을 생성합니다. (인증 필요)
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [name, description, price]
 *             properties:
 *               name:
 *                 type: string
 *                 description: 상품명
 *               description:
 *                 type: string
 *                 description: 상품 설명
 *               price:
 *                 type: integer
 *                 description: 가격 (원)
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: 상품 태그
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: 상품 이미지 파일
 *           example:
 *             name: "팬더 인형"
 *             description: "부드러운 대형 팬더 인형"
 *             price: 12900
 *             tags: ["toy", "panda", "stuffed"]
 *     responses:
 *       201:
 *         description: 상품 생성 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Product'
 *             example:
 *               success: true
 *               data:
 *                 id: "123e4567-e89b-12d3-a456-426614174001"
 *                 name: "팬더 인형"
 *                 description: "부드러운 대형 팬더 인형"
 *                 price: 12900
 *                 image: "/uploads/panda-toy.jpg"
 *                 tags: ["toy", "panda", "stuffed"]
 *                 likeCount: 0
 *                 isLiked: false
 *                 createdAt: "2025-01-20T10:00:00.000Z"
 *                 updatedAt: "2025-01-20T10:00:00.000Z"
 *       401:
 *         description: 인증 필요
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               message: "Unauthorized"
 *       400:
 *         description: 잘못된 요청
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               message: "Name is required"
 */

/**
 * @openapi
 * /products/{id}:
 *   get:
 *     tags: [Products]
 *     summary: 상품 단건 조회
 *     description: 특정 상품의 상세 정보를 조회합니다. (인증 필요)
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: 상품 ID
 *     responses:
 *       200:
 *         description: 상품 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   allOf:
 *                     - $ref: '#/components/schemas/Product'
 *                     - type: object
 *                       properties:
 *                         owner:
 *                           $ref: '#/components/schemas/User'
 *                         comments:
 *                           type: array
 *                           items:
 *                             $ref: '#/components/schemas/ProductComment'
 *             example:
 *               success: true
 *               data:
 *                 id: "123e4567-e89b-12d3-a456-426614174001"
 *                 name: "팬더 인형"
 *                 description: "부드러운 대형 팬더 인형"
 *                 price: 12900
 *                 image: "/uploads/panda-toy.jpg"
 *                 tags: ["toy", "panda", "stuffed"]
 *                 owner:
 *                   id: "123e4567-e89b-12d3-a456-426614174000"
 *                   email: "user@example.com"
 *                   nickname: "판다마스터"
 *                   image: ""
 *                 likeCount: 15
 *                 isLiked: true
 *                 comments: []
 *                 createdAt: "2025-01-20T10:00:00.000Z"
 *                 updatedAt: "2025-01-20T10:00:00.000Z"
 *       404:
 *         description: 상품을 찾을 수 없음
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               message: "Product not found"
 *       401:
 *         description: 인증 필요
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               message: "Unauthorized"
 *   patch:
 *     tags: [Products]
 *     summary: 상품 수정
 *     description: 상품 정보를 수정합니다. (소유자만 가능)
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: 상품 ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: 상품명
 *               description:
 *                 type: string
 *                 description: 상품 설명
 *               price:
 *                 type: integer
 *                 description: 가격 (원)
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: 상품 태그
 *           example:
 *             name: "팬더 인형 (업데이트)"
 *             price: 13900
 *     responses:
 *       200:
 *         description: 상품 수정 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Product'
 *             example:
 *               success: true
 *               data:
 *                 id: "123e4567-e89b-12d3-a456-426614174001"
 *                 name: "팬더 인형 (업데이트)"
 *                 description: "부드러운 대형 팬더 인형"
 *                 price: 13900
 *                 image: "/uploads/panda-toy.jpg"
 *                 tags: ["toy", "panda", "stuffed"]
 *                 likeCount: 15
 *                 isLiked: true
 *                 createdAt: "2025-01-20T10:00:00.000Z"
 *                 updatedAt: "2025-01-20T10:05:00.000Z"
 *       404:
 *         description: 상품을 찾을 수 없음
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               message: "Product not found"
 *       403:
 *         description: 권한 없음
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               message: "You don't have permission to update this product"
 *       401:
 *         description: 인증 필요
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               message: "Unauthorized"
 *   delete:
 *     tags: [Products]
 *     summary: 상품 삭제
 *     description: 상품을 삭제합니다. (소유자만 가능)
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: 상품 ID
 *     responses:
 *       200:
 *         description: 상품 삭제 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   nullable: true
 *                   example: null
 *             example:
 *               success: true
 *               data: null
 *       404:
 *         description: 상품을 찾을 수 없음
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               message: "Product not found"
 *       403:
 *         description: 권한 없음
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               message: "You don't have permission to delete this product"
 *       401:
 *         description: 인증 필요
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               message: "Unauthorized"
 */

/**
 * @openapi
 * /products/{id}/like:
 *   post:
 *     tags: [Likes]
 *     summary: 상품 좋아요
 *     description: 상품에 좋아요를 추가합니다.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: 상품 ID
 *     responses:
 *       201:
 *         description: 좋아요 추가 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Product liked successfully"
 *             example:
 *               success: true
 *               message: "Product liked successfully"
 *       401:
 *         description: 인증 필요
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               message: "Unauthorized"
 *   delete:
 *     tags: [Likes]
 *     summary: 상품 좋아요 취소
 *     description: 상품의 좋아요를 취소합니다.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: 상품 ID
 *     responses:
 *       200:
 *         description: 좋아요 취소 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Product unliked successfully"
 *             example:
 *               success: true
 *               message: "Product unliked successfully"
 *       401:
 *         description: 인증 필요
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               message: "Unauthorized"
 */

/**
 * @openapi
 * /articles:
 *   get:
 *     tags: [Articles]
 *     summary: 게시글 목록 조회
 *     description: 게시글 목록을 페이지네이션과 검색 기능으로 조회합니다.
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: 페이지 번호
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 10
 *         description: 페이지당 항목 수
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         description: 검색 쿼리
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: [recent, like]
 *           default: recent
 *         description: 정렬 기준 (recent - 최신순, like - 좋아요순)
 *     responses:
 *       200:
 *         description: 게시글 목록 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Article'
 *                 orderBy:
 *                   type: object
 *                   description: 정렬 기준
 *                 pagination:
 *                   $ref: '#/components/schemas/Pagination'
 *                 search:
 *                   $ref: '#/components/schemas/SearchInfo'
 *             example:
 *               success: true
 *               data:
 *                 - id: "123e4567-e89b-12d3-a456-426614174002"
 *                   title: "판다마켓 공지사항"
 *                   content: "신규 기능이 추가되었습니다."
 *                   likeCount: 8
 *                   isLiked: false
 *                   createdAt: "2025-01-20T10:00:00.000Z"
 *                   updatedAt: "2025-01-20T10:00:00.000Z"
 *               orderBy:
 *                 createdAt: "desc"
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
 *     description: 새로운 게시글을 생성합니다. (인증 필요)
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, content]
 *             properties:
 *               title:
 *                 type: string
 *                 description: 제목
 *               content:
 *                 type: string
 *                 description: 내용
 *           example:
 *             title: "판다마켓 공지사항"
 *             content: "신규 기능이 추가되었습니다."
 *     responses:
 *       201:
 *         description: 게시글 생성 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Article'
 *             example:
 *               success: true
 *               data:
 *                 id: "123e4567-e89b-12d3-a456-426614174002"
 *                 title: "판다마켓 공지사항"
 *                 content: "신규 기능이 추가되었습니다."
 *                 likeCount: 0
 *                 isLiked: false
 *                 createdAt: "2025-01-20T10:00:00.000Z"
 *                 updatedAt: "2025-01-20T10:00:00.000Z"
 *       401:
 *         description: 인증 필요
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               message: "Unauthorized"
 *       400:
 *         description: 잘못된 요청
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               message: "Title is required"
 */

/**
 * @openapi
 * /articles/{id}:
 *   get:
 *     tags: [Articles]
 *     summary: 게시글 단건 조회
 *     description: 특정 게시글의 상세 정보를 조회합니다.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: 게시글 ID
 *     responses:
 *       200:
 *         description: 게시글 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   allOf:
 *                     - $ref: '#/components/schemas/Article'
 *                     - type: object
 *                       properties:
 *                         owner:
 *                           $ref: '#/components/schemas/User'
 *                         comments:
 *                           type: array
 *                           items:
 *                             $ref: '#/components/schemas/ArticleComment'
 *             example:
 *               success: true
 *               data:
 *                 id: "123e4567-e89b-12d3-a456-426614174002"
 *                 title: "판다마켓 공지사항"
 *                 content: "신규 기능이 추가되었습니다."
 *                 owner:
 *                   id: "123e4567-e89b-12d3-a456-426614174000"
 *                   email: "user@example.com"
 *                   nickname: "판다마스터"
 *                   image: ""
 *                 likeCount: 8
 *                 isLiked: false
 *                 comments: []
 *                 createdAt: "2025-01-20T10:00:00.000Z"
 *                 updatedAt: "2025-01-20T10:00:00.000Z"
 *       404:
 *         description: 게시글을 찾을 수 없음
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               message: "Article not found"
 *   patch:
 *     tags: [Articles]
 *     summary: 게시글 수정
 *     description: 게시글을 수정합니다. (소유자만 가능)
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: 게시글 ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, content]
 *             properties:
 *               title:
 *                 type: string
 *                 description: 제목
 *               content:
 *                 type: string
 *                 description: 내용
 *           example:
 *             title: "업데이트된 제목"
 *             content: "업데이트된 내용"
 *     responses:
 *       200:
 *         description: 게시글 수정 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Article'
 *             example:
 *               success: true
 *               data:
 *                 id: "123e4567-e89b-12d3-a456-426614174002"
 *                 title: "업데이트된 제목"
 *                 content: "업데이트된 내용"
 *                 likeCount: 8
 *                 isLiked: false
 *                 createdAt: "2025-01-20T10:00:00.000Z"
 *                 updatedAt: "2025-01-20T10:05:00.000Z"
 *       404:
 *         description: 게시글을 찾을 수 없음
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               message: "Article not found"
 *       403:
 *         description: 권한 없음
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               message: "You don't have permission to update this article"
 *       401:
 *         description: 인증 필요
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               message: "Unauthorized"
 *   delete:
 *     tags: [Articles]
 *     summary: 게시글 삭제
 *     description: 게시글을 삭제합니다. (소유자만 가능)
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: 게시글 ID
 *     responses:
 *       200:
 *         description: 게시글 삭제 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   nullable: true
 *                   example: null
 *             example:
 *               success: true
 *               data: null
 *       404:
 *         description: 게시글을 찾을 수 없음
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               message: "Article not found"
 *       403:
 *         description: 권한 없음
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               message: "You don't have permission to delete this article"
 *       401:
 *         description: 인증 필요
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               message: "Unauthorized"
 */

/**
 * @openapi
 * /articles/{id}/like:
 *   post:
 *     tags: [Likes]
 *     summary: 게시글 좋아요
 *     description: 게시글에 좋아요를 추가합니다.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: 게시글 ID
 *     responses:
 *       201:
 *         description: 좋아요 추가 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Article liked successfully"
 *             example:
 *               success: true
 *               message: "Article liked successfully"
 *       401:
 *         description: 인증 필요
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               message: "Unauthorized"
 *   delete:
 *     tags: [Likes]
 *     summary: 게시글 좋아요 취소
 *     description: 게시글의 좋아요를 취소합니다.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: 게시글 ID
 *     responses:
 *       200:
 *         description: 좋아요 취소 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Article unliked successfully"
 *             example:
 *               success: true
 *               message: "Article unliked successfully"
 *       401:
 *         description: 인증 필요
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               message: "Unauthorized"
 */

/**
 * @openapi
 * /product-comments/{id}:
 *   get:
 *     tags: [ProductComments]
 *     summary: 상품 댓글 조회
 *     description: 특정 상품의 댓글을 커서 기반 페이지네이션으로 조회합니다.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: 상품 ID
 *       - in: query
 *         name: cursor
 *         schema:
 *           type: string
 *           format: date-time
 *         description: 커서 (페이지네이션용)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 50
 *           default: 10
 *         description: 페이지당 항목 수
 *       - in: query
 *         name: direction
 *         schema:
 *           type: string
 *           enum: [next, prev]
 *           default: next
 *         description: 페이지 방향
 *     responses:
 *       200:
 *         description: 댓글 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/ProductComment'
 *                 pagination:
 *                   $ref: '#/components/schemas/CursorPagination'
 *             example:
 *               success: true
 *               data:
 *                 - id: "123e4567-e89b-12d3-a456-426614174003"
 *                   content: "정말 좋은 상품이네요!"
 *                   productId: "123e4567-e89b-12d3-a456-426614174001"
 *                   createdAt: "2025-01-20T10:00:00.000Z"
 *                   updatedAt: "2025-01-20T10:00:00.000Z"
 *               pagination:
 *                 hasNextPage: true
 *                 hasPrevPage: false
 *                 nextCursor: "2025-01-20T10:00:00.000Z"
 *                 prevCursor: null
 *                 limit: 10
 *                 direction: "next"
 *       400:
 *         description: 잘못된 요청
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               message: "Invalid product ID"
 *   post:
 *     tags: [ProductComments]
 *     summary: 상품 댓글 생성
 *     description: 상품에 댓글을 작성합니다. (인증 필요)
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: 상품 ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [content]
 *             properties:
 *               content:
 *                 type: string
 *                 description: 댓글 내용
 *           example:
 *             content: "정말 좋은 상품이네요!"
 *     responses:
 *       201:
 *         description: 댓글 생성 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/ProductComment'
 *             example:
 *               success: true
 *               data:
 *                 id: "123e4567-e89b-12d3-a456-426614174003"
 *                 content: "정말 좋은 상품이네요!"
 *                 productId: "123e4567-e89b-12d3-a456-426614174001"
 *                 createdAt: "2025-01-20T10:00:00.000Z"
 *                 updatedAt: "2025-01-20T10:00:00.000Z"
 *       401:
 *         description: 인증 필요
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               message: "Unauthorized"
 *       400:
 *         description: 잘못된 요청
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               message: "Content is required"
 */

/**
 * @openapi
 * /product-comments/{commentId}:
 *   patch:
 *     tags: [ProductComments]
 *     summary: 상품 댓글 수정
 *     description: 상품 댓글을 수정합니다. (작성자만 가능)
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: 댓글 ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [content]
 *             properties:
 *               content:
 *                 type: string
 *                 description: 댓글 내용
 *           example:
 *             content: "수정된 댓글 내용"
 *     responses:
 *       200:
 *         description: 댓글 수정 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/ProductComment'
 *             example:
 *               success: true
 *               data:
 *                 id: "123e4567-e89b-12d3-a456-426614174003"
 *                 content: "수정된 댓글 내용"
 *                 productId: "123e4567-e89b-12d3-a456-426614174001"
 *                 createdAt: "2025-01-20T10:00:00.000Z"
 *                 updatedAt: "2025-01-20T10:05:00.000Z"
 *       404:
 *         description: 댓글을 찾을 수 없음
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               message: "Comment not found"
 *       403:
 *         description: 권한 없음
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               message: "You don't have permission to update this comment"
 *       401:
 *         description: 인증 필요
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               message: "Unauthorized"
 *   delete:
 *     tags: [ProductComments]
 *     summary: 상품 댓글 삭제
 *     description: 상품 댓글을 삭제합니다. (작성자만 가능)
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: 댓글 ID
 *     responses:
 *       200:
 *         description: 댓글 삭제 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Comment deleted successfully"
 *             example:
 *               success: true
 *               message: "Comment deleted successfully"
 *       404:
 *         description: 댓글을 찾을 수 없음
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               message: "Comment not found"
 *       403:
 *         description: 권한 없음
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               message: "You don't have permission to delete this comment"
 *       401:
 *         description: 인증 필요
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               message: "Unauthorized"
 */

/**
 * @openapi
 * /article-comments/{articleId}:
 *   post:
 *     tags: [ArticleComments]
 *     summary: 게시글 댓글 생성
 *     description: 게시글에 댓글을 작성합니다. (인증 필요)
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: articleId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: 게시글 ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [content]
 *             properties:
 *               content:
 *                 type: string
 *                 description: 댓글 내용
 *           example:
 *             content: "좋은 정보 감사합니다!"
 *     responses:
 *       201:
 *         description: 댓글 생성 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/ArticleComment'
 *             example:
 *               success: true
 *               data:
 *                 id: "123e4567-e89b-12d3-a456-426614174004"
 *                 content: "좋은 정보 감사합니다!"
 *                 articleId: "123e4567-e89b-12d3-a456-426614174002"
 *                 createdAt: "2025-01-20T10:00:00.000Z"
 *                 updatedAt: "2025-01-20T10:00:00.000Z"
 *       401:
 *         description: 인증 필요
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               message: "Unauthorized"
 *       400:
 *         description: 잘못된 요청
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               message: "Content is required"
 */

/**
 * @openapi
 * /article-comments/{commentId}:
 *   patch:
 *     tags: [ArticleComments]
 *     summary: 게시글 댓글 수정
 *     description: 게시글 댓글을 수정합니다. (작성자만 가능)
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: 댓글 ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [content]
 *             properties:
 *               content:
 *                 type: string
 *                 description: 댓글 내용
 *           example:
 *             content: "수정된 댓글 내용"
 *     responses:
 *       200:
 *         description: 댓글 수정 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/ArticleComment'
 *             example:
 *               success: true
 *               data:
 *                 id: "123e4567-e89b-12d3-a456-426614174004"
 *                 content: "수정된 댓글 내용"
 *                 articleId: "123e4567-e89b-12d3-a456-426614174002"
 *                 createdAt: "2025-01-20T10:00:00.000Z"
 *                 updatedAt: "2025-01-20T10:05:00.000Z"
 *       404:
 *         description: 댓글을 찾을 수 없음
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               message: "Comment not found"
 *       403:
 *         description: 권한 없음
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               message: "You don't have permission to update this comment"
 *       401:
 *         description: 인증 필요
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               message: "Unauthorized"
 *   delete:
 *     tags: [ArticleComments]
 *     summary: 게시글 댓글 삭제
 *     description: 게시글 댓글을 삭제합니다. (작성자만 가능)
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: 댓글 ID
 *     responses:
 *       200:
 *         description: 댓글 삭제 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Comment deleted successfully"
 *             example:
 *               success: true
 *               message: "Comment deleted successfully"
 *       404:
 *         description: 댓글을 찾을 수 없음
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               message: "Comment not found"
 *       403:
 *         description: 권한 없음
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               message: "You don't have permission to delete this comment"
 *       401:
 *         description: 인증 필요
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               message: "Unauthorized"
 */
