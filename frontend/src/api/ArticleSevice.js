// 리퀘스트 통신은 JSON 파일로 주고 받습니다.
// Swagger에 등록된 API 문서를 참고하여 함수를 구현했습니다.

const url = 'https://panda-market-api-crud.vercel.app/articles'

async function getArticleList(page=1, pagesize=10, orderBy='recent', keyword=''){
    //검색 파라미터를 쿼리로 넘겼습니다.
    const result = await fetch(url+`?page=${page}&pageSize=${pagesize}&orderBy=${orderBy}&keyword=${keyword}`)
        .then(async (res) => {
            await resErrorCatch(res); //fetch에서 404, 500 리스폰스 에러는 따로 처리
            return res.json(); //중괄호 형식에서는 return 걸어주기
        })
        .then((data) => JSON.stringify(data))
        .catch((err) => console.log(err));
    return result;
}

async function getArticle(id){
    const result = await fetch(url+`/${id}`)
        .then(async(res) => {
            await resErrorCatch(res);
            return res.json();
        })
        .then((data) => JSON.stringify(data))
        .catch((err) => console.log(err));
    return result;
}

//테스트용 body인 것 같아 가공은 안했습니다.
const postRqBody = {
  image: "https://example.com/...",
  content: "게시글 내용입니다.",
  title: "게시글 제목입니다.",
}

async function createArticle() {
    const result = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(postRqBody),
            headers: { 'Content-Type' : 'application/json' }
        })
        .then(async (res) => {
            await resErrorCatch(res);
            return res.json();
        })
        .then((data) => JSON.stringify(data))
        .catch((err) => console.log(err));
    return result;
}

async function patchArticle(id) {
    const result = await fetch(url+`/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(postRqBody),
            headers: { 'Content-Type' : 'application/json' }
        })
        .then(async (res) => {
            await resErrorCatch(res);
            return res.json();
        })
        .then((data) => JSON.stringify(data))
        .catch((err) => console.log(err));
    return result;
}

async function deleteArticle(id) {

    const result = await fetch(url+`/${id}`, {
            method: 'DELETE',
        })
        .then(async (res) => {
            await resErrorCatch(res);
            return res.json();
        })
        .then((data) => JSON.stringify(data))
        .catch((err) => console.log(err));
    return result;
}

async function resErrorCatch(res){
    if (!res.ok) {
        //404, 500 에러는 리퀘스트 에러가 아니라 리스폰스 에러. fetch는 따로 처리해줘야 합니다.(axois는 같이 담아준다)
        const errorMessage = await res.text();
        throw new Error(`리스폰스 에러: ${res.status} - ${errorMessage}`);//수동으로 에러 던지기
    }
}

export default { getArticle, getArticleList, createArticle, patchArticle, deleteArticle };