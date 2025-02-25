export interface FilterPanelProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  priceRange: [number, number];
  onPriceRangeChange: (range: [number, number]) => void;
  sortBy: string;
  onSortByChange: (value: string) => void;
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
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