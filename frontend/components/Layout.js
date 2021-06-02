import Navbar from "./Navbar";
import Footer from "./Footer";
import Alert from "./Alert";

export const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <Alert />
      {children}
      <Footer />
    </div>
  );
};
