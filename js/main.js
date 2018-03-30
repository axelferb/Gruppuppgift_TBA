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
    mainWrapperEffect();
    heroOpacity();
}

function navbarOpacity() {
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
    if(val > 250) {
        heroText.style.transform = "translateY(125px)";
    }
}

function heroOpacity() {
    if (document.body.scrollTop > 340 || document.documentElement.scrollTop > 340) {
        document.getElementById('hero').style.backgroundColor = "#000";
        document.getElementById('heroText').style.opacity = "0";
    } else {
        document.getElementById('hero').style.backgroundColor= "#4e2791";
        document.getElementById('heroText').style.opacity = "1";
    }
}

function mainWrapperEffect() {
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
    if(val > 200) {
        heroText.style.transform = "translateY(100px)";
    }
}

/*aids = "5aae2d13b9791d0344d8f717"

// fetchSingleArtist(aids).then(artistName => {
//     console.log(artistName)
//     return artistName
// });*/