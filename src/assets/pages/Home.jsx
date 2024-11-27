import React from "react";
import LastListened from "../components/LastListened";
import PreviewCard from "../components/PreviewCard";
import loadMore from "../../../public/assets/images/load-more.png";

function Home() {
  // State to hold podcasts
  const [podcasts, setPodcasts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchAndSortPreviews = async () => {
      try {
        // Fetch podcasts and sort them alphabetically by title
        const response = await fetch("https://podcast-api.netlify.app");
        if (!response.ok) {
          throw new Error(`Failed to fetch show data: ${response.statusText}`);
        }
        const data = await response.json();
        const sortedPodcasts = [...data].sort((a, b) =>
          a.title.localeCompare(b.title)
        );
        setPodcasts(sortedPodcasts); // Set the sorted podcasts in state
      } catch (err) {
        console.error("Error fetching podcasts:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAndSortPreviews();
  }, []);

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
