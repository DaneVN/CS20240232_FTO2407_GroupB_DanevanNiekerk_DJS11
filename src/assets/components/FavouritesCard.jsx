import React from "react";
import starFull from "../../../public/assets/images/star-full.png";
import starEmpty from "../../../public/assets/images/star-empty.png";
import { favourites } from "../utils/localStorage";
import PropTypes from "prop-types";

function FavouritesCard({
  episode,
  title,
  description,
  file,
  dateAdded,
  seasonTitle,
  showTitle,
}) {
  const episodeUid = `${episode}`;
  const [isFavourite, setIsFavourite] = React.useState(
    favourites.checkFavourites(episodeUid)
  );

  const handleToggleFavourite = () => {
    favourites.toggleFavouriteLS(episodeUid);
    setIsFavourite(!isFavourite);
  };

  return (
    <>
      <div className="mb-4 flex justify-between sm:justify-start sm:gap-4">
        <h2 className="text-lg font-bold">
          {title} (Episode {episode})
        </h2>
        <button onClick={handleToggleFavourite}>
          <img
            className="w-6"
            src={isFavourite ? starFull : starEmpty}
            alt={isFavourite ? "Remove from favourites" : "Add to favourites"}
          />
        </button>
      </div>
      <div className="text-sm italic bg-lime-900 rounded-lg p-4">
        <p className="text-sm italic">
          From: {showTitle} - {seasonTitle}
        </p>
        <p className="text-sm mb-2">
          Added on: {new Date(dateAdded).toLocaleString()}
        </p>
        <p className="mb-2">{description}</p>
        <audio controls>
          <source src={file} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </div>
    </>
  );
}
// Define prop types for validation
FavouritesCard.propTypes = {
  episode: PropTypes.number,
  title: PropTypes.string,
  description: PropTypes.string,
  file: PropTypes.string,
  dateAdded: PropTypes.string,
  image: PropTypes.string,
  seasonTitle: PropTypes.string,
  showTitle: PropTypes.string,
};

export default FavouritesCard;
