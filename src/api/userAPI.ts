// src/api/userAPI.ts
import axiosInstance from './axiosInstance';

export async function getUserProfile() {
  const res = await axiosInstance.get('/user/profile');
  return res.data; 
}

interface UpdateProfilePayload {
  name: string;
  birthday?: string; // в формате 'YYYY-MM-DD' или ISO
}

export async function updateUserProfile(payload: UpdateProfilePayload) {
  const res = await axiosInstance.put('/user/profile', payload);
  return res.data;
}
