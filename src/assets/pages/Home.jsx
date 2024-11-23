//eslint-disable-next-line
import React from "react";
import LastListened from "../components/LastListened";

export default function Home() {
  return (
    <>
      <h2>You were listening to:</h2>
      <LastListened />
      <br />
      <div id="home-podcast-list">Main List HERE</div>
    </>
  );
}
