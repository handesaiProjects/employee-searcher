import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

const colors = {
  brand: {
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
  },
};

const theme = extendTheme({ colors });

const root = ReactDOM.createRoot(document.getElementById('root'));
const app = (
  <ChakraProvider theme={theme}>
    <App />
  </ChakraProvider>
);

// Use React.StrictMode only in development
if (process.env.NODE_ENV === 'development') {
  root.render(<React.StrictMode>{app}</React.StrictMode>);
} else {
  root.render(app);
}
