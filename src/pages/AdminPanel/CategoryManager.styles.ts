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
    backgroundColor: '#ffffff', // Белый фон
    borderRadius: '0.5rem',
    border: '1px solid #ddd', // Серая обводка
  },
  title: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    color: '#000000', // Черный текст
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
    border: '1px solid #ddd', // Серая обводка
    fontSize: '1rem',
    backgroundColor: '#ffffff', // Белый фон
    color: '#000000', // Черный текст
  },
  button: {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#777873',
    color: '#000000',
    border: '1px solid #ddd',
    borderRadius: '0.375rem',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'background-color 0.2s',
  },
  buttonDisabled: {
    backgroundColor: '#f5f5f5', // Светло-серый фон
    color: '#666666', // Серый текст
    cursor: 'not-allowed',
    border: '1px solid #ddd', // Серая обводка
  },
  loadingMessage: {
    color: '#666666', // Серый текст
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
    borderBottom: '1px solid #ddd', // Серая обводка
  },
  deleteButton: {
    backgroundColor: '#f87171', // Красный для акцента
    color: '#ffffff', // Белый текст
    border: 'none',
    padding: '0.375rem 1rem',
    borderRadius: '0.375rem',
    cursor: 'pointer',
    fontSize: '0.875rem',
    transition: 'background-color 0.2s',
  },
  emptyMessage: {
    color: '#666666', // Серый текст
    textAlign: 'center',
    fontSize: '1rem',
  },
};