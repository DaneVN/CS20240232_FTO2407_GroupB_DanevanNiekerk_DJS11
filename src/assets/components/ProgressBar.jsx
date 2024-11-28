import React from "react";
import { trackHistory } from "../utils/localStorage";
import starEmpty from "../images/star-empty.png";
import starFull from "../images/star-full.png";

function ProgressBar() {
  const [trackList, setTrackList] = React.useState(trackHistory.fiveLatest); // Initialize from localStorage
  const currentTrack = trackList[trackList.length - 1]; // Last played track

  React.useEffect(() => {
    // Function to sync state with localStorage
    const syncTrackHistory = () => {
      const storedHistory =
        JSON.parse(localStorage.getItem("trackHistory")) || [];
      setTrackList(storedHistory);
    };

    // Listen for changes to localStorage
    window.addEventListener("storage", syncTrackHistory);

    // Cleanup listener on unmount
    return () => {
      window.removeEventListener("storage", syncTrackHistory);
    };
  }, [currentTrack]);

  if (!currentTrack) {
    return null; // No track playing, don't render the progress bar
  }

  return (
    <section className="fixed bottom-0 px-8 bg-slate-700 h-16 w-full items-center grid grid-cols-3 grid-rows-1 overflow-hidden">
      <div className="items-center max-w-[90%] overflow-hidden sm:flex sm:gap-3">
        <p className="truncate whitespace-nowrap text-ellipsis">
          {currentTrack.title || "Unknown Title"}
        </p>
        <button className="shrink-0 w-8">
          <img
            src={currentTrack.isFavourite ? starFull : starEmpty}
            alt={
              currentTrack.isFavourite
                ? "Remove from favourites"
                : "Add to favourites"
            }
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
