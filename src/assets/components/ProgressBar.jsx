//eslint-disable-next-line
import React from "react";
import PrevAudio from "../images/left.png";
import Play from "../images/play-button.png";
// import Pause from "../images/pause-button.png";
import NextAudio from "../images/right.png";
import starEmpty from "../images/star-empty.png";

function ProgressBar() {
  // const [currentTrack, setCurrentTrack] = React.useState()
  return (
    <section className="fixed bottom-0 px-8 bg-slate-700 h-16 w-full items-center grid grid-cols-3 grid-rows-1 overflow-hidden">
      <div className="items-center max-w-[90%] overflow-hidden sm:flex sm:gap-3">
        <p className="truncate whitespace-nowrap text-ellipsis">
          title title title title title title title
        </p>
        <button className="shrink-0 w-8">
          <img src={starEmpty} alt="favourite" className="w-6" />
        </button>
      </div>
      <div id="controls" className="flex justify-center gap-4">
        <button>
          <img className="w-8" src={PrevAudio} alt="previous audio" />
        </button>
        <button>
          <img className="w-7" src={Play} alt="play audio" />
        </button>
        {/* <button>
      <img className="w-7" src={Pause} alt="pause audio" />
    </button>   ---> conditional rendering based on if current track is playing!*/}
        <button>
          <img className="w-8" src={NextAudio} alt="next audio" />
        </button>
      </div>
      <p className="justify-self-end">00:00</p>
    </section>
  );
}
export default ProgressBar;
