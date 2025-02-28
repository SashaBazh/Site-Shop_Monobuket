export interface FilterPanelProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  priceRange: [number, number];
  onPriceRangeChange: (range: [number, number]) => void;
  sortBy: string;
  onSortByChange: (value: string) => void;
  selectedCategory: number | null; // Меняем на number, чтобы хранить ID категории
  onCategoryChange: (value: number) => void; // Меняем на number, чтобы передавать ID категории
  bouquetTypes: string[];
  onClearFilters: () => void;
}


export interface PriceOption {
  label: string;
  value: string;
}

export interface SortOption {
  label: string;
  value: string;
}