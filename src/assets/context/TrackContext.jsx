import React from "react";

export const TrackContext = React.createContext();

export const TrackProvider = ({ children }) => {
  const [currentTrack, setCurrentTrack] = React.useState(null); // Currently playing track
  const [trackHistory, setTrackHistory] = React.useState(
    JSON.parse(localStorage.getItem("trackHistory")) || []
  );

  const updateTrack = (track) => {
    setCurrentTrack(track);

    // Update track history
    setTrackHistory((prev) => {
      const updatedHistory = prev.filter((item) => item.file !== track.file); // Remove duplicates
      if (updatedHistory.length >= 5) {
        updatedHistory.shift(); // Remove oldest
      }
      updatedHistory.push(track);

      // Update localStorage
      localStorage.setItem("trackHistory", JSON.stringify(updatedHistory));
      return updatedHistory;
    });
  };

  return (
    <TrackContext.Provider value={{ currentTrack, trackHistory, updateTrack }}>
      {children}
    </TrackContext.Provider>
  );
};
