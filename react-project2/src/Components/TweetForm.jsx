import React, { useState } from 'react'


const TweetForm = ({ addTweet }) => {
    const [tweet, setTweet] = useState()
    const [message, setMessage] = useState(false)

    const handleSubmit = event => {
        event.preventDefault();
        addTweet(tweet)
        setTweet('')
    }
    const handleTweet = event => {
        if (event.length >= 140) {
            setMessage(true)
        } else {
            setMessage(false)
            setTweet(event)
        }

    }

    const alertText = (
        <div className="form__container--alert">
            Tweet can't exceed 140 characters!
        </div>
    )



    return (
        <div className='form' onSubmit={handleSubmit}>
            <form className="form__container">
                <textarea
                    className="form__container-input" placeholder=" What you have in mind..."
                    onChange={e => handleTweet(e.target.value)}></textarea>
                <button type="submit">Tweet</button>
                {message && alertText}
                {/* if its more than 140 the text will show  */}
            </form>
        </div>
    )
}

export default TweetForm
