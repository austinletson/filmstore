//dummy data
var movies = [{title: "logan", year: "2017", imgId: "/45Y1G5FEgttPAwjTYic6czC9xCn.jpg"}, {title: "split", year: "2016", imgId: "/rXMWOZiCt6eMX22jWuTOSdQ98bY.jpg"}];

//set up storage with dummy data
chrome.storage.sync.set({"movies": movies}, function (){});

//current movie
var currentMovie = {};


function setCurrentMovie(title, year, imgId){
    currentMovie = {title: title, year: year, imgId: imgId};
}

/** adds movie to watchlist in storage */
function addMovie() {
    chrome.storage.sync.get("movies", function(items){

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
            output.push(moviesFromStorage[i]);
        }
        displayData(output, currentMovie);

    });
}
