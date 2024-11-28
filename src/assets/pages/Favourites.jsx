import React from "react";
import FavouritesCard from "../components/FavouritesCard";
import { favourites } from "../utils/localStorage";

function Favourites() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [favouriteEpisodes, setFavouriteEpisodes] = React.useState([]);
  const [sortOption, setSortOption] = React.useState("A-Z");

  React.useEffect(() => {
    setIsLoading(true);
    const episodesList = favourites.episodes; // Array of episode UIDs
    const showIds = [...new Set(episodesList.map((uid) => uid.split("-")[0]))]; // Extract unique showIds
    const episodesCache = new Map(); // Local cache to store API data
    const fetchFavourites = async () => {
      try {
        const allEpisodes = [];
        const fetchPromises = showIds.map(async (showId) => {
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
                  seasonId: index + 1,
                  seasonTitle: season.title,
                  showTitle: data.title,
                  lastUpdated: data.updated,
                }))
              ) || []
            );
          }
          return episodesCache.get(showId);
        });

        const fetchedShows = await Promise.all(fetchPromises);

        fetchedShows.forEach((showEpisodes, i) => {
          const filteredEpisodes = episodesList
            .filter((uid) => uid.startsWith(showIds[i]))
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
            .filter(Boolean);
          allEpisodes.push(...filteredEpisodes);
        });

        const sortedEpisodes = handleSortChange(allEpisodes, sortOption);

        // Group episodes by show
        const showGrouped = sortedEpisodes.reduce((acc, episode) => {
          const { showTitle } = episode;
          if (!acc[showTitle]) acc[showTitle] = [];
          acc[showTitle].push(episode);
          return acc;
        }, {});

        // Group episodes by season within each show
        const groupedEpisodes = Object.entries(showGrouped).map(
          ([showTitle, episodes]) => {
            const seasons = episodes.reduce((seasonAcc, episode) => {
              const { seasonId } = episode;
              if (!seasonAcc[seasonId]) seasonAcc[seasonId] = [];
              seasonAcc[seasonId].push(episode);
              return seasonAcc;
            }, {});

            return {
              showTitle,
              seasons,
            };
          }
        );

        setFavouriteEpisodes(groupedEpisodes);
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
    //use spread operator to make a shallow copy of OG array before sorting
    switch (option) {
      case "A-Z":
        return [...episodes].sort((a, b) => a.title.localeCompare(b.title));
      case "Z-A":
        return [...episodes].sort((a, b) => b.title.localeCompare(a.title));
      case "Recently Updated":
        return [...episodes].sort(
          (a, b) => Date.parse(b.lastUpdated) - Date.parse(a.lastUpdated)
        );
      case "Oldest Updated":
        return [...episodes].sort(
          (a, b) => Date.parse(a.lastUpdated) - Date.parse(b.lastUpdated)
        );
      case "default":
        return episodes;
      //and just in case
      default:
        return episodes;
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
          <option value="default">Sort by</option>
          <option value="A-Z">A-Z</option>
          <option value="Z-A">Z-A</option>
          <option value="Latest Updated">Latest Updated</option>
          <option value="Oldest Updated">Oldest Updated</option>
        </select>
      </div>
      <div className="bg-lime-950 p-3">
        {isLoading ? (
          <h3>Loading favourites...</h3>
        ) : favouriteEpisodes.length > 0 ? (
          favouriteEpisodes.map((showObj) => (
            <section id="show" key={showObj.showTitle} className="mb-14">
              <h3 className="bg-green-800 p-3">{showObj.showTitle}</h3>
              <div id="season">
                {Object.entries(showObj.seasons).map(([seasonId, episodes]) => (
                  <div key={seasonId}>
                    <h4 className="bg-green-500 p-3 mb-3">Season {seasonId}</h4>
                    {episodes.map((episode) => (
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
                    ))}
                  </div>
                ))}
              </div>
            </section>
          ))
        ) : (
          <h3>No favourite episodes found</h3>
        )}
      </div>
    </div>
  );
}

export default Favourites;
