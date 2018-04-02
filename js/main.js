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

var array = [{ Name: "Kuken", }]

function fetchSingleArtist(artistId) {

    fetch(`https://folksa.ga/api/artists/${artistId}?key=flat_eric`)

        .then((response) => response.json())
        .then((artists) => {
            array.push(artists.name)
        });

}
console.log(array.length);
console.log(array)
function renderArtists(artistsId) {
    var artistName = artistsId
    console.log(artistName.name)
    return artistName
}

const view = {

    displayAlbums: function (albums) {

        var albumListElement = document.getElementById("listMain")
        var albumList = ''
        var artistName = ""


        for (i = 0; i < albums.length; i++) {
            artistName = fetchSingleArtist(albums[i].artists[0])
            latestAlbumWrapper.innerHTML +=

                `
                <div class="latestAlbum">
                <p> 
                ${albums[i].title}
                <br>
                ${array[i].Name}
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
