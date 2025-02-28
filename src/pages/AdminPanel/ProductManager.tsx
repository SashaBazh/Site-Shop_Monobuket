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
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  // Состояния для поиска и фильтрации
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

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
  const [originalMediaPaths, setOriginalMediaPaths] = useState<string[]>([]);
  const [originalProductData, setOriginalProductData] =
    useState<Product | null>(null);
  const [media, setMedia] = useState<File[]>([]);

  // Загрузка данных
  const fetchData = async () => {
    try {
      setLoading(true);
      const [productsData, categoriesData] = await Promise.all([
        getProductsAll(),
        getCategories(),
      ]);
      setProducts(productsData);
      setFilteredProducts(productsData);
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

  // Фильтрация товаров при изменении поисковых параметров
  useEffect(() => {
    let result = products;

    // Фильтр по названию
    if (searchTerm) {
      result = result.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Фильтр по категории
    if (categoryFilter) {
      result = result.filter(
        (product) => product.category_id.toString() === categoryFilter
      );
    }

    setFilteredProducts(result);
  }, [searchTerm, categoryFilter, products]);

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
    setOriginalProductData(product);

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

    // Сбрасываем состояние медиа файлов
    setMedia([]);
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

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);
      setMedia(files);

      // // Добавляем превью для новых файлов
      // const newPreviews = files.map(file => URL.createObjectURL(file));
      // setEditingPreviewImages(prev => [...originalMediaPaths.map(path => getImageUrl(path)), ...newPreviews]);
    }
  };

  const handleSaveProduct = async () => {
    if (!originalProductData) return;

    try {
      setLoading(true);

      // Подготавливаем только измененные данные
      const changedFields: Partial<ProductUpdateData> = {
        id: editingProductId,
      };

      // Проверяем каждое поле на изменения
      if (editingProductData.name !== originalProductData.name) {
        changedFields.name = editingProductData.name;
      }

      if (editingProductData.price !== originalProductData.price.toString()) {
        changedFields.price = editingProductData.price;
      }

      if (editingProductData.description !== originalProductData.description) {
        changedFields.description = editingProductData.description;
      }

      if (
        editingProductData.category_id !==
        originalProductData.category_id.toString()
      ) {
        changedFields.category_id = editingProductData.category_id;
      }

      // Проверяем изменения в медиа-файлах
      const mediaChanged =
        originalMediaPaths.length !== originalProductData.media.length ||
        media.length > 0;

      // Если медиа изменились, добавляем их
      if (mediaChanged) {
        changedFields.media = media;
      }

      console.log("Измененные поля:", changedFields);

      const submitFormData = new FormData();
      submitFormData.append("product_data", JSON.stringify(changedFields));

      // Добавляем новые файлы только если они есть
      if (mediaChanged) {
        media.forEach((file) => {
          submitFormData.append("files", file);
        });
      }

      await updateProduct(submitFormData);
      setNotification({ message: "Товар успешно обновлен!", type: "success" });
      fetchData();
      setEditingProductId(null);
      setOriginalProductData(null);
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

  // Получить имя категории по ID
  const getCategoryName = (categoryId: number | string) => {
    const category = categories.find(
      (c) => c.id.toString() === categoryId.toString()
    );
    return category ? category.name : "Неизвестная категория";
  };

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

        <div style={ProductManagerStyles.previewContainer}>
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

      {/* Поиск и фильтрация товаров */}
      <div style={ProductManagerStyles.filterContainer}>
        <div style={ProductManagerStyles.filterItem}>
          <label style={ProductManagerStyles.filterLabel}>
            Поиск по названию:
          </label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Введите название товара"
            style={ProductManagerStyles.input}
          />
        </div>
        <div style={ProductManagerStyles.filterItem}>
          <label style={ProductManagerStyles.filterLabel}>
            Фильтр по категории:
          </label>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            style={ProductManagerStyles.select}
          >
            <option value="">Все категории</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Список товаров */}
      <div style={ProductManagerStyles.productList}>
        {filteredProducts.length === 0 && (
          <p style={ProductManagerStyles.emptyMessage}>Товары не найдены</p>
        )}

        {filteredProducts.map((p) => (
          <div key={p.id} style={ProductManagerStyles.productCard}>
            {editingProductId === p.id ? (
              /* Форма редактирования товара */
              <div>
                <div style={ProductManagerStyles.editFormRow}>
                  <div style={ProductManagerStyles.editFormField}>
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

                  <div style={ProductManagerStyles.editFormField}>
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

                  <div style={ProductManagerStyles.editFormField}>
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
                </div>

                <div style={ProductManagerStyles.editFormSection}>
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

                <div style={ProductManagerStyles.editFormSection}>
                  <h3>Изображения:</h3>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    multiple
                    style={ProductManagerStyles.input}
                  />

                  <div style={ProductManagerStyles.previewContainer}>
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

                <div style={ProductManagerStyles.buttonGroup}>
                  <button
                    onClick={handleSaveProduct}
                    style={ProductManagerStyles.button}
                  >
                    Сохранить
                  </button>
                  <button
                    onClick={() => {
                      setEditingProductId(null);
                      setOriginalProductData(null);
                    }}
                    style={ProductManagerStyles.cancelButton}
                  >
                    Отмена
                  </button>
                </div>
              </div>
            ) : (
              /* Отображение информации о товаре в одну строку */
              <div>
                <div style={ProductManagerStyles.productInfoRow}>
                  <div style={ProductManagerStyles.productInfoItem}>
                    <span style={ProductManagerStyles.productInfoLabel}>
                      Название:
                    </span>
                    <span style={ProductManagerStyles.productInfoValue}>
                      {p.name}
                    </span>
                  </div>

                  <div style={ProductManagerStyles.productInfoItem}>
                    <span style={ProductManagerStyles.productInfoLabel}>
                      Цена:
                    </span>
                    <span style={ProductManagerStyles.productInfoValue}>
                      {p.price} руб.
                    </span>
                  </div>

                  <div style={ProductManagerStyles.productInfoItem}>
                    <span style={ProductManagerStyles.productInfoLabel}>
                      Категория:
                    </span>
                    <span style={ProductManagerStyles.productInfoValue}>
                      {getCategoryName(p.category_id)}
                    </span>
                  </div>
                </div>

                <div style={ProductManagerStyles.productDescription}>
                  <span style={ProductManagerStyles.productInfoLabel}>
                    Описание:
                  </span>
                  <span style={ProductManagerStyles.productInfoValue}>
                    {p.description}
                  </span>
                </div>

                <div style={ProductManagerStyles.productImages}>
                  <span style={ProductManagerStyles.productInfoLabel}>
                    Изображения:
                  </span>
                  <div style={ProductManagerStyles.previewContainer}>
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
                </div>

                <div style={ProductManagerStyles.buttonGroup}>
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
