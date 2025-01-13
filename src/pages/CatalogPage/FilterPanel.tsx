// src/components/Filters/Filters.tsx
import React from "react";
import { Box, Menu, MenuItem, IconButton, Tooltip } from "@mui/material";
import { styled } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import SortIcon from "@mui/icons-material/Sort";
import CategoryIcon from "@mui/icons-material/Category";

interface FiltersProps {
  searchValue: string;
  setSearchValue: (value: string) => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  sortBy: string;
  setSortBy: (value: string) => void;
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
}

const FiltersContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(2),
  padding: theme.spacing(0, 2),
  flexWrap: "wrap",
}));

const SearchBox = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  backgroundColor: "#ffffff",
  borderRadius: theme.shape.borderRadius * 2,
  padding: theme.spacing(0.5, 1),
  flex: 1,
  minWidth: 200,
}));

const SearchInput = styled("input")(({ theme }) => ({
  border: "none",
  outline: "none",
  flex: 1,
  paddingLeft: theme.spacing(1),
}));

const Filters: React.FC<FiltersProps> = ({
  searchValue,
  setSearchValue,
  priceRange,
  setPriceRange,
  sortBy,
  setSortBy,
  selectedCategory,
  setSelectedCategory,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [menuType, setMenuType] = React.useState<"price" | "sort" | "category">();

  const open = Boolean(anchorEl);

  const handleMenuOpen = (type: "price" | "sort" | "category") => (
    event: React.MouseEvent<HTMLElement>
  ) => {
    setAnchorEl(event.currentTarget);
    setMenuType(type);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuType(undefined);
  };

  const handleMenuItemClick = (value: string) => {
    if (menuType === "price") {
      const [minStr, maxStr] = value.split("-");
      setPriceRange([Number(minStr), Number(maxStr)]);
    } else if (menuType === "sort") {
      setSortBy(value);
    } else if (menuType === "category") {
      setSelectedCategory(value);
    }
    handleMenuClose();
  };

  const priceOptions = [
    { label: "0-9999 руб.", value: "0-9999" },
    { label: "70-120 руб.", value: "70-120" },
    { label: "120-300 руб.", value: "120-300" },
  ];

  const sortOptions = [
    { label: "По возрастанию цены", value: "priceAsc" },
    { label: "По убыванию цены", value: "priceDesc" },
  ];

  const bouquetTypes = [
    "Букеты",
    "Сезонные",
    "Композиции",
    "Стабилизированные",
    "Стаканчики с цветами",
    "Монобукеты",
  ];

  return (
    <FiltersContainer>
      {/* Строка поиска */}
      <SearchBox>
        <SearchIcon />
        <SearchInput
          type="text"
          placeholder="Поиск..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </SearchBox>

      {/* Фильтр по цене */}
      <Tooltip title="Фильтр по цене">
        <IconButton onClick={handleMenuOpen("price")} color="primary">
          <FilterListIcon />
        </IconButton>
      </Tooltip>

      {/* Сортировка */}
      <Tooltip title="Сортировка">
        <IconButton onClick={handleMenuOpen("sort")} color="primary">
          <SortIcon />
        </IconButton>
      </Tooltip>

      {/* Фильтр по категориям */}
      <Tooltip title="Фильтр по категориям">
        <IconButton onClick={handleMenuOpen("category")} color="primary">
          <CategoryIcon />
        </IconButton>
      </Tooltip>

      {/* Меню фильтров */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        {menuType === "price" &&
          priceOptions.map((option) => (
            <MenuItem
              key={option.value}
              selected={`${priceRange[0]}-${priceRange[1]}` === option.value}
              onClick={() => handleMenuItemClick(option.value)}
            >
              {option.label}
            </MenuItem>
          ))}

        {menuType === "sort" &&
          sortOptions.map((option) => (
            <MenuItem
              key={option.value}
              selected={sortBy === option.value}
              onClick={() => handleMenuItemClick(option.value)}
            >
              {option.label}
            </MenuItem>
          ))}

        {menuType === "category" &&
          bouquetTypes.map((type) => (
            <MenuItem
              key={type}
              selected={selectedCategory === type}
              onClick={() => handleMenuItemClick(type)}
            >
              {type}
            </MenuItem>
          ))}
      </Menu>
    </FiltersContainer>
  );
};

export default Filters;
