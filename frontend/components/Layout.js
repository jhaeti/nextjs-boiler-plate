import React, { Component } from "react";
import Navbar from "./Navbar";
import Head from "next/head";
import Footer from "./Footer";

export const Layout = ({ children }) => {
  return (
    <div>
      <Head>
        <link
          rel="preload"
          href="/Josefin_Sans/static/JosefinSans-Regular.ttf"
          as="font"
          crossOrigin=""
        />
      </Head>
      <Navbar />
      {children}
      <div>Footer</div>
      <style global jsx>{`
        @font-face {
          font-family: JosefinSans;
          src: url("/Josefin_Sans/static/JosefinSans-Regular.ttf");
          font-style: normal;
          font-weight: 400;
        }

        body {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: JosefinSans;
        }
      `}</style>
      <Footer />
    </div>
  );
};
