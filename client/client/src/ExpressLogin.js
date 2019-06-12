import React, {Component} from 'react';
import ExpressHome from "./ExpressHome";

class ExpressLogin extends Component {

    constructor(props) {
        super(props);
        this.state = {
            message: ''
        };
    }

    signInSubmit = (e) => {
        e.preventDefault();
        fetch('/users/login', {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: e.target.username.value,
                password: e.target.password.value,
            })
        })
            .then((data) => data.text())
            .then((data) => {
                if (data) {
                    this.props.userLogIn(data, true)
                } else {
                    this.props.userLogIn(null, false);
                }
            })
    };



    render() {
        if(this.props.signedIn === false){
            return (
                <div>
                    <h4 className='signinHead'>Sign In</h4>
                    <form className='signinForm' onSubmit={this.signInSubmit}>
                        <label htmlFor={'username'}>Username: </label>
                        <input type="text" id={'username'} name={'username'}/>
                        <br/>
                        <label htmlFor={'password'}>Password: </label>
                        <input type="password" id={'password'} name={'password'}/>
                        <br/>
                        <button>Sign In</button>
                    </form>
                </div>
            );}
        else {
            return (
                <div>
                    <h1>You're In!</h1>
                </div>
            )
        }
    }
}

export default ExpressLogin;
