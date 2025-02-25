import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../api/userAPI";
import { AxiosError } from "axios";
import {
  LoginContainer,
  FormWrapper,
  Title,
  FormGroup,
  Label,
  Input,
  SubmitButton,
  AlertBox,
} from "./AdminLogin.style";

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await loginUser(email, password);
      localStorage.setItem("access_token", response.access_token);
      localStorage.setItem("refresh_token", response.refresh_token);
      navigate("/admin");
    } catch (err) {
      const axiosError = err as AxiosError<{ detail?: string }>;
      setError(axiosError.response?.data?.detail || "Ошибка входа.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginContainer>
      <FormWrapper>
        <Title>Вход в панель администратора</Title>
        {error && <AlertBox>{error}</AlertBox>}
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="password">Пароль</Label>
            <Input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </FormGroup>
          <SubmitButton type="submit" disabled={loading}>
            {loading ? "Вход..." : "Войти"}
          </SubmitButton>
        </form>
      </FormWrapper>
    </LoginContainer>
  );
};

export default AdminLogin;
