// import React from "react";
import placeholder from "../images/placeholder-show-banner.jpg";

function LastListened() {
  return (
    <div className="w-96 bg-green-500 rounded-lg p-4 flex flex-col gap-4">
      <div className="relative">
        <img
          className="self-center"
          src={placeholder}
          alt="show banner/cover"
        />
      </div>
      <div className="flex flex-col sm:col-span-2">
        <h3>Title</h3>
        <div className="flex justify-between gap-2 flex-wrap">
          <div className="flex flex-col gap-1 sm:flex-row sm:justify-between">
            <p id="timestamp">00:00</p>
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
