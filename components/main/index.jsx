import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import { Box , Button , Grid , TextField } from '@mui/material';
import * as Theme from "../../constants"
import { query, collection, doc,setDoc , addDoc , getDocs, where } from "firebase/firestore";
import { storage , db } from "./../../firebase/firebaseConfig";

export default function MainBanner() {

const images = [
"https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=1600",
"https://images.pexels.com/photos/52518/jeans-pants-blue-shop-52518.jpeg?auto=compress&cs=tinysrgb&w=1600",
"https://images.pexels.com/photos/4495705/pexels-photo-4495705.jpeg?auto=compress&cs=tinysrgb&w=1600",
"https://images.pexels.com/photos/1353503/pexels-photo-1353503.jpeg?auto=compress&cs=tinysrgb&w=1600",
"https://images.pexels.com/photos/1937336/pexels-photo-1937336.jpeg?auto=compress&cs=tinysrgb&w=1600",
"https://images.pexels.com/photos/1020370/pexels-photo-1020370.jpeg?auto=compress&cs=tinysrgb&w=1600",
"https://images.pexels.com/photos/1176618/pexels-photo-1176618.jpeg?auto=compress&cs=tinysrgb&w=1600",
"https://images.pexels.com/photos/581087/pexels-photo-581087.jpeg?auto=compress&cs=tinysrgb&w=1600",
]
const [ email , setEmail] = React.useState("")
const handleChange = (event) => {
	setEmail(event.target.value)
}

const handleSubsribe = async () => {
	 await setDoc(doc(db, "emails" , email), {
                                email
                });
}

  return (
    <Box sx={{ 	
    		width: '100%' , 
    		padding:{
    			xs:'2.5rem',
    			// md:'2.5rem',
    		},
    		// minHeight:'65vh',
    		display:'flex',
    		flexDirection:'column',
    		justifyContent:'center',
    		zIndex:'9',
    		// background:'red'
    		// borderBottom:'1px solid red'
    		 }}>



    		 <Grid container>
    		 <Grid item xs={12} lg={6}> 
    		 <Box sx={{ display:'flex' , justifyContent:'', flexDirection:{ xs:'column' , md:'row' } , alignItems:'flex-end' , paddingRight:{ xs:'0', md:'34px'} }}>
    		<Typography sx={{ fontSize:'108px' , color:'' ,margin:'0', padding:'0' , fontWeight:'600' }}>Summer Special. </Typography>
    		 <Box className="pulsate-fwd" sx={{ 
    				width:{ xs:'100px', md:'120px'} , 
    				height:{ xs:'100px', md:'120px'} , 
    				display:'flex', 
    				justifyContent:'center' , alignItems:'center' , 
    				background:'#EB8658' , 
    				// flexDirection:'column'
    				color:'#eee' , 
    				fontWeight:'600', 
    				transition:'300ms',
    				"&:hover":{
							color:'#EB8658' ,
							border:'5px solid #EB8658',
							// filter:'invert(1)', 
    					background:'#eee' , 
    					textDecoration:'underline'
    				},
    				borderRadius:'50%' }} >
    				HMU
    				{/*<Box sx={{
    					backgroundImage:'url("https://cdn-icons-png.flaticon.com/512/3106/3106417.png")',
    				backgroundSize:'contain',
    				backgroundPosition:'center',
    				height:'30px',
    				width:'30px',
    				}} />*/}
    				</Box>
    		 </Box>
    		<Typography sx={{ fontSize:'21px' , color:Theme["FOURTH_COLOR"] , padding:'0 0' , fontWeight:'400' }}> Next Event : </Typography>

    		<Typography sx={{ fontSize:'42px' , color:Theme["FOURTH_COLOR"] , padding:'0 0' , fontWeight:'600' }}> 04 December 2023 </Typography>

    		<Typography sx={{ fontSize:'32px' , color:Theme["FOURTH_COLOR"] , padding:'0 0' , fontWeight:'400' }}> Tired of missing out on new merch? </Typography>
    		 <Box sx={{ display:'flex' , alignItems:'center' , background:'' , }} > 
	<TextField type="email" value={email} onChange={handleChange} sx={{ width:{ xs:'100%', md:'370px'} , padding:'16px 0' }}  placeholder={"mail@example.com"}/>
    		<Button onClick={handleSubsribe} sx={{ background:Theme["FOURTH_COLOR"],padding:'16px 21px' , margin:'0 8px' ,color:'#eee' , fontWeight:600 , "&:hover":{color:Theme["FOURTH_COLOR"]} }}>Subscribe</Button>
    	
    		 </Box>
    		 </Grid>
    		 <Grid item xs={12} lg={5} sx={{ height:'600px' , background:'' }}> 
    		 <Box className="grid">
    		 {
    		 	images.map((item,index)=>(
  						<Box key={item} sx={{ backgroundImage:`url("${item}")` }} className={`grid-item${index + 1}`}></Box>
    		 		))
    		 }
{/*  <Box className="grid-item2"></Box>
  <Box className="grid-item3"></Box>
  <Box className="grid-item4"></Box>
  <Box className="grid-item5"></Box>
  <Box className="grid-item6"></Box>
  <Box className="grid-item7"></Box>
  <Box className="grid-item8"></Box>*/}
</Box>
    		 </Grid>
    		 <Grid item xs={12} lg={2}> 
    		{/* <Box sx={{ 
    				width:{ xs:'100px', md:'150px'} , 
    				height:{ xs:'100px', md:'150px'} , 
    				display:'flex', 
    				justifyContent:'center' , alignItems:'center' , 
    				background:'#EB8658' , 
    				// flexDirection:'column'
    				color:'#eee' , 
    				fontWeight:'600', 
    				transition:'300ms',
    				"&:hover":{
							color:'#EB8658' ,
							border:'5px solid #EB8658',
							// filter:'invert(1)', 
    					background:'#eee' , 
    					textDecoration:'underline'
    				},
    				borderRadius:'50%' }} >
    				Lets Blom
    				<Box sx={{
    					backgroundImage:'url("https://cdn-icons-png.flaticon.com/512/3106/3106417.png")',
    				backgroundSize:'contain',
    				backgroundPosition:'center',
    				height:'30px',
    				width:'30px',
    				}} />
    				</Box>*/}
    		 </Grid>
    		 
    		 </Grid>


    <Box sx={{ display:'flex' , maxHeight:'100vh' , width:"100%" ,background:'' }} >
    		{/*<Box sx={{ width:'50%' }} >
    		<Typography sx={{ fontSize:'108px' , color:'' , padding:'0 21px' , fontWeight:'600' }}> Sunday Blom. </Typography>

    		</Box>*/}
    	{/*	<Box sx={{ width:'50%' }} sx={{ display:'flex' , justifyContent:'flex-end' , alignItems:{xs:'flex-end' , md:"center"} }} >
    			<Box sx={{ 
    				width:{ xs:'100px', md:'150px'} , 
    				height:{ xs:'100px', md:'150px'} , 
    				display:'flex', 
    				justifyContent:'center' , alignItems:'center' , 
    				background:'#EB8658' , 
    				// flexDirection:'column'
    				color:'#eee' , 
    				fontWeight:'600', 
    				transition:'300ms',
    				"&:hover":{
							color:'#EB8658' ,
							border:'5px solid #EB8658',
							// filter:'invert(1)', 
    					background:'#eee' , 
    					textDecoration:'underline'
    				},
    				borderRadius:'50%' }} >
    				Lets Blom
    				<Box sx={{
    					backgroundImage:'url("https://cdn-icons-png.flaticon.com/512/3106/3106417.png")',
    				backgroundSize:'contain',
    				backgroundPosition:'center',
    				height:'30px',
    				width:'30px',
    				}} />
    				</Box>
    		</Box>*/}
    	</Box>

    {/*	<Box>
    		<Typography sx={{ fontSize:'21px' , color:Theme["FOURTH_COLOR"] , padding:'0 21px' , fontWeight:'400' }}> Next Event : </Typography>
    		<Typography sx={{ fontSize:'42px' , color:Theme["FOURTH_COLOR"] , padding:'0 21px' , fontWeight:'600' }}> 04 December 2022 </Typography>
    		<Typography sx={{ fontSize:'32px' , color:Theme["FOURTH_COLOR"] , padding:'0 21px' , fontWeight:'400' }}> Tired of missing out on new merch? </Typography>
    	</Box>
*/}
    	<Box sx={{ height:'100px', width:'100%', display:'flex', justifyContent:'space-between', alignItems:'center' , background:'' , margin:'21px auto' }} >
    	<Box sx={{ height:'100px', padding:'12px 21px', display:'flex', alignItems:'center' ,width:'100%', background:'' , margin:'0' }} >
    	{/*	<TextField sx={{ width:'350px' }}  placeholder={"mail@example.com"}/>
    		<Button sx={{ background:Theme["FOURTH_COLOR"],padding:'16px 12px' , margin:'0 3px' ,color:'#eee' , fontWeight:600 , "&:hover":{color:Theme["FOURTH_COLOR"]} }}>Subscribe</Button>
    	*/}
    	{/*<img src="/model.png" id="banner-img" alt=""  
    		style={{ 
    			margin:'0 34px' , 
    			scale:'1.1' , 
    			zIndex:9,
    			transform:'translateY(-72px)'
    			 }} />*/}
    	</Box>
    	
    	<Box sx={{ height:'350px', width:'250px' , background:'' , margin:'0' }} >
    	    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="100%" id="blobSvg">                       
    	     <defs>                    
    	         <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">     
    	          <stop offset="0%" style={{stopColor:Theme["FOURTH_COLOR"] }}></stop>   
    	           <stop offset="100%" style={{stopColor:Theme["FIFTH_COLOR"] }}></stop>                  
    	            </linearGradient>                     
    	            </defs>                    
    	            <path id="blob" fill="url(#gradient)">                      
    	            <animate attributeName="d" dur="10000ms" repeatCount="indefinite" values="M440.5,320.5Q418,391,355.5,442.5Q293,494,226,450.5Q159,407,99,367Q39,327,31.5,247.5Q24,168,89,125.5Q154,83,219.5,68Q285,53,335.5,94.5Q386,136,424.5,193Q463,250,440.5,320.5Z;M453.78747,319.98894Q416.97789,389.97789,353.96683,436.87838Q290.95577,483.77887,223.95577,447.43366Q156.95577,411.08845,105.64373,365.97789Q54.33169,320.86732,62.67444,252.61056Q71.01719,184.3538,113.01965,135.21007Q155.02211,86.06634,220.52211,66.46683Q286.02211,46.86732,335.5,91.94472Q384.97789,137.02211,437.78747,193.51106Q490.59704,250,453.78747,319.98894Z;M411.39826,313.90633Q402.59677,377.81265,342.92059,407.63957Q283.24442,437.46649,215.13648,432.5428Q147.02853,427.61911,82.23325,380.9572Q17.43796,334.29529,20.45223,250.83809Q23.46649,167.38089,82.5856,115.05707Q141.70471,62.73325,212.19045,63.73015Q282.67618,64.72705,352.67308,84.79839Q422.66998,104.86972,421.43486,177.43486Q420.19974,250,411.39826,313.90633Z;M440.5,320.5Q418,391,355.5,442.5Q293,494,226,450.5Q159,407,99,367Q39,327,31.5,247.5Q24,168,89,125.5Q154,83,219.5,68Q285,53,335.5,94.5Q386,136,424.5,193Q463,250,440.5,320.5Z;"></animate>                        
    	    </path>                    
    	    </svg>
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
