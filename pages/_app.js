import "../styles/globals.css";
import Auth from "../components/auth";
import dynamic from "next/dynamic";
import { useEffect, createContext, useContext, useState } from "react";
const AnimatedCursor = dynamic(() => import("react-animated-cursor"), {
  ssr: false,
});

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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

export const DisplayLoader = createContext(false);
export const SelectedProduct = createContext({});
export const User = createContext({
  uid: "close",
  name: "",
  surname: "",
  profilePicture: "",
  email: "",
  orders: [],
  wishlist: [],
});
function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({});
  const [user, setUser] = useState({
    uid: "",
    name: "",
    surname: "",
    profilePicture: "",
    email: "",
    orders: [],
    wishlist: [],
  });

  //   useEffect(() => {
  //   initLists()
  // }, [user.email , user.uid , user.cart , user.orders , user.wishlist]);

  const initLists = async () => {
    if (user.email !== "") {
      let userLists = {};
      const querySnapshot = await getDocs(collection(db, "users"));

      querySnapshot.forEach((item) => {
        if (item.data().email === user.email) {
          userLists = { ...item.data() };
        }
      });
      console.log(userLists);
      setUser({ ...user, ...userLists });
    } else {
      // alert("User not logged in.");
    }
  };
  console.log(user);

  useEffect(() => {
    const localStorageUser = localStorage.getItem("authUser")
      ? JSON.parse(localStorage.getItem("authUser"))
      : {
          uid: "",
          name: "",
          surname: "",
          profilePicture: "",
          email: "",
          orders: [],
          wishlist: [],
        };
    setUser({ ...localStorageUser });
  }, [user.email, user.uid]);

  return (
    <User.Provider value={{ user, setUser }}>
      <SelectedProduct.Provider value={{ selectedProduct, setSelectedProduct }}>
        <DisplayLoader.Provider value={{ loading, setLoading }}>
          {loading ? (
            <div>Laindg</div>
          ) : (
            <>
              <Component {...pageProps} />
              <Auth />
            </>
          )}
          <ToastContainer />
        </DisplayLoader.Provider>
      </SelectedProduct.Provider>
    </User.Provider>
  );
}

export default MyApp;

// <AnimatedCursor innerSize={24}
//     outerSize={48}
//     color='56, 36, 27'
//     outerAlpha={0.2}
//     innerScale={0.7}
//     outerScale={2}
//     clickables={[
//       'a',
//       'input[type="text"]',
//       'input[type="email"]',
//       'input[type="number"]',
//       'input[type="submit"]',
//       'input[type="image"]',
//       'label[for]',
//       'select',
//       'textarea',
//       'button',
//       '.link'
//     ]} />
