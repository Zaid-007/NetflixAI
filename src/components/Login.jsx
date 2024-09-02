import { useState, useRef } from 'react';
import Header from './Header';
import { BACKGROUND_IMAGE } from '../utils/constants';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { IoCloseCircleOutline } from 'react-icons/io5';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '../utils/firebase';

const Login = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [hidePass, setHidePass] = useState(true);
  const [errorMsg, setErrorMsg] = useState({
    emailError: '',
    passwordError: '',
    authError: '',
  });

  const toggleSignInForm = () => {
    setIsSignIn(!isSignIn);
  };

  const email = useRef(null);
  const password = useRef(null);
  const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  const inputValidation = (regex, inputField, msgType, message) => {
    const isValid = regex.test(inputField.current.value);
    return setErrorMsg({ ...errorMsg, [msgType]: !isValid ? message : null });
    // !isValid
    //   ? setErrorMsg({ ...errorMsg, [msgType]: message })
    //   : setErrorMsg({ ...errorMsg, [msgType]: null });
  };

  const handleButtonClick = () => {
    if (!isSignIn) {
      // Registering new user (Sign up)
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          setErrorMsg({ ...errorMsg, authError: '' });
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMsg({ ...errorMsg, authError: errorMessage });
        });
    } else {
      // Sign in Logic
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          setErrorMsg({ ...errorMsg, authError: '' });
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMsg({ ...errorMsg, authError: errorMessage });
        });
    }
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
        <div className="mt-8 w-96 h-fit py-12 px-10 sm:w-[450px] sm:px-[68px] sm:mt-0 bg-[rgba(0,0,0,0.7)] rounded-[4px] z-10">
          <h1 className=" mb-7 text-white font-bold text-4xl capitalize">
            {isSignIn ? 'sign in' : 'sign up'}
          </h1>
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            {!isSignIn && (
              <input
                className="w-full p-4 mb-4 text-white bg-[rgba(22,22,22,0.7)] rounded-[0.25rem] border-[0.0625rem] border-[rgba(128,128,128,0.7)]"
                type="text"
                placeholder="Full Name"
              />
            )}
            <input
              ref={email}
              className="w-full p-4 mb-4 text-white bg-[rgba(22,22,22,0.7)] rounded-[0.25rem] border-[0.0625rem] border-[rgba(128,128,128,0.7)] invalid:border-[#eb3942]"
              type="email"
              //Validate input when user leaves form field
              onBlur={() => {
                inputValidation(
                  emailRegex,
                  email,
                  'emailError',
                  'Please enter a valid email address'
                );
              }}
              placeholder="Email Address"
            />
            {errorMsg.emailError && (
              <span className="flex flex-row items-center text-sm text-[#eb3942] font-normal -mt-2 mb-4">
                <IoCloseCircleOutline className="w-5 h-5 mr-0.5" />
                {errorMsg.emailError}
              </span>
            )}

            <div className="relative">
              <div onClick={() => setHidePass(!hidePass)}>
                {hidePass ? (
                  <FaEye
                    className="fill-[rgba(128,128,128,0.7)] absolute right-4 top-[1.3rem]"
                    title="Show Password"
                  />
                ) : (
                  <FaEyeSlash
                    className="w-[18px] fill-[rgba(128,128,128,0.7)] absolute right-[15px] top-[1.3rem]"
                    title="Hide Password"
                  />
                )}
              </div>

              <input
                ref={password}
                className="w-full p-4 mb-4 text-white bg-[rgba(22,22,22,0.7)] rounded-[0.25rem] border-[0.0625rem] border-[rgba(128,128,128,0.7)]"
                type={hidePass ? 'password' : 'text'}
                onBlur={() => {
                  inputValidation(
                    passwordRegex,
                    password,
                    'passwordError',
                    'Your password must contain minimum 8 characters, atleast one letter and one number'
                  );
                }}
                placeholder="Password"
              />
              {(errorMsg.passwordError || errorMsg.authError) && (
                <span className=" block text-sm text-[#eb3942] font-normal -mt-2 mb-4">
                  <IoCloseCircleOutline className="w-5 h-5 mr-0.5 inline" />
                  {errorMsg.passwordError || errorMsg.authError}
                </span>
              )}
            </div>

            <button
              onClick={handleButtonClick}
              className="w-full py-1.5 min-h-10 font-medium text-base text-white bg-[#e50913] duration-200 hover:bg-[#c50913] rounded-[0.2rem] capitalize"
              type="submit"
            >
              {isSignIn ? 'sign in' : 'sign up'}
            </button>
            <p className="mt-4 font-normal text-base text-white text-opacity-70">
              {isSignIn ? 'New to Netflix?' : 'Already a User?'}
              <a
                className="text-white font-medium pl-1 cursor-pointer hover:underline"
                // passing function as reference
                onClick={toggleSignInForm}
              >
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
