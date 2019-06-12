import React, { Component } from 'react';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';
import ExpressEdit from "./ExpressEdit";
import AddTweet from "./AddTweet";


class ExpressProfile extends Component{
    constructor(props){
        super(props);
        this.state = {
            userData:"",
            userPost:[],
            formSubmit:false
        };
        this.userFetch();
    }

    userFetch = () => {
        if(this.props.signedIn === true){
            fetch("/users/")
        }
    };
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