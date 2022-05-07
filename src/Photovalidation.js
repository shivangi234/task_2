import "./App.css";
import React from "react";
import AppBar from "./Component/AppBar";
import Webcam from "react-webcam";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cryptojs from "crypto-js";
import {
  Box,
  Grid,
  Container,
  Typography,
  Button,
  Card,
  CssBaseline,
  Toolbar,
} from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import ErrorIcon from "@mui/icons-material/Error";
import profilePhoto from "./Images/shivangisahu.jpg";
import CameraIcon from "@mui/icons-material/Camera";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import back1 from "../src/Images/back1.jpg";
import warning from "../src/Images/warning.gif";
import GppBadIcon from "@mui/icons-material/GppBad";
import ApprovalIcon from "@mui/icons-material/Approval";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function PhotoValidation() {
  let navigate = useNavigate();
  const [validate, setValidate] = useState(true);
  const [match, setMatch] = useState(false);
  const [notmatch, setNotmatch] = useState(false);
  const [failure, setFailure] = useState(false);
  const webcamRef = React.useRef(null);
  const [imgSrc, setImgSrc] = React.useState(null);
  const theme = createTheme();
  const [attempt, setAttempt] = useState(3);
  const [verified, setVerified] = useState(false);
  const [captured, setCaptured] = useState(false);

  //Methods
  const imageMatch = () => {
    if (attempt <= 0) {
      setAttempt("maximum attempts");
      setValidate(false);
      setFailure(true);
      setNotmatch(false);
    } else setAttempt(attempt - 1);
    const requestData = {
      user_code: "alokSTLIND",
      org_code: "STLIND",
      attempt_count: 3,
      image: imgSrc,
    };



    let string = JSON.stringify(requestData);
    const secret = "N}vLE7k~Egvs.*j)";
    let encrypted = Cryptojs.AES.encrypt(string, secret).toString();
    console.log(encrypted);

    let bytes=Cryptojs.AES.decrypt(encrypted,secret);
    let data=bytes.toString(Cryptojs.enc.Utf8);
    console.log(data);

    axios({
      url: "https://liveexam.edusols.com/api/tassess_api.php?oper=FACE_MATCHING",
      method: "POST",
      data: requestData,
    }).then((response) => {
      const res = response.data;
      if (res.status === 200) {
        if (res.status_message === "Item_Found") {
          const data = res.data;
          if (data.dbStatus === "SUCCESS" && data.dbMessage > 70) {
            setValidate(false);
            setMatch(true);
            setFailure(false);
            setTimeout(() => {
              navigate("/dashboard");
            }, 3000);
          } else {
            setFailure(false);
            setValidate(false);
            setMatch(false);
            toast.warn("Photo does not match!");
            setNotmatch(true);
          }
        } else {
          alert("no data found");
        }
      }
    });
  };

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
    console.log(imageSrc);
    setVerified(true);
    setCaptured(true);
  };
const userData =JSON.parse(localStorage.getItem("resultData"));
console.log(userData);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="app">
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
          {validate ? (
            <Card sx={{ height: "500px", mt: 10, mb: 7.6, width: "1200px" }}>
              {/*---------------------------------------AppBar-------------------------------------------- */}

              <Container maxWidth="xl">
                <Toolbar disableGutters>
                  <CameraAltIcon style={{ color: "blue" }} />

                  <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{
                      mr: 2,
                      display: { color: "#040414" },
                    }}
                  >
                    <b> Photo Attendance</b>
                  </Typography>

                  <Box
                    borderColor={"1px solid red"}
                    sx={{ flexGrow: 4, display: { xs: "flex", md: "flex" } }}
                  >
                    <Typography
                      variant="h8"
                      noWrap
                      component="div"
                      sx={{
                        mr: 2,
                        ml: 25,

                        display: { xs: "none", md: "flex", color: "#040414" },
                      }}
                    >
                      <ErrorIcon style={{ color: "blue" }} />{" "}
                      <b style={{ color: "blue" }}>YOU HAVE &nbsp;</b>{" "}
                      <b style={{ color: "orange" }}>
                        {attempt} ATTEMPTS &nbsp;
                      </b>{" "}
                      <b style={{ color: "blue" }}>LEFT</b>
                    </Typography>
                  </Box>

                  <Box>
                    <Typography
                      variant="h6"
                      noWrap
                      component="div"
                      style={{ marginLeft: "20" }}
                    >
                      <b> Hi, {userData.data.first_name +" "+userData.data.last_name}  &nbsp;</b>
                      <Button
                        variant="outlined"
                        style={{
                          color: "orange",
                          border: "1px solid #deae99",
                        }}
                        onClick={() => navigate("/logout")}
                      >
                        ↪Logout
                      </Button>
                    </Typography>
                  </Box>
                </Toolbar>
              </Container>

              <hr />
              {/*----------------------------------------------------------------------------------- */}
              <Box sx={{ flexGrow: 2 }}>
                <Grid container spacing={2} justifyContent="center" lg={12}>
                  {/* first Grid item - Profile */}
                  <Grid
                    item
                    lg={3}
                    md={3}
                    xs={12}
                    style={{ marginTop: "20px" }}
                    justifyContent="center"
                  >
                    <Typography>
                      <b>Profile</b>

                      <Box>
                        <img
                          style={{ borderRadius: "10px" }}
                          src={userData.data.profile_image_url}
                          height="160px"
                          width="130px"
                          alt="Profile"
                        />
                      </Box>
                    </Typography>
                  </Grid>
                  {/* ---------------------------------------------------------------------------- */}
                  {/* Second Grid item - Camera */}
                  <Grid item lg={5} md={6} xs={12} justifyContent="center">
                    <Box>
                      <Webcam
                        audio={false}
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        style={{
                          marginTop: "10px",
                          height: "350px",
                          width: "550px",
                          mr: 5,
                        }}
                      />
                      {captured ? (
                        <Button
                          variant="contained"
                          color="primary"
                          style={{
                            padding: "10px 20px",
                            borderRadius: "25px",
                            marginLeft: "50px",
                          }}
                          onClick={capture}
                        >
                          <CameraIcon />
                          RECAPTURE
                        </Button>
                      ) : (
                        <Button
                          variant="contained"
                          color="warning"
                          style={{
                            padding: "10px 20px",
                            borderRadius: "25px",
                            marginLeft: "50px",
                          }}
                          onClick={capture}
                        >
                          <CameraIcon />
                          CAPTURE
                        </Button>
                      )}
                    </Box>
                  </Grid>
                  {/* ------------------------------------------------------------------------------------------------------------------------ */}
                  {/* Third Grid item - Captured Pic */}
                  <Grid
                    item
                    lg={4}
                    md={3}
                    xs={12}
                    justifyContent="center"
                    style={{ marginTop: "20px" }}
                  >
                    <Typography>
                      <b>Captured photo</b>
                      <Box>
                        <img
                          style={{
                            borderRadius: "10px",
                            marginTop: "10px",
                            height: "180px",
                            width: "300px",
                          }}
                          src={imgSrc}
                          alt=""
                        />
                        {verified && captured ? (
                          <Button
                            variant="contained"
                            color="success"
                            style={{
                              borderRadius: "25px",
                              width: "120px",
                              marginLeft: "50px",
                            }}
                            onClick={imageMatch}
                          >
                            <CheckCircleIcon />
                            Verify
                          </Button>
                        ) : (
                          <Button
                            variant="contained"
                            color="info"
                            style={{
                              borderRadius: "25px",
                              width: "120px",
                              marginLeft: "50px",
                            }}
                            disabled
                          >
                            <CheckCircleIcon />
                            Verify
                          </Button>
                        )}
                      </Box>
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </Card>
          ) : (
            " "
          )}
          {failure ? (
            <Card
              sx={{
                marginTop: "100px",
                width: "900px",
                height: "450px",
                marginBottom: "91px",
              }}
            >
              {/* <AppBar /> */}

              <Typography
                variant="h4"
                style={{
                  marginTop: "30px",
                  marginBottom: "5px",
                  color: "#ff9800",
                }}
              >
                <b>Warning</b>
              </Typography>
              <img
                src={warning}
                alt=""
                height="150px"
                width="200px"
                style={{ marginTop: "70px" }}
              />
              <Typography variant="h6">
                Wait For Admin Approval..
                <ApprovalIcon style={{ color: "blue" }} />
              </Typography>
            </Card>
          ) : (
            " "
          )}
          {match ? (
            <Card
              sx={{
                marginTop: "80px",
                width: "1100px",
                height: "400px",
                marginBottom: "161px",
              }}
            >
              <AppBar />
              <hr />
              <CheckCircleIcon
                style={{ fontSize: "180px", color: "green", marginTop: "30px" }}
              />
              <Typography variant="h4">
                <b>You are Verified Successfully</b>
              </Typography>
              <Typography variant="h6">
                Please Wait,Taking You To Your DashBoard....
              </Typography>
            </Card>
          ) : (
            " "
          )}
          {notmatch ? (
            <Card
              sx={{
                marginTop: "100px",
                width: "900px",
                height: "450px",
                marginBottom: "91px",
              }}
            >
              <GppBadIcon
                style={{
                  marginTop: "10px",
                  color: "red",
                  height: "250px",
                  width: "200px",
                }}
              />

              <Typography
                variant="h4"
                style={{
                  marginTop: "30px",
                  marginBottom: "5px",
                  color: "grey",
                }}
              >
                
                <b>Photo does not match‼</b>
              </Typography>
            </Card>
          ) : (
            ""
          )}
        </Grid>
      </div>
    </ThemeProvider>
  );
}

export default PhotoValidation;
