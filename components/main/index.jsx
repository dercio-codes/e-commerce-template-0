import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import { Box , Button , Grid } from '@mui/material';
import * as Theme from "../../constants"

export default function Main() {
  const [value, setValue] = React.useState(0);


  return (
    <Box sx={{ 	
    		width: '100%' , 
    		// padding:'21px 0'
    		padding:'2.5rem'
    		 }}>
    	<Box sx={{ width:'100%' , height:'80px' , background:'' , display:'flex' , justifyContent:'space-between' }}>
    	<Box sx={{  width:'100%' , height:'100%' , background:'', display:'flex' , justifyContent:'space-evenly' , alignItems:'center' }}>
    		<Typography sx={{ ...styles.Text }}> Home </Typography>
    		<Typography sx={{ ...styles.Text }}> Past Events </Typography>
    		<Typography sx={{ ...styles.Text }}> Past Events </Typography>
    		<Typography sx={{ ...styles.Text }}> Gallery </Typography>
    		<Typography sx={{ ...styles.Text , border:'1px solid yellow' , borderRadius:'21px' , padding:'12px 21px' }}> Lets Blom </Typography>
    	</Box>
    			<Button sx={{ height:'100%' , backgroundImage:'url("https://cdn-icons-png.flaticon.com/512/8939/8939574.png")' , backgroundSize:'contain' , width:'80px' }} />
    	</Box>

    	<Box sx={{ display:'flex' , maxHeight:'50vh' }} >
    		<Box sx={{ width:'50%' }} >
    		<Typography sx={{ fontSize:'108px' , color:'' , padding:'0 21px' , fontWeight:'600' }}> Sunday Blom. </Typography>

    		</Box>
    		<Box sx={{ width:'50%' , display:'flex' , justifyContent:'flex-end' , alignItems:"center" }} >
    			<Box sx={{ width:'180px' , height:'180px' , background:'#EB8658' , borderRadius:'50%' }} />
    		</Box>
    	</Box>

    	<Box>
    		<Typography sx={{ fontSize:'42px' , color:Theme["FOURTH_COLOR"] , padding:'0 21px' , fontWeight:'600' }}> 04 December 2022 </Typography>
    	</Box>

    	<Box sx={{ height:'100px', width:'100%', display:'flex', justifyContent:'flex-end', alignItems:'center' , background:'pink' , margin:'34px 0' }} >
    	<Box sx={{ height:'100px', width:'100%', background:'yellow' , margin:'0' }} >
    	</Box>
    	
    	<Box sx={{ height:'350px', width:'250px' , background:'green' , margin:'0' }} >
    	
    	</Box>
    	</Box>
  
    </Box>
  );
}


const styles = {
	Text:{
		cursor:'pointer',
		fontSize:'14px',
		fontWeight:'600',
		"&:hover":{
			textDecoration:'underline'
		}
	}
}