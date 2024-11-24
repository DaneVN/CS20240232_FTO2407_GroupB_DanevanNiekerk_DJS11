//eslint-disable-next-line
import React from "react";
import PrevAudio from "../images/left.png";
import Play from "../images/play-button.png";
// import Pause from "../images/pause-button.png";
import NextAudio from "../images/right.png";

function ProgressBar() {
  // const [currentTrack, setCurrentTrack] = React.useState()
  return (
    <section className="fixed bottom-0 flex justify-between w-full text-center pr-8 bg-slate-700">
      <p>title</p>
      <div id="controls" className="flex justify-center">
        <button>
          <img className="w-8" src={PrevAudio} alt="previous audio" />
        </button>
        <button>
          <img className="w-7" src={Play} alt="previous audio" />
        </button>
        {/* <button>
          <img className="w-7" src={Pause} alt="previous audio" />
        </button>   ---> conditional rendering based on if current track!*/}
        <button>
          <img className="w-8" src={NextAudio} alt="previous audio" />
        </button>
      </div>
      <p>00:00</p>
    </section>
  );
}
export default ProgressBar;
