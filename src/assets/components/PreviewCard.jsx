import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function PreviewCard({
  showId,
  description,
  genres = [],
  image,
  seasons,
  title,
  updated,
}) {
  const [isExpanded, setIsExpanded] = React.useState(false); // Toggle expanded state
  const [isOverflowing, setIsOverflowing] = React.useState(false); // Check if text overflows
  const descriptionRef = React.useRef(null); // Reference to the description element

  //NO HARDCODED STUFF!!!
  const genresStrings = [
    [1, "Personal Growth"],
    [2, "Investigative Journalism"],
    [3, "History"],
    [4, "Comedy"],
    [5, "Entertainment"],
    [6, "Business"],
    [7, "Fiction"],
    [8, "News"],
    [9, "Kids and Family"],
  ];

  const dateString = new Date(updated.slice(0, 10));
  const updatedParsed = dateString.toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  // Check for overflow after the component renders
  React.useEffect(() => {
    if (descriptionRef.current) {
      setIsOverflowing(
        descriptionRef.current.scrollHeight >
          descriptionRef.current.clientHeight
      );
    }
  }, [description]);

  return (
    <div className="bg-lime-900 rounded-lg p-4 mb-6 flex flex-col gap-4 md:col-span-1 lg:col-span-1 lg:grid lg:grid-cols-3 lg:gap-4">
      {image ? (
        <>
          <Link to={`show/${showId}`} key={showId}>
            <div className="mb-4">
              <img
                className="self-center rounded-lg"
                src={image}
                alt="show banner/cover"
              />
            </div>
          </Link>
          <div className="col-span-2 flex flex-col items-center justify-evenly">
            <Link to={`show/${showId}`}>
              <h2 className="mb-4">{title}</h2>
            </Link>
            <div className="mb-2 relative">
              <p
                ref={descriptionRef}
                className={`transition-all ${
                  isExpanded ? "line-clamp-none" : "line-clamp-3"
                }`}
              >
                {description}
              </p>
              {/* Toggle Button */}
              {isOverflowing && (
                <button
                  onClick={() => setIsExpanded((prev) => !prev)}
                  className="text-blue-500 underline mt-2"
                >
                  {isExpanded ? "Show Less" : "Show More"}
                </button>
              )}
            </div>
            <div className="flex gap-2 justify-center flex-wrap mb-2">
              <p>{seasons ? `${seasons} Seasons` : "No seasons available"}</p>
              <p>|</p>
              <p>Updated: {updatedParsed}</p>
            </div>
            <div id="genre-list">
              <ul className="list-none flex gap-2 justify-center flex-wrap">
                {Array.isArray(genres) &&
                  genres.map((genreNum) => (
                    <li
                      id="genre"
                      key={genreNum}
                      className="bg-slate-800 rounded-3xl px-3 py-1"
                    >
                      {genresStrings[genreNum - 1][1]}
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </>
      ) : (
        <h3>Loading preview...</h3>
      )}
    </div>
  );
}

//Fixing ESlint bug on props destructuring: 'description/genre/etc' is missing in props validation
// Define prop types for validation
PreviewCard.propTypes = {
  showId: PropTypes.string,
  description: PropTypes.string,
  genres: PropTypes.arrayOf(PropTypes.number),
  image: PropTypes.string,
  seasons: PropTypes.number,
  title: PropTypes.string,
  updated: PropTypes.string,
};

export default PreviewCard;
