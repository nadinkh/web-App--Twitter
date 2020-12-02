import React, { useState, useEffect } from 'react'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import NavBar from './NavBar'
import Profile from './Profile'
import TweetForm from './TweetForm'
import TweetResults from './TweetResults'

const Main = () => {
    const [results, setTweets] = useState([])
    const [userName, setProfile] = useState('')
    const URL = "https://micro-blogging-dot-full-stack-course-services.ew.r.appspot.com/tweet"

    const dataRecieve = async (newTweets) => {
        const response = await fetch(URL, {
            method: "POST",
            body: JSON.stringify(newTweets),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) Error("error");
        const data = await response.json();
        console.log(data)
    }
    useEffect(() => {
        const getTweets = async () => {
            showLoader()
            const response = await fetch(URL);
            const data = await response.json();
            setTweets(data.tweets);
            if (data) {
                hideLoader()
            }
        };
        getTweets();
    }, []);

    const addTweet = (text) => {
        const newTweets = {}
        newTweets.content = text;
        newTweets.date = new Date().toISOString()
        newTweets.userName = userName
        dataRecieve(newTweets)
        showLoader();
        setTimeout(() => {
            setTweets([newTweets, ...results])
            // console.log(results)
            hideLoader();
        }, 1000)
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

                <Route exact path="/">

                    <NavBar />
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
