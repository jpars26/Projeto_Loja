import Header from "../components/Header";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";
import BackToTopAndBackButton from "../components/BackToTopAndBackButton";

const Layout = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col bg-bone">
      <Header />

      <main className="flex-1 pt-20">{children}</main>
      <WhatsAppButton />
      <BackToTopAndBackButton />
      <Footer />
    </div>
  );
};

export default Layout;
