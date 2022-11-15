import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import { Box  , Button , Select , MenuItem , Grid ,Paper , TextField } from '@mui/material';
import * as Theme from "../../constants"
// import ProductItem from "./product-item"
import AddIcon from '@mui/icons-material/Add';


export default function SearchComponent(props) {


  return (
    <Box sx={{ 	
    		width: '100%' , 
    		padding:{
    			// xs:'0.5rem',
    			xs:'2.5rem',
    		},
    		zIndex:10,
    		// minHeight:'80vh',
    		display:'flex',
    		// background:'red',
    		alignItems:"center",
    		flexDirection:'column',
    		// justifyContent:'center'
    		 }}>

    		<Typography sx={{ fontSize:'32px' , color:Theme["FOURTH_COLOR"] , padding:'0 0' , fontWeight:'600' }}> Search </Typography>

    		     		 <Box sx={{ display:'flex' , alignItems:'center' , background:'' , }} > 
	<TextField sx={{ width:{ xs:'100%', md:'370px'} , padding:'16px 0' }}  placeholder={"mail@example.com"}/>
    		<Button sx={{ background:Theme["FOURTH_COLOR"],padding:'16px 21px' , margin:'0 8px' ,color:'#eee' , fontWeight:600 , "&:hover":{color:Theme["FOURTH_COLOR"]} }}>Search</Button>
    	
    		 </Box>

    		 <Box sx={{ 
			height:'500px',
			width:'100%',
			margin:'21px 0',
    		display:'flex',
    		background:'',
    		alignItems:"center",
    		justifyContent:'center'
    		// flexDirection:'column',
    		  }}>
    		<Typography sx={{ fontSize:'21px' , color:Theme["FOURTH_COLOR"] , padding:'0 0' , fontWeight:'600' }}> Your search results will be displayed here... </Typography>

    		  
    		 </Box>


    </Box>
  );
}
