export const MemoryRouter = ({ children }) => <div>{children}</div>;
export const Link = ({ to, children }) => <a href={to}>{children}</a>;
export const useNavigate = jest.fn(); // Mantém a função corretamente
export const useParams = () => ({});
export const useLocation = () => ({ pathname: "/home" });

export default {
  BrowserRouter: ({ children }) => <div>{children}</div>,
  Link: ({ to, children }) => <a href={to}>{children}</a>,
  useNavigate: jest.fn(),
  useParams: () => ({}),
  useLocation: () => ({ pathname: "/" }),
};
