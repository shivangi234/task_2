import React from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Button, Card, Grid } from "@mui/material";
import logout from "../src/Images/logout.svg";
import back1 from "../src/Images/back1.jpg";
const Logout = () => {
  let navigate = useNavigate();
  return (
    <div className="App">
      <Grid
        container
        spacing={2}
        justifyContent="center"
        lg={24}
        sx={{
          backgroundImage: `url(${back1})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <Card
          sx={{
            marginTop: "90px",
            width: "800px",
            height: "400px",
            marginBottom: "151px",
            borderRadius:'5px'
          }}
        >
          <Typography
            variant="h6"
            style={{
              marginTop: "30px",
              marginBottom: "5px",
              color: "#9c27b0",
              fontWeight: "bold",
            }}
          >
            You are successfully logged out.
          </Typography>
          <img
            src={logout}
            alt=""
            height="200px"
            width="500px"
            marginTop="5px"
            style={{ marginTop: "70px", marginBottom: "5px" }}
          />
          <Typography sx={{}}>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => navigate("/login")}
            >
              Login Again
            </Button>
          </Typography>
        </Card>
      </Grid>
    </div>
  );
};

export default Logout;
