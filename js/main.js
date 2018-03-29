fetch('https://folksa.ga/api/albums?key=flat_eric')
    .then((response) => response.json())
    .then((albums) => {
        View.displayAlbums(albums);
        console.log(albums);
    });

fetch('https://folksa.ga/api/playlists?key=flat_eric')
    .then((response) => response.json())
    .then((playlists) => {
        View.displayPlaylists(playlists);
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

const View = {
    displayAlbums: function (albums) {
        var albumListElement = document.getElementById("listMain")
        var albumList = '';
        var artistName = "";

        for (i = 0; i < albums.length; i++) {
            artistName = fetchSingleArtist(albums[i].artists[0])

            console.log(artistName)
            latestAlbumWrapper.innerHTML +=`
                <div class="latestAlbum">
                    <p> ${albums[i].title} </p>
                    <p> ${artistName} </p>
                </div>
            `
        }
    },

    displayPlaylists: function (playlists) {
        for (i = 0; i < playlists.length; i++) {
            playlistWrapper.innerHTML +=`
                <div class="playlist">
                    <p> ${playlists[i].title} </p>
                </div>
            `
        }
    }
}

window.onscroll = function() {
    navbarOpacity();
    heroTextParallax();
}

function navbarOpacity() {
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        document.getElementById('navbar').style.backgroundColor = "transparent";
        document.getElementById('searchBar').style.display = "none";
        document.getElementById('navbarLogo').style.filter = "invert(100%)";
    } else {
        document.getElementById('navbar').style.backgroundColor = "#000000";
        document.getElementById('searchBar').style.display = "block";
        document.getElementById('navbarLogo').style.filter = "invert(0%)";
    }
}

function heroTextParallax() {
    const heroText = document.getElementById('heroText');
    const val = scrollY;
    heroText.style.transform = "translateY(" + val / 2 + "px)";
    if(val > 200) {
        heroText.style.transform = "translateY(100px)";
    }
}

// aids = "5aae2d13b9791d0344d8f717"

// fetchSingleArtist(aids).then(artistName => {
//     console.log(artistName)
//     return artistName
// });