import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';



class ExpressHome extends Component{
    constructor(props){
        super(props);
        this.state= {
            userData: [],
            allTweet: [],
            tweetMap: [],
            tweet: [],
            privateTweets:[]
        };
        this.tweetFetch()
    }

    submitLoginForm=(e)=>{
        // Prevents default behavior like reloading the page before the function is run
        e.preventDefault();
        // Fetches the '/login' route in the users.js group as a POST method
        fetch('/users/login',
            {
                method: 'POST',
                headers:{
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                // Creates a collection for username and password. Because a request can't send a collection, you have to make it a JSON string first
                // e.target is the information being sent from the form input fields by their names give in the input attributes. The value is what was typed.
                body: JSON.stringify({
                    username: e.target.username.value,
                    password: e.target.password.value,
                })
            })
                .then(data => data.text())

                .then(data =>{
                    if(data) {
                        this.props.userLogIn(data, true)
                    } else {
                        this.props.userLogIn(null, false);
                    }


            })

    };

    tweetFetch = () => {
        fetch("/users/tweets")
            .then(data => data.json())
            .then(returnedData => this.setState({userData :returnedData}))
            .then(()=> this.mapUserData())

    };

    mapUserData = () => {
        let mappedUsers = this.state.userData.map((eachUser) => {
            return(
                eachUser.tweets
            )
        });
        for(let i=mappedUsers.length-1; i>0; i--){
            let tweetMapping = mappedUsers[i].map((eachTweet) => {
                return(this.state.tweetMap.push(eachTweet))
            });
            this.setState({allTweet:tweetMapping})
        }
        this.allTweetMap()
    };

    allTweetMap = () => {
        let tweets = this.state.tweetMap.map((eachTweet) => {
            if (eachTweet.tweetVisible === true) {
                    return (
                        <div className="containerHomePage" key={eachTweet._id}>

                            <div className="container">

                                <div className="row">
                                    <div className="col-lg-6">
                                        <img className="img-responsive" width={250} height={250} src={eachTweet.tweetPic} alt="tweet"/>

                                    </div>
                                    <div className="col-lg-6">
                                        <p>{eachTweet.tweetMessage}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    )


            }
        });
            let privateTweets = this.state.tweetMap.map((eachTweet) => {
                return (
                    <div key={eachTweet._id}>
                        <p>{eachTweet.tweetMessage}</p>
                        <img src={eachTweet.tweetPic} alt="tweet"/>
                        <hr/>

                    </div>
                )
            });
            this.setState({tweetMap: tweets});
            this.setState({privateTweets: privateTweets});
        };

        render() {
                if (this.props.signedIn === true) {
                    return (
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12 text-center">

                                    <h3>Welcome to Express yourself</h3>

                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 text-center">
                                    {this.state.tweetMap}
                                    <img src={this.props.signedIn.profilePic} alt=""/>
                                    <h1>{this.props.signedIn.username}</h1>
                                </div>



                            </div>
                            {/*{this.state.tweetMap}*/}
                            {/*<img src={this.props.signedIn.profilePic} alt=""/>*/}
                            {/*<h1>{this.props.signedIn.username}</h1>*/}
                        </div>
                    );
                } else {

                    return (
                        <div className="containerHome">
                            <div className="container">
                                <div className="row">
                                    <div className="col-6">
                                        <ul className="list">
                                            <li>
                                                <h2>Connect With Friends</h2>
                                            </li>
                                            <li>
                                                <h2>Tell us how you feel</h2>
                                            </li>
                                            <li>
                                                <h2>Express Yourself</h2>
                                            </li>
                                        </ul>
                                    </div>

                                    <div className="col-6">
                                        <img width={256} height={256} src={"images/elephant.png"} alt=""/>
                                        <h2>See how everyone is feeling</h2><h2> in the world right now</h2>
                                        <h3>Express Login</h3>
                                        <form onSubmit={this.submitLoginForm}>
                                            <div>
                                                <label htmlFor={"username"}>Username:</label>
                                                <input type="text" id={"username"} name={"username"}/>
                                            </div>
                                            <div>
                                                <label htmlFor={"password"}>Password:</label>
                                                <input type="password" id={"password"} name={"password"}/>
                                            </div>
                                            <div>
                                                <input type="submit" value={"Login"}/>
                                            </div>

                                        </form>
                                    </div>

                                    {/*<h4>Public Post:</h4>*/}
                                    {/*<br/>*/}
                                    {/*{this.state.tweetMap}*/}
                                </div>
                            </div>
                        </div>
                    );

                }

            }
        }


export default ExpressHome;