import { useState, useRef } from "react";
import "./MoodSongs.css";



const MoodSongs = ({ Songs }) => {
  const [isPlaying, setIsPlaying] = useState(null);
  const audioRef = useRef(null);

  const handlePlayPause = (index, src) => {
    // if same index clicked => stop
    if (isPlaying === index) {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      setIsPlaying(null);
      return;
    }

    // if another track is playing, pause it
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    setIsPlaying(index);

    // create new Audio and play (keeps it outside DOM)
    const audio = new Audio(src);
    audioRef.current = audio;
    audio.volume = 0.9;
    audio.play().catch((e) => {
      // autoplay might be blocked; handle gracefully
      console.warn("Playback failed:", e);
      setIsPlaying(null);
    });

    // when audio ends, reset state
    audio.onended = () => {
      setIsPlaying(null);
      audioRef.current = null;
    };
  };

  return (
    <div className="mood-songs">
      <h2>Recommended Song</h2>
        

      {/* grid wrapper */}
      <div className="songs-list">
        {Songs.map((song, index) => (
          <div
            className={`songs ${isPlaying === index ? "playing" : ""}`}
            key={index}
            aria-live="polite"
          >
            {/* optional thumbnail - uncomment if you have song.image */}
            {/* <img className="song-thumb" src={song.image} alt={`${song.title} cover`} /> */}

            <div className="title">
              <h3 title={song.title}>{song.title}</h3>
              <p>{song.artist}</p>
            </div>

            <div className="play-pause-button">
              <button
                onClick={() => handlePlayPause(index, song.audio)}
                aria-pressed={isPlaying === index}
                aria-label={isPlaying === index ? `Pause ${song.title}` : `Play ${song.title}`}
              >
                {isPlaying === index ? (
                  <i className="ri-pause-line" />
                ) : (
                  <i className="ri-play-circle-fill" />
                )}
              </button>
              {/* optional meta (duration) */}
              {song.duration && <div className="song-meta"><span className="duration">{song.duration}</span></div>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoodSongs;
