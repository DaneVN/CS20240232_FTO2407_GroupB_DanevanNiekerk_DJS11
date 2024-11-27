// get/set favourites in local storage
export let favourites = [];

export const getFavouritesArray = () => {
  try {
    favourites.push(
      ...(localStorage.getItem("favouriteEpisodes") ||
        "None yet! Click the starIcon to add a Favourite!")
    );
  } catch (err) {
    console.log("Failed to retrieve episodes from Local storage: ", err);
  }
};

export const checkFavourites = (episodeString) => {
  const favouritesArray = getFavouritesArray();
  favouritesArray.filter((item) => {
    item === episodeString;
  });
};

export const removeFromLS = (episodeString) => {
  try {
    favourites = [...favourites].filter((item) => {
      item !== episodeString;
    });
    localStorage.setitem("favouriteEpisodes", ...favourites);
  } catch (err) {
    console.log("Failed to add episode to favourites in LocalStorage: ", err);
  }
};

export const addFavouriteToLS = (episodeString) => {
  try {
    favourites = [...favourites, episodeString];
    localStorage.setitem("favouriteEpisodes", ...favourites);
  } catch (err) {
    console.log("Failed to add episode to favourites in LocalStorage: ", err);
  }
};
