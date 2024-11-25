import React from "react";
import backBtn from "../images/load-more.png";
import starEmpty from "../images/star-empty.png";
import { NavLink, Outlet, useParams } from "react-router-dom";

export default function Home() {
  const [show, setShow] = React.useState({
    title: "",
    description: "",
    seasons: [],
    image: "",
    updated: "",
  });
  const { showId } = useParams();

  React.useEffect(() => {
    if (!showId) return; // Do nothing if showId is undefined

    // Fetch podcasts and sort them alphabetically by title
    fetch(`https://podcast-api.netlify.app/id/${showId}`)
      .then((res) => res.json())
      .then((data) => {
        setShow(data);
      })
      .catch((err) => console.error("Error fetching show:", err));
  }, [showId]);

  return (
    <>
      <section className=" bg-green-300 text-black font-semibold p-5">
        <div
          id="show-details"
          className="flex gap-7 justify-center items-start mb-4"
          //bg-image = season poster/ show poster when no season is selected
        >
          <button className="shrink-0 w-8">
            <img src={backBtn} alt="Go back" className="rotate-180" />
          </button>
          <div id="details" className="flex flex-col gap-3 mb-3">
            <h2>{show.title || "Loading..."}</h2>
            <nav className="flex gap-5 flex-wrap">
              {show.seasons?.map((season) => {
                return (
                  <NavLink
                    key={season.season}
                    to={`season/${season}`}
                    className={({ isActive }) =>
                      isActive ? "text-lime-900" : ""
                    }
                  >
                    {/* //thisV single line of code has caused me SO MUCH grief today D:< */}
                    Season {season.season}
                  </NavLink>
                );
              })}
            </nav>
            <p>{show.description || "No description available."}</p>
          </div>
          <button className="shrink-0 w-8">
            <img src={starEmpty} alt="favourite" className="w-12" />
          </button>
        </div>
        <div id="genre-list">
          <ul className="list-none flex gap-2 justify-start flex-nowrap overflow-x-scroll scrollbar">
            {
              // usecontext to get genres array from parent route??
              // genres.map((genre, index) => (
              //   <li
              //     id="genre"
              //     key={index}
              //     className="bg-slate-800 rounded-3xl px-3 py-1"
              //   >
              //     {genre}
              //   </li>
              // ))
            }
          </ul>
        </div>
      </section>
      <Outlet />
    </>
  );
}
