//eslint-disable-next-line
import React, { useState, useEffect } from "react";
import starFull from "../images/star-full.png";
import starEmpty from "../images/star-empty.png";
import { favourites } from "../utils/localStorage.jsx";
import PropTypes from "prop-types";

function EpisodeCard({ showId, seasonId, episode, title, description, file }) {
  const EpisodeUid = `${showId}-${seasonId}-${episode}`;
  const [isFavourite, setIsFavourite] = useState(false);

  // Sync initial state with local storage
  useEffect(() => {
    setIsFavourite(favourites.checkFavourites(EpisodeUid));
  }, [EpisodeUid]);

  const handleToggleFavourite = () => {
    favourites.toggleFavouriteLS(EpisodeUid);
    setIsFavourite(!isFavourite); // Update local UI state
  };

  return (
    <>
      <div className="mb-4 flex justify-between sm:justify-start sm:gap-4">
        <h2>
          Episode {episode}: {title}
        </h2>
        <button onClick={handleToggleFavourite}>
          <img
            className="w-6 sm:h-6"
            src={isFavourite ? starFull : starEmpty}
            alt={isFavourite ? "Remove from favourites" : "Add to favourites"}
          />
        </button>
      </div>
      <div className="bg-lime-900 rounded-lg p-4">
        <p className="mb-2">{description}</p>
        <audio controls>
          <source src={file} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </div>
    </>
  );
}

// Prop validation
EpisodeCard.propTypes = {
  showId: PropTypes.string.isRequired,
  seasonId: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  episode: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  file: PropTypes.string.isRequired,
};

export default EpisodeCard;
