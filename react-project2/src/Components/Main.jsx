import React, { useState, useEffect } from 'react'
import NavBar from './NavBar'
import TweetForm from './TweetForm'
import TweetResults from './TweetResults'


const Main = () => {
    const [results, setTweets] = useState([])
    //local storage
    useEffect(() => {
        const results = JSON.parse(localStorage.getItem("results"));
        if (results) {
            setTweets(results);
        }
    }, []);
    useEffect(() => {
        localStorage.setItem("results", JSON.stringify(results));
    }, [results]);


    const addTweet = (text) => {
        const newTweets = {}
        newTweets.text = text;
        newTweets.date = new Date().toDateString()
        newTweets.userName = 'Nadine'
        setTweets([...results, newTweets])
        console.log(results)
    }

    return (
        <div>
            <NavBar />
            <TweetForm addTweet={addTweet} />
            <div className="tweets">
                {results.map((tweet, index) => (
                    <TweetResults
                        key={index}
                        tweet={tweet}
                    />
                ))}

            </div>
        </div>
    )
}

export default Main
