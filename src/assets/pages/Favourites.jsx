import React from "react";
import FavouritesCard from "../components/FavouritesCard";
import { favourites } from "../utils/localStorage";

function Favourites() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [favouriteEpisodes, setFavouriteEpisodes] = React.useState([]);
  const [sortOption, setSortOption] = React.useState("A-Z");

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
        const sortedEpisodes = handleSortChange(allEpisodes, sortOption);

        setFavouriteEpisodes(sortedEpisodes);
      } catch (err) {
        console.error("Failed to fetch favourite episodes:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFavourites();
  }, [sortOption]);

  const handleSortChange = (episodes, option) => {
    setSortOption(option);
    // Apply sorting logic here based on the selected option
    switch (option) {
      case "A-Z":
        return episodes.sort((a, b) => a.title.localeCompare(b.title));
      case "Z-A":
        return episodes.sort((a, b) => b.title.localeCompare(a.title));
      case "Latest Added":
        return episodes.sort(
          (a, b) => Date.parse(b.dateAdded) - Date.parse(a.dateAdded)
        );
      case "Oldest Added":
        return episodes.sort(
          (a, b) => Date.parse(a.dateAdded) - Date.parse(b.dateAdded)
        );
      default:
        return episodes; // Default unsorted order
    }
  };

  return (
    <div>
      <div className="flex gap-4 items-center">
        <h3>Favourites</h3>
        <label htmlFor="sort-options" className="sr-only">
          Sort by:
        </label>
        <select
          id="sort-options"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="p-2 rounded-lg bg-green-700 text-white"
        >
          <option value="default" disabled>
            Sort by
          </option>
          <option value="A-Z">A-Z</option>
          <option value="Z-A">Z-A</option>
          <option value="Latest Added">Latest Added</option>
          <option value="Oldest Added">Oldest Added</option>
        </select>
      </div>
      <div className="bg-lime-950 p-3">
        {isLoading ? (
          <h3>Loading favourites...</h3>
        ) : favouriteEpisodes.length > 0 ? (
          favouriteEpisodes.map((episode) => (
            <FavouritesCard
              key={episode.uid}
              uid={episode.uid}
              title={episode.title}
              description={episode.description}
              file={episode.file}
              episode={episode.episode}
              dateAdded={episode.dateAdded}
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
