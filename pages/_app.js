import '../styles/globals.css'
import Auth from "../components/auth"
import dynamic from 'next/dynamic'
import { createContext , useContext  , useState} from "react"
const AnimatedCursor = dynamic(() => import('react-animated-cursor'), {
  ssr: false
});

export const DisplayLoader = createContext(false);
export const User = createContext({
  uid:"",
  name:"",
  surname:"",
  profilePicture:"",
  email:"",
  orders:[],
  wishlist:[],
});
function MyApp({ Component, pageProps }) {
  const [ loading , setLoading ] = useState(false)
  const [ user , setUser ] = useState({
  uid:"",
  name:"",
  surname:"",
  profilePicture:"",
  email:"",
  orders:[],
  wishlist:[],
})

  return(
    <User.Provider value={{ user , setUser }}>
<DisplayLoader.Provider value={{ loading , setLoading }}>
  <AnimatedCursor innerSize={24}
      outerSize={48}
      color='56, 36, 27'
      outerAlpha={0.2}
      innerScale={0.7}
      outerScale={2}
      clickables={[
        'a',
        'input[type="text"]',
        'input[type="email"]',
        'input[type="number"]',
        'input[type="submit"]',
        'input[type="image"]',
        'label[for]',
        'select',
        'textarea',
        'button',
        '.link'
      ]} />

       { loading ? ( 
                 <div>Laindg</div>
           ) : (
           <>
          <Component {...pageProps } />
           <Auth />
           </>
           )}

</DisplayLoader.Provider>
    </User.Provider>
    )

}

export default MyApp
