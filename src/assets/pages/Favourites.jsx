import React from "react";
import SortImg from "../../../public/assets/images/sort.png";
import placeholderImage from "../../../public/assets/images/sort.png";
import FavouritesCard from "../components/FavouritesCard";
import { favourites } from "../utils/localStorage";

function Favourites() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [favouriteEpisodes, setFavouriteEpisodes] = React.useState([]);

  React.useEffect(() => {
    const episodesList = favourites.episodes; // Array of episode UIDs
    const showIds = [...new Set(episodesList.map((uid) => uid.split("-")[0]))]; // Extract unique showIds
    const episodesMap = new Map(); // Cache for episodes data

    async function fetchData() {
      try {
        const allEpisodes = [];

        for (const showId of showIds) {
          // Skip API call if the showId is already cached
          if (!episodesMap.has(showId)) {
            const res = await fetch(
              `https://podcast-api.netlify.app/id/${showId}`
            );
            if (!res.ok)
              throw new Error(`Failed to fetch data for show ${showId}`);

            const data = await res.json();

            // Validate the structure of the response
            if (!data.seasons || !Array.isArray(data.seasons)) {
              console.warn(`No seasons found for showId: ${showId}`);
              episodesMap.set(showId, []); // Cache as an empty array to avoid re-fetching
              continue;
            }

            // Flatten all episodes from all seasons and cache them
            const allShowEpisodes = data.seasons.flatMap(
              (season) => season.episodes
            );
            episodesMap.set(showId, allShowEpisodes);
          }

          const showEpisodes = episodesMap.get(showId);
          if (!showEpisodes || showEpisodes.length === 0) continue; // Skip if no episodes

          // Filter episodes based on `episodesList`
          const filteredEpisodes = episodesList
            .filter((uid) => uid.startsWith(showId))
            .map((uid) => {
              const episodeId = parseInt(uid.split("-")[2], 10);

              const episodeData = showEpisodes.map(
                (ep) => ep.episode == episodeId
              );

              const dateAdded = new Date().toLocaleString("en-UK");

              return episodeData ? { ...episodeData, uid, dateAdded } : null; // Add uid to the episode object
            })
            .filter(Boolean);
          allEpisodes.push(...filteredEpisodes);
        }

        setFavouriteEpisodes(allEpisodes.flat());
      } catch (err) {
        console.error("Failed to fetch favourite episodes:", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <>
      <div className="flex gap-4">
        <h3>Favourites</h3>
        <button className="w-6">
          <img src={SortImg} alt="Sort by" />
          {/* Dropdown with sorting options */}
        </button>
      </div>
      <div className="bg-lime-950 p-3">
        <div>
          {isLoading && <h3>Loading favourites...</h3>}
          {!isLoading && favouriteEpisodes.length > 0 ? (
            favouriteEpisodes.map((episode) => (
              <FavouritesCard
                key={episode.uid} // Unique key
                title={episode.title}
                description={episode.description}
                file={episode.file}
                episode={episode.episode}
                image={episode.image || placeholderImage}
              />
            ))
          ) : (
            <h3>No favourite episodes found</h3>
          )}
        </div>
      </div>
    </>
  );
}

export default Favourites;
