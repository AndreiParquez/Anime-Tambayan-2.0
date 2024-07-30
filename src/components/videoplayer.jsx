import React from 'react';
import ReactPlayer from 'react-player';

const VideoPlayer = ({ source, id }) => {
  return (
    <div className="video-container relative max-w-full bg-black">
      <ReactPlayer
        url={source}
        className="react-player"
        width="100%"
        height="100%"
        controls
        playing
        config={{
          file: {
            attributes: {
              crossOrigin: 'anonymous',
            },
          },
        }}
      />
    </div>
  );
};

export default VideoPlayer;
