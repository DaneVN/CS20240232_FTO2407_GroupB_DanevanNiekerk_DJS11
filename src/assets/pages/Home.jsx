import React from "react";
import LastListened from "../components/LastListened";
import PreviewCard from "../components/PreviewCard";
import { Link } from "react-router-dom";
import loadMore from "../images/load-more.png";

function Home() {
  // State to hold podcasts
  const [podcasts, setPodcasts] = React.useState([]);
  React.useEffect(() => {
    // Fetch podcasts and sort them alphabetically by title
    fetch("https://podcast-api.netlify.app")
      .then((res) => res.json())
      .then((data) => {
        const sortedPodcasts = [...data].sort((a, b) =>
          a.title.localeCompare(b.title)
        );
        setPodcasts(sortedPodcasts); // Set the sorted podcasts in state
      })
      .catch((err) => console.error("Error fetching podcasts:", err));
  }, []);

  return (
    <>
      <h2>You were listening to:</h2>
      <LastListened />
      <br />
      <div id="home-podcast-list" className="bg-lime-950 p-3 relative">
        {/* Render sorted podcasts */}
        {console.log("1")}
        {podcasts.map(
          // ({ id, title, description, seasons, image, genres, updated }) => {
          (show) => {
            return (
              <Link
                to={`show/${show.id}`}
                key={show.id}
                onClick={() => console.log(`Navigating to show/${show.id}`)}
              >
                <PreviewCard
                  description={show.description}
                  genres={show.genres || []}
                  image={show.image}
                  seasons={show.seasons}
                  title={show.title}
                  updated={show.updated}
                />
              </Link>
            );
          }
        )}

        <button className="absolute top-1/2 right-0 hover:animate-bounce">
          {/* Add a react-spring animation here later */}
          <img src={loadMore} alt="arrow to the right" className="w-14" />
        </button>
      </div>
    </>
  );
}

export default Home;
