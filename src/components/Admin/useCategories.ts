import { useState } from "react";
import { getCategories, createCategory, deleteCategory } from "../../api/adminAPI";

export function useCategories() {
  const [categories, setCategories] = useState<unknown[]>([]);
  const [error, setError] = useState<string | null>(null);

  const loadCategories = async () => {
    try {
      setError(null);
      const catRes = await getCategories();
      setCategories(catRes);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ошибка при загрузке категорий");
    }
  };

  const handleCreateCategory = async (name: string) => {
    if (!name.trim()) return;

    try {
      await createCategory({ name: name.trim() });
      await loadCategories();
    } catch (err) {
      alert(`Ошибка при создании категории: ${err instanceof Error ? err.message : "Неизвестная ошибка"}`);
    }
  };

  const handleDeleteCategory = async (catId: number) => {
    if (!window.confirm("Удалить категорию?")) return;
    try {
      await deleteCategory(catId);
      await loadCategories();
    } catch (err) {
      alert(`Ошибка при удалении категории: ${err instanceof Error ? err.message : "Неизвестная ошибка"}`);
    }
  };

  return {
    categories,
    error,
    loadCategories,
    handleCreateCategory,
    handleDeleteCategory,
  };
}