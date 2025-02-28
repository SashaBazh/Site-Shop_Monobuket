import React, { useState, useEffect } from "react";
import {
  getProductsAll,
  createProduct,
  deleteProduct,
  updateProduct,
  getCategories,
} from "../../api/adminAPI";
import {
  Product,
  Category,
  ProductFormData,
  ProductUpdateData,
} from "../../types/Admin.types";
import { ProductManagerStyles } from "./ProductManager.styles";
import { getImageUrl } from "../../api/config";
import Notification from "../../components/Admin/Notification";

const ProductManager: React.FC = () => {
  // Основные состояния
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  // Состояния для создания товара
  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    price: "",
    description: "",
    category_id: "",
    media: [],
  });
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [, setEditingProduct] = useState<Product | null>(null);

  // Состояния для редактирования товара
  const [editingProductId, setEditingProductId] = useState<number | null>(null);
  const [editingProductData, setEditingProductData] = useState<ProductFormData>(
    {
      name: "",
      price: "",
      description: "",
      category_id: "",
      media: [],
    }
  );
  const [editingPreviewImages, setEditingPreviewImages] = useState<string[]>(
    []
  );
  const [originalMediaPaths, setOriginalMediaPaths] = useState<string[]>([]); // Для оригинальных путей медиа

  // Загрузка данных
  const fetchData = async () => {
    try {
      setLoading(true);
      const [productsData, categoriesData] = await Promise.all([
        getProductsAll(),
        getCategories(),
      ]);
      setProducts(productsData);
      setCategories(categoriesData);
      console.log("Полученные товары:", productsData);
    } catch (error) {
      console.error("Ошибка загрузки данных:", error);
      setNotification({ message: "Ошибка загрузки данных", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Функции для создания товара
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setFormData((prev) => ({ ...prev, media: [...prev.media, ...files] }));

      const newPreviewImages = files.map((file) => URL.createObjectURL(file));
      setPreviewImages((prev) => [...prev, ...newPreviewImages]);
    }
  };

  const handleRemoveImage = (indexToRemove: number) => {
    setPreviewImages((prevImages) =>
      prevImages.filter((_, index) => index !== indexToRemove)
    );

    setFormData((prevFormData) => ({
      ...prevFormData,
      media: prevFormData.media.filter((_, index) => index !== indexToRemove),
    }));
  };

  const prepareFormData = (data: ProductFormData) => {
    const submitFormData = new FormData();

    submitFormData.append(
      "product_data",
      JSON.stringify({
        name: data.name,
        price: data.price,
        description: data.description,
        category_id: data.category_id,
      })
    );

    data.media.forEach((image) => {
      submitFormData.append("files", image);
    });

    return submitFormData;
  };

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const submitData = prepareFormData(formData);
      await createProduct(submitData);
      setNotification({
        message: "Товар успешно добавлен!",
        type: "success",
      });
      resetForm();
      fetchData();
    } catch (error) {
      console.error("Ошибка сохранения товара:", error);
      setNotification({ message: "Ошибка сохранения товара", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      price: "",
      description: "",
      category_id: "",
      media: [],
    });
    setEditingProduct(null);
    setPreviewImages([]);
  };

  // Функции для редактирования товара
  const handleEditProduct = (product: Product) => {
    setEditingProductId(product.id);

    // Сохраняем данные товара
    setEditingProductData({
      name: product.name,
      price: product.price.toString(),
      description: product.description,
      category_id: product.category_id.toString(),
      media: [], // Новые файлы изображений будут здесь
    });

    // Важно: правильно обрабатываем существующие изображения
    const existingMedia = Array.isArray(product.media) ? product.media : [];

    // Фильтруем и сохраняем пути к оригинальным изображениям
    const originalPaths = existingMedia
      .filter((item) => typeof item === "string")
      .map((item) => item as string);

    console.log("Оригинальные пути изображений:", originalPaths);

    // Сохраняем оригинальные пути
    setOriginalMediaPaths(originalPaths);

    // Создаем превью для существующих изображений
    const imageUrls = originalPaths.map((path) => getImageUrl(path));
    setEditingPreviewImages(imageUrls);
  };

  const handleRemoveEditImage = (indexToRemove: number) => {
    // Определяем, удаляем оригинальное изображение или новое
    if (indexToRemove < originalMediaPaths.length) {
      // Удаление оригинального изображения
      setOriginalMediaPaths((prevPaths) =>
        prevPaths.filter((_, index) => index !== indexToRemove)
      );

      // Обновляем превью
      setEditingPreviewImages((prevImages) =>
        prevImages.filter((_, index) => index !== indexToRemove)
      );
    } else {
      // Удаление нового изображения
      const newMediaIndex = indexToRemove - originalMediaPaths.length;

      setEditingProductData((prevData) => ({
        ...prevData,
        media: prevData.media.filter((_, index) => index !== newMediaIndex),
      }));

      // Обновляем превью
      setEditingPreviewImages((prevImages) =>
        prevImages.filter((_, index) => index !== indexToRemove)
      );
    }
  };

  const [media, setMedia] = useState<File[]>([]); // Определяем состояние для файлов

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setMedia(Array.from(event.target.files)); // Преобразуем FileList в File[]
    }
  };

  const handleSaveProduct = async () => {
    try {
      setLoading(true);

      console.log("Сохраняем оригинальные изображения:", originalMediaPaths);

      // Подготавливаем данные для отправки
      const productDataToSend: ProductUpdateData = {
        id: editingProductId,
        name: editingProductData.name,
        price: editingProductData.price,
        description: editingProductData.description,
        category_id: editingProductData.category_id,
        media: media, // Используем media (File[])
      };

      console.log("Отправляемые данные товара:", productDataToSend);

      const submitFormData = new FormData();
      submitFormData.append("product_data", JSON.stringify(productDataToSend));

      // Добавляем новые файлы
      media.forEach((file) => {
        submitFormData.append("files", file);
      });

      await updateProduct(submitFormData);
      setNotification({ message: "Товар успешно обновлен!", type: "success" });
      fetchData();
      setEditingProductId(null);
    } catch (error) {
      console.error("Ошибка обновления товара:", error);
      setNotification({ message: "Ошибка обновления товара", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  // Функция удаления товара
  const handleDeleteProduct = async (id: number) => {
    if (!window.confirm("Вы уверены, что хотите удалить этот товар?")) return;

    try {
      setLoading(true);
      await deleteProduct(id);
      fetchData();
      setNotification({ message: "Товар успешно удален!", type: "success" });
    } catch (error) {
      console.error("Ошибка удаления товара:", error);
      setNotification({ message: "Ошибка удаления товара", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  // Автоматическое скрытие уведомлений
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [notification]);

  return (
    <div style={ProductManagerStyles.container}>
      <h2 style={ProductManagerStyles.title}>Управление товарами</h2>

      {notification && (
        <Notification message={notification.message} type={notification.type} />
      )}

      {/* Форма создания товара */}
      <form onSubmit={handleCreateProduct} style={ProductManagerStyles.form}>
        <div style={ProductManagerStyles.formGroup}>
          <label style={ProductManagerStyles.label}>Название товара:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            placeholder="Название товара"
            style={ProductManagerStyles.input}
          />
        </div>

        <div style={ProductManagerStyles.formGroup}>
          <label style={ProductManagerStyles.label}>Цена:</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            required
            placeholder="Цена"
            style={ProductManagerStyles.input}
          />
        </div>

        <div style={ProductManagerStyles.formGroup}>
          <label style={ProductManagerStyles.label}>Описание:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Описание"
            style={ProductManagerStyles.textarea}
          />
        </div>

        <div style={ProductManagerStyles.formGroup}>
          <label style={ProductManagerStyles.label}>Выберите категорию:</label>
          <select
            name="category_id"
            value={formData.category_id}
            onChange={handleInputChange}
            required
            style={ProductManagerStyles.select}
          >
            <option value="">Выберите категорию</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div style={ProductManagerStyles.formGroup}>
          <label style={ProductManagerStyles.label}>
            Изображения товара:{" "}
            {formData.media.length > 0 && (
              <span>Выбрано файлов: {formData.media.length}</span>
            )}
          </label>
          <input
            type="file"
            onChange={handleImageChange}
            multiple
            style={ProductManagerStyles.input}
          />
        </div>

        <div
          style={
            ProductManagerStyles.previewContainer || {
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
            }
          }
        >
          {previewImages.map((image: string, index: number) => (
            <div key={index} style={ProductManagerStyles.imageContainer}>
              <button
                type="button"
                style={ProductManagerStyles.deleteImageButton}
                onClick={() => handleRemoveImage(index)}
                title="Удалить изображение"
              >
                ✕
              </button>
              <img
                src={image}
                alt={`Preview ${index}`}
                style={ProductManagerStyles.previewImage}
              />
            </div>
          ))}
        </div>

        <button
          type="submit"
          disabled={loading}
          style={ProductManagerStyles.button}
        >
          Добавить товар
        </button>
      </form>

      {/* Список товаров */}
      <div style={ProductManagerStyles.productList}>
        {products.map((p) => (
          <div key={p.id} style={ProductManagerStyles.productItem}>
            {editingProductId === p.id ? (
              /* Форма редактирования товара */
              <div>
                <div>
                  <h3>Название:</h3>
                  <input
                    type="text"
                    value={editingProductData.name}
                    onChange={(e) =>
                      setEditingProductData((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                    style={ProductManagerStyles.input}
                  />
                </div>
                <div>
                  <h3>Описание:</h3>
                  <textarea
                    value={editingProductData.description}
                    onChange={(e) =>
                      setEditingProductData((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    style={ProductManagerStyles.textarea}
                  />
                </div>
                <div>
                  <h3>Цена:</h3>
                  <input
                    type="number"
                    value={editingProductData.price}
                    onChange={(e) =>
                      setEditingProductData((prev) => ({
                        ...prev,
                        price: e.target.value,
                      }))
                    }
                    style={ProductManagerStyles.input}
                  />
                </div>
                <div>
                  <h3>Категория:</h3>
                  <select
                    value={editingProductData.category_id}
                    onChange={(e) =>
                      setEditingProductData((prev) => ({
                        ...prev,
                        category_id: e.target.value,
                      }))
                    }
                    style={ProductManagerStyles.select}
                  >
                    <option value="">Выберите категорию</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <h3>Изображения:</h3>
                  <p>Текущие изображения: {originalMediaPaths.length}</p>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    multiple
                    style={ProductManagerStyles.input}
                  />

                  <div
                    style={
                      ProductManagerStyles.previewContainer || {
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "10px",
                      }
                    }
                  >
                    {editingPreviewImages.map((image, index) => (
                      <div
                        key={index}
                        style={ProductManagerStyles.imageContainer}
                      >
                        <button
                          type="button"
                          style={ProductManagerStyles.deleteImageButton}
                          onClick={() => handleRemoveEditImage(index)}
                          title="Удалить изображение"
                        >
                          ✕
                        </button>
                        <img
                          src={image}
                          alt={`Preview ${index}`}
                          style={ProductManagerStyles.previewImage}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ marginTop: "20px" }}>
                  <button
                    onClick={handleSaveProduct}
                    style={ProductManagerStyles.button}
                  >
                    Сохранить
                  </button>
                  <button
                    onClick={() => setEditingProductId(null)}
                    style={{
                      ...ProductManagerStyles.button,
                      marginLeft: "10px",
                      backgroundColor: "#888",
                    }}
                  >
                    Отмена
                  </button>
                </div>
              </div>
            ) : (
              /* Отображение информации о товаре */
              <div>
                <div>
                  <h3>Название:</h3>
                  <p>{p.name}</p>
                </div>
                <div>
                  <h3>Описание:</h3>
                  <p>{p.description}</p>
                </div>
                <div>
                  <h3>Цена:</h3>
                  <span>{p.price} руб.</span>
                </div>

                <h3>Изображения:</h3>
                <div
                  style={
                    ProductManagerStyles.previewContainer || {
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "10px",
                    }
                  }
                >
                  {p.media &&
                    p.media.map((image, index) => (
                      <img
                        key={index}
                        src={
                          typeof image === "string"
                            ? getImageUrl(image)
                            : URL.createObjectURL(image)
                        }
                        alt={`Image ${index + 1}`}
                        style={ProductManagerStyles.previewImage}
                      />
                    ))}
                </div>

                <div style={{ marginTop: "15px" }}>
                  <button
                    onClick={() => handleEditProduct(p)}
                    style={ProductManagerStyles.button}
                  >
                    Редактировать
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(p.id)}
                    style={ProductManagerStyles.deleteButton}
                  >
                    Удалить
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductManager;
