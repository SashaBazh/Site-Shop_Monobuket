// src/components/Header/SubHeader.tsx
import React, { useEffect } from "react";
import { Box, Link as MuiLink, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate, useLocation } from "react-router-dom";

interface CategoryItem {
  id: number;
  name: string;
}

const categories: CategoryItem[] = [
  { id: 1, name: "Букеты" },
  { id: 2, name: "Сезонные" },
  { id: 3, name: "Композиции" },
  { id: 4, name: "Стабилизированные" },
  { id: 5, name: "Стаканчики с цветами" },
  { id: 6, name: "Монобукеты" },
];

const SubHeaderContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: theme.spacing(4),
  padding: theme.spacing(1, 2), 
  backgroundColor: "#000000",
  [theme.breakpoints.down("md")]: {
    justifyContent: "space-between",
    gap: theme.spacing(2),
  },
}));

const FilterLink = styled(MuiLink)(({ theme }) => ({
  color: "#ffffff",
  textDecoration: "none",
  fontWeight: 300,
  
  fontSize: "1rem",
  cursor: "pointer",
  "&:hover": {
    color: theme.palette.primary.main,
  },
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

const StyledSelect = styled(Select)(({ theme }) => ({
  display: "none",
  color: "#ffffff",
  backgroundColor: "#000000",
  border: "none",
  borderRadius: theme.shape.borderRadius,
  "& .MuiSvgIcon-root": {
    color: "#ffffff",
    filter: "invert(1)",
  },
  "& .MuiSelect-select": {
    padding: theme.spacing(1),
    userSelect: "none",
    WebkitTapHighlightColor: "transparent",
    filter: "invert(1)",
  },
  [theme.breakpoints.down("md")]: {
    display: "block",
    width: "100%",
    maxWidth: 250,
    margin: "0 auto",
  },
}));

const SubHeader: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedCategory, setSelectedCategory] = React.useState<string>("");

  // Считываем категорию из URL при монтировании
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const cat = params.get("category") || "";
    setSelectedCategory(cat);
  }, [location.search]);

  function handleLinkClick(catName: string) {
    navigate(`/catalog?category=${encodeURIComponent(catName)}`);
  }

  function handleChange(e: SelectChangeEvent<string>) {
    const catName = e.target.value;
    setSelectedCategory(catName);
    navigate(`/catalog?category=${encodeURIComponent(catName)}`);
  }

  return (
    <SubHeaderContainer>
      {/* Ссылки для больших экранов */}
      {categories.map((cat) => (
        <FilterLink
          key={cat.id}
          component="button"
          onClick={() => handleLinkClick(cat.name)}
        >
          {cat.name}
        </FilterLink>
      ))}

      {/* Выпадающий список для мобильных */}
      <StyledSelect
        value={selectedCategory}
        onChange={handleChange}
        displayEmpty
        inputProps={{ "aria-label": "Фильтр по категориям" }}
      >
        <MenuItem value="" disabled>
          Выберите категорию
        </MenuItem>
        {categories.map((cat) => (
          <MenuItem key={cat.id} value={cat.name}>
            {cat.name}
          </MenuItem>
        ))}
      </StyledSelect>
    </SubHeaderContainer>
  );
};

export default SubHeader;
