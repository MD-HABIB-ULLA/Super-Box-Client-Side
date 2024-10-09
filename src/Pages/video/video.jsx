import React, { useRef, useState, useEffect } from "react";
import video from "/public/video.mp4"; // Ensure this path is correct
import ReactPlayer from "react-player";
import {
  FaBackward,
  FaCompress,
  FaExpand,
  FaPause,
  FaPlay,
} from "react-icons/fa";

const Video = () => {
  const playerRef = useRef(null);
  const videoContainerRef = useRef(null); // Reference for the video container
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [videoDuration, setVideoDuration] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [watchedTime, setWatchedTime] = useState(0); // New state variable to track watched time

  // Handle fullscreen change event
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(document.fullscreenElement !== null);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  const handlePlayPauseToggle = () => setIsPlaying((prev) => !prev); // Toggle play/pause

  const handleBackward = () => {
    playerRef.current.seekTo(currentTime - 10, "seconds"); // Rewind by 10 seconds
  };

  const handleProgress = (progress) => {
    const current = progress.playedSeconds;
    setCurrentTime(current);
    setWatchedTime((prev) => Math.max(prev, current)); // Track maximum watched time
  };

  const handleDuration = (duration) => {
    setVideoDuration(duration);
  };

  const handleSeek = (e) => {
    const seekTime = parseFloat(e.target.value);

    // Allow seeking only within watched time
    if (seekTime <= watchedTime) {
      playerRef.current.seekTo(seekTime, "seconds");
    }
  };

  const toggleFullscreen = () => {
    if (isFullscreen) {
      document.exitFullscreen();
    } else {
      videoContainerRef.current.requestFullscreen();
    }
    setIsFullscreen((prev) => !prev); // Toggle fullscreen state
  };

  // Format time in minutes and seconds
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? `0${secs}` : secs}`;
  };

  return (
    <div
      ref={videoContainerRef}
      className="flex flex-col items-center justify-center min-h-screen"
    >
      <div
        className={`${
          isFullscreen ? "block" : "flex"
        } items-center justify-center`}
      >
        <div
          className={`${
            isFullscreen ? "w-full" : "w-3/5"
          } m-auto rounded-lg relative overflow-hidden group`}
        >
          <ReactPlayer
            ref={playerRef}
            url={video}
            playing={isPlaying}
            onProgress={handleProgress}
            onDuration={handleDuration}
            width="100%"
            height="auto"
            controls={false} // Disable default controls
          />
          <div className="absolute w-full flex flex-col gap-2 group-hover:bottom-5 transition-all duration-500 px-5">
            <input
              type="range"
              value={currentTime}
              min={0}
              max={videoDuration}
              step={0.1}
              onChange={handleSeek}
              className="w-full mt-2 accent-rose-500"
            />
            <div className="inset-0 bg-opacity-50 flex justify-between items-center">
              <div className="flex items-center">
                <button
                  onClick={handlePlayPauseToggle}
                  className="text-white mx-2"
                >
                  {isPlaying ? <FaPause /> : <FaPlay />}{" "}
                  {/* Toggle icon based on state */}
                </button>
                <button onClick={handleBackward} className="text-white mx-2">
                  <FaBackward />
                </button>
                <span className="text-white mx-2">
                  {formatTime(currentTime)} / {formatTime(videoDuration)}
                </span>
              </div>
              <button onClick={toggleFullscreen} className="text-white mx-2">
                {isFullscreen ? <FaCompress /> : <FaExpand />}{" "}
                {/* Toggle icon based on fullscreen state */}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Video;
