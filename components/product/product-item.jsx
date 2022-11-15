import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import { Box , MenuItem , Rating, Paper , Drawer , Button , Grid , TextField } from '@mui/material';
import * as Theme from "../../constants"
import Link from "next/link"
export default function ProductItem(props) {
  const [openDrawer, setOpenDrawer] = React.useState(false);


  return (
    <Paper elevation={0} sx={{ 	
    		width: '100%' , 
    		padding:{
    			xs:'0.5rem',
    			md:'1rem',
    		},
    		background:'transparent',
    		display:'flex',
    		flexDirection:'column',
    		justifyContent:'center',
    		alignItems:'center',
    		 }}>

    	 <Box sx={{
          height:'250px',
          width:'100%',
          backgroundImage:`url("${props.image}")`,
          backgroundPosition:'center',
        backgroundSize:'contain' ,
        display:'flex',
        // justifyContent:'flex-end',
        // padding:'21px'
         }} >
<Box sx={{ padding:' 12px 21px' , color:'#eee' , fontWeight:'600' , fontSize:'14px' , height:'40px' , background:props.color }}>
  {props.special}
</Box>

         {/*<FavoriteIcon />*/}
         </Box>
        <Typography sx={{ fontSize:'21px' , color:Theme["FOURTH_COLOR"] , textAlign:'center' , padding:'8px 21px' , fontWeight:'600' }}> Sunday Blom Bucket Hat </Typography>
    		<Typography sx={{ fontSize:'21px' , color:Theme["FOURTH_COLOR"] , textAlign:'center' , padding:'10px 21px' , fontWeight:'600' }}> R300.00 </Typography>
    		
<Box sx={{ display:'' , width:'100%' }}>
        <Button onClick={() => setOpenDrawer(true)} sx={{ background:Theme["FOURTH_COLOR"],padding:'16px 12px' , margin:'0 3px' ,color:'#eee' , width:'100%' ,fontWeight:600, "&:hover":{color:Theme["FOURTH_COLOR"]} }}>Add To Cart</Button>
</Box>


       <Drawer
      anchor={"bottom"}
      open={openDrawer}
      sx={{ background:'transparent' , zIndex:'100' }}
      onClose={() => setOpenDrawer(false)}
    >
    <Box sx={{ 
      width:'100%' ,
      minHeight:'65vh',
      // background:'red', 
    background:'rgba(251,251,251,0.3)'
     }}>
     <Box sx={{ width:'100%' , top:'0' , Index:'9999' , background :"white" , position:'sticky' , display:'flex',justifyContent:'flex-end' , padding:'1.2rem' }}>
     <Button onClick={() => setOpenDrawer(false)} sx={{fontSize:'21px' , color:Theme["FOURTH_COLOR"] , fontWeight:'600' , }}> X
     </Button>
     </Box>


     <Grid container>
     <Grid item xs={12} lg={4} sx={{padding:'2.5rem' , display:'flex', justifyContent:'center' , alignItems:'center'}}>
             <img src={props.image} alt="" style={{ width:"70%" , objectFit:'contain' , objectPosition:'' }} />

     </Grid>
     <Grid item xs={12} lg={4} sx={{padding:'2.5rem 0'}}>
             <Typography sx={{ fontSize:'38px' , color:Theme["FOURTH_COLOR"] , textAlign:'' , padding:'8px 21px' , fontWeight:'600' }}> Sunday Blom Bucket Hat </Typography>
        <Box>
          <Typography sx={{ fontSize:'16px' , color:Theme["FOURTH_COLOR"] , textAlign:'' , margin:'0', padding:'8px 21px' , fontWeight:'600' }}> Size: </Typography>
          <Button variant="outline" sx={{ border:'1px solid #black' }}>SM</Button>
          <Button variant="outline" sx={{ border:'1px solid #black' }}>M</Button>
          <Button variant="outline" sx={{ border:'1px solid #black' }}>L</Button>
          <Button variant="outline" sx={{ border:'1px solid #black' }}>XL</Button>

          <Typography sx={{ fontSize:'16px' , color:Theme["FOURTH_COLOR"] , textAlign:'' , margin:'8px 0 0 0 ' , padding:'8px 21px' , fontWeight:'600' }}> Colors: </Typography>
            <Box sx={{ width:'100%', display:'flex' , padding:'12px 16px'}}>
              <Box type={"color"} value={"255,0,0"} style={{ width:'36px', height:'21px' , margin:'0 8px 0 0' , background:'rgba(255,0,0,.5)' , border:'none' }}/>
              <Box type={"color"} value={"255,0,0"} style={{ width:'36px', height:'21px' , margin:'0 8px 0 0' , background:'rgba(31,255,48,.8)' , border:'none' }}/>
              <Box type={"color"} value={"255,0,0"} style={{ width:'36px', height:'21px' , margin:'0 8px 0 0' , background:'rgba(89,24,89,.4)' , border:'none' }}/>
              <Box type={"color"} value={"255,0,0"} style={{ width:'36px', height:'21px' , margin:'0 8px 0 0' , background:'rgba(189,78,34,.7)' , border:'none' }}/>

            </Box>

          <TextField type="number" value={1} sx={{width:'100%' , padding:"10px 21px"}} />
          <ul>
            <li>
             <Typography sx={{ fontSize:'16px' , color:Theme["FOURTH_COLOR"] , textAlign:'' , padding:'8px 21px' , fontWeight:'' }}> Durable and Drip</Typography>
            </li>
                        <li>
             <Typography sx={{ fontSize:'16px' , color:Theme["FOURTH_COLOR"] , textAlign:'' , padding:'8px 21px' , fontWeight:'' }}> Made for all weathers and dry in 10 minutes</Typography>
            </li>
                        <li>
             <Typography sx={{ fontSize:'16px' , color:Theme["FOURTH_COLOR"] , textAlign:'' , padding:'8px 21px' , fontWeight:'' }}> Casual Wear</Typography>
            </li>
                        <li>
             <Typography sx={{ fontSize:'16px' , color:Theme["FOURTH_COLOR"] , textAlign:'' , padding:'8px 21px' , fontWeight:'' }}> Life can be amazimg Collection.</Typography>
            </li>
          </ul>

        <Typography sx={{ fontSize:'32px' , color:Theme["FOURTH_COLOR"] , textAlign:'' , padding:'10px 21px' , fontWeight:'600' }}> R300.00 </Typography>

        <Box sx={{ display:'' , width:'98%',margin:'0 auto' }}>
        <Button onClick={() => setOpenDrawer(true)} sx={{ background:Theme["FOURTH_COLOR"],padding:'16px 12px' , margin:'0 3px' ,color:'#eee' , width:'100%' ,fontWeight:600, "&:hover":{color:Theme["FOURTH_COLOR"]} }}>Add To Cart</Button>
</Box>
        </Box>
     </Grid>
     <Grid item xs={12} lg={4} sx={{padding:'2.5rem'}}>
             <Typography sx={{ fontSize:'32px' , color:Theme["FOURTH_COLOR"] , textAlign:'center' , padding:'8px 21px' , margin:'8px 0', fontWeight:'600' }}> More Like This </Typography>
            
<Grid container spacing={2}>
             {
              [
    "https://media.dior.com/img/en_int/sku/couture/193M638AT393_C084_TXXS?imwidth=460",
    "https://media.dior.com/img/en_int/sku/couture/943J605A0554_C080_TXXS?imwidth=460",
    "https://media.dior.com/img/en_int/sku/couture/313C507A5656_C070_T64?imwidth=460",
    "https://media.dior.com/img/en_int/sku/couture/113J692A0614_C585_TXXS?imwidth=460",
    "https://media.dior.com/img/en_int/sku/couture/313M235AT521_C486_TXXS?imwidth=460"
  ].map((item)=>{

return(
<Grid item md={4} key={item} xs={6} sx={{ opacity:'.8' , "&:hover" : { opacity:1 } }} >
             <img src={item} alt="" style={{ width:"100%" , objectFit:'contain' , objectPosition:'' }} />
     </Grid>
  )
  })
             }
     </Grid>
     </Grid>
     </Grid>


    </Box>
    </Drawer>
    </Paper>
  );
}
