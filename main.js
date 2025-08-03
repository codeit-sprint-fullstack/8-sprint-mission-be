import { getArticleList, createArticle } from './ArticleService.js';
import { getProductList, createProduct } from './ProductService.js';

// 사용 예시
getArticleList({ page: 1, pageSize: 5, keyword: 'test' }).then(console.log);
createArticle({ title: '테스트', content: '내용입니다', image: '이미지URL' });

(async () => {
  const products = await getProductList({ page: 1, pageSize: 3, keyword: '' });
  console.log(products);
})();
