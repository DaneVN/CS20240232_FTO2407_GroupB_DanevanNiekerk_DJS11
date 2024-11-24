//eslint-disable-next-line
import React from "react";
import LastListened from "../components/LastListened";
import PreviewCard from "../components/PreviewCard";
import { Link } from "react-router-dom";
import loadMore from "../images/load-more.png";

export default function Home() {
  return (
    <>
      <h2>You were listening to:</h2>
      <LastListened />
      <br />
      <div id="home-podcast-list" className="bg-lime-950 p-3 relative ">
        {/* //have the different cards path to the corresponding show using urlParams */}
        <Link to="show">
          <PreviewCard />
        </Link>
        <Link to="show">
          <PreviewCard />
        </Link>
        <Link to="show">
          <PreviewCard />
        </Link>
        <button className="absolute top-1/2 right-0 hover:animate-bounce">
          {/* //add a react spring animation instead of hover? */}
          <img src={loadMore} alt="arrow to the right" className="w-14" />
        </button>
      </div>
      {/*  //iterate over the list of audio books and add a previewcard for each show*/}
    </>
  );
}
