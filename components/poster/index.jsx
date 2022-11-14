import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import { Box , Button , IconButton } from '@mui/material';


export default function Poster() {
  const [value, setValue] = React.useState(0);


  return (
    <Box sx={{ 
    		width: '100%' , 
    		height:'100%' , 
    		// padding:'2.5rem',
    		display:'flex',
    		flexDirection:'column',
    		justifyContent:'center'
    		 }}>
    	<Box sx={{ 
    			width:'100%' , 
    			height:'100%', 
    			backgroundRepeat:"no-repeat",
    			backgroundPosition:'center' , 
    			backgroundImage:'url("/sunday-blom.jpg")' , 
    			backgroundSize:'fill'
    			}}>

    	
    	</Box>
    	<IconButton sx={{ 
	    				width:'120px', 
	    				margin:'0 auto', 
	    				display:'flex',
	    				alignItems:'center', 
	    				justifyContent:'center' , 
	    				color:'#eee',
	    				height:'120px' , 
	    				background:'#EB8658' , 
	    				borderRadius:'50%',
	    				transition:'200ms',
	    				scale:'0.85',
	    				"&:hover":{
	    					scale:'1',
	    					cursor:'pointer',
	    					color:'#EB8658' ,
	    					background:'#eee',
	    					border:'3px solid #EB8658'
	    				}
    				}}>
    			<Box>Lets Blom</Box>

</IconButton>
    			{/*<Button sx={{  }}>Lets Blom</Button>*/}
    </Box>
  );
}
