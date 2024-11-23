//eslint-disable-next-line
import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import ProgressBar from "./ProgressBar";
import Footer from "./Footer";

function Layout() {
  return (
    <div className="site-wrapper">
      <Header />
      <main>
        <Outlet />
      </main>
      <ProgressBar />
      <Footer />
    </div>
  );
}

export default Layout;
