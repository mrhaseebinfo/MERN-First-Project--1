import React from "react";
import { useNavigate } from "react-router-dom";
import { ChannelCard } from "./ChannelCard";

// Dummy data for channels
export const dummyChannels = [
  {
    id: 1,
    title: "Gaming",
    avatarUrl: null,
    username: "Martin",
    isOnline: false,
  },
  {
    id: 2,
    title: "Programming",
    avatarUrl: null,
    username: "Jake",
    isOnline: true,
  },
  {
    id: 3,
    title: "Cartoon",
    avatarUrl: null,
    username: "Anila",
    isOnline: false,
  },
  {
    id: 4,
    title: "News",
    avatarUrl: null,
    username: "Anna",
    isOnline: false,
  },
];

// Channels component responsible for rendering list of channels
export const Channels = ({ channels }) => {
  const navigate = useNavigate();

  // Function to handle navigation to channel
  const handleNavigateToChannel = (id) => {
    navigate(`/channel/${id}`); // Navigating to channel page with channel ID
  };

  // Rendering Channels component with list of channels
  return (
    // Container for channels
    <div className="channels-container">
      {/* Mapping through channels and rendering ChannelCard for each channel */}
      {channels.map((c) => (
        <ChannelCard
          key={c.id} // Unique key for each channel
          id={c.id} // Channel ID
          title={c.title} // Channel title
          username={c.username} // Username
          isOnline={c.isOnline} // Online status
          avatarUrl={c.avatarUrl} // Avatar URL
          navigateToChannelHandler={handleNavigateToChannel} // Handler function to navigate to channel
        />
      ))}
    </div>
  );
};
