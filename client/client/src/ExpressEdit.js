import React, { Component } from 'react';

class ExpressEdit extends Component{
    constructor(props) {
        super(props);
        this.state = {
            expressForm :true
        }
    }

    editForm = (e) => {
        e.preventDefault();
        fetch('/users/edit/', {
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
            .then(()=>console.log("EXpress update complete"))
            .then(()=>this.setState({expressForm:false}))
    };

    render(){
        if(this.state.editForm === true){
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
                    <div>
                        <input type="submit" value={"edit Tweet"}/>
                    </div>
                </form>
            </div>
        );
        }
        else{
            return(
                <div>
                    <h1>Express Update</h1>
                </div>
            )
        }
    }
}

export default ExpressEdit;