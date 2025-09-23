# 8-Sprint-Mission-7

## 미션 소개

### 📂 자유게시판 (Article)

#### 📑 스키마

- `id`, `title`, `content`, `createdAt`, `updatedAt`

#### ✅ 기능

1. **게시글 등록 API**
   - 입력: `title`, `content`

2. **게시글 조회 API**
   - 출력: `id`, `title`, `content`, `createdAt`

3. **게시글 수정 API**

4. **게시글 삭제 API**

5. **게시글 목록 조회 API**
   - 출력: `id`, `title`, `content`, `createdAt`
   - **offset 페이지네이션 지원**
   - 정렬: 최신순(`recent`)
   - 검색: `title`, `content`에 포함된 단어 기반 검색

---

### 💬 댓글 (Comment)

#### ✅ 기능

1. **댓글 등록 API**
   - 입력: `content`
   - **중고마켓 댓글 API**와 **자유게시판 댓글 API** 분리

2. **댓글 수정 API**
   - `PATCH` 메서드 사용

3. **댓글 삭제 API**

4. **댓글 목록 조회 API**
   - 출력: `id`, `content`, `createdAt`
   - **cursor 페이지네이션 지원**
   - **중고마켓 댓글 목록 API**와 **자유게시판 댓글 목록 API** 분리

## 미션 과정

Prisma, Postgresql, Express 기반으로 프로젝트를 진행했습니다.

## 배포 링크

https://codeitsprintmission.onrender.com/api-docs
