import React, { useEffect, useState } from "react";
import "./App.css";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import LockIcon from "@mui/icons-material/Lock";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LoginIcon from "@mui/icons-material/Login";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Cryptojs from "crypto-js";
import back1 from "../src/Images/back1.jpg";
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import IconButton from '@mui/material/IconButton';
import AppBar from '@mui/material/AppBar';
import { useNavigate } from "react-router-dom";

const theme = createTheme();

toast.configure();
export default function App() {
  let navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState(" ");
  const [organization, setOrganization] = useState("");
  const [organizations, setOrganizations] = useState([]);
  const [proceed, setProceed] = useState(false);

  const submitForm = (e) => {
    e.preventDefault();

    const requestData = {
      user_name: username,
      password: password,
      org_code: organization,
    };


    axios({
      url: "https://liveexam.edusols.com/api/tassess_api.php?oper=LOGIN_CHECK",
      method: "POST",
      data: requestData,
    }).then((response) => {
      const result = response.data;
      if (result.status === 200) {
        if (result.status_message === "Item_Found") {
          toast.success("Login Sucessfully !");

          if (result.data.password_change_status === "YES")
            setTimeout(() => {
              navigate("/photovalidation");
            }, 3000);
          else
            setTimeout(() => {
              navigate("/password");
            }, 3000);
        } else {
          setTimeout(() => {
            toast.error("Login Failed !");
          }, 3000);
        }
      } else {
        alert("Something went wrong");
      }
    });

    if (username === "" || password === "" || organization === "") {
      toast.error("User Name Required!");
      toast.warn("User Password Required!");
      toast.error("Organizations Required!");
    } else {
      setTimeout(() => {
        setProceed(true);
      }, 1000);
    }
  };

  useEffect(() => {
    axios
      .get("https://liveexam.edusols.com/api/tassess_api.php?oper=ORG_LIST")
      .then((response) => {
        const org = response.data;
        setOrganizations(org.data);
      });
  }, []);

  const organizationList = organizations.map((item) => (
    <MenuItem key={item.org_code} value={item.org_code}>
      {item.org_name}
    </MenuItem>
  ));

  return (
    <form>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Grid container spacing={2}>
          <Grid
            item
            lg={12}
            md={6}
            sm={3}
            sx={{
              backgroundImage:
              `url(${back1})`,
              backgroundRepeat: "no-repeat",
              maxHeight: "100vh",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            style={{ minHeight: "100vh" }}
          > <Grid container spacing={0} columns={24}>
          <Grid item lg={1} xs={1}></Grid>
          <AppBar position="static">
            <Grid item lg={22} xs={22}>
              <Grid container columns={24}>
                <Grid item lg={8} xs={24}>
                  <IconButton
                    sx={{ float: "left", fontWeight: "bold", color: "EDEDF8" }}
                  >
                    <AppRegistrationIcon sx={{ color: "white" }} />
                    <span style={{ color: "white" }}>Total&nbsp; </span> <span style={{ color: "white",fontSize:'15px' }}>Assesment </span>
                  </IconButton>
                </Grid>
                <Grid item lg={8} xs={24}>
                  <IconButton
                    sx={{ float: "left", fontWeight: "bold", color: "EDEDF8" }}
                  ></IconButton>
                </Grid>
                <Grid item lg={8} xs={24}>
               
                </Grid>
              </Grid>
            </Grid>
          </AppBar>
        </Grid>
            <Grid container justifyContent="center">
              <Grid item lg={6} md={3} sm={2} mt={8} component={Paper}>
                <Container maxWidth="sm" style={{ m: 2 }}>
                  <Box
                    sx={{
                      "& > :not(style)": { m: 1 },
                    }}
                    noValidate
                  >
                    <Typography
                      variant="h5"
                      component="div"
                      sx={{ flexGrow: 1, mb: 2 }}
                    >
                      <LockIcon color="primary" />
                      <b>Login</b>
                    </Typography>
                    <TextField
                      label="User Name"
                      variant="outlined"
                      type="text"
                      name="username"
                      id="username"
                      onChange={(e) => setUsername(e.target.value)}
                      fullWidth
                    />
                    <TextField
                      autoComplete="password"
                      label="Password"
                      variant="outlined"
                      type="password"
                      name="password"
                      id="password"
                      onChange={(e) => setPassword(e.target.value)}
                      fullWidth
                    />
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Organizations
                      </InputLabel>

                      <Select
                        labelId="demo-simple-select-label"
                        label="Organization"
                        name="organization"
                        fullWidth
                        onChange={(e) => setOrganization(e.target.value)}
                      >
                        {organizationList}
                      </Select>
                    </FormControl>

                    {proceed ? (
                      <Button
                        variant="contained"
                        size="medium"
                        color="success"
                        fullWidth
                        mt="2"
                        disabled
                      >
                        Processing....
                        <div class="fa fa-spinner fa-spin" />
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        size="medium"
                        color="success"
                        endIcon={<LoginIcon />}
                        fullWidth
                        mt="2"
                        onClick={submitForm}
                      >
                        <ToastContainer />
                        Proceed
                      </Button>
                    )}
                  </Box>
                </Container>
              </Grid>
            </Grid>
            <Box sx={{ mt: 12 }}>
              <Copyright sx={{ mt: 5, color: "white" }} />
              <Version sx={{ mb: 8, color: "white" }} />
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    </form>
  );
}

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" ml={5} {...props}>
      {"Copyright ©  STL 2021-22 All Rights Reserved"}
    </Typography>
  );
}
function Version(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      mr={6}
      align="right"
      {...props}
    >
      {"Current Version 2.3"}
    </Typography>
  );
}