import Cookies from "js-cookie";

export const cookiesGetter = () => {
  const key = Cookies.get(`${process.env.REACT_APP_JWT_TOKEN}`);
  if (key) {
    return (key);
  }
};

export const removeCookie = (key) => {
  Cookies.remove(key);
};

