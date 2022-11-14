import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import { Box , Rating, Paper , Button , Grid , TextField } from '@mui/material';
import * as Theme from "../../constants"

export default function ProductItem(props) {


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

    		 <img src={props.image} alt="" style={{ width:"100%" }} />
    		 <Rating  />
    		<Typography sx={{ fontSize:'21px' , color:Theme["FOURTH_COLOR"] , textAlign:'center' , padding:'18px 21px' , fontWeight:'600' }}> Sunday Blom Bucket Hat </Typography>
    		<Button sx={{ background:Theme["FOURTH_COLOR"],padding:'16px 12px' , margin:'0 3px' ,color:'#eee' , width:'100%' ,fontWeight:600, "&:hover":{color:Theme["FOURTH_COLOR"]} }}>Add To Cart</Button>

    </Paper>
  );
}
