// src/pages/Admin/CategoryManager.tsx
import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import { Form, Button, Table } from "react-bootstrap";

interface Category {
  id: number;
  name: string;
  description?: string;
  image?: string;
}

export default function CategoryManager() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newName, setNewName] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    try {
      const res = await axiosInstance.get<Category[]>("/products/category");
      setCategories(res.data);
    } catch (err) {
      console.error("Ошибка при загрузке категорий", err);
    }
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!newName.trim()) return;

    try {
      // Подготовим данные
      const categoryData = { name: newName };
      const formData = new FormData();
      formData.append("category_data", JSON.stringify(categoryData));

      // Если нужно загрузить файл: formData.append("image", fileInput.files[0]);

      await axiosInstance.post("/products/categories", formData);
      setNewName("");
      fetchCategories();
    } catch (err) {
      console.error("Ошибка при создании категории:", err);
    }
  }

  async function handleDelete(id: number) {
    if (!window.confirm("Точно удалить категорию?")) return;
    try {
      await axiosInstance.delete(`/products/categories/${id}`);
      fetchCategories();
    } catch (err) {
      console.error("Ошибка при удалении категории:", err);
    }
  }

  return (
    <div>
      <h4>Управление категориями</h4>
      <Form onSubmit={handleCreate} className="d-flex mb-3" style={{ gap: "8px" }}>
        <Form.Control
          type="text"
          placeholder="Название категории"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <Button type="submit" variant="primary">
          Создать
        </Button>
      </Form>

      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>ID</th>
            <th>Название</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((cat) => (
            <tr key={cat.id}>
              <td>{cat.id}</td>
              <td>{cat.name}</td>
              <td>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(cat.id)}
                >
                  Удалить
                </Button>
                {/* Для редактирования (PUT /products/categories) можно сделать отдельный Modal */}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
