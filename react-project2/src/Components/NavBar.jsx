import React from 'react'
// import { Link } from 'react-router-dom'
import { BrowserRouter as Router, Link, NavLink, Route, Switch } from 'react-router-dom'
import Profile from './Profile'
import TweetForm from './TweetForm'

function NavBar() {
    return (
        <div className='navbar'>
            <div className="navbar__links">
                <NavLink
                    to="/"
                    className="navbar__link"
                    exact className="navbar__link active">
                    Home
                </NavLink>
                <NavLink
                    to="/Profile"
                    className="navbar__link"
                    exact className="navbar__link active">
                    Profile
                </NavLink>
            </div>
        </div>
    )
}

export default NavBar
