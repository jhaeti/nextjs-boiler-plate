import React, { Component } from "react";

export const Layout = ({ children }) => {
  return (
    <div>
      <div>Navbar</div>
      {children}
      <div>Footer</div>
    </div>
  );
};
