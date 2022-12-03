import { useState , useEffect } from "react";
import { storage , db } from "./../../firebase/firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { Box , LinearProgress , Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import { Button , Menu , IconButton , CircularProgress ,Select ,Drawer ,OutlinedInput ,MenuItem,TextField } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import Link from "next/link"
import * as Theme from "../../constants"
import { query, doc , deleteDoc ,  collection, addDoc , setDoc, getDocs, where } from "firebase/firestore";
import { User } from "../../pages/_app"
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert'; 
import EditProduct from "./edit-product"
import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

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

    // State to store uploaded file
    const [file, setFile] = useState("");
    const [newImage, SetNewImage] = useState("");
    const [products, setProducts] = useState([]);
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [editing, setEditing] = useState(false);
 
    // progress
    const [percent, setPercent] = useState(0);
    const [openDrawer, setOpenDrawer] = useState(false);
 
    // Handle file upload event and update state
    function handleFileChange(event) {
        setFile(event.target.files[0]);
    }
   const [productSizes, setSizes] = useState([]);
   const [productCategories, setCategories] = useState([]);
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
        Categories:productCategories
    })
        // free memory when ever this component is unmounted
        return 
    }, [productCategories])

 useEffect(() => {
	setNewProduct({
		...newProduct,
		Sizes:productSizes
	})
        // free memory when ever this component is unmounted
        return 
    }, [productSizes])


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



  const handleCategories = (event) => {
 const {
      target: { value },
    } = event;
    setCategories(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  }

  const handleNewProduct = (event) => {
  	setNewProduct({
      ...newProduct,
      [event.target.name]: event.target.value,
    })
  }

    const handleFileUpload =  async() => {
       // if(user.email === "12derciomaduna@gmail.com"){
         if (!file && !editing) {
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
                        if(Object.values(newProduct).includes("")){
                            alert("Please fill in all fields")
                            consolelog()
                        }else{
                                if(editing){
const querySnapshot = await getDocs(collection(db, "products"));

      querySnapshot.forEach(async(item) => {
        if(item.data().id === newProduct.id){
            console.log(item.id)
             await setDoc(doc(db, "products", item.id), {
                                        ...newProduct,
                                });
        }
      });
                                }else{

                                await setDoc(doc(db, "products", `${new Date().getTime() + newProduct.Title.replace(/\s/g, '')} `), {
                                        ...newProduct,
                                        Image:url,
                                });
                                }
                                getProducts()
                                setOpenDrawer(false)
                        }
                    } catch (err) {
                      console.error(err);
                      alert(err.message);
                    }

                });
            }
        );

    };

    const sizes = [
		"XS",
		"SM",
		"MD",
		"LG",
		"XL",
    ]

    const Categories = [
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
			Sale:false,
			HotIn:false,
			Colors:[],
            Sizes:[],
			Categories:[],

		})

    console.log(newProduct)

    	const getProducts = async () => {
		const local = []
		  const querySnapshot = await getDocs(collection(db, "products"));

    querySnapshot.forEach((item)=>{
    	local.push({...item.data()})
    })
console.log(local)
setProducts(local)
	}

            const deleteItem = async (product) => {

        const querySnapshot = await getDocs(collection(db, "products"));

    querySnapshot.forEach(async (item) => {
      if (item.data().id === product.id) {
        await deleteDoc(doc(db, "products", item.id), {
          ...product,
        });

        console.log("Done deleting")
        getProducts()
      }
    });
    }


    return (
        <Box sx={{ padding:'2.5rem' , color:'#eee' }}>
      
        <SpeedDial
            ariaLabel="SpeedDial basic example"
            onClick={()=>setOpenDrawer(true)}
            sx={{ position: 'absolute' , color:Theme["FOURTH_COLOR"], bottom: "2.5rem", right: "2.5rem" }}
            icon={<SpeedDialIcon />}
        >
       
      </SpeedDial>
      <BasicTable  
            setPreview={setPreview} 
            setNewProduct={setNewProduct} 
            rows={products} 
            setOpenDrawer={setOpenDrawer}
            setEditing={setEditing}
            deleteItem={deleteItem}
             />
            

<Drawer       anchor={"bottom"}
      open={openDrawer}
      sx={{ background:'transparent' , zIndex:'100' }}
      onClose={() => setOpenDrawer(false)} >
      {

        loading ? (
            <CircularProgress size={"12.5rem"} />
            ) : (
<Box>
<Box sx={{ height:'21px' , display:percent === 0 || percent === 100 ? "none" : "flex" , background:Theme["FOURTH_COLOR"] , position:'fixed' , width:`${percent}%` ,top:0 , left:0}} />
<LinearProgress variant="determinate" sx={{ display: percent === 0 || 100 ? 'none' : 'flex' }} value={percent} />
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

           Categories  <Typography sx={{ fontSize:'21px' , color:Theme["FOURTH_COLOR"] , textAlign:'left' , padding:'8px 0' , fontWeight:'500' }}> Sizes </Typography>
                        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={newProduct.Sizes}
          onChange={handleChange}
          label={"Sizes"}
          input={<OutlinedInput label="Sizes" />}
          MenuProps={MenuProps}
          sx={{ width:'100%' }}
        >
          {!editing && sizes.map((item) => (
            <MenuItem
              key={item}
              value={item}
            >
              {item}
            </MenuItem>
          ))}
          {editing && sizes.map((item) => (
            <MenuItem
              key={item}
              value={item}
            >
              {item}
            </MenuItem>
          ))}
        </Select>

            </Grid>
                        <Grid item xs={12} lg={4} sx={{ height:'fit-content', background:'' , padding:'1.5rem' }}>
            <Typography sx={{ fontSize:'21px' , color:Theme["FOURTH_COLOR"] , textAlign:'left' , padding:'8px 0' , fontWeight:'600' }}> Select Image </Typography>
            <TextField onChange={handleFileChange} accept="/image/*" sx={{ width:'100%' , margin:'12px 0' }} type="file" label="" />
            
            <img src={preview} style={{ width:'100%' , height:'50vh' }} />


            <Box sx={{ margin:'21px 0' }}>
            <Typography sx={{ fontSize:'21px' , color:Theme["FOURTH_COLOR"] , textAlign:'left' , padding:'8px 0' , fontWeight:'600' }}> Categories </Typography>
   <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={newProduct.Categories}
          onChange={handleCategories}
          label={"Categories"}
          input={<OutlinedInput label="Categories" />}
          MenuProps={MenuProps}
          sx={{ width:'100%' }}
        >
          {Categories.map((item) => (
            <MenuItem
              key={item}
              value={item}
            >
              {item}
            </MenuItem>
          ))}
        </Select>

            </Box> 
            {/*}*/}
            </Grid>
                        <Grid item xs={12} lg={4} sx={{ height:'fit-content', background:'' , padding:'1.5rem' }}>
            <Typography sx={{ fontSize:'21px' , color:"transparent" , textAlign:'left' , padding:'8px 0' , fontWeight:'600' }}> Product Info </Typography>
                              <Typography sx={{ fontSize:'38px' , color:Theme["FOURTH_COLOR"] , textAlign:'center' , padding:'8px 21px' , fontWeight:'600' }}> {newProduct.Title} </Typography>
        <Box sx={{ display:'flex' , flexDirection:'column' , alignItems:'center' }}>
         {  
            preview !== "" ? (
     <Box sx={{
          height:'250px',
          width:'100%',
          backgroundImage:`url("${preview}")`,
          backgroundPosition:'center',
        backgroundSize:'contain' ,
        backgroundRepeat:'no-repeat' ,
        display:'flex',
        justifyContent:'space-between',
         }} >
<Box sx={{ padding:' 12px 21px' , opacity:newProduct.HotIn ? "1" : '0' , color:'#eee' , fontWeight:'600' , fontSize:'14px' , height:'40px' , background:'rgba(0,200,0,.8)' }}>
  {"Hot In"}
</Box>

<Box sx={{ padding:' 12px 21px' , opacity:newProduct.Sale ? "1" : '0' , color:'#eee' , fontWeight:'600' , fontSize:'14px' , height:'40px' , background:'rgba(255,0,0,.8)' }}>
  {"Sale "}
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
         


function BasicTable({rows , openDrawer, setOpenDrawer , setNewProduct , deleteItem , setPreview , setEditing}) {

    const [ searchQuery , setSearchQuery] = React.useState("");
    let searchResults = []
                   
     rows.map((item)=>{
        if(item.Title.includes(searchQuery)){
            searchResults.push(item)
        }
     })

  return (
    <TableContainer component={Paper}>
        <Box sx={{ display:'flex' , alignItems:'center' , justifyContent:'flex-end' }}>
<TextField sx={{ width:'40%' }} value={searchQuery} onChange={(e)=>setSearchQuery(e.target.value)}  />
       <Button sx={{ height:'100%' , background:'#111' , padding:'21px 0' , }}>
       <SearchIcon sx={{ color:'#eee' }} />
       </Button>
        </Box>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
              <TableCell align="left">Title</TableCell>
              <TableCell align="left">Description</TableCell>
              <TableCell align="left">Sale</TableCell>
              <TableCell align="left">HotIn</TableCell>
              <TableCell align="left">Colors</TableCell>
              <TableCell align="left">Sizes</TableCell>
              <TableCell align="left">Edit</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { searchQuery === "" ? rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="left">{row.Title}</TableCell>
              <TableCell align="left">{row.Description}</TableCell>
              <TableCell align="left">{row.Sale ? "Yes" : "No"}</TableCell>
              <TableCell align="left">{row.HotIn? "Yes" : "No"}</TableCell>
              <TableCell align="left">{row.Colors}</TableCell>
              <TableCell align="left">{row.Sizes.map((item)=> `${item},`)}</TableCell>
              <TableCell align="left"><IconButton onClick={()=>{
                setEditing(true)
                setPreview(row.Image)
                setNewProduct({...row})
                setOpenDrawer(true)
              }
            }><EditIcon /></IconButton></TableCell>
                <TableCell align="left"><IconButton onClick={()=>{
                    deleteItem(row)
              }
            }><DeleteIcon /></IconButton></TableCell>
           
            </TableRow>
          )) : searchResults.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="left">{row.Title}</TableCell>
              <TableCell align="left">{row.Description}</TableCell>
              <TableCell align="left">{row.Sale ? "Yes" : "No"}</TableCell>
              <TableCell align="left">{row.HotIn? "Yes" : "No"}</TableCell>
              <TableCell align="left">{row.Colors}</TableCell>
              <TableCell align="left">{row.Sizes.map((item)=> `${item},`)}</TableCell>
              
              <TableCell align="left"><IconButton onClick={()=>{
                setEditing(true)
                setPreview(row.Image)
                setNewProduct({...row})
                setOpenDrawer(true)
              }
            }><EditIcon /></IconButton></TableCell>
                <TableCell align="left"><IconButton onClick={()=>{
                    deleteItem(row)
              }
            }><DeleteIcon /></IconButton></TableCell>
           
            </TableRow>
          )) }
        </TableBody>
      </Table>
    </TableContainer>
  );
}