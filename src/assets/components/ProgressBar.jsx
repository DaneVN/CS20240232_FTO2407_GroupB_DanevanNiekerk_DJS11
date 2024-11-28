//eslint-disable-next-line
import React from "react";
import Pause from "../images/pause.png";
import Play from "../images/play-button.png";
import { useCurrentTrack } from "../context/CurrentTrackContext";

function ProgressBar() {
  const { currentTrack, handlePlayPause } = useCurrentTrack();

  if (!currentTrack || !handlePlayPause) {
    console.error("CurrentTrackContext not provided!");
    return null;
  }

  return (
    <section className="fixed bottom-0 px-8 bg-slate-700 h-16 w-full items-center grid grid-cols-3 grid-rows-1 overflow-hidden">
      <div className="items-center max-w-[90%] overflow-hidden sm:flex sm:gap-3">
        <p className="truncate whitespace-nowrap text-ellipsis">
          {currentTrack.title || "No track playing"}
        </p>
      </div>
      <div id="controls" className="col-span-2 flex justify-center gap-4">
        <button onClick={() => handlePlayPause(currentTrack)}>
          <img
            className="w-8"
            src={currentTrack.isPlaying ? Pause : Play}
            alt={currentTrack.isPlaying ? "Pause" : "Play"}
          />
        </button>
        <audio
          controls
          src={currentTrack.file}
          ref={(ref) => {
            if (ref && ref !== currentTrack.audioElement) {
              currentTrack.audioElement = ref;
            }
          }}
        />
      </div>
    </section>
  );
}

export default ProgressBar;
