import React, { Component } from 'react';
import AddTweet from "./AddTweet";
class ExpressProfile extends Component{
    render(){
        return(
            <div>
                <h1>Profile</h1>
                <AddTweet/>
            </div>
        );
    }
}

export default ExpressProfile;