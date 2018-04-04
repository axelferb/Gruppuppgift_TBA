ratingArray = [3, 4, 7, 10, 9, 3, 4, 5, 8]

function calculateSum(array) {
    var sum = array.reduce((a, b) => a + b, 0);
    //console.log(sum)
    return sum
}


function calculateAverage(sum, arraylength) {
    average = sum / arraylength
    //console.log(average)
    return average;
}


function displayAverage(average) {

    var display = average.toFixed(1)

    console.log(display)
}

displayAverage(calculateAverage(calculateSum(ratingArray), ratingArray.length))
