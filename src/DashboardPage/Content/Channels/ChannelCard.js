// Importing React library
import React from "react";

// Default image URL for channel avatar
const imageUrl =
  "https://img.redbull.com/images/c_limit,w_1500,h_1000,f_auto,q_auto/redbullcom/2017/10/04/c0c3e2e4-c234-4844-8504-92e5be2f3e96/gothic-ii";

// ChannelAvatar component responsible for rendering channel avatar
const ChannelAvatar = ({ url }) => {
  return (
    // Container for channel avatar
    <div className="channels-avatar-container">
      {/* Rendering channel avatar image */}
      <img src={url || imageUrl} width="100%" height="100%" alt="Channel Avatar" />
    </div>
  );
};

// ChannelCard component responsible for rendering channel card
export const ChannelCard = ({
  title, // Channel title
  id, // Channel ID
  username, // Username
  isOnline, // Online status
  avatarUrl, // Avatar URL
  navigateToChannelHandler, // Handler function to navigate to channel
}) => {
  // Function to handle navigation to channel
  const handleNavigate = () => {
    navigateToChannelHandler(id); // Calling navigateToChannelHandler with channel ID
  };

  // Rendering ChannelCard component with channel details
  return (
    // Container for channel card
    <div className="channels-card" onClick={handleNavigate}>
      {/* Rendering channel avatar */}
      <ChannelAvatar url={avatarUrl} />
      {/* Rendering channel title */}
      <span className="channels-card-title">{title}</span>
      {/* Rendering username */}
      <span className="channels-card-text">{username}</span>
      {/* Rendering online status with color based on status */}
      <span
        className="channels-card-text"
        style={{ color: isOnline ? "green" : "red" }}
      >
        {/* Displaying online or offline status */}
        {isOnline ? "Online" : "Offline"}
      </span>
    </div>
  );
};
