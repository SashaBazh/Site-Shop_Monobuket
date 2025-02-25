import { useState } from "react";
import {
  getProductsAll,
  createProduct,
  deleteProduct,
  updateProduct,
} from "../../api/adminAPI";

export function useProducts() {
  const [products, setProducts] = useState<unknown[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<unknown>(null);
  const [editProductData, setEditProductData] = useState({
    name: "",
    price: "",
  });

  const loadProducts = async () => {
    try {
      setError(null);
      const prodRes = await getProductsAll();
      setProducts(prodRes);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ошибка при загрузке товаров");
    }
  };

  const handleCreateProduct = async (productData: {
    name: string;
    price: string;
    categoryId: string;
    description: string;
    files: File[];
  }) => {
    if (!productData.name.trim() || !productData.price || !productData.categoryId) {
      alert("Пожалуйста, заполните все обязательные поля.");
      return;
    }

    const formData = new FormData();
    const productPayload = {
      category_id: Number(productData.categoryId),
      name: productData.name.trim(),
      price: Number(productData.price),
      description: productData.description.trim(),
    };

    formData.append("product_data", JSON.stringify(productPayload));

    for (const file of productData.files) {
      formData.append("files", file);
    }

    try {
      await createProduct(formData);
      await loadProducts();
    } catch (err) {
      alert(`Ошибка при создании товара: ${err instanceof Error ? err.message : "Неизвестная ошибка"}`);
    }
  };

  const handleDeleteProduct = async (productId: number) => {
    if (!window.confirm("Удалить товар?")) return;
    try {
      await deleteProduct(productId);
      await loadProducts();
    } catch (err) {
      alert(`Ошибка при удалении товара: ${err instanceof Error ? err.message : "Неизвестная ошибка"}`);
    }
  };

  const openEditDialog = (prod: unknown) => {
    if (typeof prod === "object" && prod !== null && "id" in prod && "name" in prod && "price" in prod) {
      setCurrentProduct(prod);
      setEditProductData({
        name: String(prod.name),
        price: String(prod.price),
      });
      setEditDialogOpen(true);
    }
  };

  const closeEditDialog = () => {
    setEditDialogOpen(false);
    setCurrentProduct(null);
  };

  const handleEditProduct = async () => {
    if (
      !editProductData.name.trim() ||
      !editProductData.price ||
      !currentProduct
    ) {
      alert("Пожалуйста, заполните все обязательные поля.");
      return;
    }

    try {
      const formData = new FormData();
      const productPayload = {
        id: (currentProduct as { id: number }).id,
        name: editProductData.name.trim(),
        price: Number(editProductData.price),
      };
      formData.append("product_data", JSON.stringify(productPayload));

      await updateProduct(formData);
      await loadProducts();
      closeEditDialog();
    } catch (err) {
      alert(`Ошибка при обновлении товара: ${err instanceof Error ? err.message : "Неизвестная ошибка"}`);
    }
  };

  return {
    products,
    error,
    editDialogOpen,
    currentProduct,
    editProductData,
    loadProducts,
    handleCreateProduct,
    handleDeleteProduct,
    openEditDialog,
    closeEditDialog,
    handleEditProduct,
    setEditProductData,
  };
}