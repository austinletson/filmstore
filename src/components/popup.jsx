import React from 'react'
import MovieList from './movieList.jsx'
import CurrentMovie from './currentMovie.jsx'

class Popup extends React.Component {
    render(){
        const style = {
            display: 'flex',
            flexDirection: 'row'
        }
        return (
            <div style={style}>
                <MovieList/>
                <CurrentMovie/>
            </div>
        );
    }
}



export default Popup;
