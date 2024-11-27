import React from "react";
import backBtn from "../../../public/assets/images/load-more.png";
import { NavLink, Link, Outlet, useParams } from "react-router-dom";

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

    // Fetch show and assign it to state
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
          <Link to="/" relative="path" className="shrink-0 w-8">
            <img src={backBtn} alt="Go back" className="rotate-180" />
          </Link>
          <div id="details" className="flex flex-col gap-3 mb-3">
            <h2>
              {show.title || "Loading..."} ({show.updated.slice(0, 10) || null})
            </h2>
            <nav className="flex gap-5 flex-wrap">
              {show.seasons?.map((season) => {
                return (
                  <NavLink
                    key={season.season}
                    to={`season/${season.season}`}
                    className={({ isActive }) =>
                      isActive ? "text-lime-900" : ""
                    }
                  >
                    Season {season.season} ( {season.episodes.length}{" "}
                    {season.episodes.length === 1 ? "Episode" : "Episodes"} )
                  </NavLink>
                );
              })}
            </nav>
          </div>
        </div>
      </section>
      <Outlet />
    </>
  );
}
