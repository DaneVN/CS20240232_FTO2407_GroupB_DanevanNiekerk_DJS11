//eslint-disable-next-line
import React from "react";
import LastListened from "../components/LastListened";
import PreviewCard from "../components/PreviewCard";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <h2>You were listening to:</h2>
      <LastListened />
      <br />
      <div id="home-podcast-list" className="bg-lime-950 p-3">
        <Link to="show">
          <PreviewCard />
        </Link>
        {/* //have the different cards path to the corresponding show using urlParams */}
        <PreviewCard />
        <PreviewCard />
      </div>
      {/*  //iterate over the list of audio books and add a previewcard for each show*/}
    </>
  );
}
