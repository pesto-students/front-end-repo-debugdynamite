import axios from "axios";
import { UserAuth } from "../context/UserContext";

const instance = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}/api/`,
});

const AxiosInterceptor = ({ children }) => {
  const { user } = UserAuth();

  if (user) {
    const reqInterceptor = (config) => {
      config.headers.Authorization = `Bearer ${user.accessToken}`;
      return config;
    };

    const errInterceptor = (error) => {
      return Promise.reject(error);
    };

    instance.interceptors.request.use(reqInterceptor, errInterceptor);
  } else {
    console.log("user not signed in!");
  }

  return children;
};

export default instance;
export { AxiosInterceptor };
