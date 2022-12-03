import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import { Box, Avatar, Paper, Button, Grid, TextField } from "@mui/material";
import * as Theme from "../../constants";
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import FavoriteIcon from "@mui/icons-material/Favorite";
import {
  query,
  collection,
  setDoc,
  updateDoc,
  addDoc,
  deleteDoc,
  doc,
  getDocs,
  where,
} from "firebase/firestore";
import { storage, db } from "./../../firebase/firebaseConfig";
import { User } from "../../pages/_app";
import { usePaystackPayment } from 'react-paystack';
import { toast } from 'react-toastify';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";



export default function AccountComponent() {
  const [products, setProducts] = React.useState([]);
  const [checkoutInfo, setCheckoutInfo] = React.useState({
    name:"",
    surname:"",
    email:"",
    phoneNumber:"",
    address:"",
    houseType:"",
    city:"",
    province:"",
  });
  const { user, setUser } = React.useContext(User);


  const [selected, setSelected] = React.useState("Cart");
  const tabs = ["Cart", "Wishlist", "Orders"];

  const images = [
    "https://media.dior.com/img/en_int/sku/couture/193M638AT393_C084_TXXS?imwidth=460",
    "https://media.dior.com/img/en_int/sku/couture/943J605A0554_C080_TXXS?imwidth=460",
    "https://media.dior.com/img/en_int/sku/couture/313C507A5656_C070_T64?imwidth=460",
    "https://media.dior.com/img/en_int/sku/couture/113J692A0614_C585_TXXS?imwidth=460",
    "https://media.dior.com/img/en_int/sku/couture/313M235AT521_C486_TXXS?imwidth=460",
  ];



  const deleteProduct = async (product) => {
    const querySnapshot = await getDocs(collection(db, "users"));

    querySnapshot.forEach(async (item) => {
      console.log(item.data())
      item.data().cart.map((item)=>{
        if (item.productCartID === product.productCartID) {
          let localCart = [] 
          user.cart.map((item)=>{
            if(item.productCartID !== product.productCartID){
              localCart.push(item)
            }
          })
          console.log(localCart)
          // await setDoc(doc(db, "users", item.id), {
          //   ...product,
          //   userID: user.uid,
          // });
          setUser({...user , cart: [...localCart] })
      }
      })
    });
  };

    
  React.useEffect(() => {
    getProducts();
    initLists()
  }, []);

const initLists = async () => {
    if (user.email !== "") {
      let userLists = {};
      const querySnapshot = await getDocs(collection(db, "users"));

      querySnapshot.forEach((item) => {
        if (item.data().email === user.email) {
          userLists = { ...item.data()};
        }
      });

      setUser({...user , cart:userLists.cart , wishlist:userLists.wishlist});
    } else {
      // alert("User not logged in.");
    }
  };

  const getProducts = async () => {
    if (user.uid !== "") {
      const local = [];
      const querySnapshot = await getDocs(collection(db, "orders"));

      querySnapshot.forEach((item) => {
        if (item.data().userID === user.uid) {
          local.push({ ...item.data(), id: new Date().getTime() });
        }
      });
      setProducts(local);
    } else {
      // alert("User not logged in.");
    }
  };

  let cartTotal = 99

  user.cart && user.cart.map((item)=>{
    cartTotal = cartTotal + Number(item.Price* item.Quantity)
  })
  const parsedCartTotal = parseFloat(cartTotal )
  console.log(Number(parsedCartTotal))
  const config = {
      reference: (new Date()).getTime().toString(),
      email: "user@example.com",
      amount: Number(cartTotal * 100),
      currency:"ZAR",
      publicKey: 'pk_test_dee06255336c22721c0f79c483de0ae35fc7d705',
  };

  const processOrder = async (product) => {
    console.log(user)
    const order = {
      ...checkoutInfo,
      total : cartTotal,
      status:"Pending",
      products : [],
    }
    user.cart && user.cart.map((item)=>{
      order.products.push(item)
    });

    const newOrders = user.orders ? [...user.orders , order] : [order] ;
  

        try {
          const orderData = Object.keys(order)
          if(orderData.includes("")){
            toast.warning('Please fill in all fields!!!', {
              position: toast.POSITION.TOP_RIGHT
            });
          }else{
            console.log( "here is your user : " ,  {
              uid : user.uid,
              email : user.email,
              cart:[],
              orders: newOrders,
                                
            })
            await setDoc(doc(db, "users" , user.email), {
              uid : user.uid,
              email : user.email,
              cart:[],
              orders: user.orders ? [...user.orders , order] : [order],
                                
            });
            toast.success('Your order is being processed.Please view your email for futhure details', {
              position: toast.POSITION.TOP_RIGHT
            });
            localStorage.setItem('authUser', JSON.stringify({...user , orders:newOrders}))
            setUser({...user , cart:[...user.cart] , orders:newOrders})
            console.log("User : " , user)
          }
        } catch (err) {
          console.error(err);
          toast.error(err.message, {
            position: toast.POSITION.TOP_RIGHT
          });
      }
}
  const initializePayment = usePaystackPayment(config);


  // you can call this function anything
  const onSuccess = (reference) => {
    // Implementation for whatever you want to do with reference and after success call.
    console.log(reference);
    processOrder()
  };

  // you can call this function anything
  const onClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log('closed')
  }




  return (
    <Box
      sx={{
        width: "100%",
        padding: {
          // xs:'0.5rem',
          xs: "3.5rem 1.5rem",
        },
        marginTop: "2.rem",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        // justifyContent: "center",
        zIndex: "9",
        // background:'red'
        // borderBottom:'1px solid red'
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Avatar
          src={user.photoURL ? user.photoURL : ""}
          sx={{
            width: { xs: "60px", md: "120px" },
            height: { xs: "60px", md: "120px" },
          }}
        />
        <Typography
          sx={{
            fontSize: "32px",
            margin: "0 21px",
            color: Theme["FOURTH_COLOR"],
            padding: "0 0",
            fontWeight: "400",
          }}
        >
          {" "}
          {user.displayName ? user.displayName : "John Doe"}
        </Typography>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", padding: "34px 0" }}>
        {tabs.map((item) => (
          <Button
            onClick={() => setSelected(item)}
            key={item}
            variant="outline"
            sx={{
              border: "1px solid #black",
              background: selected === item ? Theme["FOURTH_COLOR"] : "",
              color: selected === item ? "#eee" : Theme["FOURTH_COLOR"],
            }}
          >
            {item}
          </Button>
        ))}
      </Box>

      <Box
        sx={{
          height: "",
          width: "100%",
          margin: "0",
          display: "flex",
          background: "",
          // alignItems:"center",
          flexWrap: "wrap",
          // justifyContent:'center',
          flexDirection: "column",
        }}
      >
        <Typography
          sx={{
            fontSize: "32px",
            color: Theme["FOURTH_COLOR"],
            padding: "0 0",
            fontWeight: "600",
          }}
        >
          {" "}
          {selected}{" "}
        </Typography>

		{
			user.cart && user.cart.length === 0 ? (
				<Box sx={{  
					height:'50h',
					background:'grey',
					display: selected === "Cart" ? "flex" : "none",
				justifyContent: "space-between",
				background: "",
				alignItems: "center",
				flexWrap: "wrap", }}> Nothing  to display</Box>
			):(
				<Box
				sx={{
				  width: "100%",
				  padding: " 0",
				  background: "",
				  display: selected === "Cart" ? "flex" : "none",
				  justifyContent: "space-between",
				  background: "",
				  alignItems: "center",
				  flexWrap: "wrap",
				}}
			  >
				{user.cart && user.cart.map((item, index) => {
				  return (
					<Paper
					  key={item.id}
					  sx={{
						width: { xs: "100%", md: "100%" },
						display: "flex",
						flexDirection: { xs: "", md: "row" },
						alignItems: "center",
						minHeight: "120px",
						padding: "12px 8px",
						margin: "24px 0",
						background: "transparent",
					  }}
					>
					  <Box
						sx={{
						  width: { xs: "150px", lg: "150px" },
						  height: { xs: "150px" },
						  backgroundImage: `url(${item.Image})`,
						  backgroundSize: "contain",
						  backgroundPosition: "center",
						  backgroundRepeat: "no-repeat",
						}}
					  />
					  <Box sx={{ padding: "12px", flexGrow:1 , background:'', }}>
						<Typography
						  sx={{
							fontSize: "21px",
							color: Theme["FOURTH_COLOR"],
							padding: "6px 0",
							fontWeight: "600",
						  }}
						>
						  {" "}
						  {item.Title}{" "}
						</Typography>
						<Typography
						  sx={{
							fontSize: "18px",
							color: Theme["FOURTH_COLOR"],
							padding: "6px 0",
							fontWeight: "600",
						  }}
						>
						  {" "}
						  Qty : <span style={{ fontWeight: 100 }}>{item.Quantity}</span>{" "}
						</Typography>
						<Typography
						  sx={{
							fontSize: "18px",
							color: Theme["FOURTH_COLOR"],
							padding: "6px 0",
							fontWeight: "600",
						  }}
						>
						  Total:{" "}
						  <span style={{ fontWeight: 100 }}> {`R${Number(item.Price* item.Quantity)}`}</span>{" "}
						</Typography>
						
					  </Box>
					  <Box sx={{ padding: "12px", }}>
						<Button
						  onClick={() => deleteProduct(item)}
						  sx={{
							color: Theme["FOURTH_COLOR"],
							padding: "16px 21px",
							margin: "0px",
							background: "#eee",
							width: "100%",
							height: "50px",
							fontWeight: 600,
							"&:hover": { background: Theme["FOURTH_COLOR"]  , color:'#eee'},
						  }}
						>
						  <RemoveCircleOutlineIcon/>
						</Button>
            <Button
              onClick={() => deleteProduct(item)}
              sx={{
              color: Theme["FOURTH_COLOR"],
              padding: "16px 21px",
              margin: "0px",
              background: "#eee",
              width: "100%",
              height: "50px",
              fontWeight: 600,
              "&:hover": { background: Theme["FOURTH_COLOR"]  , color:'#eee'},
              }}
            >
              <RemoveCircleOutlineIcon/>
            </Button>
					  </Box>
					</Paper>
				  );
				})}

        <Typography sx={{ fontSize:'32px' , fontWeight:'600' , margin:'21px 0' , textAlign:'right' , width:'100%' , color:Theme["FOURTH_COLOR"] }}>Cart Total : {  "R" + Number(cartTotal)  }</Typography>
			  </Box>
			)
		}
 

        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: { xs: "column", lg: "row" },
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              width: { xs: "100%" },
              padding: " 0",
              background: "",
              display: selected === "Orders" ? "flex" : "none",
              justifyContent: "space-between",
              // background:'',
              // alignItems:"center",
              flexWrap: "wrap",
            }}
          >
          <Grid container spacing={1} >
            {user.orders &&  user.orders.map((item, index) => {
              let orderQtyTotal = 0

              item.products.map((item , index)=>{
                orderQtyTotal = orderQtyTotal + item.Quantity
              })

              return (
                <OrderItems key={index} orderQtyTotal={orderQtyTotal} item={item} index={orderQtyTotal} />
              );
            })}
          </Grid>
          </Box>
          <Box
            sx={{
              width: { xs: "100%" },
              padding: " 0",
              // background: "rgba(1,1,1,.7)",
              display: selected === "Cart" ? user.Cart && user.Cart.length === 0 ? "none" : "flex" : "none",
              flexWrap: "wrap",
            }}
          >
            <Box sx={{ width: "100%", background: "", padding: "34px 0" }}>
              <Typography
                sx={{
                  fontSize: "32px",
                  color: "#111",
                  padding: "6px 0",
                  fontWeight: "600",
                }}
              >
                {" "}
                Checkout{" "}
              </Typography>
              <TextField
                sx={{ width: { xs: "100%" }, padding: "16px 0" }}
                name="name"
                value={checkoutInfo.name}
                onChange={(e)=>setCheckoutInfo({...checkoutInfo , name : e.target.value})}
                placeholder={"Name"}
              />
              <TextField
                sx={{ width: { xs: "100%" }, padding: "16px 0" }}
                name="surname"
                value={checkoutInfo.surname}
                onChange={(e)=>setCheckoutInfo({...checkoutInfo , surname : e.target.value})}
                placeholder={"Surame"}
              />
              <TextField
                sx={{ width: { xs: "100%" }, padding: "16px 0" }}
                name="email"
                value={checkoutInfo.email}
                onChange={(e)=>setCheckoutInfo({...checkoutInfo , email : e.target.value})}
                placeholder={"Email"}
              />
              <TextField
                sx={{ width: { xs: "100%" }, padding: "16px 0" }}
                name="phoneNumber"
                value={checkoutInfo.phoneNumber}
                onChange={(e)=>setCheckoutInfo({...checkoutInfo , phoneNumber : e.target.value})}
                placeholder={"Phone Number"}
              />
              <TextField
                sx={{ width: { xs: "100%" }, padding: "16px 0" }}
                name="address"
                value={checkoutInfo.address}
                onChange={(e)=>setCheckoutInfo({...checkoutInfo , address : e.target.value})}
                placeholder={"Address"}
              />
              <TextField
                sx={{ width: { xs: "100%" }, padding: "16px 0" }}
                name="houseType"
                value={checkoutInfo.houseType}
                onChange={(e)=>setCheckoutInfo({...checkoutInfo , houseType : e.target.value})}
                placeholder={"House Type"}
              />
              <TextField
                sx={{ width: { xs: "100%" }, padding: "16px 0" }}
                name="city"
                value={checkoutInfo.city}
                onChange={(e)=>setCheckoutInfo({...checkoutInfo , city : e.target.value})}
                placeholder={"City"}
              />
              <TextField
                sx={{ width: { xs: "100%" }, padding: "16px 0" }}
                name="province"
                value={checkoutInfo.province}
                onChange={(e)=>setCheckoutInfo({...checkoutInfo , province : e.target.value})}
                placeholder={"State/Province"}
              />

              <Box
                sx={{
                  backgroundImage:
                    'url("https://paystack.com/assets/payment/img/paystack-badge-cards-zar.png")',
                  backgroundSize: "contain",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  width: "100%",
                  height: "250px",
                }}
              />

              <Button onClick={() => {
                initializePayment(onSuccess, onClose)
              }}
                sx={{
                  background: Theme["FOURTH_COLOR"],
                  padding: "16px 21px",
                  margin: "0px",
                  color: "#eee",
                  width: "100%",
                  fontWeight: 600,
                  "&:hover": { color: Theme["FOURTH_COLOR"] },
                }}
              >
                Pay Now {  "R " + Number(cartTotal)  }
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          width: "100%",
          padding: " 0",
          background: "",
          display: selected === "Wishlist" ? "flex" : "none",

          flexWrap: "wrap",
        }}
      >
        <Grid container spacing={0}>
          {user.Wishlist && user.Wishlist.map((item, index) => (
            <Grid key={item} item xs={6} md={4} lg={2.4}>
              <Paper
                elevation={0}
                sx={{
                  width: "100%",
                  padding: {
                    xs: "0.5rem",
                    md: "1rem",
                  },
                  background: "transparent",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    height: "250px",
                    width: "100%",
                    backgroundImage: `url("${item}")`,
                    backgroundPosition: "center",
                    backgroundSize: "contain",
                    display: "flex",
                    justifyContent: "flex-end",
                    padding: "21px",
                  }}
                >
                  <FavoriteIcon />
                </Box>

                <Typography
                  sx={{
                    fontSize: "21px",
                    color: Theme["FOURTH_COLOR"],
                    textAlign: "center",
                    padding: "8px 21px",
                    fontWeight: "600",
                  }}
                >
                  {" "}
                  Sunday Blom Bucket Hat{" "}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "21px",
                    color: Theme["FOURTH_COLOR"],
                    textAlign: "center",
                    padding: "10px 21px",
                    fontWeight: "600",
                  }}
                >
                  {" "}
                  R300.00{" "}
                </Typography>

                <Box sx={{ display: "", width: "100%" }}>
                  <Button
                    sx={{
                      background: Theme["FOURTH_COLOR"],
                      padding: "16px 12px",
                      margin: "0 3px",
                      color: "#eee",
                      width: "100%",
                      fontWeight: 600,
                      "&:hover": { color: Theme["FOURTH_COLOR"] },
                    }}
                  >
                    Remove from wishlist
                  </Button>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

const styles = {
  Text: {
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
    "&:hover": {
      textDecoration: "underline",
    },
  },
};












const OrderItems = ({item , index , orderQtyTotal}) => {
  return(
    <Grid item xs={12} lg={4}>
                <Accordion key={index+5} sx={{ width:'100%' ,}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
        <Box>

  <Box sx={{width:'100%' , display:'flex' , alignItems:'center'}}> <Typography sx={{ fontWeight:'600' , margin:'6px 0' }}> Address :</Typography> {item.address} </Box>
          <Box sx={{width:'100%' , display:'flex' , alignItems:'center'}}> <Typography sx={{ fontWeight:'600' , margin:'6px 0' }}>  {"Total : "} </Typography> R{item.total} </Box>
          <Box sx={{width:'100%' , display:'flex' , alignItems:'center'}}> <Typography sx={{ fontWeight:'600' , margin:'6px 0' }}>  {"Status : "} </Typography>{" Sent out for delivery"} </Box>
                            <Typography
                      sx={{
                        fontSize: "18px",
                        color: Theme["FOURTH_COLOR"],
                        padding: "6px 0",
                        fontWeight: "600",
                      }}
                    >
                      {" "}
                      Email : <span style={{ fontWeight: 100 }}>{item.email}</span>{" "}
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: "18px",
                        color: Theme["FOURTH_COLOR"],
                        padding: "6px 0",
                        fontWeight: "600",
                      }}
                    >
                      {" "}
                      Cell : <span style={{ fontWeight: 100 }}>{item.phoneNumber}</span>{" "}
                    </Typography>

        </Box>
        </AccordionSummary>
        <AccordionDetails>
        <Swiper pagination={true} modules={[Pagination]} className="mySwiper">

        {
          item.products.map((item,index)=>{
            return(
        <SwiperSlide key={index}>
                 <Box
                    sx={{
                      width: { xs: "100%" },
                      height: { xs: "350px" },
                      backgroundImage: `url(${item["Image"]})`,
                      backgroundSize: "contain",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                  />
                  <Box sx={{ padding: "12px", width: "100%" , display: "flex",
                    flexDirection: { xs: "column", } , justifyContent:'' }}>


                    <Typography
                      sx={{
                        fontSize: "18px",
                        color: Theme["FOURTH_COLOR"],
                        padding: "6px 0",
                        fontWeight: "600",
                      }}
                    >
                      {" "}
                      Qty : <span style={{ fontWeight: 100 }}>{orderQtyTotal}</span>{" "}
                    </Typography>
 
 <Box  sx={{ display:'flex' , alignItems:'center'  }}>
 <Typography               sx={{
                        fontSize: "18px",
                        color: Theme["FOURTH_COLOR"],
                        padding: "6px 0",
                        fontWeight: "600",
                      }}>Color : </Typography>
            <Button variant="outline" sx={{ margin:'0 21px' , border:'1px solid #black' , background:"#111" , color:"#eee" , cursor:'not-allowed' , width:'48px', height:'34px' , "&:hover":{color:"#111" , backgorundColor:"#eee"} }}>{item.Size}</Button>
 </Box>
 <Box  sx={{ display:'flex' , alignItems:'center'  }}>
 <Typography               sx={{
                        fontSize: "18px",
                        color: Theme["FOURTH_COLOR"],
                        padding: "6px 0",
                        fontWeight: "600",
                      }}>Color : </Typography>
          <Button type={"color"} value={"255,0,0"} sx={{ margin:'0 21px' ,"&:hover":{background:item.Color } , width:'48px', height:'34px'  , cursor:'not-allowed', background:item.Color , border:'none' }}>
                </Button>
 </Box>
           
          
 
                                        <Typography
                      sx={{
                        fontSize: "18px",
                        color: Theme["FOURTH_COLOR"],
                        padding: "6px 0",
                        fontWeight: "300",
                      }}
                    >
                    Cannot edit order once its been placed you can either cancel or let it go through.
                    </Typography>
                  </Box>
                 
        </SwiperSlide>
              )
          })
        }
      </Swiper>
        </AccordionDetails>
      </Accordion>

    </Grid>

      )
}