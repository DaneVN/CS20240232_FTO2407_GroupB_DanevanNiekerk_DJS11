//eslint-disable-next-line
import React from "react";
import placeholder from "../images/placeholder-show-banner.jpg";
// import starFull from "../images/star-full.png";
import starEmpty from "../images/star-empty.png";

function PreviewCard() {
  return (
    <div className="bg-lime-900 rounded-lg p-4 grid grid-cols-3 gap-4 mb-2">
      <div className="relative">
        <img
          className="w-6 absolute top-1 left-1"
          src={starEmpty}
          alt="favourite"
        />
        <img
          className="self-center rounded-lg"
          src={placeholder}
          alt="show banner/cover"
        />
      </div>
      <div className="col-span-2 flex flex-col items-center justify-evenly">
        <h2 className="">Title</h2>
        <p className="">
          Description Description Description Description Description
          Description Description Description{" "}
          {/* //prettier added {" "}, for some reason? */}
        </p>
        <div className="flex gap-2 justify-center">
          <p>Seasons</p>
          <p>LastUpdated</p>
        </div>
        <div id="genre-list">
          <ul className="list-none flex gap-2 justify-center">
            <li id="genre" className="bg-slate-800 rounded-3xl px-3 py-1">
              Genre
            </li>
            <li id="genre" className="bg-slate-800 rounded-3xl px-3 py-1">
              Ganre
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

export default PreviewCard;
