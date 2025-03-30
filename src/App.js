import React, { useState } from 'react';
import { AuthLayout } from './components/AuthLayout';
import { SignIn } from './components/SignIn';
import { SignUp } from './components/SignUp';
import {Home} from './components/Home'



function App() {
  const [isSignIn, setIsSignIn] = useState(true);

  const toggleForm = () => {
    setIsSignIn(!isSignIn);
  };

  return (
    <Home/>
    // <AuthLayout
    //   title={isSignIn ? "Welcome back" : "Create account"}
    //   subtitle={isSignIn ? "Sign in to your account" : "Sign up for a new account"}
    // >
    //   {isSignIn ? (
    //     <SignIn onToggle={toggleForm} />
    //   ) : (
    //     <SignUp onToggle={toggleForm} />
    //   )}
    // </AuthLayout>
  );
}

export default App;