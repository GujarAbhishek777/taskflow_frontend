import React,{useState} from 'react';
import AuthLayout  from './AuthLayout';
import  SignIn  from './SignIn';
import  SignUp from './SignUp';

function Login() {
  const [isSignIn, setIsSignIn] = useState(true);

  const toggleForm = () => {
    setIsSignIn(!isSignIn);
  };

  return (
    <AuthLayout
      title={isSignIn ? "Welcome back" : "Create account"}
      subtitle={isSignIn ? "Sign in to your account" : "Sign up for a new account"}
    >
      {isSignIn ? (
        <SignIn onToggle={toggleForm} />
      ) : (
        <SignUp onToggle={toggleForm} />
      )}
    </AuthLayout>
  );
}

export default Login;