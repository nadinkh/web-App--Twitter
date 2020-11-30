import React from 'react'

const TweetResults = ({ tweet }) => {


    return (
        <div className="tweet">
            <div className="tweet__container">
                <div className="tweet__container-top">
                    <h3 className="tweet__container-top--date">{tweet.userName}</h3>
                    <span className="tweet__container-top--date">{tweet.date}</span>
                </div>
                <div className="tweet__container-bottom">
                    <p className="tweet__container-bottom--text">
                        {tweet.text}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default TweetResults
