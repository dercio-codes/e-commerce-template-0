import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import { Box , Paper , Button , Grid } from '@mui/material';
import * as Theme from "../../constants"

export default function Navbar() {
  const [value, setValue] = React.useState(0);
  const Links = [
  	"Home",
  	"Search",
  	"My Account",
  	"Cart",
  ]

  return (
    <Box sx={{ 	
    		width: '100%' , 
    		background:'',
padding:{
    			xs:'0.5rem 1.5rem',
    			md:'1.5rem 2.5rem',
    		},
    		 }}>
    
  	<Box sx={{ width:'100%' , height:'80px' , background:'' , display:'flex' , justifyContent:'space-between' }}>
    	<Box sx={{  width:'60%', margin:'0 auto' , height:'100%' , background:'', display:'flex' , justifyContent:'space-around' , alignItems:'center' }}>
    	{
    		Links.map((item,index)=>(
    			<Typography key={item+index} sx={{ ...styles.Text }}> {item} </Typography>
    			))
    	}	
    	</Box>
    			<Button sx={{ height:'100%' , scale:'.7' , display:{ lg:'none' } , backgroundImage:'url("https://cdn-icons-png.flaticon.com/512/8939/8939574.png")' , backgroundSize:'contain' , width:'80px' }} />
    	</Box>

    </Box>
  );
}
    		{/*<Typography sx={{ ...styles.Text , border:'1px solid yellow' , borderRadius:'21px' , padding:'12px 21px' }}> Lets Blom </Typography>*/}


const styles = {
	Text:{
		cursor:'pointer',
		fontSize:'14px',
		fontWeight:'600',
		display:{
			lg:'flex',
			xs:'none',
		},
		"&:hover":{
			textDecoration:'underline'
		}
	}
}