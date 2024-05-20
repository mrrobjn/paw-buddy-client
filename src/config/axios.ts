import axios from "axios";

export const getAccessToken = () => {
  const accessToken = localStorage.getItem("accessToken");
  let token = "";
  if (accessToken) {
    token = accessToken.replace(/"/g, "");
  }
  return token;
};

export const getRefreshToken = () => {
  const refreshToken = localStorage.getItem("refreshToken");
  let token = "";
  if (refreshToken) {
    token = refreshToken.replace(/"/g, "");
  }
  return token;
};

function buildApi() {
  const instance = axios.create({
    baseURL: process.env.BACK_END_URL,
    withCredentials: false,
  });
  instance.interceptors.request.use((config: any) => ({
    ...config,
    headers: {
      ...config.headers,
      Authorization: `Bearer ${getAccessToken()}`,
    },
    withCredentials: false,
  }));

  // instance.interceptors.response.use(
  //   (response) => {
  //     return response;
  //   },
  //   async (error) => {
  //     const originalRequest = error.config;
  //     if (
  //       error.response &&
  //       error.response.status === 403 &&
  //       !originalRequest._retry &&
  //       getRefreshToken()
  //     ) {
  //       originalRequest._retry = true;
  //       const response = await axios.post(
  //         process.env.BACK_END_URL + "/auth/refresh-token",
  //         `refresh_token=${getRefreshToken()}`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${getRefreshToken()}`,
  //             "Content-Type": "application/x-www-form-urlencoded",
  //           },
  //         }
  //       );
  //       if (response.data?.access_token) {
  //         localStorage.setItem("accessToken", response.data.access_token);
  //         originalRequest.headers["Authorization"] =
  //           "Bearer " + getAccessToken();
  //         return instance(originalRequest);
  //       }

  //       localStorage.removeItem("accessToken");
  //     }
  //     return Promise.reject(error);
  //   }
  // );
  return instance;
}

const api = buildApi();
export default api;
