import React from "react";

const CurrentTrackContext = React.createContext();

export function CurrentTrackProvider({ children }) {
  const [currentTrack, setCurrentTrack] = React.useState({
    title: "",
    file: "",
    EpisodeUid: null,
    isPlaying: false,
  });
  const audioRef = React.useRef(new Audio());

  const handlePlayPause = (track) => {
    if (currentTrack.EpisodeUid !== track.EpisodeUid) {
      // If a new track is selected
      setCurrentTrack({ ...track, isPlaying: true });
      audioRef.current.src = track.file;
      audioRef.current.play();
    } else if (audioRef.current.paused) {
      // Resume playback
      audioRef.current.play();
      setCurrentTrack((prev) => ({ ...prev, isPlaying: true }));
    } else {
      // Pause playback
      audioRef.current.pause();
      setCurrentTrack((prev) => ({ ...prev, isPlaying: false }));
    }
  };

  // Sync `isPlaying` state with the audio element events
  React.useEffect(() => {
    const onPlay = () =>
      setCurrentTrack((prev) => ({ ...prev, isPlaying: true }));
    const onPause = () =>
      setCurrentTrack((prev) => ({ ...prev, isPlaying: false }));

    audioRef.current.addEventListener("play", onPlay);
    audioRef.current.addEventListener("pause", onPause);

    return () => {
      audioRef.current.removeEventListener("play", onPlay);
      audioRef.current.removeEventListener("pause", onPause);
    };
  }, []);
  return (
    <CurrentTrackContext.Provider value={{ currentTrack, handlePlayPause }}>
      {children}
    </CurrentTrackContext.Provider>
  );
}

export function useCurrentTrack() {
  const context = React.useContext(CurrentTrackContext);
  if (!context) {
    throw new Error(
      "useCurrentTrack must be used within a CurrentTrackProvider"
    );
  }
  return context;
}