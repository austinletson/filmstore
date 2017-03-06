var movies = [{title: "logan", year: "2017"}, {title: "split", year: "2016"}];

chrome.storage.local.set({"movies": movies}, function (){

});

function addMovie(title, year) {
    movies.push({title: title, year: year});

    //chrome.storage.local.set()
}

function getMovies() {
    return movies;
}

var moviesFromStorage = [];
function updateMovieList() {
    chrome.storage.local.get("movies", function(items){
        moviesFromStorage = items["movies"];
        for (var i = 0; i < moviesFromStorage.length; i++) {
            output = output.concat(JSON.stringify(moviesFromStorage[i]), "....");
        }
        message.innerText = output;

    });
}
