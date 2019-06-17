import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';


class Search extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchResults:[],
            mappedResults:[],
        };
    }

    searchForm = (e) =>{
        e.preventDefault();
        fetch('/users/search', {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                search: e.target.search.value,
            })
        })
            .then((data) => data.json())
            .then((data) => {
                if (data) {
                    this.setState({searchResults:data});
                    this.mapResults()
                } else {
                    this.setState({searchResults:null});
                }
            })

    };

    //map search results
    mapResults = () => {
        let mappedResults = this.state.searchResults.map((eachTweet)=> {
            if(eachTweet.tweetPic){
                return(
                    <div className="containerHomePage" key={eachTweet._id}>

                        <div className="container">

                            <div className="row">
                                <div className="col-lg-6">
                                    <img className="img-responsive" width={250} height={250} src={eachTweet.tweetPic} alt="tweet"/>

                                </div>
                                <div className="col-lg-6">
                                    <p>{eachTweet.tweetMessage}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
            else{
                return(
                    <div>
                        <div>
                            <div>
                                <div>
                                    <h5>{eachTweet.tweetMessage}</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        });
        this.setState({mappedResults:mappedResults})
    };

    clearResults = () => {
        this.setState({mappedResults:null})
    };

    render() {
        return (
            <div className="App">
                <div>
                    <form className={'formStyle'} onSubmit={this.searchForm}>
                        <label htmlFor={'search'}>Search: </label>
                        <input type="text" name={'search'} placeholder={'Search'}/>
                        <input type="submit" value={'search'}/>
                    </form>
                </div>
                <button onClick={this.clearResults}>Clear Results</button>
                <br/>
                <div>
                    {this.state.mappedResults}
                </div>

            </div>
        );
    }
}

export default Search;