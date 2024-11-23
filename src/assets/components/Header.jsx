//eslint-disable-next-line
import React from "react";
import { Link } from "react-router-dom";
import pocastImg from "../images/podcast.png";
import star from "../images/star-full.png";

function Header() {
  return (
    <>
      <nav className="flex justify-between px-4">
        <Link className="flex items-center gap-2" to="/">
          <img className="w-12" src={pocastImg} alt="Home" />
          <h2>Podcast App</h2>
        </Link>
        <Link to="favourites">
          <img className="w-12" src={star} alt="Favourites" />
        </Link>
        {/* Add a Login page as extra? */}
      </nav>
    </>
  );
}

export default Header;
