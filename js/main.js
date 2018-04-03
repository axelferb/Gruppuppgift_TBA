// Fetches all albums.
fetch('https://folksa.ga/api/albums?key=flat_eric')
    .then((response) => response.json())
    .then((albums) => {
        View.displayAlbums(albums);
    });
// Only fetches 6 Albums to display on the main page.
fetch('https://folksa.ga/api/albums?limit=6&key=flat_eric')
    .then((response) => response.json())
    .then((albumsLimited) => {
        View.displayAlbumsLimited(albumsLimited);
    });
// Fetches playlist. Limited to 3.
fetch('https://folksa.ga/api/playlists?limit=3&key=flat_eric')
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
        var albumList = "";
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
// Parallax and styling.
function navbarShift() {
    if (document.body.scrollTop > 520 || document.documentElement.scrollTop > 520) {
        document.getElementById('navbar').style.backgroundColor = "#000";
    } else {
        document.getElementById('navbar').style.backgroundColor = "transparent";
    }
}

function heroTextParallax() {
    const heroText = document.getElementById('heroText');
    heroText.style.transform = "translateY(" + scrollY / 2 + "px)";
    if (scrollY > 200) {
        heroText.style.transform = "translateY(100px)";
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

window.onscroll = function () {
    navbarShift();
    heroTextParallax();
    heroOpacity();
}