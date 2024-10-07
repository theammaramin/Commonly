// YouTubeVideo.jsx
import React from 'react';
import YouTube from 'react-youtube';
import './YouTubeVideo.css';

const YouTubeVideo = ({ videoId }) => {
  // Set up the options for the YouTube player
  const opts = {
    height: '400',
    width: '640',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  };

  return (
    <div className="youtube-video">
      <YouTube videoId={videoId} opts={opts} />
    </div>
  );
};

export default YouTubeVideo;
