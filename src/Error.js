import React from "react";
import {  Card, CssBaseline,Grid,Typography } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import back1 from "../src/Images/back1.jpg";
import erroranimated from "../src/Images/erroranimated.gif";
import ErrorIcon from '@mui/icons-material/Error';
const Error = () => {
  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
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
            marginTop: "80px",
            width: "1000px",
            height: "500px",
            marginBottom: "61px",
          }}
        >
          <Typography variant="h4"
          style={{ marginTop:'30px',marginBottom:'5px',color:'#ef5350' }}
          ><b><ErrorIcon />Error</b></Typography>
          <img src={erroranimated}
          alt=""
          height='350px'
          width='500px'
          marginTop='10px'
          style={{ marginTop:'70px',marginBottom:'5px' }}

          />
         
       
        </Card>
        </Grid>
      </div>
    </ThemeProvider>
  );
};

export default Error;
