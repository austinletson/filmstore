import React from 'react';

class CurrentMovie extends React.Component {
    constructor (props){
        super(props);
        this.state = {movieId: null};
        /** grabs url and checks it for imdb*/
        chrome.tabs.query({'active': true, 'lastFocusedWindow': true},
                          this.checkUrl.bind(this));
    }

    render() {
        const borderStyle ={
            borderStyle: 'solid',
            paddingTop: '7px',
            paddingBottom: '10px',
            paddingRight: '15px',
            paddingLeft: '15px'



        };
        const titleStyle = {
            fontSize: '16px',
            textAlign: 'center'

        }
        return (
            <div style={borderStyle}>

                <h1 style = {titleStyle}>{this.state.title}</h1>
                <img src={"https://image.tmdb.org/t/p/w500".concat(this.state.posterPath)} height="144" width="92"/>
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
                this.setState({
                    title: response.title,
                    releaseDate: response.release_date,
                    posterPath: response.poster_path
                });
                isDone = true;
            }
        }

    }


}





export default CurrentMovie;
