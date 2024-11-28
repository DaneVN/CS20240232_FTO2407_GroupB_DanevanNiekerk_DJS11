// ========= FAVOURITES ========== //

const favourites = {
  episodes: (() => {
    try {
      const storedEpisodes = localStorage.getItem("favouriteEpisodes");
      return storedEpisodes ? JSON.parse(storedEpisodes) : [];
    } catch (err) {
      console.error("Failed to parse localStorage data:", err);
      return [];
    }
  })(),

  updateLocalStorage(favouriteUid) {
    try {
      this.episodes = [...this.episodes, favouriteUid];
      localStorage.setItem("favouriteEpisodes", JSON.stringify(this.episodes));
    } catch (err) {
      console.error(
        "Failed to add episode to favourites in LocalStorage:",
        err
      );
    }
  },

  removeFromLS(favouriteUid) {
    try {
      this.episodes = this.episodes.filter((item) => item !== favouriteUid);
      localStorage.setItem("favouriteEpisodes", JSON.stringify(this.episodes));
      window.alert("Episode removed from favourites!");
    } catch (err) {
      console.error(
        "Failed to remove episode from favourites in LocalStorage:",
        err
      );
    }
  },

  checkFavourites(favouriteUid) {
    return this.episodes.includes(favouriteUid);
  },

  toggleFavouriteLS(favouriteUid) {
    if (this.checkFavourites(favouriteUid)) {
      this.removeFromLS(favouriteUid);
    } else {
      this.updateLocalStorage(favouriteUid);
    }
  },
};

export { favourites };
