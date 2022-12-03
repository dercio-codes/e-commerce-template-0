import { Box , Grid } from '@mui/material';
import MainBanner from "../components/main"
import Poster from "../components/poster"
import Navbar from "../components/navbar"
import Product from "../components/product"
import SearchComponent from "../components/search"
import Typography from '@mui/material/Typography';
import { Button , TextField } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import Link from "next/link";
import React from "react";
import {SelectedProduct} from "./_app";
import * as Theme from "./../constants"
import DoneIcon from '@mui/icons-material/Done';

export default function ProductPage() {
  const { selectedProduct , setSelectedProduct } = React.useContext(SelectedProduct)
 const [localProduct, setLocalProduct] = React.useState({
    id:selectedProduct.id,
    Title:selectedProduct.Title,
    Description:selectedProduct.Description,
    Image:selectedProduct.Image,
    Categories:selectedProduct.Categories,
    Price:selectedProduct.Price,
    Color: "",
    Size:"",
    Quantity:1

  });
  console.log(selectedProduct)



  return (
  <div className="App">
  <Navbar/>


       <Box
      sx={{ background:'transparent' , zIndex:'100' }}

    >
    <Box sx={{ 
      width:'100%' ,
      minHeight:'65vh',
      // background:'red', 
    // background:'rgba(251,251,251,0.3)'
     }}>
     <Box sx={{ width:'100%' , top:'0' , Index:'9999' , background :"transparent" , position:'sticky' , display:'flex',justifyContent:'flex-end' , padding:'1.2rem' }}>
      <Link href="/">
     <Button sx={{fontSize:'21px' , color:Theme["FOURTH_COLOR"] , fontWeight:'600' , }}> X
     </Button>
      </Link>
     </Box>


     <Grid container>
     <Grid item xs={12} lg={6} sx={{padding:'2.5rem' , display:'flex', justifyContent:'center' , alignItems:'center'}}>
             <img src={selectedProduct.Image} alt="" style={{ width:"70%" , objectFit:'contain' , objectPosition:'' }} />

     </Grid>
     <Grid item xs={12} lg={6} sx={{padding:'2.5rem 0'}}>
             <Typography sx={{ fontSize:'38px' , color:Theme["FOURTH_COLOR"] , textAlign:'' , padding:'8px 21px' , fontWeight:'600' }}> {selectedProduct.Title} </Typography>
        <Box sx={{ display:'flex' , flexDirection:'column' , alignItems:'' }}>
          <Typography sx={{ fontSize:'16px' , color:Theme["FOURTH_COLOR"] , textAlign:'' , margin:'0', padding:'8px 21px' , fontWeight:'600' }}> Size: </Typography>
          <Box sx={{ display:'flex' , justifyContent:'' , width:'100%'}}>
          {
            selectedProduct.Sizes && selectedProduct.Sizes.map((item)=>{

              return <Button onClick={()=> setLocalProduct({ 
                ...localProduct , 
                Size:item
                 })} key={item} variant="outline" sx={{  border:'1px solid #black' , background:localProduct.Sizes && localProduct.Sizes === item ? "#111": "" , color:localProduct.Sizes === item ? "#eee": "#111" }}>{item}</Button>
            })
          }

          </Box>
          <Typography sx={{ fontSize:'16px' ,  color:Theme["FOURTH_COLOR"] , textAlign:'' , margin:'8px 0 0 0 ' , padding:'8px 21px' , fontWeight:'600' }}> Colors: </Typography>
            <Box sx={{ width:'100%', display:'flex' , justifyContent:'' , padding:'12px 16px'}}>
             {
            selectedProduct.Colors && selectedProduct.Colors.map((item)=>{
              return ( 
                <Button type={"color"} onClick={()=> setLocalProduct({ 
                ...localProduct , 
                Color:item
                 })} key={item} key={item} value={"255,0,0"} sx={{ opacity:localProduct.Color === item ? 1 : '.7' ,"&:hover":{background:item } , width:'48px', height:'34px' , margin:'0 8px 0 0' , background:item , border:'none' }}>
                  <DoneIcon sx={{ filter :'invert(1)' , fontWeight:600 ,display:localProduct.Color === item ? "flex" :'none' }} />
                </Button>
              )
            })
          }
            
            </Box>

          <TextField label="Quantity" type="number" value={localProduct.Quantity} onChange={e => setLocalProduct({ ...localProduct , Quantity:Number(e.target.value) })} sx={{width:'95%', margin:"21px auto" , padding:"0" ,  '& .MuiOutlinedInput-root': {  // - The Input-root, inside the TextField-root
            '& fieldset': {            // - The <fieldset> inside the Input-root
                color:Theme["FOURTH_COLOR"],
                borderColor: '#999',   // - Set the Input border
            },
            '&:hover fieldset': {
                color:Theme["FOURTH_COLOR"],
                borderColor: Theme["FOURTH_COLOR"], // - Set the Input border when parent has :hover
            },
            '&.Mui-focused fieldset': { // - Set the Input border when parent is focused 
                color:Theme["FOURTH_COLOR"],
                borderColor: Theme["FOURTH_COLOR"],
            },
        },}} />
          <ul style={{ width:'100%' }}>
            <li>
             <Typography sx={{ fontSize:'16px' , color:Theme["FOURTH_COLOR"] , textAlign:'' , padding:'8px 21px' , fontWeight:'' }}> {selectedProduct.Description}</Typography>
            </li>
          </ul>

        <Typography sx={{ fontSize:'16px' , color:Theme["FOURTH_COLOR"] , textAlign:'' , padding:'10px 21px' , fontWeight:'400' }}> This does not include deliervy.Delivery will be calculated upon checkout. </Typography>
        <Typography sx={{ fontSize:'32px' , color:Theme["FOURTH_COLOR"] , textAlign:'' , padding:'10px 21px' , fontWeight:'600' }}> Total : R{Number(selectedProduct.Price * localProduct.Quantity)} </Typography>
<Box
                sx={{
                  backgroundImage:
                    'url("https://paystack.com/assets/payment/img/paystack-badge-cards-zar.png")',
                  backgroundSize: "contain",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  width: "99%",
                  margin:"21px auto",
                  height: "150px",
                }}
              />
        <Box sx={{ display:'' , width:'98%',margin:'0 auto' }}>
        <Button onClick={() => {
          if(Object.values(localProduct).includes("")){
              toast.warning('Please fill in all fields!!!', {
            position: toast.POSITION.TOP_RIGHT
        });
          }else{
            props.handleAddToCart(localProduct)
            setOpenBox(false)
          }
        }} sx={{ background:Theme["FOURTH_COLOR"],padding:'16px 12px' , margin:'0 3px' ,color:'#eee' , width:'100%' ,fontWeight:600, "&:hover":{color:Theme["FOURTH_COLOR"]} }}>Add To Cart</Button>
</Box>
        </Box>
     </Grid>

     </Grid>


    </Box>
    </Box>



      <Box sx={{ display:'flex ', flexDirection:'column' ,alignItems:'center' , justifyContent:'center', padding:'34px' }}>
  <Typography>Sunday Blom 2022.</Typography>
  <Link href="https://www.instagram.com/thesundayblom/?hl=en">
<InstagramIcon sx={{ margin:'12px 0' }} />
  </Link>

  </Box>
  </div>
  )
}
