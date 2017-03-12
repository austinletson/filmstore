/** grabs url and checks it for imdb*/
chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, checkUrl);

/** checks if user is on imdb and loads movie if they are*/
function checkUrl(tabs) {
    var imdbRegex = /http:\/\/www.imdb.com\/title/;
    var url = tabs[0].url;
    if (imdbRegex.exec(url)) {
        var movieId = url.substring(26, 35);
        loadMovie(movieId);
    } else {
        // just fill the watchlist, no current movie
        loadMovie(-1);
    }

}

/** loads current movie */
function loadMovie(id) {
    
    if (id != -1) {
        var xhr = new XMLHttpRequest();
        var request = "https://api.themoviedb.org/3/movie/".concat(id, "?api_key=18da41385acb8a93f0771cebf418f8a9");
        
        xhr.open('GET', request,  true);
        xhr.send();
        xhr.addEventListener("readystatechange", processRequest, false);

        xhr.onreadystatechange = processRequest;

        var isDone = false;
        function processRequest(e) {
            if (xhr.readyState == 4 && xhr.status == 200 && isDone == false) {
                var response = JSON.parse(xhr.responseText);
                setCurrentMovie(response.title, response.release_date, response.poster_path);
                updateMovieList();
                isDone = true;
            }
        }
    }
    else {
        displayData(movies, -1);
    }
}


/** displays watchlist and current movie to popup.html */
function displayData(movies, currentMovie) {
    
    clearData();
    
    if (currentMovie != -1) { populateCurrentMovie(currentMovie); }
    else { showLogo(); }
    populateWatchlist(movies);
}

function clearData() {
    // clear out the current watchlist and movie data
    // should be temporary until we decide on a framework
    var myNode = document.getElementById("watchlist");
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }
    
    var myNode = document.getElementById("currentMovie");
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }
}

function populateWatchlist(movies) {
    for (i = 0; i < movies.length; i++) {
        // chop off the month and day of the release date
        // the year field is now a misnomer, consider renaming to release date
        id = "movie" + i;
        innerId = id + "innerList";
        innerAPosterId = id + "innerAPoster";
        innerATextId = id + "innerAText";
        posterLIId = id + "poster";
        textLIId = id + "text";
        var poster = document.createElement("IMG");
        var listItem = document.createElement("LI");
        var innerList = document.createElement("UL");
        var innerAPoster = document.createElement("A");
        var innerAText = document.createElement("A");
        var posterLI = document.createElement("LI");
        var textLI = document.createElement("LI");
        var text = document.createElement("P");

        listItem.setAttribute("id", id);
        document.getElementById("watchlist").appendChild(listItem);

        innerList.setAttribute("class", "innerList");
        innerList.setAttribute("id", innerId);
        document.getElementById(id).appendChild(innerList);

        posterLI.setAttribute("id", posterLIId);
        posterLI.setAttribute("class", "innerListE");
        document.getElementById(innerId).appendChild(posterLI);

        innerAPoster.setAttribute("id", innerAPosterId);
        document.getElementById(posterLIId).appendChild(innerAPoster);

        textLI.setAttribute("id", textLIId);
        textLI.setAttribute("class", "innerListE");
        document.getElementById(innerId).appendChild(textLI);

        innerAText.setAttribute("id", innerATextId);
        innerAText.setAttribute("class", "center");
        document.getElementById(textLIId).appendChild(innerAText);

        poster.setAttribute("src", "https://image.tmdb.org/t/p/w500".concat(movies[i].imgId));
        poster.setAttribute("width", "46");
        poster.setAttribute("height", "72");
        document.getElementById(innerAPosterId).appendChild(poster);

        text.innerText = movies[i].title + " - " + movies[i].year.substring(0,4);
        document.getElementById(innerATextId).appendChild(text);
    }
}

function populateCurrentMovie (currentMovie) {
    var poster = document.createElement("IMG");
    poster.setAttribute("src", "https://image.tmdb.org/t/p/w500".concat(currentMovie.imgId));
    poster.setAttribute("width", "91");
    poster.setAttribute("height", "143");

    document.getElementById("currentMovie").appendChild(poster);
}

function showLogo() {
    document.getElementById("addButton").style.display = "none";
    document.getElementById("header2").innerHTML = "IMDb";
    
    var link = document.createElement("A");
    link.setAttribute("href", "http://www.imdb.com");
    link.setAttribute("id", "logoLink");
    link.setAttribute("target", "_blank");
    var logo = document.createElement("IMG");
    logo.setAttribute("src", "http://ia.media-imdb.com/images/M/MV5BMTczNjM0NDY0Ml5BMl5BcG5nXkFtZTgwMTk1MzQ2OTE@._V1_.png");
    logo.setAttribute("width", "100px");
    logo.setAttribute("margin-left", "50px");
    document.getElementById("currentMovie").appendChild(link);
    document.getElementById("logoLink").appendChild(logo);
}

window.onload = function onLoad() {
    document.getElementById("addButton").addEventListener("click", addMovie);
}
