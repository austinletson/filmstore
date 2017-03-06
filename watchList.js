//dummy data
var movies = [{title: "logan", year: "2017"}, {title: "split", year: "2016"}];

//set up storage with dummy data
chrome.storage.sync.set({"movies": movies}, function (){});

//current movie
var currentMovie = {};

/** adds movie to watchlist in storage */
function addMovie(title, year, imgId) {
    chrome.storage.sync.get("movies", function(items){

        currentMovie = {title: title, year: year, imgId: imgId};
        items.movies.push(currentMovie);
        chrome.storage.sync.set({"movies": items.movies}, function(){});
        updateMovieList();
    });

}

/** updates the popup with watchlist and current movies*/
function updateMovieList() {
    chrome.storage.sync.get("movies", function(items){
        moviesFromStorage = items["movies"];
        var output = [];
        for (var i = 0; i < moviesFromStorage.length; i++) {
            output.push(moviesFromStorage[i]["title"]);
        }
        displayData(output, currentMovie);

    });
}
