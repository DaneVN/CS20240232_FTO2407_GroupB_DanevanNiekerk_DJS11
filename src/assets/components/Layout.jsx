//eslint-disable-next-line
import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import ProgressBar from "../components/ProgressBar";
import Footer from "./Footer";

function Layout() {
  return (
    <div className="flex flex-col p-4">
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
