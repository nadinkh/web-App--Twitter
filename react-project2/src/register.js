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
        <div>
            <div>
                <input onChange={event => handleEmailExist(event)} type="email" placeholder="someone@email.com" />
            </div>
            <div>
                <input onChange={event => handlePasswordExist(event)} type="password" placeholder="Enter a password" required />
            </div>
            <div>
                <button onClick={login} type="button" >LogIn</button>
            </div>
            <button onClick={signInWithGoogle}>Sign in with Google </button>
        </div>

    )
}
const SignUpForm = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    // const [userName, setUserName] = useState('')

    const handleEmail = event => {
        setEmail(event.target.value)
    }
    const handlePassword = event => {
        setPassword(event.target.value)
    }
    const signup = (email, password) => {
        auth.createUserWithEmailAndPassword(email, password)

    }

    return (
        <div>
            <div>
                <h3>Create an Account!!</h3>
            </div>
            <div>
                <input onChange={event => handleEmail(event)} type="email" placeholder="someone@email.com" />
            </div>
            <div>
                <input onChange={event => handlePassword(event)} type="password" placeholder="Enter a password" required />
            </div>
            {/* <div>
                <h4>Password Confirmation</h4>
                <input type="password" placeholder="Confirm password" required />
            </div> */}

            <div>
                <button onClick={signup(email, password)}>Sign Up</button>
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
                    <Link to="/signup" >Sign Up</Link>
                    {/* <button onClick={chagePage}>Sign Up</button> */}
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