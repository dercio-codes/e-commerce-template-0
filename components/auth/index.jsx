import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import { Box , Avatar , Modal , Paper , Button , Grid , TextField } from '@mui/material';
import * as Theme from "../../constants"
import FavoriteIcon from '@mui/icons-material/Favorite';
import { query, collection, addDoc, setDoc , deleteDoc , doc , getDocs, where } from "firebase/firestore";
import { storage , googleProvider , facebookProvider , auth , db } from "./../../firebase/firebaseConfig";
import { signInWithPopup, GoogleAuthProvider , FacebookAuthProvider } from 'firebase/auth';
import { User } from "../../pages/_app"


export default function Auth() {
	const [ products ,setProducts] = React.useState([]);
	const { user ,setUser} = React.useContext(User);

    const UpdateUser = async (user) => {
        // const q = query(collection(db, "users"), where("uid", "==", user.uid));
        // const docs = await getDocs(q);
              await addDoc(doc(db, "users", `${new Date().getTime() + user.email} `), {
             ...user,
             Cart:[]
      });
        // console.log(user)
        // const putUser = await setDoc(collection(db, "users"),  JSON.parse(JSON.stringify({
        //     ...user,
        //     // Cart:[],
        //   })) );
        // console.log(" Put user " ,putUser)
    }
    
    const googleHandler = async () => {
        googleProvider.setCustomParameters({ prompt: 'select_account' });
        signInWithPopup(auth, googleProvider)
            .then(async (result) => {
                console.log(result)
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const resultsUser = result.user;
                console.log(resultsUser);
                setUser({...resultsUser});
                // UpdateUser(resultsUser)
                // redux action? --> dispatch({ type: SET_USER, user });
            })
            .catch((error) => {
                // Handle Errors here.
                console.log(error)
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
            });
    };

    const facebookHandler = async () => {
        facebookProvider.setCustomParameters({ prompt: 'select_account' });
        signInWithPopup(auth, facebookProvider)
            .then(async (result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = FacebookAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const resultsUser = result.user;
                setUser({...resultsUser});
                UpdateUser(resultsUser)
                console.log(resultsUser);
                // redux action? --> dispatch({ type: SET_USER, user });
            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.email;
                // The AuthCredential type that was used.
                const credential = FacebookAuthProvider.credentialFromError(error);
                // ...
            });
    };

    console.log(user)


  return (
    <Box sx={{ 	
    		width: '100%' , 
    		padding:{
    			// xs:'0.5rem',
    			xs:'3.5rem 1.5rem',
    		},
    		marginTop:'2.rem',
    		minHeight:'100vh',
    		display:'flex',
    		flexDirection:'column',
    		justifyContent:'center',
    		zIndex:'9',
    		// borderBottom:'1px solid red'
    		 }}>

    		 <Modal open={user.uid === ""} sx={{ display:'flex',
    		flexDirection:'column',
    		justifyContent:'center',
    		alignItems:'center',
    		zIndex:'5 !important',
    		border:'none'
    		 }}>
    		    <Box sx={{ 	
    		width: '50%' , 
    		padding:{
    			// xs:'0.5rem',
    			xs:'3.5rem 1.5rem',
    		},
    		marginTop:'2.rem',
    		minHeight:'50vh',
    		display:'flex',
    		flexDirection:'column',
    		justifyContent:'center',
    		// zIndex:'9',
    		background:'rgba(255,255,255,.7)'
    		// borderBottom:'1px solid red'
    		 }}>
    		 <Grid container>
    		 	<Grid item xs={12} sx={{ minHeight:"45vh" , background:'rgba(255,255,255,.7)' , padding:'12px 21px' }}>
    		<Typography sx={{ fontSize:'21px' , color:Theme["FOURTH_COLOR"] , padding:'0 0' , fontWeight:'600' }}> Don't have a account? </Typography>
    		<Typography sx={{ fontSize:'21px' , color:Theme["FOURTH_COLOR"] , padding:'0 0' , fontWeight:'600',margin:'12px 0' }}> Sign In </Typography>
    		 	<img src="https://cdn-icons-png.flaticon.com/512/2170/2170153.png" alt="" style={{ width:'100%', margin:'0 auto ',height:"150px" , objectFit:'contain' }} />
                <Button onClick={googleHandler} sx={{ width:'100%' , padding:'12px 21px' , background:'#F4B400' ,"&:hover":{ color:'#F4B400' }, margin:'12px 0' , color:'#eee' , fontWeight:'600' }}>Continue with Google</Button>
    		 	<Button onClick={facebookHandler} sx={{ width:'100%' , padding:'12px 21px' , background:'#4267B2' ,"&:hover":{ color:'#4267B2' }, margin:'12px 0' , color:'#eee' , fontWeight:'600' }}>Continue with Facebook</Button>
    		 	{/*<Button sx={{ width:'100%' , padding:'12px 21px' , background:'#000' ,"&:hover":{ color:'#000' }, margin:'12px 0' , color:'#eee' , fontWeight:'600' }}>Continue with Apple</Button>
    		 	<Button sx={{ width:'100%' , padding:'12px 21px' , background:'#1DA1F2' ,"&:hover":{ color:'#1DA1F2' }, margin:'12px 0' , color:'#eee' , fontWeight:'600' }}>Continue with Twitter</Button>
    		 	*/}
    		 	</Grid>
    		 	{/*<Grid item xs={6} sx={{ minHeight:"45vh" , background:'yellow' }}>
    		 	dercio
    		 	</Grid>*/}
    		 	</Grid>
    		 </Box>
    		 </Modal>

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