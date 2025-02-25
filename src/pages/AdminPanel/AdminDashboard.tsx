import React, { useEffect, useState } from "react";
import { useCategories } from "../../components/Admin/useCategories";
import { useProducts } from "../../components/Admin/useProducts";
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
import { Delete as DeleteIcon, Edit as EditIcon, Add as AddIcon } from "@mui/icons-material";

interface Category {
  id: number;
  name: string;
}

interface Product {
  id: number;
  category_id: number;
  name: string;
  price: number;
  description?: string;
}

export default function AdminDashboard() {
  const {
    categories,
    error: categoriesError,
    loadCategories,
    handleCreateCategory,
    handleDeleteCategory,
  } = useCategories();

  const {
    products,
    error: productsError,
    editDialogOpen,
    editProductData,
    loadProducts,
    handleCreateProduct,
    handleDeleteProduct,
    openEditDialog,
    closeEditDialog,
    handleEditProduct,
    setEditProductData,
  } = useProducts();

  const [newCategoryName, setNewCategoryName] = useState("");

  const [newProductData, setNewProductData] = useState({
    name: "",
    price: "",
    categoryId: "",
    description: "",
    files: [] as File[],
  });

  // Загрузить данные при монтировании
  useEffect(() => {
    loadCategories();
    loadProducts();
  }, [loadCategories, loadProducts]);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Админ-панель
      </Typography>

      {(categoriesError || productsError) && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {categoriesError || productsError}
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
              {categories.map((cat: Category) => (
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

        <Box
          component="form"
          onSubmit={(e) => {
            e.preventDefault();
            handleCreateCategory(newCategoryName);
          }}
          sx={{ mt: 3 }}
        >
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
              {products.map((prod: Product) => (
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

        <Box
          component="form"
          onSubmit={(e) => {
            e.preventDefault();
            handleCreateProduct(newProductData);
          }}
          sx={{ mt: 3 }}
        >
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