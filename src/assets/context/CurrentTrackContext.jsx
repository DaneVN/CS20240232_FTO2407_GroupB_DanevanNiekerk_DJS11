import React from "react";

const CurrentTrackContext = React.createContext();

export function CurrentTrackProvider({ children }) {
  const audioRef = React.useRef(new Audio());
  const [currentTrack, setCurrentTrack] = React.useState({
    title: "",
    EpisodeUid: "", // Use this instead of file to track uniqueness
    isPlaying: false,
  });

  const playTrack = (trackData) => {
    if (trackData.EpisodeUid !== currentTrack.EpisodeUid) {
      // Load the new track
      audioRef.current.src = trackData.file; // Placeholder file
      setCurrentTrack({
        ...trackData,
        isPlaying: true,
      });
    }

    // Play the audio
    audioRef.current.play();
    audioRef.current.onended = () =>
      setCurrentTrack((prev) => ({ ...prev, isPlaying: false }));
  };

  const pauseTrack = () => {
    audioRef.current.pause();
    setCurrentTrack((prev) => ({ ...prev, isPlaying: false }));
  };

  const togglePlayPause = () => {
    if (audioRef.current.paused) {
      audioRef.current.play();
      setCurrentTrack((prev) => ({ ...prev, isPlaying: true }));
    } else {
      pauseTrack();
    }
  };

  return (
    <CurrentTrackContext.Provider
      value={{
        currentTrack,
        playTrack,
        pauseTrack,
        togglePlayPause,
        audioRef,
      }}
    >
      {children}
    </CurrentTrackContext.Provider>
  );
}

export function useCurrentTrack() {
  return React.useContext(CurrentTrackContext);
}
