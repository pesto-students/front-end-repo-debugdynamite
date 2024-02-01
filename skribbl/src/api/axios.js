import axios from "axios";
import { UserAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";

const instance = axios.create({
  baseURL: "http://localhost:3001/api/",
});

const AxiosInterceptor = ({ children }) => {
  const { user } = UserAuth();
  const [userToken, setUserToken] = useState();

  useEffect(() => {
    if (user) {
      user.getIdToken().then((token) => setUserToken(token));
    }
  }, [user]);

  useEffect(() => {
    const reqInterceptor = (config) => {
      if (userToken) {
        config.headers.Authorization = `Bearer ${userToken}`;
      }

      return config;
    };

    const errInterceptor = (error) => {
      return Promise.reject(error);
    };

    const interceptor = instance.interceptors.request.use(
      reqInterceptor,
      errInterceptor
    );

    return () => instance.interceptors.response.eject(interceptor);
  }, [userToken]);

  return children;
};

export default instance;
export { AxiosInterceptor };
