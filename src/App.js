import { Toaster } from "react-hot-toast";

// App component responsible for rendering the entire application
export const App = ({ children }) => {
  return (
    <>
      {children} {/* Rendering children components */}
      {/* Rendering toaster component for displaying toast notifications */}
      <Toaster position="bottom-right" reverseOrder={false} />
    </>
  );
};
