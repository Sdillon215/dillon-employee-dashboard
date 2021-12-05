import * as React from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import dillon from '../assets/Dillon-Floral-sm.png';
import Container from '@mui/material/Container';


const theme = createTheme();

function Home() {

  return (
      <Grid container
        height='500px'
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        marginTop="auto"
        marginBottom="auto"
      >
        <Button href="/buyerLogin" variant="contained" sx={{
          display: 'flex',
          justifyContent: 'center',
          width: '25%',
          bgcolor: '#018754',
          p: 1,
          m: 1
        }}>
          {"Buyer Login"}
        </Button>
        <Button href="/salesLogin" variant="contained" sx={{
          display: 'flex',
          justifyContent: 'center',
          bgcolor: '#018754',
          width: '25%',
          p: 1,
          m: 1
        }}>
          {"Sales Login"}
        </Button>
      </Grid>
  );
};

export default Home;

// import * as React from 'react';
// import Box from '@mui/material/Box';
// import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
// import CardContent from '@mui/material/CardContent';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';


// export default function Home() {
//   return (
//     <div style={{
//       height: '777px',
//       marginTop: '25px'
//     }}>
//     <Card sx={{ minWidth: 275 }}>
//       <CardContent>
//         <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
//           Word of the Day
//         </Typography>
//         <Typography sx={{ mb: 1.5 }} color="text.secondary">
//           adjective
//         </Typography>
//         <Typography variant="body2">
//           well meaning and kindly.
//           <br />
//           {'"a benevolent smile"'}
//         </Typography>
//       </CardContent>
//       <CardActions>
//         <Button size="small">Learn More</Button>
//       </CardActions>
//     </Card>
//     </div>
//   );
// }
