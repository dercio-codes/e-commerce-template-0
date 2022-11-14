import { Box , Grid } from '@mui/material';
import Main from "../components/main"
import Poster from "../components/poster"


export default function Home() {
  return (
  <div>
  <Grid container>
    <Grid item xs={12} md={6} sx={{ height:'100vh' , background:'#F0C138' }}>
      <Poster />
    </Grid>
        <Grid item xs={12} md={6} sx={{ height:'100vh' , background:'#F2AD3F' }}>
        <Main />
    </Grid>
  </Grid>

  </div>
  )
}
