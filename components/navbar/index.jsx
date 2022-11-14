import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import { Box , Paper, MenuItem , Drawer , Button , Grid } from '@mui/material';
import * as Theme from "../../constants"
import ChangeHistoryIcon from '@mui/icons-material/ChangeHistory';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import InstagramIcon from '@mui/icons-material/Instagram';
import Link from "next/link"

export default function Navbar() {
  const [openDrawer, setOpenDrawer] = React.useState(false);
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

	<Button onClick={() => setOpenDrawer(true)} sx={{ 
    				height:'100%' , 
    				width:'100px',
    				padding:'8px',
    				scale:'.5' , 
    				borderTop:'3px solid #38241B',
    				borderBottom:'3px solid #38241B',
    				alignItem:'center',
    				display:{ xs:'flex', lg:'none' } }}>

<ChangeHistoryIcon sx={{ fill:'#EB8658' , rotate:'25deg' }} />
<Box sx={{ padding:'2px' ,width:'100%' , maring:'0 4px' , background:'#EB8658' }} />
    				</Button>
    	</Box>


    	 <Drawer
      anchor={"right"}
      open={openDrawer}
      sx={{ background:'transparent' , zIndex:'100' }}
      onClose={() => setOpenDrawer(false)}
    >
    <Box sx={{ 
    	width:'350px' ,
    	// background:'red', 
    background:'rgba(251,251,251,0.3)'
     }}>

<Box sx={{ width:'100%' , background:'red', height:'250px' , backgroundImage:'url("/sunday-blom-logo.png")' , backgroundPosition:'center' , backgroundSize:'cover', filter:'invert(1)' }}  />
  	
<MenuItem sx={{ width:'100%' , display:'flex' ,  alignItems:'center' , padding:'16px 21px' }}>
	
<HomeIcon sx={{ margin:'0 16px' }} />
<Typography>	{"Home"}</Typography>
</MenuItem>
<MenuItem sx={{ width:'100%' , display:'flex' ,  alignItems:'center' , padding:'16px 21px' }}>
	
<SearchIcon sx={{ margin:'0 16px' }} />
<Typography>	{"Search"}</Typography>
</MenuItem>
<MenuItem sx={{ width:'100%' , display:'flex' ,  alignItems:'center' , padding:'16px 21px' }}>
	
<AccountCircleIcon sx={{ margin:'0 16px' }} />
<Typography>	{"My Account"}</Typography>
</MenuItem>
<MenuItem sx={{ width:'100%' , display:'flex' ,  alignItems:'center' , padding:'16px 21px' }}>
	
<ShoppingCartIcon sx={{ margin:'0 16px' }} />
<Typography>	{"Cart"}</Typography>
</MenuItem>


<Box sx={{ display:"flex" , flexDirection:'column' , height:'80%', justifyContent:'flex-end'}}>
<Box sx={{ display:'flex ', flexDirection:'column' ,alignItems:'center' , justifyContent:'center', padding:'34px' }}>
  <Typography>Sunday Blom 2022.</Typography>
  <Link href="https://www.instagram.com/thesundayblom/?hl=en">
<InstagramIcon sx={{ margin:'12px 0' }} />
  </Link>

  </Box>
</Box>


    </Box>
    </Drawer>

    </Box>
  );
}

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