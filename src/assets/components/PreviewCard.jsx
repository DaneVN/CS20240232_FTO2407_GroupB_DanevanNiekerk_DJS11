//eslint-disable-next-line
import React from "react";
import PropTypes from "prop-types";

function PreviewCard({
  description,
  genres = [],
  image,
  seasons,
  title,
  updated,
}) {
  //fetch genre api
  return (
    <>
      <div className="bg-lime-900 rounded-lg p-4 mb-6 flex flex-col gap-4 md:col-span-1 lg:col-span-1 lg:grid lg:grid-cols-3 lg:gap-4">
        <div className="mb-4">
          <img
            className="self-center rounded-lg"
            src={image}
            alt="show banner/cover"
          />
        </div>
        <div className="col-span-2 flex flex-col items-center justify-evenly">
          <h2 className="mb-4">{title}</h2>
          <p className="mb-2 h-16 truncate whitespace-normal text-ellipsis">
            {description}
          </p>
          <div className="flex gap-4 justify-center flex-wrap mb-2">
            <p>{seasons ? `${seasons} Seasons` : "No seasons available"}</p>
            <p>|</p>
            <p>Updated: {updated.slice(0, 10)}</p>
          </div>
          <div id="genre-list">
            <ul className="list-none flex gap-2 justify-center flex-wrap">
              {Array.isArray(genres) &&
                genres.map((genre) => (
                  <li
                    id="genre"
                    key={genre}
                    className="bg-slate-800 rounded-3xl px-3 py-1"
                  >
                    {genre}
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

//Fixing ESlint bug on props destructuring: 'description/genre/etc' is missing in props validation
// Define prop types for validation
PreviewCard.propTypes = {
  description: PropTypes.string,
  genres: PropTypes.arrayOf(PropTypes.number),
  image: PropTypes.string,
  seasons: PropTypes.number,
  title: PropTypes.string,
  updated: PropTypes.string,
};

export default PreviewCard;
