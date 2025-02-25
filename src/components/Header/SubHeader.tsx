import React, { useEffect } from "react";
import { MenuItem, SelectChangeEvent, Button } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { CategoryItem } from "../../types/Header.types";
import {
  SubHeaderContainer,
  StyledSelect,
  ButtonWrapper,
  SelectWrapper,
} from "./SubHeader.styles";

const categories: CategoryItem[] = [
  { id: 1, name: "Букеты" },
  { id: 2, name: "Сезонные" },
  { id: 3, name: "Композиции" },
  { id: 4, name: "Стабилизированные" },
  { id: 5, name: "Стаканчики с цветами" },
  { id: 6, name: "Монобукеты" },
];

const SubHeader: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedCategory, setSelectedCategory] = React.useState<string>("");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const cat = params.get("category") || "";
    setSelectedCategory(cat);
  }, [location.search]);

  function handleLinkClick(catName: string) {
    navigate(`/catalog?category=${encodeURIComponent(catName)}`);
  }

  function handleChange(e: SelectChangeEvent<unknown>) {
    const catName = e.target.value as string;
    setSelectedCategory(catName);
    navigate(`/catalog?category=${encodeURIComponent(catName)}`);
  }

  return (
    <SubHeaderContainer>
      <ButtonWrapper>
        {categories.map((cat) => (
          <Button key={cat.id} onClick={() => handleLinkClick(cat.name)}>
            {cat.name}
          </Button>
        ))}
      </ButtonWrapper>

      <SelectWrapper>
        <StyledSelect
          value={selectedCategory}
          onChange={handleChange}
          displayEmpty
          renderValue={(selected) => {
            return selected ? String(selected) : "Выберите категорию";
          }}
          inputProps={{ "aria-label": "Фильтр по категориям" }}
        >
          {categories.map((cat) => (
            <MenuItem key={cat.id} value={cat.name}>
              {cat.name}
            </MenuItem>
          ))}
        </StyledSelect>
      </SelectWrapper>
    </SubHeaderContainer>
  );
};

export default SubHeader;
