import { useState , useEffect } from "react";
import { storage , db } from "./../../firebase/firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { Box , Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import { Button , CircularProgress ,Select ,Drawer ,OutlinedInput ,MenuItem,TextField } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import Link from "next/link"
import * as Theme from "../../constants"
import { query, doc ,  collection, addDoc , setDoc, getDocs, where } from "firebase/firestore";
import { User } from "../../pages/_app"


import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';


// id
// Title
// Description
// Price
// Image
// Sale
// HotIn
// Colors
// Sizes
const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
   {
    field: 'Image',
    headerName: 'Image',
    width: 160,
  },
  { field: 'Title', headerName: 'Title', width: 130 },
  { field: 'Description', headerName: 'Description', width: 400 },
  { field: 'Sale', headerName: 'Sale', width: 150 },
  { field: 'HotIn', headerName: 'Hot In', width: 150 },
  { field: 'Colors', headerName: 'Colors', width: 150 },
  { field: 'Sizes', headerName: 'sIZES', width: 150 },
  {
    field: 'Price',
    headerName: 'Price',
    type: 'number',
    width: 120,
  },

 
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

function DataTable({products}) {
  return (
    <div style={{ height: "80", width: '100%' }}>
      <DataGrid
        rows={products}
        columns={columns}
        pageSize={12}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );
}


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


function FileUploader() {
    const { user ,setUser} = React.useContext(User);

const uploadeProductHandler = async () => {
	  try {
        setLoading(true)
    // const res = await signInWithPopup(auth, googleProvider);
    // const user = res.user;
    const productData = Object.keys(newProduct)
    if(productData.includes("")){
        alert("Please fill in fields")
    }else{
        handleFileUpload()
    console.log(newProduct)
    const q = query(collection(db, "products"), where("id", "==", newProduct.id));
    const docs = await getDocs(q);
    const uploadObject = {
        id:`${new Date().getTime()}-item`,
        Image:newImage,
        ...newProduct,
      }
      console.log(uploadObject)
    await addDoc(collection(db, "products"), uploadObject);
    }
        setLoading(false)
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
}
    // State to store uploaded file
    const [file, setFile] = useState("");
    const [newImage, SetNewImage] = useState("");
    const [products, setProducts] = useState([]);
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
 
    // progress
    const [percent, setPercent] = useState(0);
    const [openDrawer, setOpenDrawer] = useState(false);
 
    // Handle file upload event and update state
    function handleFileChange(event) {
        setFile(event.target.files[0]);
    }
   const [produtSizes, setSizes] = useState([]);
   const [newColor, setNewColor] = useState("");
const [preview, setPreview] = useState()

  useEffect(() => {
    const timeout = setTimeout(() => {
    getProducts()	
    setShow(true)
    }, 300);
    return () => clearTimeout(timeout);
  }, []);

 useEffect(() => {
	setNewProduct({
		...newProduct,
		Sizes:produtSizes
	})
        // free memory when ever this component is unmounted
        return 
    }, [produtSizes])
 useEffect(() => {
        if (!file) {
            setPreview(undefined)
            return
        }

        const objectUrl = URL.createObjectURL(file)
        setPreview(objectUrl)

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }, [file])
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSizes(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const handleNewProduct = (event) => {
  	setNewProduct({
      ...newProduct,
      [event.target.name]: event.target.value,
    })
  }

    const handleFileUpload =  async() => {
       if(user.email === "12derciomaduna@gmail.com"){
         if (!file) {
            alert("Please upload an image first!");
        }
 
        const storageRef = ref(storage, `/products/${file.name}`);
 
        // progress can be paused and resumed. It also exposes progress updates.
        // Receives the storage reference and the file to upload.
        const uploadTask = uploadBytesResumable(storageRef, file);
 
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const percent = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
 
                // update progress
                setPercent(percent);
            },
            (err) => console.log(err),
            () => {
                // download url
                getDownloadURL(uploadTask.snapshot.ref).then( async (url) => {
                    console.log(url);
                    try {
                        await setDoc(doc(db, "products", `${new Date().getTime() + newProduct.Title.replace(/\s/g, '')} `), {
                                ...newProduct,
                                Image:url,
                        });
                    } catch (err) {
                      console.error(err);
                      alert(err.message);
                    }

                });
            }
        );
    }else{
        alert("Please login with the Admin Account to make such changes.")
    }


    };

    const sizes = [
		"XS",
		"SM",
		"MD",
		"LG",
		"XL",
    ]

    const addColor = (e)=> {
    	setNewProduct({
    		...newProduct,
    		Colors:[...newProduct.Colors , newColor]
    	})
    }

    const [ newProduct , setNewProduct ]= useState({
			id:new Date().getTime(),
			Title:"",
			Description:"",
			Price:"",
			Image:"",
			Sale:false,
			HotIn:false,
			Colors:[],
			Sizes:[],

		})


    	const getProducts = async () => {
		const local = []
		  const querySnapshot = await getDocs(collection(db, "products"));

    querySnapshot.forEach((item)=>{
    	local.push({...item.data() , id:new Date().getTime()})
    })
console.log(local)
setProducts(local)
	}

	// React.useEffect(()=>{
	// 	getProducts()
	// },[])

 console.log(products)
 console.log(typeof(products))
    return (
        <Box sx={{ padding:'2.5rem' , color:'#eee' }}>
            {/*<input type="file" onChange={handleChange} accept="/image/*" />
            <button onClick={handleUpload}>Upload to Firebase</button>
            <p>{percent} "% done"</p>*/}

<Button onClick={()=>setOpenDrawer(true)}> Add Product</Button>
{show
 && 
	<DataTable products={products} />}

 {/*<DataGrid
        rows={[
    {
        "HotIn": false,
        "id": "3218743",
        "Sizes": [
            "SM",
            "MD",
            "LG",
            "XL"
        ],
        "Quantity": 5,
        "Title": "Sunday Blom Product 1 Title",
        "Price": "120",
        "Description": "Sunday Blom Product 1 Secritption",
        "Colors": [],
        "Image": "https://firebasestorage.googleapis.com/v0/b/the-sunday-blom-store.appspot.com/o/products%2Fmodel.png?alt=media&token=ed372a71-d77e-4a94-bcbf-4232cb01e5d3",
        "Sale": false
    },
    {
        "id": "234412",
        "Title": "Sdunay Blom Hats",
        "Sizes": [
            "MD",
            "XL",
            "LG"
        ],
        "Price": "250",
        "HotIn": false,
        "Colors": [],
        "Quantity": 5,
        "Description": "Hats for sunday blom.",
        "Image": "https://firebasestorage.googleapis.com/v0/b/the-sunday-blom-store.appspot.com/o/products%2Fscreenshot.jpg?alt=media&token=db8ee5db-9537-48c1-8610-cc966409a846",
        "Sale": false
    }
]}
        columns={columns}
        pageSize={12}
        height={400}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />*/}
<Drawer       anchor={"bottom"}
      open={openDrawer}
      sx={{ background:'transparent' , zIndex:'100' }}
      onClose={() => setOpenDrawer(false)} >
      {

        loading ? (
            <CircularProgress size={"12.5rem"} />
            ) : (
<Box>
            <Grid container>
            <Grid item xs={12} lg={4} sx={{ height:'fit-content', background:'' , padding:'1.5rem' }}>
            <Typography sx={{ fontSize:'21px' , color:Theme["FOURTH_COLOR"] , textAlign:'left' , padding:'8px 0' , fontWeight:'600' }}> Product Info </Typography>
            <TextField value={newProduct.Title} sx={{ width:'100%' , margin:'12px 0' }} onChange={handleNewProduct}  type="text" label="Title" name="Title" />
            <TextField value={newProduct.Description} sx={{ width:'100%' , margin:'12px 0' }} onChange={handleNewProduct} type="textarea" label="Description" name="Description" />
            <TextField value={newProduct.Price} sx={{ width:'100%' , margin:'12px 0' }} onChange={handleNewProduct} type="number" label="Price" name="Price" />
            <Typography sx={{ fontSize:'21px' , color:Theme["FOURTH_COLOR"] , textAlign:'left' , padding:'8px 0' , fontWeight:'500' }}> Sale </Typography>
            <Select value={newProduct.Sale} sx={{ width:'100%' , margin:'12px 0' }} onChange={handleNewProduct} type="select" select label="Sale" name="Sale" >
<MenuItem value={true} onClick={()=> setNewProduct({...newProduct , Sale :true})}> Yes</MenuItem>
<MenuItem value={false} onClick={()=> setNewProduct({...newProduct , Sale :false})}> No</MenuItem>


            </Select>
            <Typography sx={{ fontSize:'21px' , color:Theme["FOURTH_COLOR"] , textAlign:'left' , padding:'8px 0' , fontWeight:'500' }}> Hot In </Typography>
            <Select sx={{ width:'100%' , margin:'12px 0' }} onChange={handleNewProduct} type="select" select label="Hot In"  name="HotIn">
<MenuItem value={true} onClick={()=> setNewProduct({...newProduct , HotIn :true})}> Yes</MenuItem>
<MenuItem value={false} onClick={()=> setNewProduct({...newProduct , HotIn :false})}> No</MenuItem>


            </Select>
            <Typography sx={{ fontSize:'21px' , color:Theme["FOURTH_COLOR"] , textAlign:'left' , padding:'8px 0' , fontWeight:'500' }}> Colors </Typography>
            
<Box sx={{ display:'flex', justifyContent:'space-between'}}>

            <TextField onChange={e=> setNewColor(e.target.value)} sx={{ width:'48%' , margin:'12px 0' }} type="color"  />
            <Button onClick={addColor} sx={{ width:'48%' , margin:'12px 0' , background:Theme["FOURTH_COLOR"], "&:hover":{color:Theme["FOURTH_COLOR"]} , color:'#eee' , fontWeight:600 }} type="" label="Colors">Add COlor </Button>
</Box>
            <Box sx={{ width:'100%', display:'flex' , justifyContent:'center' , padding:'12px 16px'}}>

{
    newProduct.Colors.map((item)=>{
        return(
                          <Box key={item} type={"color"} value={"255,0,0"} style={{ width:'36px', height:'21px' , margin:'0 8px 0 0' , background:item , border:'none' }}/>
                          )
    })
}

</Box>

             <Typography sx={{ fontSize:'21px' , color:Theme["FOURTH_COLOR"] , textAlign:'left' , padding:'8px 0' , fontWeight:'500' }}> Sizes </Typography>
                        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={produtSizes}
          onChange={handleChange}
          label={"Sizes"}
          input={<OutlinedInput label="Sizes" />}
          MenuProps={MenuProps}
          sx={{ width:'100%' }}
        >
          {sizes.map((item) => (
            <MenuItem
              key={item}
              value={item}
              // style={getStyles(name, produtSizes, theme)}
            >
              {item}
            </MenuItem>
          ))}
        </Select>

            </Grid>
                        <Grid item xs={12} lg={4} sx={{ height:'fit-content', background:'' , padding:'1.5rem' }}>
            <Typography sx={{ fontSize:'21px' , color:Theme["FOURTH_COLOR"] , textAlign:'left' , padding:'8px 0' , fontWeight:'600' }}> Select Image </Typography>
            <TextField onChange={handleFileChange} accept="/image/*" sx={{ width:'100%' , margin:'12px 0' }} type="file" label="" />
            
            <img src={preview} style={{ width:'100%' }} /> 
            {/*}*/}
            </Grid>
                        <Grid item xs={12} lg={4} sx={{ height:'fit-content', background:'' , padding:'1.5rem' }}>
            <Typography sx={{ fontSize:'21px' , color:"transparent" , textAlign:'left' , padding:'8px 0' , fontWeight:'600' }}> Product Info </Typography>
                              <Typography sx={{ fontSize:'38px' , color:Theme["FOURTH_COLOR"] , textAlign:'center' , padding:'8px 21px' , fontWeight:'600' }}> {newProduct.Title} </Typography>
        <Box sx={{ display:'flex' , flexDirection:'column' , alignItems:'center' }}>
         {  
            preview !== "" ? (
                    // <img src={preview} style={{ width:'100%' }} /> 
     <Box sx={{
          height:'250px',
          width:'100%',
          backgroundImage:`url("${preview}")`,
          backgroundPosition:'center',
        backgroundSize:'contain' ,
        backgroundRepeat:'no-repeat' ,
        display:'flex',
        // justifyContent:'flex-end',
        // padding:'21px'
         }} >
<Box sx={{ padding:' 12px 21px' , color:'#eee' , fontWeight:'600' , fontSize:'14px' , height:'40px' , background:newProduct.Sale || newProduct.HotIn ? newProduct.Sale  ? "rgba(0,200,0,.8)" : "rgba(255,0,0,.8)" : ""  }}>
  {newProduct.Sale || newProduct.HotIn ? newProduct.Sale  ? "Sale" : "Hot In" : "" }
</Box>

         </Box>
                )  
                     :
                      <Box sx={{ height:'350px' }} />
         }
          <Typography sx={{ fontSize:'16px' , color:Theme["FOURTH_COLOR"] , textAlign:'' , margin:'0', padding:'8px 21px' , fontWeight:'600' }}> Size: </Typography>
          <Box sx={{ display:'flex' , justifyContent:'center' , width:'100%'}}>
{
    newProduct.Sizes && newProduct.Sizes.map((item)=>{
        return(
            <Button key={item} variant="outline" sx={{ border:'1px solid #black', color:'#111' ,background:'' }}>{item}</Button>
            )
    })
}

          </Box>
          <Typography sx={{ fontSize:'16px' ,  color:Theme["FOURTH_COLOR"] , textAlign:'' , margin:'8px 0 0 0 ' , padding:'8px 21px' , fontWeight:'600' }}> Colors: </Typography>
            <Box sx={{ width:'100%', display:'flex' , justifyContent:'center' , padding:'12px 16px'}}>

{
    newProduct.Colors.map((item)=>{
        return(
                          <Box key={item} type={"color"} value={"255,0,0"} style={{ width:'36px', height:'21px' , margin:'0 8px 0 0' , background:item , border:'none' }}/>
                          )
    })
}

</Box>
             <Typography sx={{ fontSize:'16px' , color:Theme["FOURTH_COLOR"] , textAlign:'' , padding:'8px 21px' , fontWeight:'' }}> {newProduct.Description}</Typography>

        <Typography sx={{ fontSize:'32px' , color:Theme["FOURTH_COLOR"] , textAlign:'' , padding:'10px 21px' , fontWeight:'600' }}> R{newProduct.Price} </Typography>

        <Box sx={{ display:'' , width:'98%',margin:'0 auto' }}>
        <Button  onClick={handleFileUpload} sx={{ background:Theme["FOURTH_COLOR"],padding:'16px 12px' , margin:'0 3px' ,color:'#eee' , width:'100%' ,fontWeight:600, "&:hover":{color:Theme["FOURTH_COLOR"]} }}>{percent === 0 ? "Add Product To Store" : `${percent}%` }</Button>
</Box>
        </Box>
            </Grid>
            </Grid>

</Box>
            )

      }


</Drawer>

        </Box>
    );
}
 
export default FileUploader;
            // <Box sx={{ backgroundImage:`url("${preview}"")` , backgroundSize:'contain' , backgroundPosition:'center' , width:'100%' , height:'350px' }} />