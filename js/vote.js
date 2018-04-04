//ratingArray = [3, 4, 7, 10, 9, 3, 4, 5, 8]

function fetchPlayList(playlistId) {
    return fetch('https://folksa.ga/api/playlists/' + playlistId + '?key=flat_eric')
        .then((response) => response.json())

}

function calculateSum(array) {
    var sum = array.reduce((a, b) => a + b, 0);
    console.log(sum)
    return sum
}


function calculateAverage(sum, arrayLength) {
    average = sum / arrayLength
    console.log(average)
    return average;
}


function displayAverage(average) {
    var display = average.toFixed(1)
    document.getElementById('currentRating').innerHTML = "Rating: " + display;
    
    console.log(display)
}


fetchPlayList('5ac37c251c908334d07e95f9')
   .then((array) => {
    displayAverage( calculateAverage( calculateSum(array.ratings), array.ratings.length))  
});

function votePlaylist(id, ratingNumber) {
    fetch(`https://folksa.ga/api/playlists/5aae312ee3534b03981f6521/vote`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ rating: 9 });
    })
    .then((response) => response.json())
    .then((playlist) => {
        console.log(playlist);
    });
}

