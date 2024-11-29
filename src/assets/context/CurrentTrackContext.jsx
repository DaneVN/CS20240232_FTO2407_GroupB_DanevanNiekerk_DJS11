import React from "react";

const CurrentTrackContext = React.createContext();

export function CurrentTrackProvider({ children }) {
  const [currentTrack, setCurrentTrack] = React.useState({
    title: "",
    file: "",
    EpisodeUid: null,
    timeStamp: 0,
    isPlaying: false,
  });

  const audioRef = React.useRef(null);

  const handlePlayPause = (track) => {
    if (currentTrack.EpisodeUid !== track.EpisodeUid) {
      // New track
      setCurrentTrack({ ...track, isPlaying: true });
      if (audioRef.current) {
        audioRef.current.src = track.file;
        audioRef.current.play();
      }
    } else if (audioRef.current && audioRef.current.paused) {
      // Resume playback
      audioRef.current.play();
      setCurrentTrack((prev) => ({ ...prev, isPlaying: true }));
    } else if (audioRef.current) {
      // Pause playback
      audioRef.current.pause();
      setCurrentTrack((prev) => ({ ...prev, isPlaying: false }));
    }
  };

  React.useEffect(() => {
    const onTimeUpdate = () => {
      if (audioRef.current) {
        setCurrentTrack((prev) => ({
          ...prev,
          timeStamp: audioRef.current.currentTime || 0, // Ensure valid value
        }));
      }
    };

    const onPlay = () =>
      setCurrentTrack((prev) => ({ ...prev, isPlaying: true }));
    const onPause = () =>
      setCurrentTrack((prev) => ({ ...prev, isPlaying: false }));

    if (audioRef.current) {
      audioRef.current.addEventListener("timeupdate", onTimeUpdate);
      audioRef.current.addEventListener("play", onPlay);
      audioRef.current.addEventListener("pause", onPause);
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("timeupdate", onTimeUpdate);
        audioRef.current.removeEventListener("play", onPlay);
        audioRef.current.removeEventListener("pause", onPause);
      }
    };
  }, []);

  return (
    <CurrentTrackContext.Provider
      value={{ currentTrack, handlePlayPause, audioRef }}
    >
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
