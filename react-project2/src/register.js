import { auth } from './Firebase';
import 'firebase/firestore'
import { provider } from './Firebase'
import React, { useState, useEffect } from 'react'
import { Route, BrowserRouter as Router, Switch, Link, useHistory } from 'react-router-dom'

const SignIn = () => {
    const [emailExist, setEmailExist] = useState('')
    const [passwordExist, setPasswordExist] = useState('')
    const history = useHistory()
    const handleEmailExist = event => {
        setEmailExist(event.target.value)
    }
    const handlePasswordExist = event => {
        setPasswordExist(event.target.value)
    }
    const signInWithGoogle = () => {
        auth.signInWithPopup(provider);
    }
    const login = () => {
        auth.signInWithEmailAndPassword(emailExist, passwordExist)
        history.push('/')
    }
    return (
        <div className="login-container">
            <div className="login-container-border">
                <input className="login-email" onChange={event => handleEmailExist(event)} type="email" placeholder="youremail@email.com" />
                <input className="login-password" onChange={event => handlePasswordExist(event)} type="password" placeholder="Enter your password" required />
                <button className="login-button" onClick={login} type="button" >LogIn</button>
                <button className="google-signin-button" onClick={signInWithGoogle}>Sign in with Google </button>
                <Link className="signup-link" to="/signup" >Sign Up</Link>
            </div>
        </div>

    )
}
const SignUpForm = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [userName, setUserName] = useState('')
    const history = useHistory()

    const handleEmail = event => {
        setEmail(event.target.value)
    }
    const handleUserName = event => {
        setUserName(event.target.value)
    }
    const handlePassword = event => {
        setPassword(event.target.value)
    }
    const signup = (email, password) => {
        auth.createUserWithEmailAndPassword(email, password)
            .then((results) => {
                return results.user.updateProfile({
                    displayName: userName
                })

            })
        history.push('/')
    }
    return (
        <div className="signup-container">
            <div className="signup-border">
                <h3>Create an Account</h3>
                <input className="User-Name-signup" onChange={event => handleUserName(event)} type="text" placeholder="User Name" />
                <input className="email" onChange={event => handleEmail(event)} type="email" placeholder="someone@email.com" />
                <input className="password" onChange={event => handlePassword(event)} type="password" placeholder="Enter a password" required />
                <button className="signup-button" onClick={() => signup(email, password)}>Sign Up</button>
            </div>
        </div>
    )
}

export const Register = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" >
                    <SignIn />
                </Route>
            </Switch>
            <Switch>
                <Route path="/signup" >
                    <SignUpForm />
                </Route>
            </Switch>
        </Router>
    )
}

export const SignOut = () => {
    return auth.currentUser && (
        <button onClick={() => auth.signOut()}>Sign out</button>
    )
}