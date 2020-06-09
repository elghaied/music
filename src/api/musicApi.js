const URL = 'musicbrainz.org/ws/2/';
const urlCover = 'coverartarchive.org/'





function mainSearch(filter,input,offset,callback) {
    const request = new XMLHttpRequest();
    request.open('GET', `https://${URL}recording?query=*%20AND%20${encodeURIComponent(filter)}%3A%22${input}%22&limit=100&offset=${offset}&fmt=json`, true);
    request.addEventListener('readystatechange', function() {
        if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
            callback(JSON.parse(request.responseText));
        }
    });
    request.send();
}

function trackInfo(id, callback) {
    const request = new XMLHttpRequest();
    request.open('GET', 'https://' + URL + 'recording/'+(id)+"?inc=genres+ratings+artists+releases&fmt=json", true);
    request.addEventListener('readystatechange', function() {
        if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
            callback(JSON.parse(request.responseText));
        }
    });
    request.send();
}

function getCover(id, callback) {
    const request = new XMLHttpRequest();
    request.open('GET', 'https://' + urlCover + 'release/'+(id), false);
    request.addEventListener('readystatechange', function() {
        if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
            callback(JSON.parse(request.responseText));
        }else if(request.status!==200){
            callback({
                errorCode: request.status
            });

        }
    });
    request.send();
}

export  {mainSearch,trackInfo,getCover};