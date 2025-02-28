import React, { useState, useEffect } from "react";
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Button,
  Chip,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import LocalFloristIcon from "@mui/icons-material/LocalFlorist";

import {
  FilterPanelProps,
  PriceOption,
  SortOption,
} from "../../types/Filters.types";
import { getCategories } from "../../api/adminAPI";
import {
  filterPanelContainer,
  searchBox,
  searchInput,
  filterControlsContainer,
  filterIconsContainer,
  clearFiltersButton,
  activeFiltersContainer,
} from "./FilterPanel.styles";

const priceOptions: PriceOption[] = [
  { label: "0-9999 руб.", value: "0-9999" },
  { label: "700-1200 руб.", value: "700-1200" },
  { label: "120-300 руб.", value: "120-300" },
];

const sortOptions: SortOption[] = [
  { label: "По возрастанию цены", value: "по возрастанию" },
  { label: "По убыванию цены", value: "по убыванию" },
];

const FilterPanel: React.FC<FilterPanelProps> = ({
  searchValue,
  onSearchChange,
  priceRange,
  onPriceRangeChange,
  sortBy,
  onSortByChange,
  selectedCategory,
  onCategoryChange,
  onClearFilters,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [menuType, setMenuType] = useState<"price" | "sort" | "category">();
  const [categories, setCategories] = useState<{ id: number; name: string }[]>(
    []
  );

  const open = Boolean(anchorEl);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error("Ошибка при загрузке категорий:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleMenuOpen =
    (type: "price" | "sort" | "category") =>
    (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
      setMenuType(type);
    };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuType(undefined);
  };

  const handleMenuItemClick = (value: string | number) => {
    if (menuType === "price") {
      const [minStr, maxStr] = value.toString().split("-");
      onPriceRangeChange([Number(minStr), Number(maxStr)]);
    } else if (menuType === "sort") {
      onSortByChange(value.toString());
    } else if (menuType === "category") {
      onCategoryChange(Number(value));
    }
    handleMenuClose();
  };

  return (
    <>
      <Box sx={filterPanelContainer}>
        <Box sx={searchBox}>
          <SearchIcon fontSize="small" sx={{ ml: 1.5 }} />
          <TextField
            variant="outlined"
            placeholder="Поиск..."
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            sx={searchInput}
          />
        </Box>

        <Box sx={filterControlsContainer}>
          <Box sx={filterIconsContainer}>
            <Tooltip title="Фильтр по цене">
              <IconButton
                onClick={handleMenuOpen("price")}
                color="primary"
                size="small"
              >
                <AttachMoneyIcon fontSize="small" />
              </IconButton>
            </Tooltip>

            <Tooltip title="Сортировка">
              <IconButton
                onClick={handleMenuOpen("sort")}
                color="primary"
                size="small"
              >
                <ArrowDownwardIcon fontSize="small" />
              </IconButton>
            </Tooltip>

            <Tooltip title="Фильтр по категориям">
              <IconButton
                onClick={handleMenuOpen("category")}
                color="primary"
                size="small"
              >
                <LocalFloristIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>

          <Button
            variant="contained"
            size="small"
            sx={clearFiltersButton}
            onClick={onClearFilters}
          >
            Сбросить фильтры
          </Button>
        </Box>
      </Box>

      <Box sx={activeFiltersContainer}>
        {searchValue && <Chip label={`Поиск: ${searchValue}`} />}
        {selectedCategory && (
          <Chip
            label={`Категория: ${
              categories.find((cat) => cat.id === selectedCategory)?.name ||
              "Не выбрано"
            }`}
          />
        )}
        {(priceRange[0] !== 0 || priceRange[1] !== 9999) && (
          <Chip label={`Цена: ${priceRange[0]}-${priceRange[1]} руб.`} />
        )}
        {sortBy && <Chip label={`Сортировка: ${sortBy}`} />}
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
      >
        {menuType === "price" &&
          priceOptions.map((option) => (
            <MenuItem
              key={option.value}
              onClick={() => handleMenuItemClick(option.value)}
            >
              {option.label}
            </MenuItem>
          ))}

        {menuType === "sort" &&
          sortOptions.map((option) => (
            <MenuItem
              key={option.value}
              onClick={() => handleMenuItemClick(option.value)}
            >
              {option.label}
            </MenuItem>
          ))}

        {menuType === "category" &&
          categories.map((category) => (
            <MenuItem
              key={category.id}
              onClick={() => handleMenuItemClick(category.id)}
            >
              {category.name}
            </MenuItem>
          ))}
      </Menu>
    </>
  );
};

export default FilterPanel;
