import React from 'react';

class CurrentMovie extends React.Component {
    constructor (props){
        super(props);
        this.state = {onMovieAdd: props.onMovieAdd, currentMovie: props.currentMovie};
    }

    componentWillReceiveProps(nextProps) {
        this.setState( {currentMovie: nextProps.currentMovie});
    }


    render() {
        const borderStyle ={
            borderStyle: 'solid',
            paddingTop: '7px',
            paddingBottom: '10px',
            paddingRight: '15px',
            paddingLeft: '15px'



        };
        const buttonStyle = {
            marginTop: '7px',
            textAlign: 'center'
        }

        var AddButton = React.createClass({
            render: function() {
                return <button type="button" onClick={this.props.onClick}>Add Movie</button>
            },

            onClick () {
                alert("hello");
                this.props.onClick();
            }
        });
        return (
            <div style={borderStyle}>
                <h1>{this.state.currentMovie.title}</h1>
                <img src={"https://image.tmdb.org/t/p/w500".concat(this.state.currentMovie.posterPath)} height="144" width="92"/>
                <button style ={buttonStyle} type="button" onClick={this.props.onMovieAdd}>Add Movie</button>
            </div>
        );
    }

}





export default CurrentMovie;
