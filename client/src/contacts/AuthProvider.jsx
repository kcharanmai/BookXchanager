import React, { createContext, useEffect, useState } from 'react'
export const AuthContext = createContext();
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import app from '../firebase/firebase.config';

const googleProvider = new GoogleAuthProvider();
const auth = getAuth(app);
const AuthProvider = ({children}) => {
 const [user, setUser ]= useState(null);
 const [loading, setLoading] = useState(true);
 const createUser =(email,password) =>{
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email,password)
 }
 const loginwithGoogle =() =>{
    setLoading(true);
    return signInWithPopup(auth, googleProvider)
 }
 const login=(email,password) =>{
     setLoading(true);
     return signInWithEmailAndPassword(auth,email,password)
 }
 const logOut =()=>{
    return signOut(auth)
 }
 useEffect(()=>{
   const unsubscribe = onAuthStateChanged(auth, currentUser =>{
    setUser(currentUser);
     setLoading(false);
   });
   return ()=>{
    return unsubscribe();
   }
 },[])
const authInfo ={
    user,
    loginwithGoogle,
    createUser,
    login,
    logOut
}
  return (
    <AuthContext.Provider value ={authInfo}>
        {children}
    </AuthContext.Provider>
  )
}
export default AuthProvider
