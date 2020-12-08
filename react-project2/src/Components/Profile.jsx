import React, { useState } from 'react'
import 'firebase/firestore'
import firebase from 'firebase/app'
import 'firebase/storage';
import 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../Firebase';
const Profile = ({ userName, setProfile }) => {

    const handleProfile = (event) => {
        event.preventDefault();
        setProfile(userName);
    }
    const handleUserName = (event) => {
        setProfile(event)
        firebase.auth().onAuthStateChanged(user => {
            user.updateProfile({
                displayName: userName
            })
        })

    }
    const [chooseFile, setChooseFile] = useState('')
    const [user] = useAuthState(auth);
    const handleChooseFile = async (event) => {
        await setChooseFile(event.target.files[0])
    }
    const submitPhoto = async (event) => {
        event.preventDefault()
        firebase.storage().ref('users/' + user.uid + '/profile.jpg').put(chooseFile) //promise
    }
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            firebase.storage().ref('users/' + user.uid + '/profile.jpg').getDownloadURL().then(imgURL => {
                user.updateProfile({
                    photoURL: imgURL
                })
            })
        }
    })
    return (
        <form className="profile-container">
            <div className="border-profile">
                <div className="container-input-profile">
                    <h1 >Profile</h1>
                    <label>Change user name</label>
                    <input className="user-name-input" type="text"
                        placeholder="Your Name"
                        value={userName}
                        onChange={e => handleUserName(e.target.value)}></input>
                </div>
                <div className="input-button-container">
                    <button className="profile-btn" onClick={handleProfile}> Save</button>
                </div>
                <h4>Upload profile picture</h4>
                <div className="flex-file">
                    <div className='upload'>
                        <div className="upload-text">Chose File</div>

                        <input name="upload" type="file" onChange={event => handleChooseFile(event)} />
                    </div>
                    <button className='submit-file' onClick={(event) => submitPhoto(event)}>Change profile Photo</button>
                </div>
            </div>
        </form >

    )
}


export default Profile

