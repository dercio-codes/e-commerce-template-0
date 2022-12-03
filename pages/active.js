import { Box , Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import { Button , TextField } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import Link from "next/link"
export default function Search() {

  const images = [
  " https://form-edit.d3r04nxpso4399.amplifyapp.com/images/how-we-do-it-3.jpg",
  " https://form-edit.d3r04nxpso4399.amplifyapp.com/images/sow-hope-img-2.jpg",
  " https://form-edit.d3r04nxpso4399.amplifyapp.com/images/sow-hope-img-4.jpg",
  " https://form-edit.d3r04nxpso4399.amplifyapp.com/images/sow-hope-img-3.jpg",
  " https://form-edit.d3r04nxpso4399.amplifyapp.com/images/sow-hope-img-1.jpg",
  " https://form-edit.d3r04nxpso4399.amplifyapp.com/images/Collage.jpg",
  " https://form-edit.d3r04nxpso4399.amplifyapp.com/images/how-we-do-it-2.jpg",
  " https://form-edit.d3r04nxpso4399.amplifyapp.com/images/study-center-img.jpg",
  " https://form-edit.d3r04nxpso4399.amplifyapp.com/images/kid-ride.jpg",
  "https://images.pexels.com/photos/5732637/pexels-photo-5732637.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"

  ]
  return (
      <Box sx={{ display:'flex ', flexDirection:'column' ,alignItems:'center' , justifyContent:'center', padding:'34px' }}>

      <Box sx={{ height:'90vh' , background:'' , width:'100%' }}>
         <Box className="grid">
         {
          images.map((item,index)=>(
              <Box key={item} sx={{ backgroundImage:`url("${item}")` }} className={`grid-item${index + 1}`}></Box>
            ))
         }
      </Box>
</Box>
  <Typography sx={{ display:'flex' , textAlign:'left', width:'100%' , margin:'21px 0' , fontSize:'64px' }}> Sow Hope</Typography>
  <Box sx={{ display:'flex' , justifyContent:'space-between' }}>

  <Typography sx={{ width:'45%' }}>

  Education is important. You don`t know what you don`t know, until you know it.

There are a lot of scholars around the country that are failing due to many circumstances. As the study centre innovative we are getting those that have gone ahead to give back by tutoring extra math, pure math, math lit and introducing more subjects online for free to help those from grades 10-12 to get the desired marks and even to help those that are failing to now pass or even get a distinction.

No COVID worries and no transport to travel. Online classes taught by university students and past pupils to help our schools go further.
</Typography>

  <Typography sx={{ width:'45%' }}>

Many people`s lives have been impacted over the last 5 years through the Active Foundation and many testimonies of people that once had no goals, no ambitions, no recourses and no opportunities, now have success stories all as a result of our programmes and initiatives.

Once a year, we work alongside IT companies called Orange One Consulting and Rapidtrade, and together with their expertise and funding, we source candidates from various schools that are finishing their matric and offer them a 5 week IT crash course with the potential of an internship and possible job after completion of the course and the internship.
</Typography>
  </Box>




  <Box sx={{ display:'flex', width:'100%',margin:'21px 0', justifyContent:'space-between' , alignItems:'center' }}>
  <Box sx={{ width: "250px" , height:'350px' , backgroundSize:'contain', backgroundRepeat:'no-repeat', backgroundPosition:'center', backgroundImage:'url("https://images.pexels.com/photos/14082768/pexels-photo-14082768.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load")' }} >

  </Box>
  <Box sx={{ width: "250px" , height:'350px' , backgroundSize:'contain', backgroundRepeat:'no-repeat', backgroundPosition:'center', backgroundImage:'url("https://images.pexels.com/photos/14113096/pexels-photo-14113096.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load")' }} >

  </Box>
  <Box sx={{ width: "250px" , height:'350px' , backgroundSize:'contain', backgroundRepeat:'no-repeat', backgroundPosition:'center', backgroundImage:'url("https://images.pexels.com/photos/13727428/pexels-photo-13727428.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load")' }} >

  </Box>
  <Box sx={{ width: "250px" , height:'350px' , backgroundSize:'contain', backgroundRepeat:'no-repeat', backgroundPosition:'center', backgroundImage:'url("https://images.pexels.com/photos/7664118/pexels-photo-7664118.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load")' }} >

  </Box>
  <Box sx={{ width: "250px" , height:'350px' , backgroundSize:'contain', backgroundRepeat:'no-repeat', backgroundPosition:'center', backgroundImage:'url("https://images.pexels.com/photos/7356598/pexels-photo-7356598.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load")' }} >

  </Box>
  </Box>

  <Grid container>
  <Grid item={4}>

  </Grid>
  <Grid item={4}>

  </Grid>
  <Grid item={4}>

  </Grid>
  </Grid>

  <Box sx={{height:'70vh' , background:'' , width:'100%' , padding:'0 8px'}}>
  <Typography sx={{ display:'flex' , textAlign:'left', width:'100%' , margin:'21px 0' , fontSize:'32px' }}> Get Help</Typography>
  <Typography sx={{ display:'flex' , textAlign:'left', width:'100%' , margin:'21px 0' , fontSize:'16px' }}> Fill in this form and we will get back to you within a week with a response.</Typography>
<Grid container>
  <Grid item md={6}>
  <TextField sx={{ width:'100%' , margin:'12px 0' }}  label="Name"/>
  <TextField sx={{ width:'100%' , margin:'12px 0' }}  label="Surname"/>
  <TextField sx={{ width:'100%' , margin:'12px 0' }}  label="Cell"/>
  <TextField sx={{ width:'100%' , margin:'12px 0' }}  label="Email"/>
  <TextField sx={{ width:'100%' , margin:'12px 0' }}  label="Location"/>

  <Button sx={{ padding:'34px 21px' , width:"100%" , background:'#c42b31' , color:'#eee' , fontWeight:'600' }}>Submit</Button>
  </Grid>
  <Grid item md={6} sx={{ display:'flex' , flexDirection:'column' , padding:'0px 21px' , justifyContent:'center' , height:'100%', background:'' }}>
  <Typography sx={{ display:'flex' , textAlign:'left', width:'100%' , margin:'21px 0' , fontSize:'21px' }}> Interested in partnering with us? </Typography>
  <ol style={{ margin:'0' , padding:"6px 16px" }} >
  <li style={{ margin:'0' , padding:"6px 16px" }} >
  <Typography sx={{ display:'flex' , textAlign:'left', width:'100%' , margin:'21px 0' , fontSize:'18px' }}> Reach out to us with you plan or way of wanting to partner with.    </Typography>
  </li>
  <li style={{ margin:'0' , padding:"6px 16px" }} >
  <Typography sx={{ display:'flex' , textAlign:'left', width:'100%' , margin:'21px 0' , fontSize:'18px' }}> The Active Foundation will review your proposal and set up a meeting where we :    </Typography>
  </li>
    <li style={{ margin:'0' , padding:"6px 16px" }} >
  <Typography sx={{ display:'flex' , textAlign:'left', width:'100%' , margin:'21px 0' , fontSize:'18px' }}> The Active Foundation and we will get back to you.   </Typography>
  </li>
  <li style={{ margin:'0' , padding:"6px 16px" , opacity:0 }} >
  <Typography sx={{ display:'flex' , textAlign:'left', width:'100%' , margin:'21px 0' , fontSize:'18px' }}> The Active Foundation and we will get back to you.   </Typography>
  </li>
  </ol>
  <Button sx={{ padding:'34px 21px' , width:"100%" , background:'#3e3f40' , color:'#eee' , fontWeight:'600' , margin:'12px 0' }}>Partner with Us</Button>

  </Grid>

  </Grid>
  </Box>
  </Box>
  
  )
}
