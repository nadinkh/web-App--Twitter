import React from 'react'
// import { Link } from 'react-router-dom'
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'

function NavBar() {
    return (
        <Router>
            <div className='navbar'>
                <h3 className="navbar__logo">Nadine's Blog</h3>
                <div className="navbar__links">
                    <Link to="/Home" className="navbar__link">Home</Link>
                    <Link to="/profile" className="navbar__link">Profile</Link>
                </div>
                <div>

                </div>
            </div>
        </Router>
    )
}

export default NavBar
