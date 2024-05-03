import React from "react";
import { useUserDetails, useFollowChannel } from "../../../shared/hooks";

// FollowButton component responsible for rendering follow button
const FollowButton = ({ channelId, getChannels }) => {
  const { followChannel } = useFollowChannel(); // Using custom hook to follow a channel

  // Function to handle follow channel action
  const handleFollowChannel = () => {
    followChannel(channelId, getChannels); // Calling followChannel function with channel ID and getChannels function
  };

  // Rendering FollowButton component with follow button
  return (
    <button onClick={handleFollowChannel} className="channel-follow-button">
      Follow
    </button>
  );
};

// ChannelDescription component responsible for rendering channel description
export const ChannelDescription = ({
  username, // Username
  title, // Title
  description, // Description
  channelId, // Channel ID
  getChannels, // Function to get channels
}) => {
  const { isLogged } = useUserDetails(); // Using custom hook to get user details

  // Rendering ChannelDescription component with channel details and follow button if user is logged in
  return (
    // Container for channel description
    <div className="channel-description-container">
      {/* Rendering username and follow button */}
      <span className="channel-description-title">
        {username}
        <span>
          {/* Rendering follow button only if user is logged in */}
          {isLogged && (
            <FollowButton
              className="channel-follow-button"
              channelId={channelId} // Passing channel ID to FollowButton component
              getChannels={getChannels} // Passing getChannels function to FollowButton component
            />
          )}
        </span>
      </span>
      {/* Rendering channel title */}
      <span className="channel-description-subtitle">{title}</span>
      {/* Rendering channel description */}
      <div className="channel-description-box">
        <span className="channel-description">{description}</span>
      </div>
    </div>
  );
};
