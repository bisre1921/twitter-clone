"use client";

import { getProviders, signIn } from "next-auth/react";
import { useState, useEffect } from "react";

const SignIn = () => {
  const [providers, setProviders] = useState(null);

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const response = await getProviders();
        console.log("Fetched Providers:", response); // Debug log
        setProviders(response);
      } catch (error) {
        console.error("Error fetching providers:", error); // Error log
      }
    };
  
    fetchProviders();
  }, []);

  console.log(providers);

  return (
    <div>
      <img
        src="https://cdn.pixabay.com/photo/2015/03/09/13/51/phone-665690_960_720.png"
        alt="twitter phone image"
      />
      <div>
        {providers && Object.values(providers).map((provider) => (
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
      </div>
    </div>
  );
};

export default SignIn;
