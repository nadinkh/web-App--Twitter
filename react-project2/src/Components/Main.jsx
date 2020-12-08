import React, { useState, useEffect } from 'react'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import NavBar from './NavBar'
import Profile from './Profile'
import TweetForm from './TweetForm'
import TweetResults from './TweetResults'
import fb from '../Firebase'
import { firestore } from '../Firebase'
import 'firebase/firestore'
import 'firebase/auth';
const Main = ({ SignOut, user }) => {
    // const [results, setTweets] = useState([])
    const [results, setTweets] = useState([])
    const [userName, setProfile] = useState('')


    useEffect(() => {
        let newArray = [];
        const getTweets = async () => {
            await fb.firestore().collection('tweets').orderBy('date', 'desc').get()
                .then(((singleTweet) => {
                    singleTweet.forEach((element) => {
                        newArray.push(element.data())
                        // console.log(element.data())
                    })

                }))
            showLoader()
            setTweets(newArray);
            if (newArray) {
                hideLoader()
            }
        };
        getTweets();
    }, []);

    const addTweet = (text) => {
        const newTweets = {}
        newTweets.content = text;
        newTweets.date = new Date().toISOString()
        newTweets.userName = user.displayName
        newTweets.photoURL = user.photoURL
        showLoader();
        setTimeout(() => {
            setTweets([newTweets, ...results])
            hideLoader();
        }, 1000)

        fb.firestore().collection("tweets").add(newTweets)
            .then(function (docRef) {
                console.log("Document written with ID: ", docRef.id);
            })
        // .catch(function (error) {
        //     console.error("Error adding document: ", error);
        // });

    }
    const PageLoader = () => {
        return (
            <div className="loader">Loading...</div> //change CSS
        )
    }
    const [loading, setLoading] = useState(false)
    const usePageLoader = () => {
        return [
            loading ? PageLoader() : null,
            () => setLoading(true),
            () => setLoading(false)
        ]

    }
    const [loader, showLoader, hideLoader] = usePageLoader()

    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <NavBar />
                    <SignOut SignOut={SignOut} />
                    <TweetForm addTweet={addTweet} loader={loader} />
                    {loader}
                    <div className="tweets">
                        {results.map((tweet, index) => (
                            <TweetResults
                                key={index}
                                tweet={tweet}
                            />
                        ))}

                    </div>
                </Route>
                <Route path="/profile">
                    <NavBar />
                    <Profile userName={userName} setProfile={setProfile} />
                </Route>
            </Switch>
        </Router>
    )
}

export default Main
