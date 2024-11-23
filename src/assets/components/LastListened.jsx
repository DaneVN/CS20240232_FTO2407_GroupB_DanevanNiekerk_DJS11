//eslint-disable-next-line
import React from "react";
import placeholder from "../images/placeholder-show-banner.jpg";
import star from "../images/star-full.png";

function LastListened() {
  return (
    <div className="bg-green-500 rounded-lg p-4 grid grid-cols-3 gap-4">
      <img className="self-center" src={placeholder} alt="show banner/cover" />
      <div className="col-span-2">
        <h3>Title</h3>
        <div className="flex justify-between gap-2 flex-wrap">
          <div>
            <div className="flex justify-between gap">
              <img className="w-6" src={star} alt="favourite" />
              <p>00:00</p>
            </div>
            <p>S1 Ep4</p>
          </div>
          <p>Decription Decription Decription Decription</p>
        </div>
      </div>
    </div>
  );
}

export default LastListened;
