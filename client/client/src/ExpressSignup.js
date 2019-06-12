
import React, { Component } from 'react';

class ExpressSignup extends Component{
    constructor(props) {
        super(props);
        this.state={
            notice:'',
            formSubmit:false
        };
    }
    // tweets:[{tweetPic:String, tweetMessage:String, tweetVisible:Boolean }]

    submitSignupForm=(e)=>{
        e.preventDefault();
        fetch('/users/register',
            {
                method: 'POST',
                headers:{
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: e.target.username.value,
                    password: e.target.password.value,
                    profilePic: e.target.profilePic.value,
                    backgroundPic: e.target.backgroundPic.value,
                }),
            })
            .then(data => data.text())
            .then(response => this.setState({data: response}))
            .then(this.setState({formSubmit: true}));
    };

    render(){
        if (this.state.formSubmit === false){
            return(
                <div>
                    <h1>Express Yourself</h1>
                    <form onSubmit={this.submitSignupForm}>
                        <label htmlFor={'username'}>Username: </label>
                        <input type="text" id={'username'} name={'username'}/>
                        <br/>
                        <label htmlFor={'password'}>Password: </label>
                        <input type="password" id={'password'} name={'password'}/>
                        <br/>
                        <label htmlFor={'profilePic'}>Profile Pic: </label>
                        <input type="text" id={'profilePic'} name={'profilePic'}/>
                        <br/>
                        <label htmlFor={'backgroundPic'}>Background Pic: </label>
                        <input type="text" id={'backgroundPic'} name={'backgroundPic'}/>
                        <br/>

                        <input type="submit" value={'Submit'}/>
                    </form>



                </div>

            );}
        else {
            return (
                <div>
                    <h1>
                        {this.state.notice}
                    </h1>
                </div>
            );
        }
    }}



export default ExpressSignup;