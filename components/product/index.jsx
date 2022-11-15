import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import { Box  , Button , Select , MenuItem , Grid ,Paper , TextField } from '@mui/material';
import * as Theme from "../../constants"
import ProductItem from "./product-item"
import AddIcon from '@mui/icons-material/Add';
export default function Product(props) {

	const images = [
		"https://media.dior.com/img/en_int/sku/couture/193M638AT393_C084_TXXS?imwidth=460",
		"https://media.dior.com/img/en_int/sku/couture/943J605A0554_C080_TXXS?imwidth=460",
		"https://media.dior.com/img/en_int/sku/couture/313C507A5656_C070_T64?imwidth=460",
		"https://media.dior.com/img/en_int/sku/couture/113J692A0614_C585_TXXS?imwidth=460",
		"https://media.dior.com/img/en_int/sku/couture/313M235AT521_C486_TXXS?imwidth=460"
	]

	const Categories = [
	"Hoodies",
	"Shorts",
	"Beanies",
	"T-Shirts",
	"Bucket Hats",
	]

		const SortBy = [
		"Latest ( Ascending )",
		"Latest ( Descening )",
		"Time",
	]

  return (
    <Box sx={{ 	
    		width: '100%' , 
    		padding:{
    			xs:'0.5rem',
    			md:'2.5rem',
    		},
    		zIndex:10,
    		minHeight:'50vh',
    		display:'flex',
    		// background:'red',
    		alignItems:"center",
    		flexDirection:'column',
    		justifyContent:'center'
    		 }}>

    		<Typography sx={{ fontSize:{xs:'24px' , md:'36px'} , color:'' , padding:'34px 21px' , fontWeight:'600' }}> {props.sectionTitle} </Typography>

    		<Box sx={{ display:props.hidden ? 'none' : 'flex' , justifyContent:'space-between' , alignItems:'center', padding:'34px 0', width:'100%' , background:'' }}>

				<Box sx={{ display:'flex' , alignItems:'center' , width:{xs:'50%'} }}>
    		<Typography sx={{ fontSize:'21px' , color:'' , padding:'12px' }}> Sort by : </Typography>

				<Select value={"Filter by :"} sx={{ height:{xs:'fit-content' , md:'auto'} , padding:'0 34px' }}>
					{
						SortBy.map(item => (<MenuItem key={item} value={item}>{item}</MenuItem>))
					}
    		</Select>
				</Box>


				<Box sx={{ display:'flex' , justifyContent:'flex-end' , background:'' , width:{xs:'50%'} }}>
    		<Typography sx={{ fontSize:'21px' , color:'' , padding:'12px' }}> Filter by : </Typography>

				<Select value={"Filter by :"} sx={{ height:{xs:'fit-content' , md:'auto'} , padding:'0 34px' }}>
					{
						Categories.map(item => (<MenuItem key={item} value={item}>{item}</MenuItem>))
					}
    		</Select>
				</Box>
    		</Box>

    		 <Grid container spacing={0}>
    		 {
    		 	images.map((item,index)=>(
    		 <Grid key={item} item xs={6} md={4} lg={2.4}>
				<ProductItem color={index % 2 === 0 ? 'rgba(255,0,0,.8)' : 'rgba(0,200,0,.8)'} special={index % 2 === 0 ? 'Hot In' : 'Sale'} image={item}/>
    		 </Grid>
    		 		))
    		 }

    		  <Grid item xs={6} md={4} lg={2.4} sx={{ display:{lg:'none' , xs:'flex'} , justifyContent:'center' , background:'rgba()' , alignItems:'center' }}>
				<Paper sx={{ width:'100%' , height:'100%' , display:'flex' , alignItems:'center', justifyContent:'center' , flexDirection:'column' , background:'transparent' , opacity:'0.5' , "&:hover":{ opacity:'1' } ,   }} elevation={0}> 
<AddIcon sx={{ fontSize:'84px' }}  />
View More
				 </Paper>
    		 </Grid>
    		 </Grid>
    </Box>
  );
}
