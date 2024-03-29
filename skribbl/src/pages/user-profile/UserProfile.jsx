import React from "react";
import { signOut } from "firebase/auth";
import { UserAuth } from "../../context/UserContext";
import { auth } from "../../configs/firebaseConfig";

const UserProfile = () => {
  const { user } = UserAuth();

  const logOut = () => {
    signOut(auth);
  };

  const handleSignOut = async () => {
    try {
      logOut();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-[300px] m-auto">
      <h1 className="text-center text-2xl font-bold pt-12">Profile</h1>
      <div>
        <p>Welcome, {user?.displayName}</p>
      </div>
      <button onClick={handleSignOut} className="border py-2 px-5 mt-10">
        Logout
      </button>
    </div>
  );
};

export default UserProfile;
