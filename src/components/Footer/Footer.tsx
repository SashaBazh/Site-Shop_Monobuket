import React from "react";
import { Box, Link as MuiLink, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  footerContainer,
  footerTop,
  logoStyle,
  navLinkStyle,
  socialIconsContainer,
  socialIconStyle,
  footerBottom,
} from "./Footer.styles";

const Footer: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
    window.scrollTo(0, 0);
  };

  return (
    <Box sx={footerContainer}>
      <Box sx={footerTop}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <Box
            component="img"
            src="/assets/images/logo2.png"
            alt="logo"
            sx={logoStyle}
            onClick={() => handleNavigation("/")}
          />
          <div>Адрес: г.Минск, ул.Леонида Беды 46 Тц 4 сезона</div>
          <div>Тел: +375336029359</div>
        </Box>

        <Box>
          <Typography
            onClick={() => handleNavigation("/about")}
            sx={navLinkStyle}
          >
            О нас
          </Typography>
          <Typography
            onClick={() => handleNavigation("/payment-delivery")}
            sx={navLinkStyle}
          >
            Оплата и доставка
          </Typography>
          <Typography
            onClick={() => handleNavigation("/contacts")}
            sx={navLinkStyle}
          >
            Контакты
          </Typography>
          <Typography
            onClick={() => handleNavigation("/catalog")}
            sx={navLinkStyle}
          >
            Каталог
          </Typography>
        </Box>

        <Box sx={socialIconsContainer}>
          <MuiLink
            href="https://t.me/Mariya_Kovyrshina"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Box
              component="img"
              src="/assets/icons/telegram.svg"
              alt="telegram"
              sx={socialIconStyle}
            />
          </MuiLink>
          <MuiLink
            href="https://www.instagram.com/monobuket_by_mk/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Box
              component="img"
              src="/assets/icons/instagram.svg"
              alt="instagram"
              sx={socialIconStyle}
            />
          </MuiLink>
          <MuiLink
            href="mailto:youremail@example.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Box
              component="img"
              src="/assets/icons/email.svg"
              alt="email"
              sx={socialIconStyle}
            />
          </MuiLink>
        </Box>
      </Box>

      <Box sx={footerBottom}>
        <div>© Все права защищены</div>
        <div>
          <MuiLink
            href="/privacy-policy"
            sx={{ color: "#ccc", textDecoration: "none" }}
          >
            Политика конфиденциальности
          </MuiLink>{" "}
          |{" "}
          <MuiLink href="/terms" sx={{ color: "#ccc", textDecoration: "none" }}>
            Условия использования
          </MuiLink>
        </div>
      </Box>
    </Box>
  );
};

export default Footer;
