import React from "react";
import PropTypes from "prop-types";
import { favourites } from "../utils/localStorage.jsx";
import starFull from "../images/star-full.png";
import starEmpty from "../images/star-empty.png";
import { useCurrentTrack } from "../context/CurrentTrackContext";

function EpisodeCard({ showId, seasonId, episode, title, description, file }) {
  const [isFavourite, setIsFavourite] = React.useState(false);
  const EpisodeUid = `${showId}-${seasonId}-${episode}`; // Unique identifier
  const { currentTrack, playTrack, togglePlayPause } = useCurrentTrack();

  // Sync initial state with local storage
  React.useEffect(() => {
    setIsFavourite(favourites.checkFavourites(EpisodeUid));
  }, [EpisodeUid]);

  const handleToggleFavourite = () => {
    favourites.toggleFavouriteLS(EpisodeUid);
    setIsFavourite(!isFavourite);
  };

  const isCurrentTrack = currentTrack.EpisodeUid === EpisodeUid;

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
        <button
          onClick={() =>
            isCurrentTrack
              ? togglePlayPause()
              : playTrack({ title, file, EpisodeUid })
          }
        >
          {isCurrentTrack && currentTrack.isPlaying ? "Pause" : "Play"}
        </button>
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
