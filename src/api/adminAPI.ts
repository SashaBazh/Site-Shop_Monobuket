import { OrderStatus } from "../types/Admin.types";
import axiosInstance from "./axiosInstance";

export async function getCategories() {
  const res = await axiosInstance.get("/products/category");
  return res.data;
}

export async function createCategory(payload: { name: string }) {
  const formData = new FormData();
  const categoryData = {
    name: payload.name,
    description: "",
  };
  formData.append("category_data", JSON.stringify(categoryData));
  const res = await axiosInstance.post("/products/categories", formData);
  return res.data;
}

export async function deleteCategory(categoryId: number) {
  const res = await axiosInstance.delete(`/products/categories/${categoryId}`);
  return res.data;
}

export async function getProductsAll() {
  const res = await axiosInstance.get(`/products/category/0?limit=999`);
  return res.data;
}

export async function createProduct(formData: FormData) {
  const res = await axiosInstance.post("/products", formData);
  return res.data;
}

export async function deleteProduct(productId: number) {
  const res = await axiosInstance.delete(`/products/${productId}`);
  return res.data;
}

export async function updateProduct(formData: FormData) {
  const res = await axiosInstance.put("/products", formData);
  return res.data;
}

export async function getOrders() {
  const res = await axiosInstance.get("/cart/orders");
  return res.data;
}

export async function getOrderDetails(orderId: number) {
  const res = await axiosInstance.get(`/cart/order/${orderId}`);
  return res.data;
}

export async function updateOrderStatus(orderId: number, orderStatus: OrderStatus) {
  const res = await axiosInstance.put(`/cart/order/${orderId}?order_status=${orderStatus}`);
  return res.data;
}