import React from "react";
import starEmpty from "../images/star-empty.png";
import starFull from "../images/star-full.png";
import { TrackContext } from "../context/TrackContext";

function ProgressBar() {
  const { currentTrack } = React.useContext(TrackContext);

  if (!currentTrack) return null; // Show nothing if no track is playing

  return (
    <section className="progress-bar fixed bottom-0 px-8 bg-slate-700 h-16 w-full items-center grid grid-cols-3 grid-rows-1 overflow-hidden">
      <div className="track-info items-center max-w-[90%] overflow-hidden sm:flex sm:gap-3">
        <p className="truncate whitespace-nowrap text-ellipsis">
          {currentTrack.title}
        </p>
        <button className="shrink-0 w-8">
          <img
            src={currentTrack.isFavourite ? starFull : starEmpty}
            alt="favourite"
            className="w-6"
          />
        </button>
      </div>
      <div id="controls" className="col-span-2 flex justify-center gap-4">
        <audio controls className="w-full bg-slate-700" src={currentTrack.file}>
          Your browser does not support the audio element.
        </audio>
      </div>
    </section>
  );
}

export default ProgressBar;
