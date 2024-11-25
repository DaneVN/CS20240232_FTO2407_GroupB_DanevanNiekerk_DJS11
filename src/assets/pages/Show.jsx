//eslint-disable-next-line
import React from "react";
import backBtn from "../images/load-more.png";
import starEmpty from "../images/star-empty.png";
import { NavLink, Outlet } from "react-router-dom";

export default function Home() {
  // Example season data (could come from API or state)
  const seasons = [1, 2, 3, 4];

  return (
    <>
      <section className=" bg-green-300 p-5">
        <div
          id="show-details"
          className="flex gap-7 justify-center items-start mb-4"
          //bg-image = season poster/ show poster when no season is selected
        >
          <button className="shrink-0 w-8">
            <img src={backBtn} alt="Go back" className="rotate-180" />
          </button>
          <div id="details" className="flex flex-col gap-3 mb-3">
            <h2>Title</h2>
            <nav className="flex gap-5 flex-wrap">
              {seasons.map((season) => (
                <NavLink
                  key={season}
                  to={`season/${season}`}
                  className={({ isActive }) =>
                    isActive ? "text-lime-900" : ""
                  }
                >
                  Season {season}
                </NavLink>
              ))}
            </nav>
            <p>
              Description Description Description Description Description
              Description Description Description Description Description
              Description{" "}
            </p>
          </div>
          <button className="shrink-0 w-8">
            <img src={starEmpty} alt="favourite" className="w-12" />
          </button>
        </div>
        <div id="genre-list">
          <ul className="list-none flex gap-2 justify-start flex-nowrap overflow-x-scroll scrollbar">
            <li id="genre" className="bg-slate-800 rounded-3xl px-3 py-1">
              Genre
            </li>
            <li id="genre" className="bg-slate-800 rounded-3xl px-3 py-1">
              Genre
            </li>
            <li id="genre" className="bg-slate-800 rounded-3xl px-3 py-1">
              Genre
            </li>
            <li id="genre" className="bg-slate-800 rounded-3xl px-3 py-1">
              Genre
            </li>
            <li id="genre" className="bg-slate-800 rounded-3xl px-3 py-1">
              Genre
            </li>
            <li id="genre" className="bg-slate-800 rounded-3xl px-3 py-1">
              Genre
            </li>
            <li id="genre" className="bg-slate-800 rounded-3xl px-3 py-1">
              Genre
            </li>
            <li id="genre" className="bg-slate-800 rounded-3xl px-3 py-1">
              Genre
            </li>
            <li id="genre" className="bg-slate-800 rounded-3xl px-3 py-1">
              Genre
            </li>
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
      </section>
      <Outlet />
    </>
  );
}
