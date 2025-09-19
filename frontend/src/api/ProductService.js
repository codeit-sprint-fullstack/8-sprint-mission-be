//const url = 'https://panda-market-api-crud.vercel.app/products' //판다마켓 코드잇 api (사용시 result.list 경로 사용)
const url = 'http://localhost:3000/products' //직접 만든 개발용 백엔드 로컬 주소입니다.
//const url = 'https://pandamarket-kwxe.onrender.com/products' //Render 배포 백엔드 주소입니다.

//상품 목록 조회 - 요구사항
async function getProductList(page=1, pagesize=10, orderBy='recent', keyword=''){
    const result = await fetch(url+`?page=${page}&pageSize=${pagesize}&orderBy=${orderBy}&keyword=${keyword}`)
        .then(async (res) => {
            await resErrorCatch(res); //fetch에서 404, 500 리스폰스 에러는 따로 처리
            return res.json();
        })
        .catch((err) => console.log(err));
    return result; //(코드잇 api 사용시 result.list 경로 사용, 이하 동일)
}   

//상품 상세 조회 - 요구사항 (api만)
async function getProduct(id){
    const result = await fetch(url+`/${id}`)
        .then(async(res) => {
            await resErrorCatch(res);
            return res.json();
        })
        .catch((err) => console.log(err));
    return result;
}

//상품 등록 - 요구사항
async function createProduct(RqBody) {
    const result = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(RqBody),
            headers: { 'Content-Type' : 'application/json' }
        })
        .then(async (res) => {
            await resErrorCatch(res);
            return res.json();
        })
        .catch((err) => console.log(err));
    return result;
}

//상품 수정 - 요구사항 (api만)
async function patchProduct(id, RqBody) {
    const result = await fetch(url+`/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(RqBody),
            headers: { 'Content-Type' : 'application/json' }
        })
        .then(async (res) => {
            await resErrorCatch(res);
            return res.json();
        })
        .catch((err) => console.log(err));
    return result;
}

//상품 삭제 (api만)
async function deleteProduct(id) {
    const result = await fetch(url+`/${id}`, {
            method: 'DELETE',
        })
        .then(async (res) => {
            await resErrorCatch(res);
            return res.json(); 
        })
        .catch((err) => console.log(err));
    return result;
}

//리스폰스 에러만 잡는 코드 (fetch를 써서 필요)
async function resErrorCatch(res){
    if (!res.ok) {
        //404, 500 에러는 리퀘스트 에러가 아니라 리스폰스 에러. fetch는 따로 처리해줘야 합니다.(axois는 같이 담아준다)
        const errorMessage = await res.text();
        throw new Error(`리스폰스 에러: ${res.status} - ${errorMessage}`);//수동으로 에러 던지기
    }
}

export default { getProduct, getProductList, createProduct, patchProduct, deleteProduct };