//eslint-disable-next-line
import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <>
      <nav className="flex justify-between px-4">
        <Link to="/">
          <img src="./images/podcast.png" alt="Home" />
        </Link>
        <Link to="favourites">
          <img src="./images/star-full.png" alt="Favourites" />
        </Link>
        {/* Add a Login page as extra? */}
      </nav>
    </>
  );
}

export default Header;
