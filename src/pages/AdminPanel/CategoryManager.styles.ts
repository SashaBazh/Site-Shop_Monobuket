import { CSSProperties } from 'react';

interface CategoryManagerStylesType {
  container: CSSProperties;
  title: CSSProperties;
  form: CSSProperties;
  input: CSSProperties;
  button: CSSProperties;
  buttonDisabled: CSSProperties;
  loadingMessage: CSSProperties;
  list: CSSProperties;
  listItem: CSSProperties;
  deleteButton: CSSProperties;
  emptyMessage: CSSProperties;
}

export const CategoryManagerStyles: CategoryManagerStylesType = {
    container: {
      padding: '1.5rem',
      backgroundColor: '#ffffff',
      borderRadius: '0.5rem',
    },
    title: {
      fontSize: '1.25rem',
      fontWeight: 'bold',
      color: '#1f2937',
      marginBottom: '1.5rem',
    },
    form: {
      display: 'flex',
      gap: '1rem',
      marginBottom: '1.5rem',
    },
    input: {
      flex: 1,
      padding: '0.75rem',
      borderRadius: '0.375rem',
      border: '1px solid #d1d5db',
      fontSize: '1rem',
      backgroundColor: '#ffffff', // Добавляем белый фон
      color: '#1f2937', // Цвет текста
    },
    button: {
      padding: '0.75rem 1.5rem',
      backgroundColor: '#2563eb',
      color: '#ffffff',
      border: 'none',
      borderRadius: '0.375rem',
      cursor: 'pointer',
      fontSize: '1rem',
      transition: 'background-color 0.2s',
    },
    buttonDisabled: {
      backgroundColor: '#d1d5db',
      cursor: 'not-allowed',
    },
    loadingMessage: {
      color: '#6b7280',
    },
    list: {
      listStyleType: 'none',
      paddingLeft: '0',
    },
    listItem: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0.75rem 1rem',
      borderBottom: '1px solid #e5e7eb',
    },
    deleteButton: {
      backgroundColor: '#f87171',
      color: '#ffffff',
      border: 'none',
      padding: '0.375rem 1rem',
      borderRadius: '0.375rem',
      cursor: 'pointer',
      fontSize: '0.875rem',
      transition: 'background-color 0.2s',
    },
    emptyMessage: {
      color: '#6b7280',
      textAlign: 'center',
      fontSize: '1rem',
    },
  };  