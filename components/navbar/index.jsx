import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import { Box , Paper, MenuItem , Drawer , Button , Grid } from '@mui/material';
import * as Theme from "../../constants"
import { DisplayLoader } from "../../pages/_app"
import ChangeHistoryIcon from '@mui/icons-material/ChangeHistory';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import InstagramIcon from '@mui/icons-material/Instagram';
import Link from "next/link"
import LogoutIcon from '@mui/icons-material/Logout';
import { storage , googleProvider , facebookProvider , auth , db } from "./../../firebase/firebaseConfig";
import { signOut } from 'firebase/auth';
import { User } from "../../pages/_app"


export default function Navbar(props) {
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const { user , setUser } = React.useContext(User)
  const {loading , setLoading } = React.useContext(DisplayLoader);
  const Links = [
  	"Home",
  	"Search",
  	"Account",
  	// "Cart",
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
<Box sx={{ width:'120px' , background:'red', height:'120px' , backgroundImage:'url("/sunday-blom-logo.png")' , backgroundPosition:'center' , backgroundSize:'contain', filter:'invert(1)' }}  />
    	<Box sx={{  width:'60%', margin:'0 auto' , height:'100%' , background:'', display:{ xs:'none', md:'flex'} , justifyContent:'space-around' , alignItems:'center' }}>
    	{
    		Links.map((item,index)=>(
    			<Link key={item+index} href={item === "Home" ? "/" : item.toLowerCase()} style={{ ...styles.Text }}>


    			<Typography > {item} </Typography>
    			</Link>
    			))
    	}	
    	</Box>

	<Button onClick={() => setOpenDrawer(true)} sx={{ 
    				height:'100%' , 
    				width:{ xs:'50px', md:'100px'},
    				padding:'8px',
    				scale:'.4' , 
    				borderTop:'3px solid #38241B',
    				borderBottom:'3px solid #38241B',
    				alignItem:'center',
    				display:{ xs:'flex', lg:'' } }}>

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
  	
<Link onClick={()=> setLoading(false)} href={"/"} style={{ width:'100%' }}>
<MenuItem sx={{ width:'100%' , display:'flex' ,  alignItems:'center' , padding:'16px 21px' }}>
	
<HomeIcon sx={{ margin:'0 16px' }} />
<Typography>	{"Home"}</Typography>
</MenuItem>
</Link>
<Link onClick={()=> setLoading(false)} href={"/search"} style={{ width:'100%' }}>
<MenuItem sx={{ width:'100%' , display:'flex' ,  alignItems:'center' , padding:'16px 21px' }}>
	
<SearchIcon sx={{ margin:'0 16px' }} />
<Typography>	{"Search"}</Typography>
</MenuItem>
</Link>
<Link onClick={()=> setLoading(false)} href={"/account"} style={{ width:'100%' }}>
<MenuItem sx={{ width:'100%' , display:'flex' ,  alignItems:'center' , padding:'16px 21px' }}>
	
<AccountCircleIcon sx={{ margin:'0 16px' }} />
<Typography>	{"My Account"}</Typography>
</MenuItem>
</Link>
<Link onClick={()=> setLoading(false)} href={"/cart"} style={{ width:'100%' }}>
<MenuItem sx={{ width:'100%' , display:'flex' ,  alignItems:'center' , padding:'16px 21px' }}>
	
<ShoppingCartIcon sx={{ margin:'0 16px' }} />
<Typography>	{"Cart"}</Typography>
</MenuItem>
</Link>

<Link onClick={(e)=> {
	// e.preventDefault()
	setOpenDrawer(false)
	signOut(auth)
    .then(() => {
        console.log('logged out');
    		localStorage.removeItem("authUser");
    		setUser({
  uid:"",
  name:"",
  surname:"",
  profilePicture:"",
  email:"",
  orders:[],
  wishlist:[],
})
        // navigate('/');
    })
    .catch((error) => {
        console.log(error);
    });
}} href={"/"} style={{ width:'100%' }}>
<MenuItem sx={{ width:'100%' , display:'flex' ,  alignItems:'center' , padding:'16px 21px' }}>
	
<LogoutIcon sx={{ margin:'0 16px' }} />
<Typography>	{"Sign Out"}</Typography>
</MenuItem>
</Link>
<Box sx={{ display:'flex' ,justifyContent:'center' , alignItems:'center' , height:"45%" }}>
    		 <Box className="pulsate-fwd" sx={{ 
    				width:{ xs:'100px', md:'120px'} , 
    				height:{ xs:'100px', md:'120px'} , 
    				display:'flex', 
    				scale:'.7',
    				    				justifyContent:'center' , alignItems:'center' , 
    				background:'#EB8658' , 
    				// margin:'0px auto',
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
    				{/*<Box sx={{
    					backgroundImage:'url("https://cdn-icons-png.flaticon.com/512/3106/3106417.png")',
    				backgroundSize:'contain',
    				backgroundPosition:'center',
    				height:'30px',
    				width:'30px',
    				}} />*/}
    				</Box>
</Box>
<Box sx={{ display:"flex" , flexDirection:'column' , height:'25%', justifyContent:'flex-end'}}>
<Box sx={{ display:'flex ', flexDirection:'column' ,alignItems:'center' , justifyContent:'center', padding:'34px' }}>
  <Typography>Ecommerce 2023.</Typography>
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
