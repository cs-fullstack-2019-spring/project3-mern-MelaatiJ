import React, { Component } from 'react';

class TwitterLogin extends Component{
    constructor(props){
        super(props);
        this.state={
            data:[],
        }
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
                }),
            })
            .then(data=>data.text())

            .then(data =>{
                if(data)
                    return this.props.userLoggedIn(data, true);
                else

                    return this.props.userLoggedIn(null, false);
        });

    };



    render() {
        if (this.props.signedIn === true) {
            return (
                <div>
                    <img src={this.props.signedIn.profilePic} alt=""/>
                    <h1>{this.props.signedIn.username}</h1>
                </div>
            );
        } else {

            return (
                <div>
                    <h1>TwitterLogin</h1>
                    <form onSubmit={this.submitLoginForm}>
                        <p>
                            <label htmlFor={"username"}>Username:</label>
                            <input type="text" id={"username"} name={"username"}/>
                        </p>
                        <p>
                            <label htmlFor={"password"}>Password:</label>
                            <input type="password" id={"password"} name={"password"}/>
                        </p>
                        <p>
                            <input type="submit" value={"Login"}/>
                        </p>

                    </form>
                    {this.state.data}
                </div>
            );
        }
    }
}


export default TwitterLogin;