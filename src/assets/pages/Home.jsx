import React from "react";
import LastListened from "../components/LastListened";
import PreviewCard from "../components/PreviewCard";

function Home() {
  // State to hold podcasts
  const [podcasts, setPodcasts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [sortOption, setSortOption] = React.useState("A-Z");
  const [genres, setGenres] = React.useState([]);
  const [genreNames, setGenreNames] = React.useState([]);
  const [filterOption, setFilterOption] = React.useState("");

  React.useEffect(() => {
    setLoading(true);
    const fetchAndSortPreviews = async () => {
      try {
        // Fetch podcasts and sort them alphabetically by title
        const response = await fetch("https://podcast-api.netlify.app");
        if (!response.ok) {
          throw new Error(`Failed to fetch show data: ${response.statusText}`);
        }
        const data = await response.json();
        const sortedPodcasts = handleSortChange([...data], sortOption);
        const filteredPodcasts = handleFilterChange(
          sortedPodcasts,
          filterOption
        );

        setPodcasts(filteredPodcasts); // Set the sorted podcasts in state

        setGenres(() => getUniqueGenres(sortedPodcasts));
      } catch (err) {
        console.error("Error fetching podcasts:", err);
      } finally {
        setLoading(false);
      }
    };

    const getUniqueGenres = (data) => {
      const genres = data.flatMap((show) => show.genres);
      return [...new Set(genres)].sort();
    };

    fetchAndSortPreviews();
  }, [sortOption, filterOption]);

  React.useEffect(() => {
    const fetchAllGenres = async () => {
      try {
        const genrePromises = genres.map(async (id) => {
          const response = await fetch(
            `https://podcast-api.netlify.app/genre/${id}`
          );
          if (!response.ok) throw new Error(`Failed to fetch genre ${id}`);

          const data = await response.json();
          return { id, title: data.title };
        });

        const resolvedGenres = await Promise.all(genrePromises);
        const genreMap = resolvedGenres.reduce((acc, { id, title }) => {
          acc[id] = title;
          return acc;
        }, {});

        setGenreNames(genreMap);
      } catch (err) {
        console.error("Error fetching genre names:", err);
      }
    };

    if (genres.length > 0) fetchAllGenres();
  }, [genres]);

  const handleSortChange = (data, option) => {
    switch (option) {
      case "A-Z":
        return [...data].sort((a, b) => a.title.localeCompare(b.title));
      case "Z-A":
        return [...data].sort((a, b) => b.title.localeCompare(a.title));
      case "Recently updated":
        return [...data].sort(
          (a, b) => Date.parse(b.updated) - Date.parse(a.updated)
        );
      case "Oldest Updated":
        return [...data].sort(
          (a, b) => Date.parse(a.updated) - Date.parse(b.updated)
        );
      case "default":
        return data;
    }
  };

  const handleFilterChange = (shows, option) => {
    if (!option || option === "default") return shows;
    return [...shows].filter((show) => show.genres.includes(option));
  };

  return (
    <>
      <h2>You were listening to:</h2>
      <LastListened />
      <br />
      <div className="m-3 flex justify-evenly">
        <div id="sorting">
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
            <option value="Latest Added">Latest Added</option>
            <option value="Oldest Added">Oldest Added</option>
          </select>
        </div>
        <div id="genre-filter">
          <label htmlFor="filter-options" className="sr-only">
            Filter Genre:
          </label>
          <select
            id="filter-options"
            value={filterOption}
            onChange={(e) => setFilterOption(e.target.value)}
            className="p-2 rounded-lg bg-green-700 text-white"
          >
            <option value="default">
              {genres.length === 0 ? "Loading genres..." : "Filter Genre"}
            </option>
            {genres.length > 0 ? (
              genres.map((genre) => (
                <option key={`genre-${genre}`} value={genre}>
                  {genreNames[genre] || `Genre ${genre}`}
                </option>
              ))
            ) : (
              <option disabled>Loading genres...</option>
            )}
          </select>
        </div>
      </div>
      {!loading ? (
        <div
          id="home-podcast-list"
          className="bg-lime-950 p-3 relative sm:grid sm:grid-cols-2 sm:gap-3 md:grid-cols-3"
        >
          {/* Render sorted podcasts */}
          {podcasts.map((show) => {
            return (
              <PreviewCard
                key={show.id}
                showId={show.id}
                description={show.description}
                genres={show.genres}
                image={show.image}
                seasons={show.seasons}
                title={show.title}
                updated={show.updated}
              />
            );
          })}

          {/* Add a react-spring animation here later */}
          {/* <button className="absolute top-1/2 right-0 hover:animate-bounce">
            <img src={loadMore} alt="arrow to the right" className="w-14" />
          </button> */}
        </div>
      ) : (
        <h3>Loading Podcasts...</h3>
      )}
    </>
  );
}

export default Home;
