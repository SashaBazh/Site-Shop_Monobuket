// src/pages/Admin/ProductManager.tsx
import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import { Form, Button, Table } from "react-bootstrap";

interface Product {
  id: number;
  name: string;
  price: number;
  category_id?: number;
  // ...
}

export default function ProductManager() {
  const [products, setProducts] = useState<Product[]>([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    try {
      // Возьмём все товары (category_id=0 => "все")
      const res = await axiosInstance.get<Product[]>("/products/category/0?limit=999");
      setProducts(res.data);
    } catch (err) {
      console.error("Ошибка при загрузке товаров:", err);
    }
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      const productData = {
        name,
        price,
        // category_id: ...
      };
      const formData = new FormData();
      formData.append("product_data", JSON.stringify(productData));
      // если есть картинки: formData.append("files", ...)

      await axiosInstance.post("/products", formData);
      setName("");
      setPrice(0);
      fetchProducts();
    } catch (err) {
      console.error("Ошибка при создании товара:", err);
    }
  }

  async function handleDelete(prodId: number) {
    if (!window.confirm("Точно удалить товар?")) return;
    try {
      await axiosInstance.delete(`/products/${prodId}`);
      fetchProducts();
    } catch (err) {
      console.error("Ошибка при удалении товара:", err);
    }
  }

  return (
    <div>
      <h4>Управление товарами</h4>
      <Form onSubmit={handleCreate} className="mb-3">
        <Form.Group className="mb-2">
          <Form.Label>Название товара</Form.Label>
          <Form.Control
            type="text"
            placeholder="Название"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Цена</Form.Label>
          <Form.Control
            type="number"
            placeholder="Цена"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Создать
        </Button>
      </Form>

      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>ID</th>
            <th>Название</th>
            <th>Цена</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {products.map((prod) => (
            <tr key={prod.id}>
              <td>{prod.id}</td>
              <td>{prod.name}</td>
              <td>{prod.price}</td>
              <td>
                <Button variant="danger" size="sm" onClick={() => handleDelete(prod.id)}>
                  Удалить
                </Button>
                {/* Редактирование можно сделать аналогично */}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
