//eslint-disable-next-line
import React from "react";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div id="season-wrapper">
      <div>
        <h3>Favourites</h3>
        {/* //dropdown with sorting options */}
      </div>
      <Outlet />
    </div>
  );
}

export default Layout;
