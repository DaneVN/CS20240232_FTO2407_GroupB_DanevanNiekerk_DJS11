import React from "react";
import LastListened from "../components/LastListened";
import PreviewCard from "../components/PreviewCard";
import loadMore from "../../../public/assets/images/load-more.png";

function Home() {
  // State to hold podcasts
  const [podcasts, setPodcasts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [sortOption, setSortOption] = React.useState("A-Z");

  React.useEffect(() => {
    const fetchAndSortPreviews = async () => {
      try {
        // Fetch podcasts and sort them alphabetically by title
        const response = await fetch("https://podcast-api.netlify.app");
        if (!response.ok) {
          throw new Error(`Failed to fetch show data: ${response.statusText}`);
        }
        const data = await response.json();
        const sortedPodcasts = handleSortChange([...data], sortOption);
        setPodcasts(sortedPodcasts); // Set the sorted podcasts in state
      } catch (err) {
        console.error("Error fetching podcasts:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAndSortPreviews();
  }, [sortOption]);

  const handleSortChange = (data, option) => {
    setSortOption(option);
    // Apply sorting logic here based on the selected option
    console.log(data);
    switch (option) {
      case "A-Z":
        return data.sort((a, b) => a.title.localeCompare(b.title));
      case "Z-A":
        return data.sort((a, b) => b.title.localeCompare(a.title));
      case "Latest Added":
        return data.sort(
          (a, b) => Date.parse(b.updated) - Date.parse(a.updated)
        );
      case "Oldest Added":
        return data.sort(
          (a, b) => Date.parse(a.updated) - Date.parse(b.updated)
        );
      default:
        return data; // Default unsorted order
    }
  };

  return (
    <>
      <h2>You were listening to:</h2>
      <LastListened />
      <br />
      {!loading ? (
        <div
          id="home-podcast-list"
          className="bg-lime-950 p-3 relative sm:grid sm:grid-cols-2 sm:gap-3 md:grid-cols-3"
        >
          <div className="m-3">
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

          <button className="absolute top-1/2 right-0 hover:animate-bounce">
            {/* Add a react-spring animation here later */}
            <img src={loadMore} alt="arrow to the right" className="w-14" />
          </button>
        </div>
      ) : (
        <h3>Loading Podcasts...</h3>
      )}
    </>
  );
}

export default Home;
