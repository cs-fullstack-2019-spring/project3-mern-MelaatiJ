import React, { Component } from 'react';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';
import ExpressHome from "./ExpressHome";
import ExpressSignup from "./ExpressSignup";
import ExpressProfile from "./ExpressProfile";
import ExpressLogout from "./ExpressLogout";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      signedIn: false,
    }
  }


  userLogIn = (username, signedIn) => {
    this.setState({username:username, signedIn:signedIn})
  };

  userLoggedOut = () => {
    this.setState({username: null, signedIn: false});
  };

  render() {
    if (this.state.username) {
      return (
            <Router>
              <div>
                <h1 className="appName">Express </h1>

                <Link to={"/"}>Home</Link>
                <Link to={"/profile"}>Profile</Link>
                <Link to={"/"} onClick={this.userLoggedOut}>LogOut</Link>
                {/*<Link to={"/addTweet"}>Add Tweet</Link>*/}
              </div>

              <Route path={"/"} exact component={() => <ExpressHome username={this.state.username} signedIn={this.state.signedIn}
                                                   userLogIn={this.userLogIn}/>}/>
              <Route path={"/profile"} component={() => <ExpressProfile username={this.state.username} signedIn={this.state.signedIn}
                                                   userLogIn={this.userLogIn}/>}/>
              <Route path={"/logout"} component={() => <ExpressLogout/>}/>
              {/*<Route path={"/addTweet"} component={() => <AddTweet/>}/>*/}
            </Router>
      );
    }
    else{
      return(
          <Router>
            <div>
              <h1 className="appName">Express</h1>
              <Link to={"/"}>Home</Link>
              <Link to={"/signUp"}>SignUp</Link>

            </div>
            <Route path={"/"} exact component={()=> <ExpressHome username={this.state.username} signedIn={this.state.signedIn}/>}/>
            <Route path={"/signUp"} component={()=> <ExpressSignup userLogIn={this.userLogIn}/>}/>

          </Router>
      )

    }
  }
}

export default App;