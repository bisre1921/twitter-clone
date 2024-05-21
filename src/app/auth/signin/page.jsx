"use client";

// import {db} from "../../../../firebase.jsx";
import { getProviders, signIn } from "next-auth/react";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "../../../../firebase";

const SignIn = () => {
  const [providers, setProviders] = useState(null);
  const router = useRouter();

  // useEffect(() => {
  //   const fetchProviders = async () => {
  //     try {
  //       const response = await getProviders();
  //       console.log("Fetched Providers:", response); // Debug log
  //       setProviders(response);
  //     } catch (error) {
  //       console.error("Error fetching providers:", error); // Error log
  //     }
  //   };
  
  //   fetchProviders();
  // }, []);

  // console.log(providers);

  const onGoogleClick = async () => {
    try {
      //const auth = getAuth();
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex justify-center mt-20 items-center space-x-8">
      <img
        src="https://cdn.pixabay.com/photo/2015/03/09/13/51/phone-665690_960_720.png"
        alt="twitter phone image"
        className="hidden md:inline-flex object-cover md:w-44 md:h-80 rotate-6"
      />
      <div>
        {/* {providers && Object.values(providers).map((provider) => (
          <div key={provider.name}>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Logo_of_Twitter.svg/584px-Logo_of_Twitter.svg.png"
              alt="Twitter logo"
            />
            <button onClick={() => signIn(provider.id)}>
              Sign in with {provider.name}
            </button>
          </div>
        ))}
        */}
        <div className="flex flex-col items-center ">
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Logo_of_Twitter.svg/584px-Logo_of_Twitter.svg.png"
            alt="Twitter logo"
            className="w-36 object-cover "
          />
          <p className="text-center text-sm italic my-10 ">
            This app is for learining purposes only.
          </p>
          <button 
            onClick={onGoogleClick}
            className="bg-red-400 rounded-lg p-3 text-white hover:bg-red-500 ">
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
