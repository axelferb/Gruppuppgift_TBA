function calculateSum(array) {
    var sum = array.reduce((a, b) => a + b, 0);
    return sum;
}

function calculateAverage(sum, arrayLength) {
    average = sum / arrayLength;
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
    for (i = 10; i > 0; i--) {
        var ratingPlaceHolder = document.getElementById('rating');
        var ratings = document.createElement("SPAN");
        var ratingSymbol = document.createTextNode('⬤');

        ratings.appendChild(ratingSymbol);
        ratings.addEventListener('click', vote.bind(this, votingValue, id, type));

        ratingPlaceHolder.appendChild(ratings);

        votingValue -= 1
    }
}