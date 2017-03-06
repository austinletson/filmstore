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


    function processRequest(e) {
        if (xhr.readyState == 4 && xhr.status == 200 && isDone == false) {
            var response = JSON.parse(xhr.responseText);
            addMovie(response.title, response.release_date, response.poster_path);
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
        // adding newline might not work
        html += "<li>" + movies[i] + "</li>\n";
    }
    watchlist.innerHTML = html;
}
