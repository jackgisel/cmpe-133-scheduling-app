import React from "react";

import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./App";
import configureStore from "./configureStore";

const store = configureStore();

function Root() {
  const [darkState, setDarkState] = React.useState(false);
  const palletType = darkState ? "dark" : "light";
  const darkTheme = createMuiTheme({
    palette: {
      type: palletType,
      dark: {
        background: "#1f1f1f",
      },
      light: {
        background: "#fff",
      },
    },
  });
  const handleThemeChange = () => {
    setDarkState(!darkState);
  };

  return (
    <Provider store={store}>
      <ThemeProvider theme={darkTheme}>
        <Router>
          <App {...{ handleThemeChange }} />
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default Root;
