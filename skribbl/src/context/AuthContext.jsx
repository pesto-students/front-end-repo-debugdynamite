import { useContext, createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../configs/firebaseConfig";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
import { USER_URI } from "../constants/endPoints";
import postDataPublic from "../services/postDataPublic";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState();

  // const queryClient = useQueryClient();

  // const { mutate, isLoading } = useMutation(
  //   (newData) => postDataPublic(USER_URI, newData),
  //   {
  //     onSuccess: (data) => {
  //       console.log("mutation success: ", data);
  //     },
  //     onError: () => {
  //       console.log("mutation error! ");
  //     },
  //     onSettled: () => {
  //       queryClient.invalidateQueries("create");
  //     },
  //   }
  // );

  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);

    try {
      const { uid, email, displayName, photoURL } = result.user;

      const userData = await postDataPublic(USER_URI, {
        uid,
        email,
        displayName,
        photoURL,
      });

      console.log(userData);

      // mutate({
      //   uid,
      //   email,
      //   displayName,
      //   photoURL,
      // });

      const isNewUser = result._tokenResponse.isNewUser;

      if (isNewUser) {
        console.log("New user signed up!");
        // Perform actions for new users, e.g., initialize additional data
      } else {
        console.log("Existing user signed in!");
        // Perform actions for existing users
      }

      // Access the user information
      const user = result.user;
      console.log("User details:", user);
    } catch (error) {
      console.error("Error signing in with Google:", error.message);
    }
  };

  const logOut = () => {
    signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log("User", currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ googleSignIn, logOut, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
