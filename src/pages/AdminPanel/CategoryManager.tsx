import React, { useState, useEffect } from 'react';
import { getCategories, createCategory, deleteCategory } from '../../api/adminAPI';
import { Category } from '../../types/Admin.types';
import { CategoryManagerStyles } from './CategoryManager.styles';
import Notification from '../../components/Admin/Notification';

const CategoryManager: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<{ message: string, type: 'success' | 'error' } | null>(null);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      console.error('Ошибка загрузки категорий:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;

    try {
      setLoading(true);
      await createCategory({ name: newCategoryName });
      setNewCategoryName('');
      fetchCategories();
      setNotification({ message: 'Категория успешно добавлена!', type: 'success' });
    } catch (error) {
      console.error('Ошибка создания категории:', error);
      setNotification({ message: 'Ошибка при добавлении категории.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCategory = async (id: number) => {
    if (!window.confirm('Вы уверены, что хотите удалить эту категорию?')) return;

    try {
      setLoading(true);
      await deleteCategory(id);
      fetchCategories();
      setNotification({ message: 'Категория успешно удалена!', type: 'success' });
    } catch (error) {
      console.error('Ошибка удаления категории:', error);
      setNotification({ message: 'Ошибка при удалении категории.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Таймер для скрытия уведомления через 3 секунды
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 2000); // 3 секунды в миллисекундах

      return () => clearTimeout(timer); // очищаем таймер, если компонент размонтируется
    }
  }, [notification]);

  return (
    <div style={CategoryManagerStyles.container}>
      <h2 style={CategoryManagerStyles.title}>Управление категориями</h2>

      {/* Уведомление */}
      {notification && <Notification message={notification.message} type={notification.type} />}

      <form onSubmit={handleCreateCategory} style={CategoryManagerStyles.form}>
        <input
          type="text"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          placeholder="Название новой категории"
          disabled={loading}
          style={CategoryManagerStyles.input}
        />
        <button
          type="submit"
          disabled={loading}
          style={loading ? { ...CategoryManagerStyles.button, ...CategoryManagerStyles.buttonDisabled } : CategoryManagerStyles.button}
        >
          Добавить категорию
        </button>
      </form>

      {loading && <p style={CategoryManagerStyles.loadingMessage}>Загрузка...</p>}

      <ul style={CategoryManagerStyles.list}>
        {categories.map((category) => (
          <li key={category.id} style={CategoryManagerStyles.listItem}>
            <span>{category.name}</span>
            <button
              onClick={() => handleDeleteCategory(category.id)}
              disabled={loading}
              style={CategoryManagerStyles.deleteButton}
            >
              Удалить
            </button>
          </li>
        ))}
      </ul>

      {categories.length === 0 && !loading && <p style={CategoryManagerStyles.emptyMessage}>Нет доступных категорий</p>}
    </div>
  );
};

export default CategoryManager;
