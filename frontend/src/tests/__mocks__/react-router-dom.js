import React from "react";

export const MemoryRouter = ({ children }) => <div>{children}</div>;
export const BrowserRouter = ({ children }) => <div>{children}</div>;
export const Link = ({ to, children }) => <a href={to}>{children}</a>;
export const useNavigate = jest.fn(); // Mantém a função corretamente
export const useParams = () => ({});
export const useLocation = () => ({ pathname: "/home" });
export const useSearchParams = () => {
  const [params, setParams] = React.useState(() => new URLSearchParams());
  const setSearchParams = (next) => {
    const value = typeof next === "function" ? next(params) : next;
    setParams(new URLSearchParams(value));
  };
  return [params, setSearchParams];
};

export default {
  BrowserRouter,
  MemoryRouter,
  Link,
  useNavigate,
  useParams,
  useLocation,
  useSearchParams,
};
