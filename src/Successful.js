import React from 'react'
import { Typography,Card,Container} from '@mui/material'
import AppBar from "./Component/AppBar";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { createTheme, ThemeProvider } from '@mui/material/styles';


const successful = () => {
  const theme = createTheme();
  return (
    <ThemeProvider theme={theme}>
    <div className='App'>
       <Card sx={{ height:'600px',ml:'90px',mr:'90px' }}>
      <Container sx={{ flexGrow: 5 }}>
     <AppBar />
        <hr />
        
        <CheckCircleIcon style={{fontSize:"250px",color:"green",marginTop:'30px'}}/>
        <Typography variant="h4"><b>You are Verified Successfully</b></Typography>
        <Typography variant="h6">Please Wait,Taking You To Your DashBoard....</Typography>
      </Container>
      </Card>
    </div>
    </ThemeProvider>
  )
}

export default successful