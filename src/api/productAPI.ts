import axiosInstance from './axiosInstance';

export async function getAllProducts() {
  const res = await axiosInstance.get('/products/category/0'); 
  return res.data;
}

export async function getNewProducts() {
  const res = await axiosInstance.get('/products/new');
  return res.data;
}

export async function getProductDetail(product_id: number) {
  const res = await axiosInstance.get(`/products/${product_id}`);
  return res.data;
}

export async function getProductsByCategory(categoryId: number) {
  const res = await axiosInstance.get(`/products/category/${categoryId}`);
  return res.data;
}
