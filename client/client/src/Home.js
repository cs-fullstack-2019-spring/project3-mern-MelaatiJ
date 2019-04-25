import React, { Component } from 'react';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';
import TwitterHome from "./TwitterHome";
import TwitterSignup from "./TwitterSignup";
import TwitterProfile from "./TwitterProfile";
import TwitterLogout from "./TwitterLogout";
import TwitterLogin from "./TwitterLogin";
import AddTweet from "./AddTweet";


class Home extends Component{
    constructor(props) {
        super(props);
        this.state={
            username:null,
            signedIn:false,
            tweets:[],
        }
    }

    componentDidMount() {
        this.userExisting();
    }

    userExisting(){
        fetch("/users")
            .then(data=>{
                return data.text();
            })
            .then(response => {
                if (response) {
                    this.setState(
                        {
                            userLogInfo: {username: response, signedIn: true,}
                        });
                } else {
                    this.setState(
                        {username: null, signedIn: false,});
                }
            });



    }

    userLoggedIn = (username, signedIn) => {
        this.setState({username:username, signedIn:signedIn});
    };

    userLoggedOut = ()=> {
        this.setState({username:null, signedIn:false});
    };

    render(){
        return(
            <div>
                <Router>
                    <Link to={"/"}>Home</Link>
                    <Link to={"/signUp"}>Sign Up</Link>
                    <Link to={"/profile"}>Profile</Link>
                    <Link to={"/login"}>Login</Link>
                    <Link to={"/logout"} onClick={this.userLoggedOut}>LogOut</Link>
                    <Link to={"/addTweet"}>Add Tweet</Link>


                    <Route path={"/"} exact component={() => <TwitterHome username={this.state.username} signedIn={this.state.signedIn} userLoggedIn={this.userLoggedIn}/>}/>
                    <Route path={"/signUp"} component={() => <TwitterSignup userLoggedIn={this.userLoggedIn}/>}/>
                    <Route path={"/profile"} component={() => <TwitterProfile username={this.state.username} signedIn={this.state.signedIn} userLoggedIn={this.userLoggedIn}/>}/>
                    <Route path={"/login"} component={() => <TwitterLogin userLoggedIn={this.userLoggedIn} signedIn={this.state.signedIn}/>}/>
                    <Route path={"/logout"} component={() => <TwitterLogout/>}/>
                    <Route path={"/addTweet"} component={() => <AddTweet/>}/>
                </Router>
            </div>
        );
    }
}

export default Home;