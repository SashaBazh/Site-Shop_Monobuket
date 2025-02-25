// src/pages/AdminPanel/style.ts
import styled from 'styled-components';

export const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #fff5f7;
  background-image: linear-gradient(45deg, #fff5f7 25%, #ffebf0 25%, #ffebf0 50%, #fff5f7 50%, #fff5f7 75%, #ffebf0 75%, #ffebf0);
  background-size: 20px 20px;
`;

export const FormWrapper = styled.div`
  width: 100%;
  max-width: 400px;
  padding: 2.5rem;
  background-color: white;
  border-radius: 16px;
  box-shadow: 0 8px 30px rgba(247, 156, 183, 0.2);
  border: 1px solid #ffd6e0;
`;

export const Title = styled.h2`
  text-align: center;
  margin-bottom: 1.8rem;
  color: #ff6b8b;
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  letter-spacing: 0.5px;
  font-size: 1.8rem;
  
  &::after {
    content: '';
    display: block;
    width: 60px;
    height: 3px;
    background: linear-gradient(to right, #ff6b8b, #ff9a9e);
    margin: 0.7rem auto 0;
    border-radius: 2px;
  }
`;

export const FormGroup = styled.div`
  margin-bottom: 1.8rem;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #ff7e9d;
  font-size: 0.9rem;
  letter-spacing: 0.5px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.85rem 1rem;
  font-size: 1rem;
  border: 2px solid #ffd6e0;
  border-radius: 12px;
  transition: all 0.3s ease;
  background-color: #fffafc;
  
  &:focus {
    outline: none;
    border-color: #ff9a9e;
    box-shadow: 0 0 0 4px rgba(255, 154, 158, 0.2);
    background-color: white;
  }
  
  &::placeholder {
    color: #ffb6c1;
  }
`;

export const SubmitButton = styled.button`
  display: block;
  width: 100%;
  padding: 0.85rem;
  font-size: 1rem;
  text-align: center;
  border: none;
  border-radius: 12px;
  background: linear-gradient(45deg, #ff7e9d, #ff9a9e);
  color: white;
  transition: all 0.3s ease;
  cursor: pointer;
  font-weight: 600;
  letter-spacing: 0.5px;
  box-shadow: 0 4px 15px rgba(255, 126, 157, 0.4);
  
  &:hover {
    background: linear-gradient(45deg, #ff6b8b, #ff8993);
    transform: translateY(-2px);
    box-shadow: 0 6px 18px rgba(255, 126, 157, 0.5);
  }
  
  &:active {
    transform: translateY(1px);
    box-shadow: 0 2px 10px rgba(255, 126, 157, 0.3);
  }
  
  &:disabled {
    background: linear-gradient(45deg, #ffb6c1, #ffc2c7);
    opacity: 0.8;
    cursor: not-allowed;
    transform: none;
    box-shadow: 0 4px 10px rgba(255, 182, 193, 0.3);
  }
`;

export const AlertBox = styled.div`
  padding: 0.85rem 1.25rem;
  margin-bottom: 1.5rem;
  border: 1px solid transparent;
  border-radius: 12px;
  color: #9e2c4a;
  background-color: #ffe4eb;
  border-color: #ffd6e0;
  font-size: 0.9rem;
  position: relative;
  
  &::before {
    content: "⚠";
    margin-right: 8px;
    color: #ff6b8b;
  }
`;