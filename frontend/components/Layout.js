import Navbar from "./Navbar";
import Footer from "./Footer";
import Alert from "./Alert";
import Head from "next/head";

export const Layout = ({ children, title, description }) => {
  return (
    <div>
      <Head>
        <title>{title ? title : ""}</title>
        <meta charSet="UTF-8" />
        <meta name="description" content={description ? description : ""} />
        <meta
          name="keywords"
          content="Nextjs, React, Node, Boilerplate, Redux, Mongodb"
        />
        <meta name="author" content="Ti Jhae" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Navbar />
      <Alert />
      {children}
      <Footer />
    </div>
  );
};
