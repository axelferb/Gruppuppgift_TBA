// Fetches all albums.
/*fetch('https://folksa.ga/api/albums?key=flat_eric')
    .then((response) => response.json())
    .then((albums) => {
        View.displayAlbums(albums);
    });     
*/    

// Only fetches 6 Albums to display on the main page.
fetch('https://folksa.ga/api/albums?limit=6&sort=desc&key=flat_eric&populateArtists=true')
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

// Fetches artists, limited to 9
fetch('https://folksa.ga/api/artists?limit=9&sort=desc&key=flat_eric')
    .then((response) => response.json())
    .then((artists) => {
        artist = artists;
        console.log(artist);
        View.displayArtists(artist);
    });

const View = {
    // Diplays the 6 latest albums on the main page.
    displayAlbumsLimited: function (albumsLimited) {
        var albumListElement = document.getElementById("listMain")
        var albumList = "";

        for (i = 0; i < albumsLimited.length; i++) {
            if(albumsLimited[i].coverImage === "") {
                latestAlbumWrapper.innerHTML += `
                    <div class="latestAlbum">
                        <img src="images/noimage.jpg" />
                        <div class="albumInfo">
                            <h4> ${albumsLimited[i].title} </h4>
                            <h4> (${albumsLimited[i].releaseDate}) </h4>
                            <p> ${albumsLimited[i].artists[0].name} </p>
                            <p id="spotifyLink">
                                <a href="${albumsLimited[i].spotifyURL}" target="_blank">Listen on Spotify</a>
                            </p>
                        </div>
                    </div>
                `
            } else {
                latestAlbumWrapper.innerHTML += `
                    <div class="latestAlbum">
                        <img src="${albumsLimited[i].coverImage}" />
                        <div class="albumInfo">
                            <h4> ${albumsLimited[i].title} </h4>
                            <h4> (${albumsLimited[i].releaseDate}) </h4>
                            <p> ${albumsLimited[i].artists[0].name} </p>
                            <p id="spotifyLink">
                                <a href="${albumsLimited[i].spotifyURL}" target="_blank">Listen on Spotify</a>
                            </p>
                        </div>
                    </div>
                `
            }
            
        }
        latestAlbumWrapper
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
    },
    // Display artists
    displayArtists: function (artist) {
        for (i = 0; i < artist.length; i++) {
            artistWrapper.innerHTML += `
                <div class="artist">
                    <img src="${artist[i].coverImage}" />
                    <div class="artistInfo">
                        <h4> ${artist[i].name} </h4>
                        <h4>(${artist[i].genres[0]}) </h4>
                        <p> <a href="${artist[i].spotifyURL}" target="_blank">Listen on Spotify</a> </p>
                    </div>
                </div>
            `
        }   
    }
}
// Parallax and styling.
function navbarShift() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById('navbar').style.backgroundColor = "#000";
        document.getElementById('addDropDownContent').style.backgroundColor = "#000";
        document.getElementById('browseDropDownContent').style.backgroundColor = "#000";
    } else {
        document.getElementById('navbar').style.backgroundColor = "transparent";
        document.getElementById('addDropDownContent').style.backgroundColor = "transparent";
        document.getElementById('browseDropDownContent').style.backgroundColor = "transparent";
    }
}

function heroTextParallax() {
    const heroText = document.getElementById('heroText');
    heroText.style.transform = "translateY(" + scrollY / 2 + "px)";
    if (scrollY > 450) {
        heroText.style.transform = "translateY(225px)";
    }
}

function heroOpacity() {
    if (document.body.scrollTop > 425 || document.documentElement.scrollTop > 425) {
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

const openSideNav = document.getElementById('openSideNav');
openSideNav.addEventListener('click', function () {
    document.getElementById("navigation").style.width = "100%";
})

const closeSideNav = document.getElementById('closeSideNav');
closeSideNav.addEventListener('click', function () {
    document.getElementById("navigation").style.width = "0";
})