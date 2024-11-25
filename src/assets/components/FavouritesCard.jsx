//eslint-disable-next-line
import React from "react";
import placeholder from "../images/placeholder-show-banner.jpg";
import starFull from "../images/star-full.png";
// import starEmpty from "../images/star-empty.png";

function FavouritesCard() {
  return (
    <div className="bg-lime-900 rounded-lg p-4 flex flex-col gap-4 sm:grid sm:grid-cols-3 sm:gap-4 mb-6">
      <div className="relative mb-4">
        <img
          className="w-6 absolute top-1 left-1"
          src={starFull}
          alt="favourite"
        />
        <img
          className="self-center rounded-lg"
          src={placeholder}
          alt="show banner/cover"
        />
      </div>
      <div className="col-span-2 flex flex-col items-center justify-evenly">
        <h2 className="mb-4">Series: Episode Title</h2>
        <p className="mb-2">
          Description Description Description Description Description
          Description Description Description
        </p>
        <div className="flex gap-2 justify-center flex-wrap mb-2">
          <p>S Ep</p>
          <p>Date Added</p>
        </div>
        <div id="genre-list">
          <ul className="list-none flex gap-2 justify-center flex-wrap">
            <li id="genre" className="bg-slate-800 rounded-3xl px-3 py-1">
              Genre
            </li>
            <li id="genre" className="bg-slate-800 rounded-3xl px-3 py-1">
              Genre
            </li>
            <li id="genre" className="bg-slate-800 rounded-3xl px-3 py-1">
              Genre
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default FavouritesCard;
