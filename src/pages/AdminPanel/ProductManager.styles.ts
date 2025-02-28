import { CSSProperties } from 'react';

interface ProductManagerStylesType {
  previewContainer: CSSProperties | undefined;
  container: CSSProperties;
  title: CSSProperties;
  form: CSSProperties;
  input: CSSProperties;
  textarea: CSSProperties;
  select: CSSProperties;
  button: CSSProperties;
  buttonDisabled: CSSProperties;
  loadingMessage: CSSProperties;
  productList: CSSProperties;
  productItem: CSSProperties;
  deleteButton: CSSProperties;
  formGroup: CSSProperties;
  label: CSSProperties;
  // Добавленные свойства для управления изображениями
  imageContainer: CSSProperties;
  deleteImageButton: CSSProperties;
  previewImage: CSSProperties;
}

export const ProductManagerStyles: ProductManagerStylesType = {
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
    flexDirection: 'column',
    gap: '1rem',
    marginBottom: '1.5rem',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  label: {
    fontSize: '1rem',
    fontWeight: 'bold',
    color: '#1f2937',
  },
  input: {
    padding: '0.75rem',
    borderRadius: '0.375rem',
    border: '1px solid #d1d5db',
    fontSize: '1rem',
    backgroundColor: '#ffffff',
    color: '#1f2937',
  },
  textarea: {
    padding: '0.75rem',
    borderRadius: '0.375rem',
    border: '1px solid #d1d5db',
    fontSize: '1rem',
    backgroundColor: '#ffffff',
    color: '#1f2937',
    minHeight: '120px',
  },
  select: {
    padding: '0.75rem',
    borderRadius: '0.375rem',
    border: '1px solid #d1d5db',
    fontSize: '1rem',
    backgroundColor: '#ffffff',
    color: '#1f2937',
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
  productList: {
    listStyleType: 'none',
    paddingLeft: '0',
  },
  productItem: {
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
  // Обновленное свойство previewContainer
  previewContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    marginBottom: '1rem',
  },
  // Добавленные стили для управления изображениями
  imageContainer: {
    position: 'relative',
    display: 'inline-block',
    marginRight: '10px',
    marginBottom: '10px',
  },
  deleteImageButton: {
    position: 'absolute',
    top: '2px',
    right: '2px',
    backgroundColor: 'rgba(255, 0, 0, 0.7)',
    color: 'white',
    border: 'none',
    borderRadius: '50%',
    width: '20px',
    height: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: 'bold',
    padding: 0,
    zIndex: 2,
  },
  previewImage: {
    width: '100px',
    height: '100px',
    objectFit: 'cover',
  },
};