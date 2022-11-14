import { Box , Grid } from '@mui/material';
import MainBanner from "../components/main"
import Poster from "../components/poster"
import Navbar from "../components/navbar"
import Product from "../components/product"
import Typography from '@mui/material/Typography';
import { Button , TextField } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import Link from "next/link"
export default function Home() {
  return (
  <div className="App">
  <Navbar/>
 
        <MainBanner />
        <Product sectionTitle={"The Sunday Blom x Nov"} />
        <Poster />
        <Product hidden={true} sectionTitle={"Summer Clothes"} />
  <Box sx={{ display:'flex ', flexDirection:'column' ,alignItems:'center' , justifyContent:'center', padding:'34px' }}>
  <Typography>Sunday Blom 2022.</Typography>
  <Link href="https://www.instagram.com/thesundayblom/?hl=en">
<InstagramIcon sx={{ margin:'12px 0' }} />
  </Link>

  </Box>
  </div>
  )
}
