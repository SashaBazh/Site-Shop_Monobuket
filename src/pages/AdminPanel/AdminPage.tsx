// src/pages/Admin/AdminPage.tsx
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import CategoryManager from "./CategoryManager";
import ProductManager from "./ProductManager";

export default function AdminPage() {
  return (
    <Container className="mt-4">
      <h2>Админ-панель</h2>
      <p>Добро пожаловать в административную панель.</p>
      <hr />

      <Row>
        <Col md={6}>
          <CategoryManager />
        </Col>
        <Col md={6}>
          <ProductManager />
        </Col>
      </Row>
    </Container>
  );
}
