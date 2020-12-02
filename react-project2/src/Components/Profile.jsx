import React from 'react'

const Profile = ({ userName, setProfile }) => {

    const handleProfile = (event) => {
        event.preventDefault();
        setProfile(userName);
    }
    const handleUserName = (event) => {
        setProfile(event)

    }
    return (
        <div>
            <h1>Profile</h1>
            <span>User Name</span>
            <div className='profile' onSubmit={handleProfile}>
                <form className="form__profile">
                    <textarea
                        className="form__profile-input" placeholder="Your Name"
                        value={userName}
                        onChange={e => handleUserName(e.target.value)}></textarea>
                    <button
                        className="form__profile-btn"
                        type="submit">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Profile
