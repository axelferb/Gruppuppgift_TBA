const songTitle = document.getElementById("songTitle");
const songArtist = document.getElementById("songArtist");
const songAlbum = document.getElementById("songAlbum");
const songGenre = document.getElementById("songGenre");
const songSubmit = document.getElementById("songSubmit");
// Fetch all artists.
function fetchArtists() {
    return fetch('https://folksa.ga/api/artists?sort=desc&limit=1000&key=flat_eric')
        .then((response) => response.json())
}
function loopArtists(artists) {
    console.log(artists);
    for (i = 0; i < artists.length; i++) {
        songArtist.innerHTML += `
        <option value="${artists[i]._id}" id="${artists[i]._id}">
            ${artists[i].name.toUpperCase()}
        </option>
        `
    }
}
fetchArtists()
    .then(loopArtists);

// Fetch all albums.
function fetchAlbums() {
    return fetch('https://folksa.ga/api/albums?sort=desc&limit=1000&key=flat_eric')
        .then((response) => response.json())
}
function loopAlbums(albums) {
    console.log(albums);
    for (i = 0; i < albums.length; i++) {
        songAlbum.innerHTML += `
        <option value="${albums[i]._id}" id="${albums[i]._id}">
            ${albums[i].title.toUpperCase()}
        </option >
        `
    }
}
fetchAlbums()
    .then(loopAlbums);
// What happens when you press "submit" on new song form.
function submitSongForm() {
    submitNewSong();
}
// Creates a new song to POST in API.
function submitNewSong() {
    let newSong = {
        title: songTitle.value,
        artists: songArtist.value,
        album: songAlbum.value,
        genres: songGenre.value,
    }

    fetch('https://folksa.ga/api/tracks?sort=desc&limit=1000&key=flat_eric', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newSong),
    })
        .then((response) => response.json())
        .then((newSong) => {
            console.log(newSong);
        });
}
// Submits new song.
songSubmit.addEventListener("click", function (e) {
    e.preventDefault();
    submitSongForm();
});

