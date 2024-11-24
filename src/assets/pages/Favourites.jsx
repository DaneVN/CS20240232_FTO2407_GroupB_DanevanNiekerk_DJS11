//eslint-disable-next-line
import React from "react";
import SortImg from "../images/sort.png";

function Favourites() {
  return (
    <>
      <div className="flex gap-4">
        <h3>Favourites</h3>
        <button className="w-6">
          <img src={SortImg} alt="Sort by" />
          {/* //dropdown with sorting options */}
        </button>
      </div>
      <div>Favourites List HERE</div>
    </>
  );
}
export default Favourites;
