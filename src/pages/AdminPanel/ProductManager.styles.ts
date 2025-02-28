import { CSSProperties } from 'react';

interface ProductManagerStylesType {
  previewContainer: CSSProperties;
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
  // Новые стили для отображения товаров в одну строку
  filterContainer: CSSProperties;
  filterItem: CSSProperties;
  filterLabel: CSSProperties;
  productCard: CSSProperties;
  productInfoRow: CSSProperties;
  productInfoItem: CSSProperties;
  productInfoLabel: CSSProperties;
  productInfoValue: CSSProperties;
  productDescription: CSSProperties;
  productImages: CSSProperties;
  buttonGroup: CSSProperties;
  cancelButton: CSSProperties;
  emptyMessage: CSSProperties;
  editFormRow: CSSProperties;
  editFormField: CSSProperties;
  editFormSection: CSSProperties;
  // Стили для управления изображениями
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
    width: '100%',
  },
  textarea: {
    padding: '0.75rem',
    borderRadius: '0.375rem',
    border: '1px solid #d1d5db',
    fontSize: '1rem',
    backgroundColor: '#ffffff',
    color: '#1f2937',
    minHeight: '120px',
    width: '100%',
  },
  select: {
    padding: '0.75rem',
    borderRadius: '0.375rem',
    border: '1px solid #d1d5db',
    fontSize: '1rem',
    backgroundColor: '#ffffff',
    color: '#1f2937',
    width: '100%',
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
    marginTop: '20px',
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
  previewContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    marginBottom: '1rem',
  },
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
  // Новые стили для отображения в одну строку
  filterContainer: {
    marginBottom: '20px',
    display: 'flex',
    gap: '15px',
    alignItems: 'center',
  },
  filterItem: {
    flex: 1,
  },
  filterLabel: {
    display: 'block',
    marginBottom: '5px',
    fontWeight: 'bold',
  },
  productCard: {
    marginBottom: '15px',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    backgroundColor: '#f9fafb',
    padding: '15px',
  },
  productInfoRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    alignItems: 'center',
    marginBottom: '15px',
  },
  productInfoItem: {
    flex: '1 1 auto',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  productInfoLabel: {
    fontWeight: 'bold',
    color: '#4b5563',
    whiteSpace: 'nowrap',
  },
  productInfoValue: {
    fontSize: '16px',
  },
  productDescription: {
    display: 'flex',
    alignItems: 'baseline',
    gap: '8px',
    marginBottom: '15px',
  },
  productImages: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    marginBottom: '15px',
  },
  buttonGroup: {
    display: 'flex',
    gap: '10px',
    marginTop: '15px',
  },
  cancelButton: {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#888',
    color: '#ffffff',
    border: 'none',
    borderRadius: '0.375rem',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'background-color 0.2s',
  },
  emptyMessage: {
    textAlign: 'center',
    color: '#6b7280',
    padding: '20px',
  },
  editFormRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '15px',
    marginBottom: '15px',
  },
  editFormField: {
    flex: '1 1 200px',
  },
  editFormSection: {
    marginBottom: '15px',
  },
};