//ratingArray = [3, 4, 7, 10, 9, 3, 4, 5, 8]
/*fetchPlayList('5ac37c251c908334d07e95f9')
    .then((array) => {
        displayAverage(calculateAverage(calculateSum(array.ratings), array.ratings.length))
    });

function fetchPlayList(playlistId) {
    return fetch('https://folksa.ga/api/playlists/' + playlistId + '?key=flat_eric')
        .then((response) => response.json())

}
*/

function calculateSum(array) {
    var sum = array.reduce((a, b) => a + b, 0);
    return sum;
}

function calculateAverage(sum, arrayLength) {
    average = sum / arrayLength;
    console.log(average);
    return average;
}

function displayAverage(average) {
    var display = parseFloat(average.toFixed(1));
    return display;
}

function vote(ratingNumber, id, type) {
    fetch(`https://folksa.ga/api/${type}/${id}/vote?key=flat_eric`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                rating: ratingNumber
            })
        })
        .then((response) => response.json())
}

function createVoting(id, type) {
    votingValue = 10;
    //console.log(type)
    for (i = 10; i > 0; i--) {
        var mumma = document.getElementById('rating');
        var ratings = document.createElement("SPAN");
        var ratingSymbol = document.createTextNode('⬤');

        ratings.appendChild(ratingSymbol);
        ratings.addEventListener('click', vote.bind(this, votingValue, id, type));

        mumma.appendChild(ratings);

        votingValue -= 1

    }
}