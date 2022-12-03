import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { storage , db } from "./../../firebase/firebaseConfig";
import Typography from '@mui/material/Typography';
import { Box , OutlinedInput  , Button , Select , MenuItem , Grid ,Paper , TextField } from '@mui/material';
import * as Theme from "../../constants"
import ProductItem from "./product-item"
import AddIcon from '@mui/icons-material/Add';
import { query, collection, doc,setDoc , addDoc , getDocs, where } from "firebase/firestore";
import { User } from "../../pages/_app"
import { toast } from 'react-toastify';

export default function ProductContainer(props) {
	const { user ,setUser , authOpen , SetAuthOpen} = React.useContext(User);

	const [ products , setProducts] = React.useState([]);
	const [ cart , setCart] = React.useState([]);
	const [ filterBy , setFilterBy] = React.useState("None");
	const [ sortBy , setSortBy] = React.useState("");
	const images = [
	"https://media.dior.com/img/en_int/sku/couture/193M638AT393_C084_TXXS?imwidth=460",
	"https://media.dior.com/img/en_int/sku/couture/943J605A0554_C080_TXXS?imwidth=460",
	"https://media.dior.com/img/en_int/sku/couture/313C507A5656_C070_T64?imwidth=460",
	"https://media.dior.com/img/en_int/sku/couture/113J692A0614_C585_TXXS?imwidth=460",
	"https://media.dior.com/img/en_int/sku/couture/313M235AT521_C486_TXXS?imwidth=460"
	]

	const Categories = [
	"None",
	"T-Shirts",
	"Shirts",
	"Caps",
	"Beanies",
	"Bucket Hats",
	"Jackets",
	"Socks",
	"Pants",
	"Shorts",
	]

	const SortBy = [
		"Hot In",
		"Sale"
	]

		console.log(user)
	// 	const handleAddToCart = async (product) => {
	// 		let localNewProduct = {...product , productCartID : new Date().getTime() }
	// 		let localUser = { ...user  }
	// 			if(user.cart.length === 0){
	// 				localUser = {
	// 					...user ,
	// 					cart:[...user.cart , localNewProduct],
	// 				}
	// 					setUser({...localUser})
	// 			}else{
	// 				user.cart.map((item , index)=>{
	// 					if(item.id === product.id){
	// 						// console.log(item)
	// 						// console.log(product)
	// 						localNewProduct = {...product , Quantity:Number(item.Quantity + product.Quantity) , productCartID : new Date().getTime() }
	// 						localUser.cart[index] = localNewProduct
	// 					}else{
	// 						localNewProduct = {...product , productCartID : new Date().getTime() }
	// 						localUser = {
	// 							...user ,
	// 							cart:[...user.cart , localNewProduct],
	// 						}
	// 					}
	// 				})
	// 						setUser({...localUser})
	
	// 			}
	// 			delete localNewProduct["Colors"]
	// 			delete localNewProduct["HotIn"]
	// 			try {
	// 				const productData = Object.keys(localNewProduct)
	// 				if(productData.includes("")){
	// 					toast.warning('Please fill in all fields!!!', {
	// 						position: toast.POSITION.TOP_RIGHT
	// 					});
	// 				}else{
	// 					console.log("This is what we will be posting bruh" , localUser)
	// 					await setDoc(doc(db, "users" , user.email), {
	// 						uid : user.uid,
	// 						email : user.email,
	// 						cart:[...localUser.cart],
	//         	                        // wishlist:[...user.wishlist],
	//         	                        // orders:[...user.orders],
	//         	                    });
	// 					toast.success('Added item to cart', {
	// 						position: toast.POSITION.TOP_RIGHT
	// 					});
	// 					localStorage.setItem('authUser', JSON.stringify({...user , cart:[...localUser.cart]}))
	// 				}
	// 			} catch (err) {
	// 				console.error(err);
	// 				toast.error(err.message, {
	// 					position: toast.POSITION.TOP_RIGHT
	// 				});
	// 		}
	// }

	const handleAddToCart = async (product) => {
		if(user.uid === "" || user.email === ""){
			SetAuthOpen(true)
		}else{
			  setCart(
    cart => cart.some(item => item.id === product.id)
      ? cart.map(item => item.id === product.id 
          ? { ...item, Quantity: item.Quantity + product.Quantity } 
          : item 
        )
      : [ ...cart, {...product} ]
  )
  const localCart = cart.some(item => item.id === product.id)
        ? cart.map(item => item.id === product.id 
            ? { ...item, Quantity: item.Quantity + product.Quantity } 
            : item 
          )
        : [ ...cart, {...product} ]
  

				try {
					const productData = Object.keys(product)
					if(productData.includes("")){
						toast.warning('Please fill in all fields!!!', {
							position: toast.POSITION.TOP_RIGHT
						});
					}else{
						console.log("This is what we will be posting bruh" , localCart)
						await setDoc(doc(db, "users" , user.email), {
							uid : user.uid,
							email : user.email,
							cart:[...localCart],
	        	                        // wishlist:[...user.wishlist],
	        	                        // orders:[...user.orders],
	        	                    });
						toast.success('Added item to cart', {
							position: toast.POSITION.TOP_RIGHT
						});
						localStorage.setItem('authUser', JSON.stringify({...user , cart:[...localCart]}))
						setUser({...user , cart:[...localCart]})
						console.log("User : " , user)
					}
				} catch (err) {
					console.error(err);
					toast.error(err.message, {
						position: toast.POSITION.TOP_RIGHT
					});
			}
		}
}

console.log("updated cart :" , cart)
	

	const getProducts = async () => {
		const local = []
		const querySnapshot = await getDocs(collection(db, "products"));

		querySnapshot.forEach((item)=>{
			local.push(item.data())
		})
		console.log(local)
		setProducts(local)
	}

	React.useEffect(()=>{
		getProducts()
	},[])

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

    	<TextField value={sortBy} select label={"Sort By :"}
					sx={{ height:{xs:'fit-content', md:'auto'},minWidth:{xs:'120px' , md:'250px'} ,maxWidth:'80%', color:'#111' , padding:'0' ,  '& .MuiOutlinedInput-root': {  // - The Input-root, inside the TextField-root
            '& fieldset': {            // - The <fieldset> inside the Input-root
            	color:Theme["FOURTH_COLOR"],
                borderColor: '#999',   // - Set the Input border
            },
            '&:hover fieldset': {
            	color:Theme["FOURTH_COLOR"],
                borderColor: Theme["FOURTH_COLOR"], // - Set the Input border when parent has :hover
            },
            '&.Mui-focused fieldset': { // - Set the Input border when parent is focused 
            	color:Theme["FOURTH_COLOR"],
            	borderColor: Theme["FOURTH_COLOR"],
            },
        },}}
        >{
        	SortBy.map(item => (<MenuItem onClick={()=> setSortBy(item) } key={item} value={item}>{item}</MenuItem>))
        }
        </TextField>
        </Box>


        <Box sx={{ display:'flex' , justifyContent:'flex-end' , background:'' , width:{xs:'50%'} }}>

        <TextField value={filterBy} select label={"Filter By :"}
					sx={{ height:{xs:'fit-content', md:'auto'},minWidth:{xs:'120px' , md:'250px'} ,maxWidth:'80%', color:'#111' , padding:'0' ,  '& .MuiOutlinedInput-root': {  // - The Input-root, inside the TextField-root
            '& fieldset': {            // - The <fieldset> inside the Input-root
            	color:Theme["FOURTH_COLOR"],
                borderColor: '#999',   // - Set the Input border
            },
            '&:hover fieldset': {
            	color:Theme["FOURTH_COLOR"],
                borderColor: Theme["FOURTH_COLOR"], // - Set the Input border when parent has :hover
            },
            '&.Mui-focused fieldset': { // - Set the Input border when parent is focused 
            	color:Theme["FOURTH_COLOR"],
            	borderColor: Theme["FOURTH_COLOR"],
            },
        }, }}
        >
        {
        	Categories.map(item => (<MenuItem key={item} onClick={()=> setFilterBy(item) } value={item}>{item}</MenuItem>))
        }
        </TextField>
        </Box>
        </Box>

        <Grid container spacing={0}>
        {
        	products.map((item,index)=>{
        		if(filterBy === "None"){
        			return(
        				<Grid key={item+index} item xs={6} md={4} lg={2.4}>
        				<ProductItem products={products} handleAddToCart={handleAddToCart} product={item} color={index % 2 === 0 ? 'rgba(255,0,0,.8)' : 'rgba(0,200,0,.8)'} special={index % 2 === 0 ? 'Hot In' : 'Sale'} image={item.Image} Title={item.Title} Price={item.Price}  />
        				</Grid>
        				)
        		}else{
        			if(item.Categories.includes(filterBy)){
        				return(
        					<Grid key={item+index} item xs={6} md={4} lg={2.4}>
        					<ProductItem products={products} handleAddToCart={handleAddToCart} product={item} color={index % 2 === 0 ? 'rgba(255,0,0,.8)' : 'rgba(0,200,0,.8)'} special={index % 2 === 0 ? 'Hot In' : 'Sale'} image={item.Image} Title={item.Title} Price={item.Price}  />
        					</Grid>
        					)
        			}else{
        				<Box sx={{  height:'100vh' , background:'rgba(1,1,1,.7)'  }} >
        				Nothing matches {filterBy}
        				</Box>
        			}
        		}
        	})
        }

        {/*<Grid item xs={6} md={4} lg={2.4} sx={{ display:{lg:'none' , xs:'flex'} , justifyContent:'center' , background:'rgba()' , alignItems:'center' }}>
        <Paper sx={{ width:'100%' , height:'100%' , display:'flex' , alignItems:'center', justifyContent:'center' , flexDirection:'column' , background:'transparent' , opacity:'0.5' , "&:hover":{ opacity:'1' } ,   }} elevation={0}> 
        <AddIcon sx={{ fontSize:'84px' }}  />
        View More
        </Paper>
        </Grid>*/}
        </Grid>
        </Box>
        );
}
