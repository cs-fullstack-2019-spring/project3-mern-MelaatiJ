import React, { Component } from 'react';
import "./App.css";
import {BrowserRouter as Router, Link, Route, Redirect} from 'react-router-dom';
import ExpressHome from "./ExpressHome";
import ExpressSignup from "./ExpressSignup";
import ExpressProfile from "./ExpressProfile";
import ExpressLogout from "./ExpressLogout";
import Search from "./Search";




class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      signedIn: false,
        search:false,
    }
  }


  userLogIn = (username, signedIn) => {
    this.setState({username:username, signedIn:signedIn})
  };

  userLoggedOut = () => {
    this.setState({username: null, signedIn: false});
  };

    searchForm = (e) => {
        e.preventDefault();
        fetch('/users/search/', {
            method :'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type":"application/json"
            },

            body: JSON.stringify(
                {
                    search:e.target.search.value,

                }
            ),
        })
            .then(data => data.json())
            .then(response=>this.setState({search:response}))
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

                                  {/*<a className="nav-link"> <Link to={"/logout"} onClick={this.userLoggedOut}>LogOut</Link></a>*/}

                                  <a className="nav-link" > <Link to={"/"} onClick={this.userLoggedOut}>LogOut</Link></a>

                              </li>

                          </ul>
                          <form method="POST" onSubmit={this.searchForm} className="form-inline my-2 my-lg-0">
                              <input className="form-control mr-sm-2" type="text" placeholder="Search"
                                     aria-label="Search" name={"search"}/>
                                  <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                          </form>
                      </div>

                  </nav>


                {/*<Link to={"/"}>Home</Link>*/}
                {/*<Link to={"/profile"}>Profile</Link>*/}
                {/*<Link to={"/"} onClick={this.userLoggedOut}>LogOut</Link>*/}
                {/*<Link to={"/addTweet"}>Add Tweet</Link>*/}
              </div>

              <Route path={"/"} exact component={() => <ExpressHome search={this.state.search} username={this.state.username} signedIn={this.state.signedIn}
                                                                    userLogIn={this.userLogIn}/>}/>
              <Route path={"/profile"} component={() => <ExpressProfile search={this.state.search} username={this.state.username} signedIn={this.state.signedIn}
                                                   userLogIn={this.userLogIn}/>}/>
              <Route path={"/logout"} component={() => <ExpressLogout/>}/>
              <Route path={"/search"} component={()=> <Search search={this.state.search}/>} />
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
                        <form method="POST" onSubmit={this.searchForm} className="form-inline my-2 my-lg-0">
                            <input className="form-control mr-sm-2" type="text" placeholder="Search"
                                   aria-label="Search" name={"search"}/>
                            <button className="btn btn-primary" type="submit">Search</button>
                        </form>
                    </div>
                </nav>

              {/*<Link to={"/"}>Home</Link>*/}
              {/*<Link to={"/register"}>SignUp</Link>*/}

            </div>
            <Route path={"/"} exact component={()=> <ExpressHome search={this.state.search} username={this.state.username} signedIn={this.state.signedIn}
            userLogIn={this.userLogIn}/>}/>
            <Route path={"/register"} component={()=> <ExpressSignup search={this.state.search} userLogIn={this.userLogIn}/>}/>
            <Route path={"/search"} component={()=><Search search={this.state.search}/>} />

          </Router>
      )

    }
  }
}

export default App;