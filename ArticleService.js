export function getArticleList({ page = 1, pageSize = 10, keyword = '' }) {
  return fetch(`https://panda-market-api-crud.vercel.app/articles?page=${page}&pageSize=${pageSize}&keyword=${keyword}`)
    .then(res => {
      if (!res.ok) throw new Error('Error fetching article list');
      return res.json();
    })
    .catch(err => console.error(err.message));
}
export function getArticle(id) {
  return fetch(`https://panda-market-api-crud.vercel.app/articles/${id}`)
    .then(res => {
      if (!res.ok) throw new Error('Error fetching article');
      return res.json();
    })
    .catch(err => console.error(err.message));
}
export function createArticle({ title, content, image }) {
  return fetch(`https://panda-market-api-crud.vercel.app/articles`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, content, image }),
  })
    .then(res => {
      if (!res.ok) throw new Error('Error creating article');
      return res.json();
    })
    .catch(err => console.error(err.message));
}
export function patchArticle(id, data) {
  return fetch(`https://panda-market-api-crud.vercel.app/articles/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
    .then(res => {
      if (!res.ok) throw new Error('Error updating article');
      return res.json();
    })
    .catch(err => console.error(err.message));
}
export function deleteArticle(id) {
  return fetch(`https://panda-market-api-crud.vercel.app/articles/${id}`, {
    method: 'DELETE',
  })
    .then(res => {
      if (!res.ok) throw new Error('Error deleting article');
      return res.json();
    })
    .catch(err => console.error(err.message));
}
