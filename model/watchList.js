var movies = [{title: "logan", year: "2017"}, {title: "split", year: "2016"}];

chrome.storage.local.set({"movies": movies}, function (){

});

function addMovie(title, year) {
    chrome.storage.local.get("movies", function(items){

        items.movies.push({title: title, year: year});
        chrome.storage.local.set({"movies": items.movies}, function(){});
    });

}

function getMovies() {
    return movies;
}

function updateMovieList() {
    chrome.storage.local.get("movies", function(items){
        moviesFromStorage = items["movies"];
        var output = [];
        for (var i = 0; i < moviesFromStorage.length; i++) {
            output.push(moviesFromStorage[i]["title"]);
        }
        displayData(output);

    });
}
