import React, {Component} from 'react';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';
import ExpressEdit from "./ExpressEdit";

class ExpressProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userData:'',
            userPost:[],
            formSubmit: false
        };
        this.userFetch();
    }

    userFetch = () => {
        if(this.props.signedIn === true){
            fetch('/users/searchUsers',{
                method:'POST',
                headers:{
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username:this.props.username,
                })
            })
                .then(data=>data.json())
                .then(returnedData => this.setState({userData:returnedData}))
                .then(()=> this.mapTweet())
        }
        else{
            console.log('User must login')
        }
    };

    mapTweet = () => {
        if (this.state.userData.tweets) {
            let tweetMap = this.state.userData.tweets.map((eachTweet) => {
                return (
                    <Router>
                        <div key={eachTweet._id}>
                            <p>{eachTweet.tweetMessage}</p>
                            <img src={eachTweet.tweetPic} alt="Tweet image"/>
                            <Link to={'/editTweet'}>Edit</Link>
                            <hr/>
                        </div>
                        <Route path={'/editTweet'}
                               component={()=> <ExpressEdit/>}/>
                    </Router>
                )
            });
            this.setState({userPost:tweetMap})
        }
    };

    TweetPostSubmit = (e) => {
        e.preventDefault();
        fetch('/users/addTweet', {
            method:'POST',
            headers:{
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username:this.props.username,
                tweetMessage:e.target.tweetMessage.value,
                tweetPic:e.target.tweetPic.value,
                tweetVisible:e.target.tweetVisible.checked,
            })
        })
            .then(data => data.text())
            .then(response => this.setState({resData: response}))
            .then(this.setState({formSubmit: true}));
    };

    confirmPost = (e) => {
        e.preventDefault();
        this.setState({formSubmit:false})
    };

    render() {
        if (this.props.signedIn === true && this.state.formSubmit === false ) {
            return (
                <div className="App">
                    <h1>{this.props.username}</h1>
                    <div>
                        <div>
                            <img src={this.state.userData.profilePic} />
                            <img src={this.state.userData.backgroundPic}/>
                        </div>
                        <div>
                            <h2>Express It!</h2>
                            <form onSubmit={this.TweetPostSubmit}>
                                <div>
                                    <label htmlFor={"tweetMessage"}>Express Yourself: </label>
                                    <input type="text" id={"tweetMessage"} name={"tweetMessage"}/>
                                </div>
                                <div>
                                    <label htmlFor={"tweetPic"}>Add a pic image URL: </label>
                                    <input type="text" id={"tweetPic"} name={"tweetPic"}/>
                                </div>
                                <div>
                                    <label htmlFor={"tweetVisible"}>Public?: </label>
                                    <input type="checkbox" name={"tweetVisible"}/>
                                </div>
                                <div>
                                    <input type="submit" value={'add Tweet'}/>
                                </div>
                            </form>
                        </div>
                        <div>
                            <h4>Tweets</h4>
                            {this.state.userPost}
                        </div>
                    </div>
                </div>
            );
        }
        if (this.state.formSubmit === true){
            return (
                <div>
                    <h1>
                        {this.state.resData}
                    </h1>
                    <button onClick={this.confirmPost}>OK</button>

                </div>
            )
        }
        else{
            return (
                <div className="App">
                    <h3>Please Log In</h3>
                </div>
            )
        }
    }
}
export default ExpressProfile;
