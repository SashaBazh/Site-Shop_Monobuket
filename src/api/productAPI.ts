// src/api/productAPI.ts
import axiosInstance from './axiosInstance';

export async function getAllProducts() {
  // У вас в бэке есть несколько эндпоинтов:
  // /products/category/{category_id}, /products/new и т.п.
  // Но чтобы получить все, возможно, придётся вызвать несколько раз
  // или у вас есть /products без указания id? Тогда меняем
  const res = await axiosInstance.get('/products/category/0'); 
  // допустим, category_id=0 - все товары или что-то подобное
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

// Или если нужно список по конкретной категории
export async function getProductsByCategory(categoryId: number) {
  const res = await axiosInstance.get(`/products/category/${categoryId}`);
  return res.data;
}
