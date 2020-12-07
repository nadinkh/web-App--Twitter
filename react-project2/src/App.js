// import logo from './logo.svg';
// import './App.css';
import React from 'react'
import Main from "./Components/Main";
import './sass/base.scss'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from './Firebase';
import { SignIn } from './register';
import { SignOut } from './register';
import { Register } from './register'

function App() {
  const [user] = useAuthState(auth);
  return (<>{user ? <Main user={user} SignOut={SignOut} /> : <Register />} </>)
}

export default App;
