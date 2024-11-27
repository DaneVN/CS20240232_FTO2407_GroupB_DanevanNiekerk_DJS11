import React from "react";
import SortImg from "../../../public/assets/images/sort.png";
import placeholderImage from "../../../public/assets/images/sort.png";
import FavouritesCard from "../components/FavouritesCard";
import { favourites } from "../utils/localStorage";

function Favourites() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [favouriteEpisodes, setFavouriteEpisodes] = React.useState([]);
  const [sortOption, setSortOption] = React.useState("default"); // Placeholder for sorting options

  React.useEffect(() => {
    const episodesList = favourites.episodes; // Array of episode UIDs
    const showIds = [...new Set(episodesList.map((uid) => uid.split("-")[0]))]; // Extract unique showIds
    const episodesCache = new Map(); // Local cache to store API data
    const fetchFavourites = async () => {
      try {
        const allEpisodes = [];

        for (const showId of showIds) {
          // Check cache to avoid duplicate API calls
          if (!episodesCache.has(showId)) {
            const response = await fetch(
              `https://podcast-api.netlify.app/id/${showId}`
            );
            if (!response.ok) {
              throw new Error(
                `Failed to fetch show data for showId: ${showId}`
              );
            }
            const data = await response.json();
            episodesCache.set(
              showId,
              data.seasons?.flatMap((season, index) =>
                season.episodes.map((ep) => ({
                  ...ep,
                  showId,
                  seasonId: index + 1, // Add season index as seasonId
                  seasonTitle: season.title, // Include season title
                  showTitle: data.title, // Include show title
                }))
              ) || []
            );
          }

          // Fetch and map episodes for this showId
          const showEpisodes = episodesCache.get(showId);
          const filteredEpisodes = episodesList
            .filter((uid) => uid.startsWith(showId))
            .map((uid) => {
              const episodeId = parseInt(uid.split("-")[2], 10);
              const episodeData = showEpisodes.find(
                (ep) => ep.episode === episodeId
              );
              const dateAdded = new Date(); // Replace with your logic for date
              return episodeData
                ? { ...episodeData, uid, dateAdded: dateAdded.toISOString() }
                : null;
            })
            .filter(Boolean); // Remove null values

          allEpisodes.push(...filteredEpisodes);
        }

        // Apply sorting logic here
        const sortedEpisodes = allEpisodes; // Replace with custom sorting logic if needed

        setFavouriteEpisodes(sortedEpisodes);
      } catch (err) {
        console.error("Failed to fetch favourite episodes:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFavourites();
  }, []);

  const handleSortChange = (option) => {
    setSortOption(option);
    // Apply sorting logic here based on the selected option
  };

  return (
    <div>
      <div className="flex gap-4">
        <h3>Favourites</h3>
        <button className="w-6" onClick={() => handleSortChange("someOption")}>
          <img src={SortImg} alt="Sort by" />
        </button>
      </div>
      <div className="bg-lime-950 p-3">
        {isLoading ? (
          <h3>Loading favourites...</h3>
        ) : favouriteEpisodes.length > 0 ? (
          favouriteEpisodes.map((episode) => (
            <FavouritesCard
              key={episode.uid}
              title={episode.title}
              description={episode.description}
              file={episode.file}
              episode={episode.episode}
              dateAdded={episode.dateAdded}
              image={episode.image || placeholderImage}
              seasonTitle={episode.seasonTitle}
              showTitle={episode.showTitle}
            />
          ))
        ) : (
          <h3>No favourite episodes found</h3>
        )}
      </div>
    </div>
  );
}

export default Favourites;
