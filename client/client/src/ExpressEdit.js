import React, { Component } from 'react';

class ExpressEdit extends Component{
    constructor(props) {
        super(props);
        this.state = {
            expressFormEdit :"",
        };
    }

    editForm = (e) => {
        e.preventDefault();
        fetch('/users/editTweet/', {
            method :'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type":"application/json"
            },

            body: JSON.stringify(
                {
                    username:this.props.username,
                    tweetMessage:e.target.tweetMessage.value,
                    tweetPic:e.target.tweetPic.value,

                }
            ),
        })
            .then(data => data.text())
            .then(response=>this.setState({expressFormEdit:response}))
    };

    render(){
        return(
            <div>
                <h1>Edit Expression</h1>
                <form onSubmit={this.editForm}>
                    <div>
                        <label htmlFor={"tweetMessage"}>Express it!:</label>
                        <input type="text" id={"tweetMessage"} defaultValue={this.props.tweetMessage}/>
                    </div>
                    <div>
                        <label htmlFor={"tweetPic"}>Tweet Image URL:</label>
                        <input type="text" id={"tweetPic"} defaultValue={this.props.tweetPic} name={"tweetPic"}/>
                    </div>
                    {/*<div>*/}
                    {/*    <label htmlFor={"tweetVisible"}>Public?:</label>*/}
                    {/*    <input type="checkbox" name={"tweetVisible"} defaultChecked={this.props.tweetVisible}/>*/}
                    {/*</div>*/}
                    <div>
                        <input type="submit" value={"edit Tweet"}/>
                    </div>
                </form>
            </div>
        );

    }
}

export default ExpressEdit;