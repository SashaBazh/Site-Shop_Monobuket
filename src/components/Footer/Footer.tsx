import React from "react";
import { Box, Link as MuiLink, Typography, useMediaQuery } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom"; // Используем Link из react-router-dom
import telegramIcon from "../../assets/icons/telegram.svg";
import instagramIcon from "../../assets/icons/instagram.svg";
import emailIcon from "../../assets/icons/email.svg";

const FooterContainer = styled(Box)(({ theme }) => ({
  backgroundColor: "#000000", // Цвет фона
  color: "#fff", // Цвет текста
  padding: theme.spacing(4, 2), // Отступы
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(4), // Расстояние между секциями
}));

const FooterTop = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  gap: theme.spacing(4),
  flexWrap: "wrap", // Перенос при маленьком экране
   filter: 'invert(1)'
}));

const Logo = styled("img")(({ theme }) => ({
  height: "40px", // Размер логотипа
  cursor: "pointer", // Указатель
}));

const NavLink = styled(Link)(({ theme }) => ({
  display: "block",
  color: "#fff",
  textDecoration: "none",
  marginBottom: theme.spacing(1),
  "&:hover": {
    color: theme.palette.primary.main,
  },
}));

const SocialIconsContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(2), // Расстояние между иконками
}));

const SocialIcon = styled("img")(({ theme }) => ({
  width: "24px",
  height: "24px",
  cursor: "pointer",
}));

const FooterBottom = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  flexWrap: "wrap",
  fontSize: "14px",
  color: "#ccc", // Цвет текста нижней части
   filter: 'invert(1)'
}));

const Footer: React.FC = () => {
  const isMobile = useMediaQuery("(max-width:600px)");
  const navigate = useNavigate();

  // Прокрутка вверх при клике
  const handleNavigation = (path: string) => {
    navigate(path); // Переход на указанную страницу
    window.scrollTo(0, 0); // Прокрутка наверх
  };

  return (
    <FooterContainer>
      <FooterTop>
        {/* Логотип и контакты */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <Logo
            src="../../assets/images/logo2.png"
            alt="logo"
            onClick={() => handleNavigation("/")} // Переход на главную
          />
          <div>Адрес: г. Москва, ул. Цветочная, д.1</div>
          <div>Тел: +7 (999) 123-45-67</div>
        </Box>

        {/* Навигация */}
        <Box>
          <Typography
            onClick={() => handleNavigation("/about")}
            sx={{
              color: "#fff",
              textDecoration: "none",
              cursor: "pointer",
              marginBottom: "8px",
              "&:hover": {
                color: "#ccc",
              },
            }}
          >
            О нас
          </Typography>
          <Typography
            onClick={() => handleNavigation("/payment-delivery")}
            sx={{
              color: "#fff",
              textDecoration: "none",
              cursor: "pointer",
              marginBottom: "8px",
              "&:hover": {
                color: "#ccc",
              },
            }}
          >
            Оплата и доставка
          </Typography>
          <Typography
            onClick={() => handleNavigation("/contacts")}
            sx={{
              color: "#fff",
              textDecoration: "none",
              cursor: "pointer",
              marginBottom: "8px",
              "&:hover": {
                color: "#ccc",
              },
            }}
          >
            Контакты
          </Typography>
          <Typography
            onClick={() => handleNavigation("/catalog")}
            sx={{
              color: "#fff",
              textDecoration: "none",
              cursor: "pointer",
              marginBottom: "8px",
              "&:hover": {
                color: "#ccc",
              },
            }}
          >
            Каталог
          </Typography>
        </Box>

        {/* Соц. сети */}
        <SocialIconsContainer>
          <MuiLink
            href="https://t.me/Mariya_Kovyrshina"
            target="_blank"
            rel="noopener noreferrer"
          >
            <SocialIcon src={telegramIcon} alt="telegram" />
          </MuiLink>
          <MuiLink
            href="https://www.instagram.com/monobuket_by_mk/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <SocialIcon src={instagramIcon} alt="instagram" />
          </MuiLink>
          <MuiLink
            href="mailto:youremail@example.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <SocialIcon src={emailIcon} alt="email" />
          </MuiLink>
        </SocialIconsContainer>
      </FooterTop>

      {/* Нижняя часть */}
      <FooterBottom>
        <div>© Все права защищены</div>
        <div>
          <MuiLink href="/privacy-policy" style={{ color: "#ccc", textDecoration: "none" }}>
            Политика конфиденциальности
          </MuiLink>{" "}
          |{" "}
          <MuiLink href="/terms" style={{ color: "#ccc", textDecoration: "none" }}>
            Условия использования
          </MuiLink>
        </div>
      </FooterBottom>
    </FooterContainer>
  );
};

export default Footer;
