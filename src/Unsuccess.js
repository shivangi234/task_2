import React from "react";
import {  Card, CssBaseline,Grid,Typography } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import back1 from "../src/Images/back1.jpg";
import ApprovalIcon from '@mui/icons-material/Approval';
import warning from "../src/Images/warning.gif";
const Unsuccess = () => {
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
            marginTop: "100px",
            width: "900px",
            height: "450px",
            marginBottom: "91px",
          }}
        >
          <Typography variant="h4"
          style={{ marginTop:'30px',marginBottom:'5px',color:'#ff9800' }}
          ><b>Warning</b></Typography>
          <img src={warning}
          alt=""
          height='150px'
          width='200px'
          style={{ marginTop:'70px', }}
            />
         <Typography variant="h6">
            Wait For Admin Approval..<ApprovalIcon style={{color:'blue'}}/>
          </Typography>
       
        </Card>
        </Grid>
      </div>
    </ThemeProvider>
  );
};

export default Unsuccess;
