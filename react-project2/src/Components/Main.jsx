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

    // const { results, setTweets } = useContext(TweetContextResults)
    // const URL = "https://micro-blogging-dot-full-stack-course-services.ew.r.appspot.com/tweet"

    // const dataRecieve = async (newTweets) => {
    //     const response = await fetch(URL, {
    //         method: "POST",
    //         body: JSON.stringify(newTweets),
    //         headers: {
    //             Accept: "application/json",
    //             "Content-Type": "application/json",
    //         },
    //     });
    //     if (!response.ok) Error("error");
    //     const data = await response.json();
    //     console.log(data)
    // }

    useEffect(() => {
        let newArray = [];
        const getTweets = async () => {
            await fb.firestore().collection('tweets').orderBy('date', 'desc').onSnapshot((singleTweet) => {
                singleTweet.forEach((element) => {
                    newArray.push(element.data())
                    // console.log(element.data())
                })

            })
            // console.log(newArray)
            showLoader()
            // const response = await fetch(URL);
            // const data = await response.json();
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
        // dataRecieve(newTweets)
        // showLoader();
        // setTimeout(() => {
        setTweets([newTweets, ...results])
        //     // console.log(results)
        //     hideLoader();
        // }, 1000)
        fb.firestore().collection("tweets").add(newTweets)
            .then(function (docRef) {
                console.log("Document written with ID: ", docRef.id);
            })
        // .catch(function (error) {
        //     console.error("Error adding document: ", error);
        // });


    }
    // console.log(results)
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
                {/* <TweetContextResults.Provider value={{ results, setTweets }}> */}
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
                {/* </TweetContextResults.Provider> */}
            </Switch>
        </Router>
    )
}

export default Main
