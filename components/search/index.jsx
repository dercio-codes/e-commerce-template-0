import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import { Box  , Button , Select , MenuItem , Grid ,Paper , TextField } from '@mui/material';
import * as Theme from "../../constants"
// import ProductItem from "./product-item"
import AddIcon from '@mui/icons-material/Add';
import { storage , db } from "./../../firebase/firebaseConfig";
import ProductItem from "./../product/product-item"

import { query, doc ,  collection, addDoc , setDoc, getDocs, where } from "firebase/firestore";


export default function SearchComponent(props) {
	const [ products , setProducts] = React.useState([]);
	const [ searchQuery , setSearchQuery] = React.useState("");
	const [ selectedCat , setSelectedCat] = React.useState("");

	    	const getProducts = async () => {
		const local = []
		  const querySnapshot = await getDocs(collection(db, "products"));

    querySnapshot.forEach((item)=>{
    	local.push({...item.data()})
    })
console.log(local)
setProducts(local)
	}

	React.useEffect(()=>{
		getProducts()
	},[])

	   const Categories = [
        {
        	title : "T-Shirts" ,
        	img:"https://cdn-icons-png.flaticon.com/512/1867/1867631.png"
        },
        {
        	title : "Shirts" ,
        	img:"https://cdn-icons-png.flaticon.com/512/2503/2503376.png"
        },
        {
        	title : "Caps" ,
        	img:"https://cdn-icons-png.flaticon.com/512/1974/1974211.png"
        },
        {
        	title : "Beanies" ,
        	img:"https://cdn-icons-png.flaticon.com/512/606/606277.png"
        },
        {
        	title : "Bucket Hats" ,
        	img:"https://cdn-icons-png.flaticon.com/512/3345/3345533.png"
        },
        {
        	title : "Jackets" ,
        	img:"https://cdn-icons-png.flaticon.com/512/2806/2806119.png"
        },
        {
        	title : "Socks" ,
        	img:"https://cdn-icons-png.flaticon.com/512/2161/2161173.png"
        },
        {
        	title : "Pants" ,
        	img:"https://cdn-icons-png.flaticon.com/512/862/862993.png"
        },
        {
        	title : "Shorts" ,
        	img:"https://cdn-icons-png.flaticon.com/512/2236/2236900.png"
        },
    ]

    let categoryResults = []
        		   
     products.map((item)=>{
     	if(item.Categories.includes(selectedCat)){
					categoryResults.push(item)
     	}
     })
     

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

    		     		 <Box sx={{ display:'flex' , alignItems:'center' , marginBottom: "34px",  background:'' , }} > 
	<TextField onChange={(e)=> setSearchQuery(e.target.value)} value={searchQuery} sx={{ width:{ xs:'100%', md:'370px'} , padding:'16px 0' }} type="text"  placeholder={"Example : Dunks..."}/>
    		<Button sx={{ background:Theme["FOURTH_COLOR"],padding:'16px 21px' , margin:'0 8px' ,color:'#eee' , fontWeight:600 , "&:hover":{color:Theme["FOURTH_COLOR"]} }}>Search</Button>
    	
    		 </Box>

    		 {

    		 	searchQuery === "" ? (
<Grid container spacing={4}>
    		   {
        	Categories.map((item,index)=>{
        		return(
        	        		<Grid key={item+index} onClick={()=> setSelectedCat(item.title) } item xs={6} md={4} lg={2.4} sx={{ padding:'' ,   }}>
        	        		<Paper sx={{ width:'100%' , background:'transparent' , padding:'32px 0' , "&:hover":{boxShadow:"0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)"} }} elevation={1} >
        	        		<img src={item.img} alt={item.title} style={{ margin:'21px auto' , width:'100%' , height:'100px' , objectFit:'contain' }} />
        	        		<Typography sx={{  textAlign:'center' , width:'100%' ,  }} > {item.title} </Typography>
        	        		</Paper>
        	        		</Grid>
        	        	)
        		
        	})
        }
    		  </Grid>
    		 		) : (
    		 <Box sx={{ 
			minHeight:'500px',
			width:'100%',
			margin:'21px 0',
    		display:'flex',
    		background:'',
    		alignItems:"center",
    		justifyContent:'center'
    		// flexDirection:'column',
    		  }}>
    		  <Grid container>
    		   {
        	products.map((item,index)=>{
        		if(item.Title.toLowerCase().includes(searchQuery.toLowerCase())){
										return(
        	        		<Grid key={item+index} item xs={6} md={4} lg={2.4}>
        	        			<ProductItem product={item} color={index % 2 === 0 ? 'rgba(255,0,0,.8)' : 'rgba(0,200,0,.8)'} special={index % 2 === 0 ? 'Hot In' : 'Sale'} image={item.Image} Title={item.Title} Price={item.Price}  />
        	        		</Grid>
        	        	)
        		}
        	})
        }
    		  </Grid>
    		  
    		 </Box>
    		 		)

    		 }


    		 <Box sx={{ minHeight:"50vh", margin:'21px 0' , padding:'2.5rem 0' , width:'100%' , display:selectedCat === "" ? "none" :'block'}}>
    		
    		 {
    		 	categoryResults.length === 0 ? (
    		 		<Box sx={{ display:selectedCat !== "" ? "block" :'none' , margin:'2.5rem 0'}}>
    		 			<img src="https://cdn-icons-png.flaticon.com/512/7465/7465563.png" style={{ objectFit:'contain' , width:'100%' , height:'250px' }} alt="" />
    		 		
							<Typography sx={{ fontSize:'24px' , textAlign:'center' , color:Theme["FOURTH_COLOR"] , padding:'0 0' , fontWeight:'600' }}> Search results not found for {selectedCat}... </Typography>
    		 		</Box>
    		 		) : (
    		 		<Box sx={{display:selectedCat === "" ? "none" : 'block' }}>
<Typography sx={{ fontSize:'24px' , color:Theme["FOURTH_COLOR"] , padding:'0 0' , fontWeight:'600' }}> { selectedCat} </Typography>
    		    		  <Grid container>
    		   {
        	categoryResults.map((item,index)=>{
										return(
        	        		<Grid key={item+index} item xs={6} md={4} lg={2.4}>
        	        			<ProductItem product={item} color={index % 2 === 0 ? 'rgba(255,0,0,.8)' : 'rgba(0,200,0,.8)'} special={index % 2 === 0 ? 'Hot In' : 'Sale'} image={item.Image} Title={item.Title} Price={item.Price}  />
        	        		</Grid>
        	        	)
        		}
        	)
        }
    		  </Grid>

    		 		</Box>
    		 		)

    		 }
    		
    		 </Box>


    </Box>
  );
}
