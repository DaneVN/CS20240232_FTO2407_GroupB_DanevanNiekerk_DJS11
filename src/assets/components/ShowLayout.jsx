//eslint-disable-next-line
import React from "react";
import { Outlet } from "react-router-dom";

function ShowLayout() {
  return (
    <div className="">
      <Outlet />
    </div>
  );
}

export default ShowLayout;
