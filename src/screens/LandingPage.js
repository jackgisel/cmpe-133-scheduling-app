import React from "react";
import { Box, Button } from "@material-ui/core";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <Box
      display="flex"
      flex={1}
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      padding={5}
    >
      <Box
        display="flex"
        width={800}
        justifyContent="space-between"
        alignItems="center"
      >
        <img height={100} src={require("../logo.PNG")} alt="logo" />
        <Box>
          <Link to="/login">
            <Button variant="contained">Login</Button>
          </Link>
          <Link to="/signup">
            <Button
              style={{ marginLeft: 10 }}
              variant="contained"
              color="primary"
            >
              Signup
            </Button>
          </Link>
        </Box>
      </Box>
      <img src={require("../mockup.png")} height={400} alt="logo" />
      <h3>Class scheduling done differently</h3>
      <p>
        Sign up today to change the way you plan your classes and connect with
        students in a flawless way.
      </p>
    </Box>
  );
};

export default LandingPage;
