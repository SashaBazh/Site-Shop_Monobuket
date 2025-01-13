// src/pages/Login/LoginPage.tsx

import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { Box, Typography, TextField, Button, Alert } from "@mui/material";
import { styled } from "@mui/system";

const LoginContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "80vh",
  backgroundColor: "#dcc7bd",
  padding: theme.spacing(4),
}));

const LoginBox = styled(Box)(({ theme }) => ({
  backgroundColor: "#E2DCD3",
  padding: theme.spacing(4),
  borderRadius: 8,
  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  width: "100%",
  maxWidth: "400px",
}));

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    try {
      await login(email, password);
      // Если всё ок — navigate("/") внутри login
    } catch (err) {
      setError("Неверный email или пароль, либо 404 (Нет /auth) на бэке.");
    }
  }

  return (
    <LoginContainer>
      <LoginBox>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Вход
        </Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            required
            sx={{ mb: 2 }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Пароль"
            type="password"
            variant="outlined"
            fullWidth
            required
            sx={{ mb: 2 }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button variant="contained" fullWidth type="submit">
            Войти
          </Button>
        </form>

        <Typography variant="body2" sx={{ mt: 2 }}>
          Нет аккаунта? <Link to="/register">Зарегистрироваться</Link>
        </Typography>
      </LoginBox>
    </LoginContainer>
  );
}
