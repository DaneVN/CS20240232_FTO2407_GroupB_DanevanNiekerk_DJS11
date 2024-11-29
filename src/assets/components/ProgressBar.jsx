import React from "react";
import { useCurrentTrack } from "../context/CurrentTrackContext";

function ProgressBar() {
  const { currentTrack, handlePausePlay, audioRef } = useCurrentTrack();

  React.useEffect(() => {
    if (audioRef.current && Number.isFinite(currentTrack.timeStamp)) {
      audioRef.current.currentTime = currentTrack.timeStamp;
    }
  }, [currentTrack.timeStamp, audioRef]);

  //keep if statement down here (useEffect can't be called conditionally)
  if (!currentTrack) {
    return null;
  } else {
    window.addEventListener("beforeunload", function (e) {
      e.preventDefault();
      e.returnValue = "";
    });
  } // Show nothing if no track is playing else setup eventListener

  return (
    <section className="fixed bottom-0 px-8 bg-green-900 h-16 w-full items-center grid grid-cols-3 grid-rows-1 overflow-hidden">
      <div className="items-center max-w-[90%] overflow-hidden sm:flex sm:gap-3">
        <p className="truncate whitespace-nowrap text-ellipsis">
          {currentTrack.title || "No track playing"}
        </p>
      </div>
      <div id="controls" className="col-span-2 flex justify-end gap-4">
        <audio
          controls
          ref={(ref) => {
            if (ref && ref !== audioRef.current) {
              audioRef.current = ref;
            }
          }}
          onPause={handlePausePlay}
          onPlay={handlePausePlay}
        />
      </div>
    </section>
  );
}

export default ProgressBar;
