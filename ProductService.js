export async function getProductList({ page = 1, pageSize = 10, keyword = '' }) {
  try {
    const res = await fetch(`https://panda-market-api-crud.vercel.app/products?page=${page}&pageSize=${pageSize}&keyword=${keyword}`);
    if (!res.ok) throw new Error('Error fetching product list');
    return await res.json();
  } catch (err) {
    console.error(err.message);
  }
}
export async function getProduct(id) {
  try {
    const res = await fetch(`https://panda-market-api-crud.vercel.app/products/${id}`);
    if (!res.ok) throw new Error('Error fetching product');
    return await res.json();
  } catch (err) {
    console.error(err.message);
  }
}
export async function createProduct(data) {
  try {
    const res = await fetch(`https://panda-market-api-crud.vercel.app/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Error creating product');
    return await res.json();
  } catch (err) {
    console.error(err.message);
  }
}
export async function patchProduct(id, data) {
  try {
    const res = await fetch(`https://panda-market-api-crud.vercel.app/products/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Error updating product');
    return await res.json();
  } catch (err) {
    console.error(err.message);
  }
}
export async function deleteProduct(id) {
  try {
    const res = await fetch(`https://panda-market-api-crud.vercel.app/products/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Error deleting product');
    return await res.json();
  } catch (err) {
    console.error(err.message);
  }
}
