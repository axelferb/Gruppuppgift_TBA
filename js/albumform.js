const albumTitle = document.getElementById("albumTitle");
const albumArtist = document.getElementById("albumArtist");
const albumRelease = document.getElementById("albumRelease");
const albumGenre = document.getElementById("albumGenre");
const albumSpotifyUrl = document.getElementById("albumSpotifyUrl");
const albumImgLink = document.getElementById("albumImgLink");
const albumSubmit = document.getElementById("albumSubmit");
// Fetch all artists.
function fetchArtists() {
    return fetch('https://folksa.ga/api/artists?sort=desc&limit=1000&key=flat_eric')
        .then((response) => response.json())
}
function loopArtists(artists) {
    console.log(artists);
    for (i = 0; i < artists.length; i++) {
        albumArtist.innerHTML += `
        <option value="${artists[i]._id}" id="${artists[i]._id}">
            ${artists[i].name.toUpperCase()}
        </option>
        `
    }
}
fetchArtists()
    .then(loopArtists);

// What happens when you press "submit" on new album form.
function submitAlbumForm() {
    submitNewAlbum();
}
// Creates a new Album to POST in API.
function submitNewAlbum() {
    let newAlbum = {
        title: albumTitle.value,
        artists: albumArtist.value,
        releaseDate: albumRelease.value,
        genres: albumGenre.value,
        spotifyURL: albumSpotifyUrl.value,
        coverImage: albumImgLink.value,
    }

    fetch('https://folksa.ga/api/albums?key=flat_eric', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newAlbum),
    })
        .then((response) => response.json())
        .then((newAlbum) => {
            console.log(newAlbum);
        });
}
// Submits new Album.
AlbumSubmit.addEventListener("click", function (e) {
    e.preventDefault();
    submitAlbumForm();
});

