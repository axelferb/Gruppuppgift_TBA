fetch('https://folksa.ga/api/albums?key=flat_eric')
    .then((response) => response.json())
    .then((albums) => {
        view.display(albums);
        console.log(albums);
    });

function fetchSingleArtist(artistId) {

    fetch(`https://folksa.ga/api/artists/${artistId}?key=flat_eric`)

        .then((response) => response.json())
        .then((artists) => {

            var artistName = artists.name
            return artistName;
        });
}

const view = {

    display: function (albums) {

        var albumListElement = document.getElementById("listMain")
        var albumList = ''
        var artistName = ""
        

        for (i = 0; i < albums.length; i++) {
            artistName = fetchSingleArtist(albums[i].artists[0])
            
            console.log(artistName)

            albumList +=

                `
                <p> 
                ${albums[i].title} 
                ${artistName}
                </p>
        `
        }

        albumListElement.innerHTML = albumList;

    }
}

/*aids = "5aae2d13b9791d0344d8f717"

fetchSingleArtist(aids).then(artistName => {
    console.log(artistName)
    return artistName
});*/
