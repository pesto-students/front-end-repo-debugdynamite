import React, { useEffect } from "react";
import { GoogleButton } from "react-google-button";
import {
  GoogleAuthProvider,
  // signInWithPopup,
  signInWithRedirect,
} from "firebase/auth";
import { UserAuth } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { auth } from "../../configs/firebaseConfig";

import axios from "../../api/axios";

const Signin = () => {
  const { user } = UserAuth();
  const navigate = useNavigate();

  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    // const result = await signInWithPopup(auth, provider);
    const result = await signInWithRedirect(auth, provider);

    try {
      const { uid, email, displayName, photoURL } = result.user;

      axios.post("/user", {
        uid,
        email,
        displayName,
        photoURL,
      });
    } catch (error) {
      console.error("Error signing in with Google:", error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user != null) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div>
      <div className="items-center justify-center max-w-[240px] mx-auto">
        <GoogleButton onClick={handleGoogleSignIn} />
      </div>
    </div>
  );
};

export default Signin;
