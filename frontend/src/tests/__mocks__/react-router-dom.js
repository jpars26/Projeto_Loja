export const MemoryRouter = ({ children }) => <div>{children}</div>;
export const Link = ({ children, to }) => <a href={to}>{children}</a>;
export const useNavigate = () => jest.fn();
export const useParams = () => ({});
export const useLocation = () => ({ pathname: "/" });

module.exports = {
  ...jest.requireActual("react-router-dom"), // Importa tudo do react-router-dom
  BrowserRouter: ({ children }) => <div>{children}</div>, // Simula o BrowserRouter
  Link: ({ to, children }) => <a href={to}>{children}</a>, // Simula os Links
  useNavigate: () => jest.fn(), // Mock da função de navegação
};
