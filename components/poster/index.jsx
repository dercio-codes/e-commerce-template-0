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
    		// backgroundImage:'url("https://www.dior.com/couture/var/dior/storage/images/pushs-editos/folder-spring-23/folder-wave-1/313m646at503c584/38409437-1-eng-GB/313m646at503c584_1440_1200.jpg")',
    		// backgroundSize:{ xs: 'cover' , md:'contain'},
    		minHeight:'100vh' , 
    		display:'flex',
    		flexDirection:{ xs:'column' , lg:'row'},
    		justifyContent:'center'
    		 }}>


    		 <Box sx={{
    		width: { xs:'100%' ,  lg : '50%'} , 
    		backgroundImage:'url("/sunday-blom-model-1.jpg")',
    		backgroundSize:{ xs: 'cover' , md:'cover'},
    		height:'100vh' , 

    		 }} />
    		 <Box sx={{
    		width: { xs:'100%' ,  lg : '50%'} , 
    		// backgroundImage:'url("/banner-1.jpg")',
    		// backgroundSize:{ xs: 'cover' , md:'cover'},
    		 height:'100vh' , 

    		 }}>

         <video loop autoPlay controls={false} style={{ width:'100%' , height:'100%' }}>
          
       <source src="/sunday-blom-video.mp4" type="video/mp4"/>
         </video>

         </Box>
    
    </Box>
  );
}
