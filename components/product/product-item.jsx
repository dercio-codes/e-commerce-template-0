import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import {
  Box,
  MenuItem,
  Rating,
  Paper,
  Drawer,
  Button,
  Grid,
  TextField,
} from "@mui/material";
import * as Theme from "../../constants";
import DoneIcon from "@mui/icons-material/Done";
import Link from "next/link";
import { toast } from "react-toastify";
import { SelectedProduct } from "./../../pages/_app";

export default function ProductItem(props) {
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const { selectedProduct, setSelectedProduct } =
    React.useContext(SelectedProduct);
  const [localProduct, setLocalProduct] = React.useState({
    id: props.product && props.product.id,
    Title: props.product && props.product.Title,
    Description: props.product && props.product.Description,
    Image: props.product && props.product.Image,
    Categories: props.product && props.product.Categories,
    Price: props.product && props.product.Price,
    Color: "",
    Size: "",
    Quantity: 1,
  });

  let similarProducts = [];
  // similarProducts ]  = React.useState()

  console.log("length :", props.product && props.products.length);
  // props.products &&
  //   props.products.map((item) => {
  //     localProduct.Categories.map((localItem) => {
  //       if (item.Categories.includes(localItem)) {
  //         if (similarProducts.length === 0) {
  //           similarProducts.push(item);
  //           console.log(similarProducts);
  //           return;
  //         } else if (similarProducts.length > 0) {
  //           similarProducts.map((similarProduct) => {
  //             if (JSON.stringify(similarProduct) === JSON.stringify(item)) {
  //               console.log("skip this one", similarProduct.Title);
  //             }
  //           });
  //         } else {
  //           similarProducts.map((similarProduct) => {
  //             console.log("Here", similarProduct.Title);
  //             if (similarProduct.Title !== item.Title) {
  //               similarProducts.push(item);
  //               console.log(similarProducts);
  //               return;
  //             }
  //           });
  //         }
  //       }
  //     });
  //   });

  return (
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
          backgroundImage: `url("${props.image}")`,
          backgroundPosition: "center",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          display: "flex",
          justifyContent: "space-between",
          // padding:'21px'
        }}
      >
        <Box
          sx={{
            padding: " 12px 21px",
            display: props.product && props.product.HotIn ? "flex" : "none",
            color: "#eee",
            fontWeight: "600",
            fontSize: "14px",
            height: "40px",
            background: "rgba(0,200,0,.8)",
          }}
        >
          {"Hot In"}
        </Box>

        <Box
          sx={{
            padding: " 12px 21px",
            display: props.product && props.product.Sale ? "flex" : "none",
            color: "#eee",
            fontWeight: "600",
            fontSize: "14px",
            height: "40px",
            background: "rgba(255,0,0,.8)",
          }}
        >
          {"Sale "}
        </Box>

        {/*<FavoriteIcon />*/}
      </Box>
      <Typography
        noWrap={true}
        sx={{
          fontSize: "21px",
          color: Theme["FOURTH_COLOR"],
          textAlign: "center",
          padding: "8px 21px",
          fontWeight: "600",
        }}
      >
        {" "}
        {"Item Name"}{" "}
      </Typography>
      <Typography
        noWrap={true}
        sx={{
          fontSize: "16px",
          color: Theme["FOURTH_COLOR"],
          width: "100%",
          textAlign: "center",
          padding: "8px 0",
          fontWeight: "300",
        }}
      >
        {" "}
        {"Item Description"}{" "}
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
        R{"500"}{" "}
      </Typography>

      <Box sx={{ display: "", width: "100%" }}>
        <Button
          onClick={() => setOpenDrawer(true)}
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
          View Product
        </Button>
      </Box>

      <Drawer
        anchor={"bottom"}
        open={openDrawer}
        sx={{ background: "transparent", zIndex: "100" }}
        onClose={() => setOpenDrawer(false)}
      >
        <Box
          sx={{
            width: "100%",
            minHeight: "65vh",
            // background:'red',
            background: "rgba(251,251,251,0.3)",
          }}
        >
          <Box
            sx={{
              width: "100%",
              top: "0",
              Index: "9999",
              background: "white",
              position: "sticky",
              display: "flex",
              justifyContent: "flex-end",
              padding: "1.2rem",
            }}
          >
            <Button
              onClick={() => setOpenDrawer(false)}
              sx={{
                fontSize: "21px",
                color: Theme["FOURTH_COLOR"],
                fontWeight: "600",
              }}
            >
              {" "}
              X
            </Button>
          </Box>

          <Grid container>
            <Grid
              item
              xs={12}
              lg={4}
              sx={{
                padding: "2.5rem",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src={props.image}
                alt=""
                style={{
                  width: "70%",
                  objectFit: "contain",
                  objectPosition: "",
                }}
              />
            </Grid>
            <Grid item xs={12} lg={4} sx={{ padding: "2.5rem 0" }}>
              <Typography
                sx={{
                  fontSize: "38px",
                  color: Theme["FOURTH_COLOR"],
                  textAlign: "",
                  padding: "8px 21px",
                  fontWeight: "600",
                }}
              >
                {" "}
                {"Item Name"}{" "}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "16px",
                    color: Theme["FOURTH_COLOR"],
                    textAlign: "",
                    margin: "0",
                    padding: "8px 21px",
                    fontWeight: "600",
                  }}
                >
                  {" "}
                  Size:{" "}
                </Typography>
                <Box
                  sx={{ display: "flex", justifyContent: "", width: "100%" }}
                >
                  {/* {props.product &&
                    props.product.Sizes.map((item) => {
                      return (
                        <Button
                          onClick={() =>
                            setLocalProduct({
                              ...localProduct,
                              Size: item,
                            })
                          }
                          key={item}
                          variant="outline"
                          sx={{
                            border: "1px solid #black",
                            background:
                              localProduct.Size === item ? "#111" : "",
                            color: localProduct.Size === item ? "#eee" : "#111",
                          }}
                        >
                          {item}
                        </Button>
                      );
                    })} */}
                </Box>
                <Typography
                  sx={{
                    fontSize: "16px",
                    color: Theme["FOURTH_COLOR"],
                    textAlign: "",
                    margin: "8px 0 0 0 ",
                    padding: "8px 21px",
                    fontWeight: "600",
                  }}
                >
                  {" "}
                  Colors:{" "}
                </Typography>
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "",
                    padding: "12px 16px",
                  }}
                >
                  {/* {props.product &&
                    props.product.Colors.map((item) => {
                      return (
                        <Button
                          type={"color"}
                          onClick={() =>
                            setLocalProduct({
                              ...localProduct,
                              Color: item,
                            })
                          }
                          key={item}
                          value={"255,0,0"}
                          sx={{
                            opacity: localProduct.Color === item ? 1 : ".7",
                            "&:hover": { background: item },
                            width: "48px",
                            height: "34px",
                            margin: "0 8px 0 0",
                            background: item,
                            border: "none",
                          }}
                        >
                          <DoneIcon
                            sx={{
                              filter: "invert(1)",
                              fontWeight: 600,
                              display:
                                localProduct.Color === item ? "flex" : "none",
                            }}
                          />
                        </Button>
                      );
                    })} */}
                </Box>

                <TextField
                  label="Quantity"
                  type="number"
                  value={localProduct.Quantity}
                  onChange={(e) =>
                    setLocalProduct({
                      ...localProduct,
                      Quantity: Number(e.target.value),
                    })
                  }
                  sx={{
                    width: "95%",
                    margin: "21px auto",
                    padding: "0",
                    "& .MuiOutlinedInput-root": {
                      // - The Input-root, inside the TextField-root
                      "& fieldset": {
                        // - The <fieldset> inside the Input-root
                        color: Theme["FOURTH_COLOR"],
                        borderColor: "#999", // - Set the Input border
                      },
                      "&:hover fieldset": {
                        color: Theme["FOURTH_COLOR"],
                        borderColor: Theme["FOURTH_COLOR"], // - Set the Input border when parent has :hover
                      },
                      "&.Mui-focused fieldset": {
                        // - Set the Input border when parent is focused
                        color: Theme["FOURTH_COLOR"],
                        borderColor: Theme["FOURTH_COLOR"],
                      },
                    },
                  }}
                />
                <ul style={{ width: "100%" }}>
                  <li>
                    <Typography
                      sx={{
                        fontSize: "16px",
                        color: Theme["FOURTH_COLOR"],
                        textAlign: "",
                        padding: "8px 21px",
                        fontWeight: "",
                      }}
                    >
                      {" "}
                      {props.product && props.product.Description}
                    </Typography>
                  </li>
                </ul>

                <Typography
                  sx={{
                    fontSize: "16px",
                    color: Theme["FOURTH_COLOR"],
                    textAlign: "",
                    padding: "10px 21px",
                    fontWeight: "400",
                  }}
                >
                  {" "}
                  This does not include deliervy.Delivery will be calculated
                  upon checkout.{" "}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "32px",
                    color: Theme["FOURTH_COLOR"],
                    textAlign: "",
                    padding: "10px 21px",
                    fontWeight: "600",
                  }}
                >
                  {" "}
                  Total : R
                  {Number(
                    props.product && props.product.Price * localProduct.Quantity
                  )}{" "}
                </Typography>
                <Box
                  sx={{
                    backgroundImage:
                      'url("https://paystack.com/assets/payment/img/paystack-badge-cards-zar.png")',
                    backgroundSize: "contain",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    width: "99%",
                    margin: "21px auto",
                    height: "150px",
                  }}
                />
                <Box sx={{ display: "", width: "98%", margin: "0 auto" }}>
                  <Button
                    onClick={() => {
                      if (Object.values(localProduct).includes("")) {
                        toast.warning("Please fill in all fields!!!", {
                          position: toast.POSITION.TOP_RIGHT,
                        });
                      } else {
                        props.handleAddToCart(localProduct);
                        setOpenDrawer(false);
                      }
                    }}
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
                    Add To Cart
                  </Button>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} lg={4} sx={{ padding: "2.5rem" }}>
              <Typography
                sx={{
                  fontSize: "32px",
                  color: Theme["FOURTH_COLOR"],
                  textAlign: "center",
                  padding: "8px 21px",
                  margin: "8px 0",
                  fontWeight: "600",
                }}
              >
                {" "}
                More Like This{" "}
              </Typography>

              {/* <Grid container spacing={2}>
                {similarProducts.map((item) => {
                  return (
                    <Grid
                      item
                      md={6}
                      key={item.id}
                      xs={6}
                      sx={{ opacity: ".8", "&:hover": { opacity: 1 } }}
                    >
                      <Box
                        sx={{
                          height: "250px",
                          width: "100%",
                          backgroundImage: `url("${item.Image}")`,
                          backgroundPosition: "center",
                          backgroundSize: "contain",
                          backgroundRepeat: "no-repeat",
                          display: "flex",
                          // justifyContent:'flex-end',
                          // padding:'21px'
                        }}
                      >
                        <Box
                          sx={{
                            padding: " 12px 21px",
                            color: "#eee",
                            fontWeight: "600",
                            fontSize: "14px",
                            height: "40px",
                            background: item.color,
                          }}
                        >
                          {item.special}
                        </Box>


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
                        {item.Title}{" "}
                      </Typography>
                      <Typography
                        noWrap={true}
                        sx={{
                          fontSize: "16px",
                          color: Theme["FOURTH_COLOR"],
                          width: "100%",
                          textAlign: "center",
                          padding: "8px 0",
                          fontWeight: "300",
                        }}
                      >
                        {" "}
                        {item.Description}{" "}
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
                        R{item.Price}{" "}
                      </Typography>
                      <Box sx={{ display: "", width: "100%" }}>
                        <Link href={`/product`}>
                          <Button
                            onClick={() => {
                              setOpenDrawer(true);
                              setSelectedProduct(item);
                            }}
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
                            View Product
                          </Button>
                        </Link>
                      </Box>{" "}
                    </Grid>
                  );
                })}
              </Grid> */}
            </Grid>
          </Grid>
        </Box>
      </Drawer>
    </Paper>
  );
}
