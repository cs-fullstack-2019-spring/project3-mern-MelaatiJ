import React, { Component } from 'react';
import "./App.css";
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

                  <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                      <a className="navbar-brand" href="#">Express</a>
                      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                              aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                          <span className="navbar-toggler-icon"></span>
                      </button>
                      <div className="collapse navbar-collapse" id="navbarNav">
                          <ul className="navbar-nav">
                              <li className="nav-item active">
                                  <a className="nav-link"><Link to={"/"}>Home</Link> <span className="sr-only">(current)</span></a>
                              </li>
                              <li className="nav-item">
                                  <a className="nav-link"><Link to={"/profile"}>Profile</Link></a>
                              </li>
                              <li className="nav-item">
                                  <a className="nav-link" > <Link to={"/"} onClick={this.userLoggedOut}>LogOut</Link></a>
                              </li>

                          </ul>
                      </div>
                  </nav>


                {/*<Link to={"/"}>Home</Link>*/}
                {/*<Link to={"/profile"}>Profile</Link>*/}
                {/*<Link to={"/"} onClick={this.userLoggedOut}>LogOut</Link>*/}
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
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <a className="navbar-brand" href="#">Express</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item active">
                                <a className="nav-link"><Link to={"/"}>Home</Link><span className="white"></span></a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link"><Link to={"/register"}>SignUp</Link></a>
                            </li>

                        </ul>
                    </div>
                </nav>

              {/*<Link to={"/"}>Home</Link>*/}
              {/*<Link to={"/register"}>SignUp</Link>*/}

            </div>
            <Route path={"/"} exact component={()=> <ExpressHome username={this.state.username} signedIn={this.state.signedIn}
            userLogIn={this.userLogIn}/>}/>
            <Route path={"/register"} component={()=> <ExpressSignup userLogIn={this.userLogIn}/>}/>

          </Router>
      )

    }
  }
}

export default App;