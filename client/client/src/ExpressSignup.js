import React, { Component } from 'react';

class ExpressSignup extends Component{
    constructor(props) {
        super(props);
        this.state = {
            notice:"",
        };
    }

    submitSignUpForm = (e) => {
        e.preventDefault();
        fetch("/users/register",
            {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },

            body: JSON.stringify({
                username: e.target.username.value,
                password: e.target.password.value,
                backgroundPic: e.target.backgroundPic.value,
                profilePic: e.target.profilePic.value,
            })
        })
            .then(data => data.text())
            .then(response => this.setState({notice:response}))
            .catch((error) => console.log(error));

    };
    render(){
        return(
            <div>
                <h1>TwitterHome</h1>
                <h1>Signup</h1>
                <form onSubmit={this.submitSignUpForm}>
                    <p>
                        <label htmlFor="{username}">Enter Username:</label>
                        <input id={"username"} type="text" name="username" placeholder={"Enter Username"} autoFocus/>
                    </p>
                    <p>
                        <label htmlFor="{password}">Enter password:</label>
                        <input id={"password"} type="password" name="password" placeholder={"Enter password"} autoFocus/>
                    </p>
                    <p>
                        <label htmlFor="{backgroundPic}">Enter Background Picture:</label>
                        <input id={"backgroundPic"} type="text" name="backgroundPic" placeholder={"Enter URL"} autoFocus/>
                    </p>
                    <p>
                        <label htmlFor="{profilePic}">Enter Profile Picture:</label>
                        <input id={"profilePic"} type="text" name="profilePic" placeholder={"Enter URL"} autoFocus/>
                    </p>
                    <p>
                        <input type="submit" value={"register"}/>
                    </p>

                </form>
                {this.state.notice}
            </div>
        );
    }
}

export default ExpressSignup;