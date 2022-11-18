import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import { Box, Avatar, Paper, Button, Grid, TextField } from "@mui/material";
import * as Theme from "../../constants";
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

export default function AccountComponent() {
  const [products, setProducts] = React.useState([]);
  const { user, setUser } = React.useContext(User);

  const [selected, setSelected] = React.useState("Cart");
  const tabs = ["Cart", "Settings", "Wishlist", "Orders"];

  const images = [
    "https://media.dior.com/img/en_int/sku/couture/193M638AT393_C084_TXXS?imwidth=460",
    "https://media.dior.com/img/en_int/sku/couture/943J605A0554_C080_TXXS?imwidth=460",
    "https://media.dior.com/img/en_int/sku/couture/313C507A5656_C070_T64?imwidth=460",
    "https://media.dior.com/img/en_int/sku/couture/113J692A0614_C585_TXXS?imwidth=460",
    "https://media.dior.com/img/en_int/sku/couture/313M235AT521_C486_TXXS?imwidth=460",
  ];

  // 	const deleteProduct = db.collection('products').where("Title", "==", product.Title);
  // 	deleteProduct.get().then(function(querySnapshot) {
  //   	querySnapshot.forEach(function(doc) {
  //     	doc.ref.delete();
  //   });
  // });

  const deleteProduct = async (product) => {
    const querySnapshot = await getDocs(collection(db, "orders"));

    querySnapshot.forEach(async (item) => {
      console.log(item.data());
      if (item.data().Title === product.Title) {
        console.log("Found it");
        await setDoc(doc(db, "orders", item.id), {
          ...product,
          userID: "",
        });
      }
    });
  };

  React.useEffect(() => {
    getProducts();
  }, [user]);
  const getProducts = async () => {
    if (user.uid !== "") {
      const local = [];
      const querySnapshot = await getDocs(collection(db, "orders"));

      querySnapshot.forEach((item) => {
        console.log(item.data());
        if (item.data().userID === user.uid) {
          local.push({ ...item.data(), id: new Date().getTime() });
        }
      });
      console.log(local);
      setProducts(local);
    } else {
      alert("User not logged in.");
    }
  };

  // const deleteProduct = async (product) => {
  // 	  try {
  //     const q = query(collection(db, "products"), where("Title", "==", product.Title));
  //     const docs = await getDocs(q);
  //      docs.forEach(function(doc) {
  //     doc.ref.delete();
  //   });
  //   } catch (err) {
  //     console.error(err);
  //     alert(err.message);
  //   }
  // }

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
        justifyContent: "center",
        zIndex: "9",
        // background:'red'
        // borderBottom:'1px solid red'
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Avatar
          src=""
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
          John Doe.{" "}
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
			products.length === 0 ? (
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
				{products.map((item, index) => {
				  return (
					<Paper
					  key={item}
					  sx={{
						width: { xs: "100%", md: "100%" },
						display: "flex",
						flexDirection: { xs: "column", md: "row" },
						alignItems: "center",
						minHeight: "120px",
						padding: "8px",
						margin: "24px 0",
						background: "transparent",
					  }}
					>
					  <Box
						sx={{
						  width: { xs: "40%", lg: "40%" },
						  height: { xs: "350px" },
						  backgroundImage: `url(${item.Image})`,
						  backgroundSize: "contain",
						  backgroundPosition: "center",
						  backgroundRepeat: "no-repeat",
						}}
					  />
					  <Box sx={{ padding: "12px", width: "65%" }}>
						<Typography
						  sx={{
							fontSize: "21px",
							color: Theme["FOURTH_COLOR"],
							padding: "1px 0",
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
							padding: "1px 0",
							fontWeight: "600",
						  }}
						>
						  {" "}
						  Qty : <span style={{ fontWeight: 100 }}>2</span>{" "}
						</Typography>
						<Typography
						  sx={{
							fontSize: "18px",
							color: Theme["FOURTH_COLOR"],
							padding: "1px 0",
							fontWeight: "600",
						  }}
						>
						  Total:{" "}
						  <span style={{ fontWeight: 100 }}> {item.Price}</span>{" "}
						</Typography>
						<Typography
						  sx={{
							fontSize: "18px",
							color: Theme["FOURTH_COLOR"],
							padding: "1px 0",
							fontWeight: "600",
						  }}
						>
						  Status:{" "}
						  <span style={{ fontWeight: 100 }}>
							{" "}
							{index % 2 === 0 ? "Cancelled" : "Delivery Enroute"}
						  </span>{" "}
						</Typography>
					  </Box>
					  <Box sx={{ padding: "12px", width: { xs: "40%" } }}>
						<Button
						  onClick={() => deleteProduct(item)}
						  sx={{
							background: Theme["FOURTH_COLOR"],
							padding: "16px 21px",
							margin: "0px",
							color: "#eee",
							width: "100%",
							height: "95px",
							fontWeight: 600,
							"&:hover": { color: Theme["FOURTH_COLOR"] },
						  }}
						>
						  Cancel Order
						</Button>
					  </Box>
					</Paper>
				  );
				})}
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
              width: { xs: "100%", lg: "40%" },
              padding: " 0",
              background: "",
              display: selected === "Orders" ? "flex" : "none",
              justifyContent: "space-between",
              // background:'',
              // alignItems:"center",
              flexWrap: "wrap",
            }}
          >
            {images.map((item, index) => {
              return (
                <Paper
                  key={item}
                  sx={{
                    width: { xs: "49%", lg: "100%" },
                    display: "flex",
                    flexDirection: { xs: "column", md: "" },
                    minHeight: "120px",
                    padding: "8px",
                    margin: "24px 0",
                    background: "transparent",
                  }}
                >
                  <Box
                    sx={{
                      width: { xs: "100%", md: "100%" },
                      height: { xs: "350px" },
                      backgroundImage: `url(${item})`,
                      backgroundSize: "contain",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                  />
                  <Box sx={{ padding: "12px", width: "65%" }}>
                    <Typography
                      sx={{
                        fontSize: "21px",
                        color: Theme["FOURTH_COLOR"],
                        padding: "1px 0",
                        fontWeight: "600",
                      }}
                    >
                      {" "}
                      Sunday Blom Butcket Hat{" "}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "18px",
                        color: Theme["FOURTH_COLOR"],
                        padding: "1px 0",
                        fontWeight: "600",
                      }}
                    >
                      {" "}
                      Qty : <span style={{ fontWeight: 100 }}>2</span>{" "}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "18px",
                        color: Theme["FOURTH_COLOR"],
                        padding: "1px 0",
                        fontWeight: "600",
                      }}
                    >
                      Total: <span style={{ fontWeight: 100 }}> R600</span>{" "}
                    </Typography>
                  </Box>
                  <Box sx={{ padding: "12px", width: { xs: "100%" } }}>
                    <Button
                      sx={{
                        background: Theme["FOURTH_COLOR"],
                        padding: "16px 21px",
                        margin: "0px",
                        color: "#eee",
                        width: "100%",
                        height: "95px",
                        fontWeight: 600,
                        "&:hover": { color: Theme["FOURTH_COLOR"] },
                      }}
                    >
                      Remove from Cart
                    </Button>
                  </Box>
                </Paper>
              );
            })}
          </Box>
          <Box
            sx={{
              width: { xs: "100%", lg: "55%" },
              padding: " 0",
              background: "rgba(1,1,1,.7)",
              display: selected === "Cart" ? "flex" : "none",

              flexWrap: "wrap",
            }}
          >
            <Box sx={{ width: "100%", background: "", padding: "34px" }}>
              <Typography
                sx={{
                  fontSize: "32px",
                  color: "#eee",
                  padding: "1px 0",
                  fontWeight: "600",
                }}
              >
                {" "}
                Checkout{" "}
              </Typography>
              <TextField
                sx={{ width: { xs: "100%" }, padding: "16px 0" }}
                placeholder={"Name"}
              />
              <TextField
                sx={{ width: { xs: "100%" }, padding: "16px 0" }}
                placeholder={"Surame"}
              />
              <TextField
                sx={{ width: { xs: "100%" }, padding: "16px 0" }}
                placeholder={"Email"}
              />
              <TextField
                sx={{ width: { xs: "100%" }, padding: "16px 0" }}
                placeholder={"Phone Number"}
              />
              <TextField
                sx={{ width: { xs: "100%" }, padding: "16px 0" }}
                placeholder={"Address"}
              />
              <TextField
                sx={{ width: { xs: "100%" }, padding: "16px 0" }}
                placeholder={"House Type"}
              />
              <TextField
                sx={{ width: { xs: "100%" }, padding: "16px 0" }}
                placeholder={"City"}
              />
              <TextField
                sx={{ width: { xs: "100%" }, padding: "16px 0" }}
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

              <Button
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
                Pay Now
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
          {images.map((item, index) => (
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
