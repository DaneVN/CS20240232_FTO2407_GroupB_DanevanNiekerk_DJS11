//eslint-disable-next-line
import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import ProgressBar from "./ProgressBar";
import Footer from "./Footer";

function Layout() {
  return (
    <div className="flex flex-col">
      <Header />
      <main className="m-5">
        <Outlet />
      </main>
      <ProgressBar />
      <Footer />
    </div>
  );
}

export default Layout;
