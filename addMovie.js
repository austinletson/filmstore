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
        alert("No movie found, go to imdb");
    }

}

/** loads current movie */
function loadMovie(id) {
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


/** displays watchlist and current movie to popup.html */
function displayData(movies, currentMovie) {
    var poster = document.createElement("IMG");
    poster.setAttribute("src", "https://image.tmdb.org/t/p/w500".concat(currentMovie.imgId));
    poster.setAttribute("width", "91");
    poster.setAttribute("height", "143");

    document.getElementById("currentMovie").appendChild(poster);
    html = "";
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
