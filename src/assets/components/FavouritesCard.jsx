import React from "react";
import starFull from "../../../public/assets/images/star-full.png";
import starEmpty from "../../../public/assets/images/star-empty.png";
import { favourites } from "../utils/localStorage";

//eslint-disable-next-line
function FavouritesCard({ episode, title, description, file }) {
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

//when sorting from last updated use Date.parse("String here") ;
//It returns the number of milliseconds since the string entered
export default FavouritesCard;
