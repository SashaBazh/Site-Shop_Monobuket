import axiosInstance from './axiosInstance';

export const loginUser = async (email: string, password: string) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axiosInstance.post('/auth', { email, password });
    if (response.data.access_token) {
      localStorage.setItem("access_token", response.data.access_token);
      localStorage.setItem("refresh_token", response.data.refresh_token);
    }
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const refreshAccessToken = async () => {
  // eslint-disable-next-line no-useless-catch
  try {
    const refresh_token = localStorage.getItem("refresh_token");
    if (!refresh_token) throw new Error("No refresh token available");

    const response = await axiosInstance.post('/auth/refresh', { refresh_token });
    localStorage.setItem("access_token", response.data.access_token);
    localStorage.setItem("refresh_token", response.data.refresh_token);
    return response.data;
  } catch (error) {
    throw error;
  }
};
