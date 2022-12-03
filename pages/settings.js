import { Box , Grid } from '@mui/material';
import MainBanner from "../components/main"
import Poster from "../components/poster"
import Navbar from "../components/navbar"
import FileUploader from "../components/config-components"
import Typography from '@mui/material/Typography';
import { Button , TextField } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import Link from "next/link"

function Settings() {

    return (
        <div>
        <Navbar />

        <FileUploader />
        </div>
    );
}
 
export default Settings;