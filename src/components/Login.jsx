import { useState, useRef, useEffect } from 'react';
import { BACKGROUND_IMAGE, USER_AVATAR } from '../utils/constants';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { IoCloseCircleOutline } from 'react-icons/io5';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
} from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useDispatch } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import Header from './Header';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [hidePass, setHidePass] = useState(true);
  const [errorMsg, setErrorMsg] = useState({
    emailError: '',
    passwordError: '',
    authError: '',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  const toggleSignInForm = () => {
    setIsSignIn(!isSignIn);
  };

  const inputValidation = (regex, inputField, msgType, message) => {
    const isValid = regex.test(inputField);
    return setErrorMsg({ ...errorMsg, [msgType]: !isValid ? message : null });
    // !isValid
    //   ? setErrorMsg({ ...errorMsg, [msgType]: message })
    //   : setErrorMsg({ ...errorMsg, [msgType]: null });
  };

  const handleButtonClick = () => {
    //On Submit if both email and password is empty, disply error messages
    if (email.current.value === '' && password.current.value === '') {
      setErrorMsg({
        ...errorMsg,
        emailError: 'Please enter a valid email address',
        passwordError:
          'Your password must contain minimum 8 characters, atleast one letter and one number',
      });
      return;
    }
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

          updateProfile(user, {
            displayName: name.current.value,
            photoURL: USER_AVATAR,
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
            })
            .catch((error) => {
              setErrorMsg({ ...errorMsg, authError: error.message });
            });
        })
        .catch((error) => {
          setErrorMsg({ ...errorMsg, authError: error.message });
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
          const errorMessage = error.message;
          setErrorMsg({ ...errorMsg, authError: errorMessage });
        });
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate('/browse');
        // ...
      } else {
        // User is signed out
        dispatch(removeUser());
        navigate('/');
      }
    });

    //Unsubscribe when component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <>
      <div className="w-10/12 px-8 py-6 sm:mx-32 z-10 absolute">
        <svg
          viewBox="0 0 111 30"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          aria-hidden="true"
          role="img"
          className="fill-[rgb(229,9,20)] w-[5.5625rem] h-6 sm:w-[9.25rem] sm:h-10"
        >
          <g>
            <path d="M105.06233,14.2806261 L110.999156,30 C109.249227,29.7497422 107.500234,29.4366857 105.718437,29.1554972 L102.374168,20.4686475 L98.9371075,28.4375293 C97.2499766,28.1563408 95.5928391,28.061674 93.9057081,27.8432843 L99.9372012,14.0931671 L94.4680851,-5.68434189e-14 L99.5313525,-5.68434189e-14 L102.593495,7.87421502 L105.874965,-5.68434189e-14 L110.999156,-5.68434189e-14 L105.06233,14.2806261 Z M90.4686475,-5.68434189e-14 L85.8749649,-5.68434189e-14 L85.8749649,27.2499766 C87.3746368,27.3437061 88.9371075,27.4055675 90.4686475,27.5930265 L90.4686475,-5.68434189e-14 Z M81.9055207,26.93692 C77.7186241,26.6557316 73.5307901,26.4064111 69.250164,26.3117443 L69.250164,-5.68434189e-14 L73.9366389,-5.68434189e-14 L73.9366389,21.8745899 C76.6248008,21.9373887 79.3120255,22.1557784 81.9055207,22.2804387 L81.9055207,26.93692 Z M64.2496954,10.6561065 L64.2496954,15.3435186 L57.8442216,15.3435186 L57.8442216,25.9996251 L53.2186709,25.9996251 L53.2186709,-5.68434189e-14 L66.3436123,-5.68434189e-14 L66.3436123,4.68741213 L57.8442216,4.68741213 L57.8442216,10.6561065 L64.2496954,10.6561065 Z M45.3435186,4.68741213 L45.3435186,26.2498828 C43.7810479,26.2498828 42.1876465,26.2498828 40.6561065,26.3117443 L40.6561065,4.68741213 L35.8121661,4.68741213 L35.8121661,-5.68434189e-14 L50.2183897,-5.68434189e-14 L50.2183897,4.68741213 L45.3435186,4.68741213 Z M30.749836,15.5928391 C28.687787,15.5928391 26.2498828,15.5928391 24.4999531,15.6875059 L24.4999531,22.6562939 C27.2499766,22.4678976 30,22.2495079 32.7809542,22.1557784 L32.7809542,26.6557316 L19.812541,27.6876933 L19.812541,-5.68434189e-14 L32.7809542,-5.68434189e-14 L32.7809542,4.68741213 L24.4999531,4.68741213 L24.4999531,10.9991564 C26.3126816,10.9991564 29.0936358,10.9054269 30.749836,10.9054269 L30.749836,15.5928391 Z M4.78114163,12.9684132 L4.78114163,29.3429562 C3.09401069,29.5313525 1.59340144,29.7497422 0,30 L0,-5.68434189e-14 L4.4690224,-5.68434189e-14 L10.562377,17.0315868 L10.562377,-5.68434189e-14 L15.2497891,-5.68434189e-14 L15.2497891,28.061674 C13.5935889,28.3437998 11.906458,28.4375293 10.1246602,28.6868498 L4.78114163,12.9684132 Z"></path>
          </g>
        </svg>
      </div>

      {/* Login Form */}
      <div className="bg-black w-full h-screen absolute z-0 opacity-45"></div>
      <img
        className="w-full h-screen object-cover absolute -z-[1]"
        src={BACKGROUND_IMAGE}
        alt="Background Image Login Screen"
      />
      <div className="flex justify-center items-center h-screen">
        <div className="mt-0 sm:mt-8 w-96 sm:w-[450px] h-fit py-12 px-10 sm:px-[68px] bg-[rgba(0,0,0,0.7)] rounded-[4px] z-10">
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
                ref={name}
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
                  email.current.value,
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
                    password.current.value,
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
