//eslint-disable-next-line
import React from "react";
import SortImg from "../../../public/assets/images/sort.png";
import FavouritesCard from "../components/FavouritesCard";

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
      <div className="bg-lime-950 p-3">
        <FavouritesCard />
      </div>
    </>
  );
}
export default Favourites;
