//eslint-disable-next-line
import React from "react";
// import starFull from "../images/star-full.png";
import starEmpty from "../images/star-empty.png";
import playBtn from "../images/play-button.png";

function EpisodeCard() {
  return (
    <>
      <div className="mb-4 flex justify-between sm:justify-start sm:gap-4">
        <h2>Episode 1: Title</h2>
        <img className="w-6 sm: h-6" src={starEmpty} alt="favourite" />
      </div>
      <div className="bg-lime-900 rounded-lg p-4 flex flex-col gap-4 sm:grid sm:grid-cols-3 sm:gap-4">
        <button className="max-w-12">
          <img src={playBtn} alt="play Audio" width={48} />
        </button>
        <div className="col-span-2 flex flex-col items-start justify-evenly">
          <p className="mb-2">
            Description Description Description Description Description
            Description Description Description
          </p>
          <div className="flex gap-2 justify-start flex-wrap mb-2">
            <p>00:00</p>
            <p>LastUpdated</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default EpisodeCard;
