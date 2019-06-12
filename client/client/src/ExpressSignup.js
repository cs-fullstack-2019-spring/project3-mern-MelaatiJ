import React, { Component } from 'react';

class ExpressSignup extends Component{
    constructor(props) {
        super(props);
        this.state = {
            notice:"",
            fromSubmit:false
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
            .then(this.setState({formSubmit:true}));
            // .catch((error) => console.log(error));

    };
    render(){
        if(this.state.formSubmit === false) {
            return (
                <div>
                    <h1>Join Now and Express Yourself</h1>
                    <form onSubmit={this.submitSignUpForm}>
                        <div>
                            <label htmlFor="{username}">Enter Username:</label>
                            <input id={"username"} type="text" name={"username"} autoFocus/>
                        </div>
                        <div>
                            <label htmlFor="{password}">Enter password:</label>
                            <input id={"password"} type="password" name="password" autoFocus/>
                        </div>
                        <div>
                            <label htmlFor="{backgroundPic}">Enter Background Picture URL:</label>
                            <input id={"backgroundPic"} type="text" name={"backgroundPic"} placeholder={"Enter URL"}
                                   autoFocus/>
                        </div>
                        <div>
                            <label htmlFor="{profilePic}">Enter Profile Picture URL:</label>
                            <input id={"profilePic"} type="text" name="profilePic" placeholder={"Enter URL"} autoFocus/>
                        </div>
                        <div>
                            <input type="submit" value={"register"}/>
                        </div>

                    </form>
                    {this.state.notice}
                </div>
            );
        }
    }
}

export default ExpressSignup;