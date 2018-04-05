var playlistSongSelect = document.getElementsByClassName("playlistSongSelect")[0];
const addSongSelect = document.getElementById("addSongSelect");
const songSelectorDiv = document.getElementById("songSelectorDiv");
function addNewSongselect() {
    songSelectorDiv.innerHTML += `

        <select name="SongSelect" class="playlistSongSelect">
        </select>
            `
    console.log("kukfitta");
}

addSongSelect.addEventListener("click", addNewSongselect);
// Fetch all tracks.
function fetchTracks() {
    return fetch('https://folksa.ga/api/tracks?sort=desc&limit=1000&key=flat_eric')
        .then((response) => response.json())
}
function loopTracks(tracks) {
    console.log(tracks);
    for (i = 0; i < tracks.length; i++) {
        playlistSongSelect.innerHTML = `
            <option value="${tracks[i]._id}" id="${tracks[i]._id}">
                ${tracks[i].title.toUpperCase()}
            </option >
        `
    }
    console.log("kuken");
}
fetchTracks()
    .then(loopTracks);
