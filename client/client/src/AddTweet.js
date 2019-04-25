import React, { Component } from 'react';

class AddTweet extends Component{


    render(){
        return(
            <div>

                <h1>Add Tweet</h1>
                <form>
                    <p>
                        <label htmlFor="{tweetMessage}">Tweet Message:</label>
                        <input id={"tweetMessage"} type="text" name="tweetMessage" placeholder={"Tweet Away"} autoFocus/>
                    </p>
                    <p>
                        <label htmlFor="{tweetPic}">Tweet Picture:</label>
                        <input id={"tweetPic"} type="" name="tweetPic" placeholder={"Enter URL"} autoFocus/>
                    </p>

                    <p>
                        <input type="submit" value={"Add Tweet"}/>
                    </p>

                </form>
            </div>
        );
    }
}

export default AddTweet;