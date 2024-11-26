//eslint-disable-next-line
import React from "react";
// import starFull from "../../../public/assets/images/star-full.png";
import starEmpty from "../../../public/assets/images/star-empty.png";
import playBtn from "../../../public/assets/images/play-button.png";
import PropTypes from "prop-types";

function EpisodeCard({ episode, title, description, file }) {
  return (
    <>
      <div className="mb-4 flex justify-between sm:justify-start sm:gap-4">
        <h2>
          Episode {episode}: {title}
        </h2>
        <img className="w-6 sm: h-6" src={starEmpty} alt="favourite" />
      </div>
      <div className="bg-lime-900 rounded-lg p-4 flex flex-col gap-4 sm:grid sm:grid-cols-3 sm:gap-4">
        <button className="max-w-12">
          <img src={playBtn} alt="play Audio" width={48} />
          <p>{file}</p>
        </button>
        <div className="col-span-2 flex flex-col items-start justify-evenly">
          <p className="mb-2">{description}</p>
          <div className="flex gap-2 justify-start flex-wrap mb-2">
            <p>00:00</p>
          </div>
        </div>
      </div>
    </>
  );
}

//Fixing ESlint bug on props destructuring: 'description/genre/etc' is missing in props validation
// Define prop types for validation
EpisodeCard.propTypes = {
  description: PropTypes.string,
  episode: PropTypes.number,
  title: PropTypes.string,
  file: PropTypes.string,
};

export default EpisodeCard;
