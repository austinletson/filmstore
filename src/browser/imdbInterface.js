function checkUrlAndUpdate(){
    /** grabs url and checks it for imdb*/
    chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, checkUrl);
}



/** checks if user is on imdb and loads movie if they are*/
function checkUrl(tabs) {
    var imdbRegex = /http:\/\/www.imdb.com\/title/;
    var url = tabs[0].url;
    if (imdbRegex.exec(url)) {
        var movieId = url.substring(26, 35);
        (movieId);
    } else {
        // just fill the watchlist, no current movie
        loadMovie(-1);
    }

}
