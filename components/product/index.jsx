import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import { Box  , Button , Grid , TextField } from '@mui/material';
import * as Theme from "../../constants"
import ProductItem from "./product-item"
export default function Product(props) {

	const images = [
		"https://media.dior.com/img/en_int/sku/couture/193M638AT393_C084_TXXS?imwidth=460",
		"https://media.dior.com/img/en_int/sku/couture/943J605A0554_C080_TXXS?imwidth=460",
		"https://media.dior.com/img/en_int/sku/couture/313C507A5656_C070_T64?imwidth=460",
		"https://media.dior.com/img/en_int/sku/couture/113J692A0614_C585_TXXS?imwidth=460",
		"https://media.dior.com/img/en_int/sku/couture/313M235AT521_C486_TXXS?imwidth=460"
	]

  return (
    <Box sx={{ 	
    		width: '100%' , 
    		padding:{
    			// xs:'0.5rem',
    			xs:'2.5rem',
    		},
    		zIndex:10,
    		minHeight:'50vh',
    		display:'flex',
    		// background:'red',
    		alignItems:"center",
    		flexDirection:'column',
    		justifyContent:'center'
    		 }}>

    		<Typography sx={{ fontSize:'36px' , color:'' , padding:'34px 21px' , fontWeight:'600' }}> {props.sectionTitle} </Typography>

    		 <Grid container spacing={0}>
    		 {
    		 	images.map((item,index)=>(
    		 <Grid key={item} item xs={6} md={4} lg={2.4}>
				<ProductItem image={item}/>
    		 </Grid>
    		 		))
    		 }
    		 </Grid>
    </Box>
  );
}
