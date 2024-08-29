import React, { useState } from 'react';
import Header from './Header';
import { BACKGROUND_IMAGE } from '../utils/constants';

const Login = () => {
  const [isSignIn, setIsSignIn] = useState(true);

  const toggleSignInForm = () => {
    setIsSignIn(!isSignIn);
  };

  return (
    <>
      <div className="relative">
        <Header />
        <div className="bg-black w-full h-screen absolute z-0 opacity-50"></div>
        <img
          className="w-full h-screen object-cover absolute -z-[1]"
          src={BACKGROUND_IMAGE}
          alt="Background Image Login Screen"
        />
      </div>
      <div className="flex justify-center items-center h-screen">
        <div className="w-[450px] h-fit py-12 px-[68px] bg-[rgba(0,0,0,0.7)] rounded-[4px] z-10">
          <h1 className=" mb-7 text-white font-bold text-4xl capitalize">
            {isSignIn ? 'sign in' : 'sign up'}
          </h1>
          <form>
            {!isSignIn && (
              <input
                className="w-full p-4 mb-4 text-white bg-[rgba(22,22,22,0.7)] rounded-[0.25rem] border-[0.0625rem] border-[rgba(128,128,128,0.7)]"
                type="text"
                placeholder="Full Name"
              />
            )}
            <input
              className="w-full p-4 mb-4 text-white bg-[rgba(22,22,22,0.7)] rounded-[0.25rem] border-[0.0625rem] border-[rgba(128,128,128,0.7)]"
              type="email"
              placeholder="Email Address"
            />
            <input
              className="w-full p-4 mb-4 text-white bg-[rgba(22,22,22,0.7)] rounded-[0.25rem] border-[0.0625rem] border-[rgba(128,128,128,0.7)]"
              type="password"
              placeholder="Password"
            />
            <button
              className="w-full py-1.5 min-h-10 font-medium text-base text-white bg-[#e50913] duration-200 hover:bg-[#c50913] rounded-[0.2rem] capitalize"
              type="submit"
            >
              {isSignIn ? 'sign in' : 'sign up'}
            </button>
            <p
              onClick={toggleSignInForm}
              className="mt-4 font-normal text-base text-white text-opacity-70 cursor-pointer"
            >
              {isSignIn ? 'New to Netflix?' : 'Already a User?'}
              <a className="text-white font-medium pl-1">
                {isSignIn ? 'Sign Up Now' : 'Sign In Now'}
              </a>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
