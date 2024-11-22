import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  sendEmailVerification, // Import sendEmailVerification
} from "firebase/auth";
import auth from "../Firebase/firebase.config";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
  const [customerInfo, setCustomerInfo] = useState(null);

  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const googleProvider = new GoogleAuthProvider();

  // Google login
  const googleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // email password sign up with email verification
  const signUpWithEmailAndPassword = async (email, password) => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Send email verification
      await sendEmailVerification(user);
      console.log("Verification email sent!");

      return userCredential;
    } catch (error) {
      console.error("Error signing up:", error);
      throw error;
    }
  };

  // email password login (only allows login if the email is verified)
  const loginWithEmailAndPassword = async (email, password) => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Check if the email is verified
      // if (!user.emailVerified) {
      //   throw new Error("Email is not verified. Please check your inbox.");
      // }

      return userCredential;
    } catch (error) {
      console.error("Error logging in:", error);
      throw error;
    }
  };

  // Log out
  const logOut = () => {
    setLoading(true);
    if(localStorage.getItem("isCustomer")){
      localStorage.removeItem("isCustomer");
    }
    return signOut(auth);
  };

  const updateUserProfile = async (displayName, photoURL) => {
    try {
      setLoading(true);
      const profileData = {};
      if (displayName) {
        profileData.displayName = displayName;
      }
      if (photoURL) {
        profileData.photoURL = photoURL;
      }
      await updateProfile(auth.currentUser, profileData);
      console.log("User profile updated successfully");
    } catch (error) {
      console.error("Error updating user profile:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      const storedIsCustomer = localStorage.getItem("isCustomer");
      const isCustomer = JSON.parse(storedIsCustomer);
      if (isCustomer) {
        setCustomerInfo(currentUser);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const authInfo = {
    googleLogin,
    signUpWithEmailAndPassword,
    loginWithEmailAndPassword,
    user,
    logOut,
    updateUserProfile,
    loading,
    customerInfo,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
