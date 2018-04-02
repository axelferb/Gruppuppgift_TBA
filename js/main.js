// Fetches all albums.
fetch('https://folksa.ga/api/albums?key=flat_eric')
    .then((response) => response.json())
    .then((albums) => {
        View.displayAlbums(albums);
    });
// Only fetches 8 Albums to display on the main page.
fetch('https://folksa.ga/api/albums?limit=8&key=flat_eric')
    .then((response) => response.json())
    .then((albumsLimited) => {
        View.displayAlbumsLimited(albumsLimited);
    });
// Fetches playlist.
fetch('https://folksa.ga/api/playlists?key=flat_eric')
    .then((response) => response.json())
    .then((playlists) => {
        View.displayPlaylists(playlists);
        console.log(playlists);
    });
// Creates an Array to fill with artist names.
var array = []
// Fetches artistnames and puts them in the array created earlier.
function fetchSingleArtist(artistId) {
    fetch(`https://folksa.ga/api/artists/${artistId}?key=flat_eric`)
        .then((response) => response.json())
        .then((artists) => {
            array.push(artists.name)
        });
}
// Get time and make it in to ISO format
function getTime() {
    var date = new Date();
    var ISODate = date.toISOString();
    console.log(ISODate);
}
// What happens when you press "submit" on new artist form.
function submitArtistForm() {
    getTime();
}
console.log(array.length);
console.log(array)
function renderArtists(artistsId) {
    var artistName = artistsId
    console.log(artistName.name)
    return artistName
}

const View = {
    // Diplays the 8 latest albums on the main page.
    displayAlbumsLimited: function (albumsLimited) {
        var albumListElement = document.getElementById("listMain")
        var albumList = '';
        var artistName = "";

        for (i = 0; i < albumsLimited.length; i++) {
            artistName = fetchSingleArtist(albumsLimited[i].artists[0])

            console.log(artistName)
            latestAlbumWrapper.innerHTML += `
                <div class="latestAlbum">
                    <p> ${albumsLimited[i].title} </p>
                    <p> ${artistName} </p>
                </div>
            `
        }
    },
    // Diplays the playlists on the main page.
    displayPlaylists: function (playlists) {
        for (i = 0; i < playlists.length; i++) {
            playlistWrapper.innerHTML += `
                <div class="playlist">
                    <p> ${playlists[i].title} </p>
                </div>
            `
        }
    }
}
// New artist form.
document.getElementById("artistSubmit").addEventListener("click", submitArtistForm);
// Parallax and styling.
window.onscroll = function () {
    navbarShift();
    heroTextParallax();
    mainWrapperParallax();
    heroOpacity();
}

function navbarShift() {
    if (document.body.scrollTop > 520 || document.documentElement.scrollTop > 520) {
        document.getElementById('navbar').style.backgroundColor = "#000";
    } else {
        document.getElementById('navbar').style.backgroundColor = "transparent";
    }
}

function heroTextParallax() {
    const heroText = document.getElementById('heroText');
    const val = scrollY;
    heroText.style.transform = "translateY(" + val / 2 + "px)";
    if (val > 250) {
        heroText.style.transform = "translateY(125px)";
    }
}

function heroOpacity() {
    if (document.body.scrollTop > 340 || document.documentElement.scrollTop > 340) {
        document.getElementById('hero').style.backgroundColor = "#000";
        document.getElementById('heroText').style.opacity = "0";
    } else {
        document.getElementById('hero').style.backgroundColor = "#4e2791";
        document.getElementById('heroText').style.opacity = "1";
    }
}

function mainWrapperParallax() {
    if (document.body.scrollTop > 60 || document.documentElement.scrollTop > 60) {
        document.getElementById('mainWrapper').style.padding = "40px 20px";
    } else {
        document.getElementById('mainWrapper').style.padding = "240px 20px";
    }
}

function heroTextParallax() {
    const heroText = document.getElementById('heroText');
    const val = scrollY;
    heroText.style.transform = "translateY(" + val / 2 + "px)";
    if (val > 200) {
        heroText.style.transform = "translateY(100px)";
    }
}