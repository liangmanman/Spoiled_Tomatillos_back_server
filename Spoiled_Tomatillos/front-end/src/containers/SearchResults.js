import * as React from 'react';
import NavBar from "../components/NavBar";
import { omdb_axios } from '../api/_axios';
import { OMDB_API_KEY } from '../constants';
import _ from 'lodash';

class SearchResults extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            results: [],
            query: null
        };
    };

    componentDidMount() {
        const searchContent = "test";
        const url = OMDB_API_KEY + searchContent;
        omdb_axios.get(url)
            .then((response) => {
                let movies = response.data.Search;
                movies = _.uniqBy(movies, function (m) {
                    return m.imdbID;
                });
                this.setState({results: movies});
                console.log(this.state.results);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        return (
            <div>
                <NavBar/>
                <h2>Results</h2>
                <div className="result-list">
                    {this.state.results.map((result) => {
                        return <div className="row Card" key={result.imdbID}>
                            <div className="col-sm-4">
                                <img className="img-fluid" alt="Responsive image" src={result.Poster} />
                            </div>
                            <div className="col-sm-8 card-right card-title">
                                <h5>Title: {result.Title}</h5>
                                <p>Year: {result.Year}</p>
                            </div>
                        </div>
                    })}
                </div>
            </div>
        );
    }
}

export default SearchResults;
