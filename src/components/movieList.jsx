import React from 'react';
import ReactDOM from 'react-dom';
import ReactListView from 'react-list-view';

class MovieList extends React.Component {

    constructor (props) {
        super(props);
        this.state = {movies: [{title: "Dallas Buyers", posterPath: "/nxJFUxDRP9qQCiyD5sH24N5SCSu.jpg"}]}
    }

    render() {
        return (
            <ReactListView
                style={{
                    height: 400,
                    width: 300
                }}
                rowCount={this.state.movies.length}
                rowHeight={20}
                renderItem={(x, y, style) =>
                    <div style={style}>
                               <MovieListElement movie={this.state.movies[0]} />
                    </div>
                }
            />
        );
    }

}

class MovieListElement extends React.Component {
    render () {
        const style = {
            display: 'flex',
            flexDirection: 'row'
        }
        return (
            <div style ={style}>
                <img src={"https://image.tmdb.org/t/p/w500".concat(this.props.movie.posterPath)} height="108" width="69"/>
                <h1>{this.props.movie.title}</h1>

            </div>
        )
    }
}




export default MovieList;
