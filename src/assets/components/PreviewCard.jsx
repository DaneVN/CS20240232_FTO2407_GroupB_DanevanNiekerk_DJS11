//eslint-disable-next-line
import React from "react";

//eslint-disable-next-line
function PreviewCard({ description, genres, image, seasons, title, updated }) {
  return (
    <div className="bg-lime-900 rounded-lg p-4 flex flex-col gap-4 sm:grid sm:grid-cols-3 sm:gap-4 mb-6">
      <div className=" mb-4">
        <img
          className="self-center rounded-lg"
          src={image}
          alt="show banner/cover"
        />
      </div>
      <div className="col-span-2 flex flex-col items-center justify-evenly">
        <h2 className="mb-4">{title}</h2>
        <p className="mb-2">{description}</p>
        <div className="flex gap-2 justify-center flex-wrap mb-2">
          <p>{seasons}</p>
          <p>{updated}</p>
        </div>
        <div id="genre-list">
          <ul className="list-none flex gap-2 justify-center flex-wrap">
            {genres.map((genre) => {
              return (
                <li
                  id="genre"
                  key={genre}
                  className="bg-slate-800 rounded-3xl px-3 py-1"
                >
                  Genre
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default PreviewCard;
