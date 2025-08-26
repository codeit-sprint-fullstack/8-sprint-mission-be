// test.js
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const BASE_URL = 'http://localhost:8080/products';

async function runTests() {
  try {
    //상품 등록
    const newProduct = {
      name: "노트북",
      description: "LG Gram 14",
      price: 1200000,
      tags: ["전자제품","중고"]
    };
    let res = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProduct)
    });
    const created = await res.json();
    console.log('상품 등록:', created);

    const productId = created._id;

    //상품 목록 조회 (페이지네이션, 검색, 최신순)
    const params = new URLSearchParams({
      offset: 0,
      limit: 10,
      q: "노트북",
      sort: "recent"
    });
    res = await fetch(`${BASE_URL}?${params.toString()}`);
    const list = await res.json();
    console.log('상품 목록 (페이지네이션+검색+최신순):', list);

    //상품 상세 조회
    res = await fetch(`${BASE_URL}/${productId}`);
    const detail = await res.json();
    console.log('상품 상세 조회:', detail);

    //상품 수정 (PATCH)
    const updateData = { price: 1000000 };
    res = await fetch(`${BASE_URL}/${productId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updateData)
    });
    const updated = await res.json();
    console.log('상품 수정:', updated);

    //상품 삭제
    res = await fetch(`${BASE_URL}/${productId}`, { method: 'DELETE' });
    console.log('상품 삭제 상태 코드:', res.status);

    //삭제 후 목록 조회
    res = await fetch(`${BASE_URL}`);
    const finalList = await res.json();
    console.log('삭제 후 상품 목록:', finalList);

  } catch (err) {
    console.error(err);
  }
}

runTests();
