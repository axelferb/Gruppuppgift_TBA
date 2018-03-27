
    fetch('https://folksa.ga/api/albums?key=flat_eric')
    .then((response) => response.json())
    .then((albums) => {
        view.display(albums);
        console.log(albums);
    });




const view = {

    display: function (albums) {

        var albumListElement = document.getElementById("listMain")
        var albumList = ''

        for (i = 0; i < albums.length; i++) {
            albumList += 
                `
                <p> 
                ${albums[i].title}
                </p>
                `
        }
        albumListElement.innerHTML = albumList;
    }
}