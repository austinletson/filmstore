import React from 'react'
import MovieList from './movieList.jsx'
import CurrentMovie from './currentMovie.jsx'

class Popup extends React.Component {
    constructor (props) {
        super(props);
        this.state = {currentMovie: {title: "googd"}, movies: [{title: "Dallas Buyers", posterPath: "/nxJFUxDRP9qQCiyD5sH24N5SCSu.jpg"},
                               {title: "Logan", posterPath: "/45Y1G5FEgttPAwjTYic6czC9xCn.jpg"}]};
        /** grabs url and checks it for imdb*/
        chrome.tabs.query({'active': true, 'lastFocusedWindow': true},
                          this.checkUrl.bind(this));
    }

    onMovieAdd() {
        this.setState({movies: this.state.movies.push(this.state.currentMovie)});
    }

    render(){

        const style = {
            display: 'flex',
            flexDirection: 'row'
        }
        return (
            <div style={style}>
                <MovieList movies ={this.state.movies}/>
                <CurrentMovie onMovieAdd ={this.onMovieAdd.bind(this)} currentMovie ={this.state.currentMovie}/>
            </div>
        );
    }

    /** checks if user is on imdb and loads movie if they are*/
    checkUrl(tabs) {
        var imdbRegex = /http:\/\/www.imdb.com\/title/;
        var url = tabs[0].url;
        if (imdbRegex.exec(url)) {
            var movieId = url.substring(26, 35);
            this.setState({
                movieId: movieId
            });
            this.loadMovie(movieId);
        } else {
            // just fill the watchlist, no current movie

        }

    }

    /** loads current movie */
    loadMovie(id) {
        var xhr = new XMLHttpRequest();
        var request = "https://api.themoviedb.org/3/movie/".concat(id, "?api_key=18da41385acb8a93f0771cebf418f8a9");

        xhr.open('GET', request,  true);
        xhr.send();
        xhr.addEventListener("readystatechange", processRequest.bind(this), false);

        xhr.onreadystatechange = processRequest.bind(this);

        var isDone = false;
        function processRequest(e) {
            if (xhr.readyState == 4 && xhr.status == 200 && isDone == false) {
                var response = JSON.parse(xhr.responseText);
                this.setState({ currentMovie: {
                    title: response.title,
                    releaseDate: response.release_date,
                    posterPath: response.poster_path
                }});
                isDone = true;
            }
        }

    }
}



export default Popup;
