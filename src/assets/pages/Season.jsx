import React from "react";
import EpisodeCard from "../components/EpisodeCard";
import { useParams } from "react-router-dom";

function Season() {
  //get the episode list to send data through props or just take it directly through
  //to episode component from show page
  const [season, setSeason] = React.useState({
    season: Number,
    title: "",
    image: "",
    episodes: [],
  });
  const [loading, setLoading] = React.useState(true);
  const { showId, seasonId } = useParams();

  React.useEffect(() => {
    const fetchShowData = async () => {
      if (!showId) return; // Do nothing if showId is undefined

      try {
        const response = await fetch(
          `https://podcast-api.netlify.app/id/${showId}`
        );
        if (!response.ok) {
          throw new Error(`Failed to fetch show data: ${response.statusText}`);
        }
        const data = await response.json();
        setSeason(data.seasons[seasonId - 1]);
      } catch (err) {
        console.error("Error fetching show:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchShowData();
  }, [showId, seasonId]);
  // dependencies = url changes = re-render on page(show/season) change

  return (
    <div>
      {!loading ? (
        <>
          <div className="relative">
            <h3 className="absolute top-0 left-[25%] bg-green-500 px-2 my-4 rounded-lg">
              Season {seasonId}
            </h3>
            <img
              src={season.image}
              alt="Season cover"
              className="w-[70%] mx-auto mt-4 rounded-md"
            />
          </div>
          <section id="episode-list" className="bg-lime-950 p-3 mt-10">
            {season.episodes.map((episode) => (
              <EpisodeCard
                key={episode.episode}
                showId={showId}
                seasonId={seasonId}
                episode={episode.episode}
                title={episode.title}
                description={episode.description}
                file={episode.file}
              />
            ))}
          </section>
        </>
      ) : (
        <h2>Loading episodes...</h2>
      )}
    </div>
  );
}
export default Season;
