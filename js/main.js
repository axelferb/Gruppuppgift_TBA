// Only fetches 6 Albums to display on the main page.
fetch('https://folksa.ga/api/albums?limit=6&sort=desc&key=flat_eric&populateArtists=true')
    .then((response) => response.json())
    .then((albumsLimited) => {
        setTimeout(function () {
            View.displayAlbumsLimited(albumsLimited);
        }, 1000);
    });

// Fetches playlist. Limited to 3.
fetch('https://folksa.ga/api/playlists?limit=3&key=flat_eric')
    .then((response) => response.json())
    .then((playlists) => {
        setTimeout(function () {
            View.displayPlaylists(playlists);
        }, 1000);
        console.log(playlists);
    });

// Fetches artists, limited to 9
fetch('https://folksa.ga/api/artists?limit=9&sort=desc&key=flat_eric')
    .then((response) => response.json())
    .then((artists) => {
        artist = artists;
        setTimeout(function () {
            View.displayArtists(artist);
        }, 1000);
        console.log(artist);
    });


function addEventListener(listType, divType, looplength) {
        
    
    for (i = 0; i < looplength; i++) {

        var itemID = document.getElementById(divType+[i]).getAttribute("value")
        
        var moreInfo = document.getElementById(divType+[i]);
        moreInfo.addEventListener('click', fetchSingleItem.bind(this, listType, itemID));

    }
}

function fetchSingleItem(listType, ItemId) {
    return fetch('https://folksa.ga/api/' + listType + '/' + ItemId + '?key=flat_eric')
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            myFunction()
        });
}

function fetchSingleAlbum(){
    console.log("Mumma");
}


const View = {
    // Diplays the 6 latest albums on the main page.
    displayAlbumsLimited: function (albumsLimited) {
        let htmlBlock = '';

        for (i = 0; i < albumsLimited.length; i++) {
            if (albumsLimited[i].coverImage === "") {

                htmlBlock += `
                    <div class="latestAlbum" id="latestAlbum${[i]}" value="${albumsLimited[i]._id}">
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
                htmlBlock += `
                    <div class="latestAlbum" id="latestAlbum${[i]}">
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
        
        latestAlbumWrapper.innerHTML = htmlBlock;
        addEventListener("albums", "latestAlbum", 6);
        
    },
    // Diplays the playlists on the main page.
    displayPlaylists: function (playlists) {
        let htmlBlock = '';

        for (i = 0; i < playlists.length; i++) {
            htmlBlock += `
                <div class="playlist">
                    <p> ${playlists[i].title} </p>
                </div>
            `
        }
        playlistWrapper.innerHTML = htmlBlock;
    },
    // Display artists
    displayArtists: function (artist) {
        let htmlBlock = '';

        for (i = 0; i < artist.length; i++) {
            htmlBlock += `
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
        artistWrapper.innerHTML = htmlBlock;
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

//MODAL FUNCTIONS

var modal = document.getElementById('myModal');

//print out Single information
function myFunction() {

    /* Modal content */
    modal.style.display = "block";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

const closeModal = document.getElementById('closeModal');
closeModal.addEventListener('click', function () {
    modal.style.display = "none";
})

document.onkeydown = function (e) {
    if (e.keyCode == 27) {
        modal.style.display = "none";
    }
};
