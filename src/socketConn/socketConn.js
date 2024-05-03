import io from "socket.io-client";
import { useStore } from "../store";

let socket; // Socket instance

// Function to connect with the socket server
export const connectWithSocketServer = () => {
  socket = io('http://localhost:5002'); // Connecting to the socket server

  // Handling connection event
  socket.on('connect', () => {
    console.log('successfully connected with socket.io server');
    console.log(socket.id);
  });

  // Handling chat history event
  socket.on('chat-history', (chatHistory) => {
    // Getting setChatHistory function from the store
    const { setChatHistory } = useStore.getState();

    // Updating chat history in the store
    setChatHistory(chatHistory);
  });

  // Handling chat message event
  socket.on('chat-message', (chatMessage) => {
    // Getting chat history and setChatHistory function from the store
    const { chatHistory, setChatHistory } = useStore.getState();

    console.log(chatMessage);

    // Adding the received chat message to the chat history in the store
    setChatHistory({
      channelId: chatHistory.channelId,
      messages: [
        ...chatHistory.messages,
        {
          author: chatMessage.author,
          content: chatMessage.content,
          date: chatMessage.date,
        },
      ],
    });
  });
};

// Function to request chat history for a specific channel
export const getChatHistory = (channelId) => {
  socket.emit('chat-history', channelId); // Emitting chat-history event with the channel ID
};

// Function to send a chat message to a specific channel
export const sendChatMessage = (toChannel, message) => {
  socket.emit('chat-message', { // Emitting chat-message event with the target channel and message
    toChannel,
    message,
  });
};

// Function to close chat subscription for a specific channel
export const closeChatSubscription = (channelId) => {
  socket.emit('chat-unsubscribe', channelId); // Emitting chat-unsubscribe event with the channel ID
};
