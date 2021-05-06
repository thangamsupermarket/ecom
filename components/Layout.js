import React from "react";
import NavigationBar from "./navbar";

const Layout = ({ children }) => {
  return (
    <div>
      <NavigationBar />
      {children}
    </div>
  );
};

export default Layout;
