export const favourites = {
  episodes: [localStorage.getItem("favouriteEpisodes")],

  addFavouritesToLS: (episodeString) => {
    try {
      this.episodes = [...this.episodes, episodeString];
      localStorage.setitem("favouriteEpisodes", ...this.episodes);
    } catch (err) {
      console.log("Failed to add episode to favourites in LocalStorage: ", err);
    }
  },

  removeFromLS: (episodeString) => {
    try {
      this.episodes = [...this.episodes].filter((item) => {
        item !== episodeString;
      });
      localStorage.setitem("favouriteEpisodes", ...this.episodes);
    } catch (err) {
      console.log("Failed to add episode to favourites in LocalStorage: ", err);
    }
  },

  checkFavourites: (episodeString) => {
    const favouritesArray = this.episodes;
    favouritesArray.filter((item) => {
      item === episodeString;
    });
  },
};
