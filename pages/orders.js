import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import { Box, Avatar, Paper, Button, Grid, TextField } from "@mui/material";
import * as Theme from "./../constants";
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
import { storage, db } from "./../firebase/firebaseConfig";
import { User } from "./_app";
import { usePaystackPayment } from 'react-paystack';
import { toast } from 'react-toastify';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import Navbar from "../components/navbar"
import Link from "next/link"

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";



export default function Orders() {
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

  let cartTotal = 0

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
        // marginTop: "2.rem",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        // justifyContent: "center",
        zIndex: "9",
        // background:'red'
        // borderBottom:'1px solid red'
      }}
    >
    <Navbar />


              <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: { xs: "column" },
            justifyContent: "space-between",
        padding: {
          // xs:'0.5rem',
          xs: "3.5rem 2.5rem",
        },
          }}
        >

                            <Typography
                      sx={{
                        fontSize: "34px",
                        color: Theme["FOURTH_COLOR"],
                        padding: "6px 0",
                        fontWeight: "600",
                      }}
                    >
Orders
                    </Typography>
          <Box
            sx={{
              width: { xs: "100%" },
              padding: " 0",
              background: "",
              display:"flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
            }}
          >
          {
            user.orders && user.orders.length === 0 ? (
              <Box sx={{ background:'', width:'100%' , height:'60vh' , display:'flex' , flexDirection:'column' , alignItems:'center' , justifyContent:'center' }} >
              <img src="https://cdn-icons-png.flaticon.com/512/2762/2762885.png" style={{ width:'100%' , height:'250px' , objectFit:'contain' }} alt="no results returned logo" />


                            <Typography
                      sx={{
                        fontSize: "34px",
                        color: Theme["FOURTH_COLOR"],
                        padding: "6px 0",
                        textAlign:'center',
                        fontWeight: "500",
                      }}
                    >
Nothing orders have been made yet.
                    </Typography>
                    <Link href="/">
                            <Typography
                      sx={{
                        fontSize: "21px",
                        color: Theme["THIRD_COLOR"],
                        padding: "6px 0",
                        textAlign:'center',
                        fontWeight: "600",
                      }}
                    >
                      Click here to continue shopping.
                    </Typography>
                    </Link>
              </Box>
              ) : (
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
              )
          }
          
          </Box>
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
                      }}>Size : </Typography>
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