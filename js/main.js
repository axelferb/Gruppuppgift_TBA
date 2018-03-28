fetch('https://folksa.ga/api/albums?key=flat_eric')
    .then((response) => response.json())
    .then((albums) => {
        view.displayAlbums(albums);
        console.log(albums);
    });

fetch('https://folksa.ga/api/playlists?key=flat_eric')
    .then((response) => response.json())
    .then((playlists) => {
        view.displayPlaylists(playlists);
        console.log(playlists);
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

    displayAlbums: function (albums) {

        var albumListElement = document.getElementById("listMain")
        var albumList = ''
        var artistName = ""


        for (i = 0; i < albums.length; i++) {
            artistName = fetchSingleArtist(albums[i].artists[0])

            console.log(artistName)
            latestAlbumWrapper.innerHTML +=

                `
                <div class="latestAlbum">
                <p> 
                ${albums[i].title}
                <br>
                ${artistName}
                </p>
                </div>
        `
        }
    },

    displayPlaylists: function (playlists) {
        for (i = 0; i < playlists.length; i++) {
            playlistWrapper.innerHTML +=

                `
                <div class="playlist">
                <p> 
                ${playlists[i].title}
                </p>
                </div>
        `
        }
    }
}

/*aids = "5aae2d13b9791d0344d8f717"

fetchSingleArtist(aids).then(artistName => {
    console.log(artistName)
    return artistName
});*/
