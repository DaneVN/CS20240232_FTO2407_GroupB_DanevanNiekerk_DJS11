import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import fetchGenreNames from "../utils/genresTest";

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
  const [genresStrings, setGenresStrings] = React.useState([]); // State to store fetched genres
  const descriptionRef = React.useRef(null); // Reference to the description element

  const dateString = new Date(updated.slice(0, 10));
  const updatedParsed = dateString.toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  // Fetch genres on component mount
  React.useEffect(() => {
    const fetchGenres = async () => {
      const genreIds = Array.from({ length: 9 }, (_, i) => i + 1); // IDs [1, 2, ..., 9]
      const results = [];

      for (const id of genreIds) {
        try {
          const genre = await fetchGenreNames(id);
          // Fetch one at a time Because Promise.all bundeling was causing a
          //net::ERR_INSUFFICIENT_RESOURCES error using sequential instead,
          //until I can working on refactoring.
          results.push(genre);
        } catch (error) {
          console.error(`Error fetching genre with ID ${id}:`, error);
          results.push([id, null]); // Push null if fetch fails
        }
      }

      setGenresStrings(results);
    };

    fetchGenres().catch((error) =>
      console.error("Error fetching genres sequentially:", error)
    );
  }, []);

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
          <div className="lg:col-span-2 flex flex-col items-center justify-evenly">
            <Link to={`show/${showId}`}>
              <h2 className="mb-4">{title}</h2>
            </Link>
            <div className="mb-2 relative">
              <p
                ref={descriptionRef}
                className={`transition-all ${
                  isExpanded ? "line-clamp-none" : "line-clamp-3"
                } w-full`}
              >
                {description}
              </p>
              {/* Toggle Button */}
              {isOverflowing && (
                <button
                  onClick={() => setIsExpanded((prev) => !prev)}
                  className=" text-green-950 font-extrabold italic underline mt-2"
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
                  genres.map((genreNum) => {
                    const genre = genresStrings.find(([id]) => id === genreNum);
                    return (
                      <li
                        id="genre"
                        key={genreNum}
                        className="bg-slate-800 rounded-3xl px-3 py-1"
                      >
                        {genre ? genre[1] : "Unknown Genre"}
                      </li>
                    );
                  })}
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
