import axiosInstance from './axiosInstance';
import { OrderCreateRequest } from '../types/Checkout.types';

export const createOrder = async (orderData: OrderCreateRequest) => {
  const response = await axiosInstance.post('/cart/order', orderData);
  return response.data;
};