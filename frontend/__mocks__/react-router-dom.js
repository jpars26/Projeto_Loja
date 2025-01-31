export const MemoryRouter = ({ children }) => <div>{children}</div>;
export const Link = ({ children, to }) => <a href={to}>{children}</a>;
export const useNavigate = () => jest.fn();
export const useParams = () => ({});
export const useLocation = () => ({ pathname: "/" });
