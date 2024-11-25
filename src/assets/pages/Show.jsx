//eslint-disable-next-line
import React from "react";
import backBtn from "../images/load-more.png";
import starEmpty from "../images/star-empty.png";
import { NavLink } from "react-router-dom";

export default function Home() {
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
            <div className="flex gap-5 flex-wrap">
              {/* //load season pages based on amount of seasons in show */}
              {/* //add active style */}
              <NavLink to="" className="">
                Season 1
              </NavLink>
              <NavLink to="show.1" className="">
                Season 2
              </NavLink>
              <NavLink to="show.2" className="">
                Season 3
              </NavLink>
            </div>
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
    </>
  );
}
