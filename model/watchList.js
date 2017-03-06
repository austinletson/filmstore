var movies = [{title: "logan", year: "2017"}, {title: "split", year: "2016"}];

//chrome.storage.sync.set({"movies": movies}, function (){

//});

function addMovie(title, year) {
    chrome.storage.sync.get("movies", function(items){

        items.movies.push({title: title, year: year});
        chrome.storage.sync.set({"movies": items.movies}, function(){});
        updateMovieList();
    });

}

function getMovies() {
    return movies;
}

function updateMovieList() {
    chrome.storage.sync.get("movies", function(items){
        moviesFromStorage = items["movies"];
        var output = [];
        for (var i = 0; i < moviesFromStorage.length; i++) {
            output.push(moviesFromStorage[i]["title"]);
        }
        displayData(output);

    });
}
