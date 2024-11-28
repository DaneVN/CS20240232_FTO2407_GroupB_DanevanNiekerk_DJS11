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

// ========= HISTORY ========== //

const trackHistory = {
  fiveLatest: (() => {
    try {
      const storedHistory = localStorage.getItem("trackHistory");
      return storedHistory ? JSON.parse(storedHistory) : [];
    } catch (err) {
      console.error("Failed to parse localStorage data:", err);
      // Clear invalid data and return an empty array
      localStorage.removeItem("trackHistory");
      return [];
    }
  })(),

  addTrack(episodeData) {
    try {
      // Ensure `episodeData` is a valid object
      if (typeof episodeData !== "object" || episodeData === null) {
        throw new Error("Invalid track data; expected an object.");
      }

      // Avoid adding duplicate entries
      const existingIndex = this.fiveLatest.findIndex(
        (track) => track.title === episodeData.title
      );
      if (existingIndex !== -1) {
        this.fiveLatest.splice(existingIndex, 1);
      }
      if (this.fiveLatest.length >= 5) {
        this.fiveLatest.shift();
      }
      this.fiveLatest.push(episodeData);

      // Sync with localStorage using JSON.stringify
      localStorage.setItem("trackHistory", JSON.stringify(this.fiveLatest));
    } catch (err) {
      console.error("Failed to update track history:", err);
    }
  },
};

export { favourites, trackHistory };
