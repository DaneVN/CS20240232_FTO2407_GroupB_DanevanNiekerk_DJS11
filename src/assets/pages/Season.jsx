//eslint-disable-next-line
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
  const { showId, seasonId } = useParams();

  React.useEffect(() => {
    if (!showId) return; // Do nothing if showId is undefined

    // Fetch seasons and display based on URL parameter
    fetch(`https://podcast-api.netlify.app/id/${showId}`)
      .then((res) => res.json())
      .then((data) => {
        setSeason(data.seasons[seasonId - 1]);
      })
      .catch((err) => console.error("Error fetching show:", err));
  }, [showId, seasonId]);
  // dependencies = url changes = re-render on page(show/season) change

  return (
    <section id="episode-list" className="bg-lime-950 p-3 mt-10">
      {season.episodes.map((episode) => {
        return (
          <EpisodeCard
            key={episode.episode}
            episode={episode.episode}
            title={episode.title}
            description={episode.description}
            file={episode.file}
          />
        );
      })}
    </section>
  );
}
export default Season;
