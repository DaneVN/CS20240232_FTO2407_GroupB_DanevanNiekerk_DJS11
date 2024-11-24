// import React from "react";
import placeholder from "../images/placeholder-show-banner.jpg";
import starFull from "../images/star-full.png";
// import starEmpty from "../images/star-empty.png";

function LastListened() {
  // const [favourite, setFavourite] = React.useState(true); //get favourite from local storage

  function toggleStar() {
    // setFavourite(!favourite);
  }

  return (
    <div className="bg-green-500 rounded-lg p-4 flex flex-col gap-4 sm:grid sm:grid-cols-3 sm:gap-4 mb-2">
      <div className="relative">
        <button className="w-6 absolute top-1 left-1" onClick={toggleStar}>
          <img src={starFull} alt="favourite" />
        </button>

        <img
          className="self-center"
          src={placeholder}
          alt="show banner/cover"
        />
      </div>
      <div className="flex flex-col sm:col-span-2">
        <h3>Title</h3>
        <div className="flex justify-between gap-2 flex-wrap">
          <div className="flex justify-between gap-2">
            <p>00:00</p>
            <p>S1 Ep4</p>
          </div>
          <p>
            Decription Decription Decription Decription Decription Decription
            Decription Decription
          </p>
        </div>
      </div>
    </div>
  );
}

export default LastListened;
