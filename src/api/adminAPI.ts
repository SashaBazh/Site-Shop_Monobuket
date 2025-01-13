// src/api/adminAPI.ts
import axiosInstance from "./axiosInstance";

/**
 * Загрузить все категории (GET /products/category).
 */
export async function getCategories() {
  // Предполагаем: GET /products/category
  const res = await axiosInstance.get("/products/category");
  return res.data; // массив категорий
}

/**
 * Создать категорию (POST /products/categories).
 * Обратите внимание на "productCategoryData" (формируем FormData).
 */
export async function createCategory(payload: { name: string }) {
  // У нас в бэке: @router.post("/categories") c (category_data: str = Form(...), image: UploadFile=File(None))
  // Допустим, вы пока не загружаете картинку. Тогда шлём formData с JSON:
  const formData = new FormData();
  const categoryData = {
    name: payload.name,
    description: "", // если нужно
  };
  formData.append("category_data", JSON.stringify(categoryData));

  // если есть image, тоже append в formData
  // formData.append("image", file);

  const res = await axiosInstance.post("/products/categories", formData);
  return res.data;
}

/**
 * Удалить категорию (DELETE /products/categories/:category_id).
 */
export async function deleteCategory(categoryId: number) {
  // @router.delete("/categories/{category_id}")
  const res = await axiosInstance.delete(`/products/categories/${categoryId}`);
  return res.data;
}

/**
 * Загрузить все товары (GET /products/category/0?limit=999).
 * Это ваш "getProductsAll".
 */
export async function getProductsAll() {
  // Предположим, вы берёте "все" товары через category=0?limit=999
  const res = await axiosInstance.get(`/products/category/0?limit=999`);
  return res.data; // массив товаров
}

/**
 * Создать товар (POST /products).
 * Принимаем formData (product_data + files).
 */
export async function createProduct(formData: FormData) {
  // POST /products
  // { product_data: str, files: list[UploadFile]=File([]) }
  const res = await axiosInstance.post("/products", formData);
  return res.data;
}

/**
 * Удалить товар (DELETE /products/{product_id}).
 */
export async function deleteProduct(productId: number) {
  // DELETE /products/:product_id
  const res = await axiosInstance.delete(`/products/${productId}`);
  return res.data;
}

/**
 * Обновить товар (PUT /products).
 * Принимаем formData (product_data + [files]).
 */
export async function updateProduct(formData: FormData) {
  // PUT /products
  // { product_data: str, files: list[UploadFile] = File(None) }
  const res = await axiosInstance.put("/products", formData);
  return res.data;
}
