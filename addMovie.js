var dom = "dom is not here yet";

chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, checkUrl)


function checkUrl(tabs) {
    url = tabs[0].url;
    if (url.indexOf("imdb") != -1){
        loadMovie();
    } else {
        alert("No movie found, go to imdb");
    }

}

function loadMovie() {
    alert("Loading movie");
    chrome.runtime.onMessage.addListener(function(request, sender) {
        if (request.action == "getSource") {
            html = request.source;
            firstChar = html.indexOf("<title>");
            // get title and year of movie
            title = html.substring(firstChar + 6, html.indexOf(" - IMDb", firstChar) - 6);
            year = html.substring(firstChar + title.length + 7, firstChar + title.length + 11);
        }
    });
    
    
}

function getOMDb(title, year) {
    var xhr = new XMLHttpRequest();
    var request = "http://www.omdbapi.com/?t=".concat(title, "&y=", year)
    xhr.open('GET', request,  true);
    xhr.send();
    xhr.addEventListener("readystatechange", processRequest, false);

    xhr.onreadystatechange = processRequest;

    function processRequest(e) {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var response = JSON.parse(xhr.responseText);
            message.innerText = response.Title;
        }
    }
}



function onWindowLoad() {
    var message = document.querySelector('#message');

    chrome.tabs.executeScript(null, {
        file: "getPagesSource.js"
    }, function() {
        // If you try and inject into an extensions page or the webstore/NTP you'll get an error
        if (chrome.runtime.lastError) {
            message.innerText = 'There was an error injecting script : \n' + chrome.runtime.lastError.message;
        }
    });

}

window.onload = onWindowLoad;
