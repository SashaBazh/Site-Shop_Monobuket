// src/pages/Admin/AdminDashboard.tsx
import React, { useEffect, useState } from "react";
import {
  getCategories,
  createCategory,
  deleteCategory,
  getProductsAll,
  createProduct,
  deleteProduct,
  updateProduct,
} from "../../api/adminAPI";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Alert,
  Box,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Button,
  TextField,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from "@mui/material";
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  Add as AddIcon,
} from "@mui/icons-material";

export default function AdminDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [categories, setCategories] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Для формы добавления категории
  const [newCategoryName, setNewCategoryName] = useState("");

  // Для формы добавления товара
  const [newProductData, setNewProductData] = useState({
    name: "",
    price: "",
    categoryId: "",
    description: "",
    files: [] as File[],
  });

  // Для редактирования товара
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<any>(null);
  const [editProductData, setEditProductData] = useState({
    name: "",
    price: "",
  });

  // Загрузить категории + товары
  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      setError(null);

      const catRes = await getCategories();
      setCategories(catRes);

      const prodRes = await getProductsAll();
      setProducts(prodRes);
    } catch (err: any) {
      setError(err.message || "Ошибка при загрузке данных");
    }
  }

  // === CATEGORY CRUD ===
  async function handleCreateCategory(e: React.FormEvent) {
    e.preventDefault();
    if (!newCategoryName.trim()) return;

    try {
      await createCategory({ name: newCategoryName.trim() });
      setNewCategoryName("");
      await loadData();
    } catch (err: any) {
      alert("Ошибка при создании категории: " + err.message);
    }
  }

  async function handleDeleteCategory(catId: number) {
    if (!window.confirm("Удалить категорию?")) return;
    try {
      await deleteCategory(catId);
      await loadData();
    } catch (err: any) {
      alert("Ошибка при удалении категории: " + err.message);
    }
  }

  // === PRODUCT CRUD ===
  // Добавить товар
  async function handleCreateProduct(e: React.FormEvent) {
    e.preventDefault();

    // Проверка полей
    if (
      !newProductData.name.trim() ||
      !newProductData.price ||
      !newProductData.categoryId
    ) {
      alert("Пожалуйста, заполните все обязательные поля.");
      return;
    }

    // Собираем FormData
    const formData = new FormData();
    const productPayload = {
      category_id: Number(newProductData.categoryId),
      name: newProductData.name.trim(),
      price: Number(newProductData.price),
      description: newProductData.description.trim(),
    };

    formData.append("product_data", JSON.stringify(productPayload));

    for (const file of newProductData.files) {
      formData.append("files", file);
    }

    try {
      await createProduct(formData);
      setNewProductData({
        name: "",
        price: "",
        categoryId: "",
        description: "",
        files: [],
      });
      await loadData();
    } catch (err: any) {
      alert("Ошибка при создании товара: " + err.message);
    }
  }

  // Удалить товар
  async function handleDeleteProduct(productId: number) {
    if (!window.confirm("Удалить товар?")) return;
    try {
      await deleteProduct(productId);
      await loadData();
    } catch (err: any) {
      alert("Ошибка при удалении товара: " + err.message);
    }
  }

  // Открыть диалог редактирования
  function openEditDialog(prod: any) {
    setCurrentProduct(prod);
    setEditProductData({
      name: prod.name,
      price: String(prod.price),
    });
    setEditDialogOpen(true);
  }

  // Закрыть диалог редактирования
  function closeEditDialog() {
    setEditDialogOpen(false);
    setCurrentProduct(null);
  }

  // Редактировать товар
  async function handleEditProduct() {
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
        id: currentProduct.id,
        name: editProductData.name.trim(),
        price: Number(editProductData.price),
      };
      formData.append("product_data", JSON.stringify(productPayload));

      await updateProduct(formData);
      await loadData();
      closeEditDialog();
    } catch (err: any) {
      alert("Ошибка при обновлении товара: " + err.message);
    }
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Админ-панель
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* Секция категорий */}
      <Box sx={{ mb: 5 }}>
        <Typography variant="h5" gutterBottom>
          Категории
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Название</TableCell>
                <TableCell align="right">Действия</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categories.map((cat) => (
                <TableRow key={cat.id}>
                  <TableCell>{cat.id}</TableCell>
                  <TableCell>{cat.name}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      color="error"
                      onClick={() => handleDeleteCategory(cat.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {categories.length === 0 && (
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    Категорий нет
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <Box component="form" onSubmit={handleCreateCategory} sx={{ mt: 3 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={9}>
              <TextField
                fullWidth
                label="Новая категория"
                variant="outlined"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <Button
                type="submit"
                variant="contained"
                startIcon={<AddIcon />}
                fullWidth
              >
                Создать категорию
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>

      {/* Секция товаров */}
      <Box sx={{ mb: 5 }}>
        <Typography variant="h5" gutterBottom>
          Товары
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Категория</TableCell>
                <TableCell>Название</TableCell>
                <TableCell>Цена</TableCell>
                <TableCell align="right">Действия</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((prod) => (
                <TableRow key={prod.id}>
                  <TableCell>{prod.id}</TableCell>
                  <TableCell>{prod.category_id}</TableCell>
                  <TableCell>{prod.name}</TableCell>
                  <TableCell>{prod.price} руб.</TableCell>
                  <TableCell align="right">
                    <IconButton
                      color="primary"
                      onClick={() => openEditDialog(prod)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDeleteProduct(prod.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {products.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    Товаров нет
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <Box component="form" onSubmit={handleCreateProduct} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Название"
                variant="outlined"
                value={newProductData.name}
                onChange={(e) =>
                  setNewProductData({ ...newProductData, name: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                required
                fullWidth
                type="number"
                label="Цена"
                variant="outlined"
                value={newProductData.price}
                onChange={(e) =>
                  setNewProductData({ ...newProductData, price: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                required
                fullWidth
                type="number"
                label="Категория (ID)"
                variant="outlined"
                value={newProductData.categoryId}
                onChange={(e) =>
                  setNewProductData({
                    ...newProductData,
                    categoryId: e.target.value,
                  })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Описание"
                variant="outlined"
                multiline
                rows={4}
                value={newProductData.description}
                onChange={(e) =>
                  setNewProductData({
                    ...newProductData,
                    description: e.target.value,
                  })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" component="label">
                Загрузить файлы
                <input
                  type="file"
                  hidden
                  multiple
                  onChange={(e) => {
                    const files = e.target.files ? Array.from(e.target.files) : [];
                    setNewProductData({ ...newProductData, files });
                  }}
                />
              </Button>
              {newProductData.files.length > 0 && (
                <Typography variant="body2" sx={{ mt: 1 }}>
                  {newProductData.files.length} файл(а) выбрано
                </Typography>
              )}
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Создать товар
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>

      {/* Диалог редактирования товара */}
      <Dialog open={editDialogOpen} onClose={closeEditDialog} fullWidth maxWidth="sm">
        <DialogTitle>Редактировать товар</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Название"
                  variant="outlined"
                  value={editProductData.name}
                  onChange={(e) =>
                    setEditProductData({ ...editProductData, name: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  type="number"
                  label="Цена"
                  variant="outlined"
                  value={editProductData.price}
                  onChange={(e) =>
                    setEditProductData({ ...editProductData, price: e.target.value })
                  }
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeEditDialog} color="secondary">
            Отмена
          </Button>
          <Button onClick={handleEditProduct} variant="contained" color="primary">
            Сохранить
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
