import { Box , Grid } from '@mui/material';
import MainBanner from "../components/main"
import Poster from "../components/poster"
import Navbar from "../components/navbar"
import Product from "../components/product"


export default function Home() {
  return (
  <div className="App">
  <Navbar/>
 
        <MainBanner />
        <Product sectionTitle={"The Sunday Blom x Nov"} />
        <Poster />
        <Product hidden={true} sectionTitle={"Summer Clothes"} />
 
  </div>
  )
}
