import React from "react";
import starFull from "../../../public/assets/images/star-full.png";
import starEmpty from "../../../public/assets/images/star-empty.png";
import PropTypes from "prop-types";

function EpisodeCard({ episode, title, description, file }) {
  const [favourite, setFavourite] = React.useState();

  function toggleFavourite() {
    setFavourite(!favourite);
  }

  return (
    <>
      <div className="mb-4 flex justify-between sm:justify-start sm:gap-4">
        <h2>
          Episode {episode}: {title}
        </h2>
        <button onClick={toggleFavourite}>
          <img
            className="w-6 sm: h-6"
            src={favourite ? starFull : starEmpty}
            alt="favourite"
          />
        </button>
      </div>
      <div className="bg-lime-900 rounded-lg p-4">
        <p className="mb-22">{description}</p>
        <audio controls>
          <source src={file} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
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
