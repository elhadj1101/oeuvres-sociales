import axios from 'axios';

const Axios = axios.create({
  baseURL: 'http://localhost:8000/api/',
  timeout: 5000, // 5 seconds timeout
  mode: "no-cors",
  headers: {
    'Content-Type': 'application/json',
    'Authorization': localStorage.getItem('access_token')
      ? "JWT " + localStorage.getItem('access_token')
      : null
  }
});

Axios.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    console.log(error)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = false;
      const refreshToken = localStorage.getItem('refresh_token');
      if (!refreshToken) {
        return Promise.reject(error);
      }
      if (error.response?.data?.code === "token_not_valid") {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/login';
        return Promise.reject(error);
      }
      try {
        const response = await Axios.post('/token-refresh/', { refresh: refreshToken });
        const newAccessToken = response.data.access;
        localStorage.setItem('access_token', newAccessToken);
        originalRequest.headers['Authorization'] = `JWT ${newAccessToken}`;
        return Axios(originalRequest);
      } catch (error) {
        // Redirect to login or handle the refresh token failure scenario
         window.location.href = '/login';
        
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

export default Axios;
