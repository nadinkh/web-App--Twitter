import React from 'react'

function NavBar() {
    return (
        <div className='navbar'>
            <h3 className="navbar__logo">Nadine's Blog</h3>
            <div className="navbar__links">
                <a href="#" className="navbar__link">Home</a>
                <a href="#" className="navbar__link">Profile</a>
            </div>
        </div>
    )
}

export default NavBar
