function fetchAlbums(amount) {
    return fetch(`https://folksa.ga/api/albums?limit=${amount}&sort=desc&key=flat_eric&populateArtists=true`)
        .then((response) => response.json())
}

fetchAlbums('6')
    .then(value => {
        View.displayAlbumsLimited(value);
    })

function fetchPlaylists(amount) {

    return fetch(`https://folksa.ga/api/playlists?limit=${amount}&sort=desc&key=flat_eric&populateArtists=true`)
        .then((response) => response.json())
}

fetchPlaylists('6')
    .then(value => {
        View.displayPlaylists(value);
    })

function fetchArtists(amount) {
    return fetch(`https://folksa.ga/api/artists?limit=${amount}&sort=desc&key=flat_eric&populateArtists=true`)
        .then((response) => response.json())
}



function fetchComments(id) {
    return fetch(` https://folksa.ga/api/playlists/${id}/comments?key=flat_eric`)
        //return fetch(` https://folksa.ga/api/comments/${id}/?key=flat_eric`)
        .then((response) => response.json())
        .then(function (value) {
            return displayComments(value);
        })

}

function displayComments(value) {
    console.log(value)
    var commentHtmlBlock = ''
    
    if (value === undefined || value.length == 0) {
        commentHtmlBlock = `
            <p> No comments yet </p>
            `
    }
    
    else {
    for (let comment of value) {
        
        commentHtmlBlock += `
            <p> ${comment.body} </p>
            <p> ${comment.username}</p>
            `
    }
    }
    return commentHtmlBlock
    
}

const browseArtists = document.getElementById('browseArtists');
browseArtists.addEventListener('click', function () {
    fetchArtists('6')
        .then(value => {
            View.displayArtists(value);
        })
})

const browseAlbums = document.getElementById('browseAlbums');
browseAlbums.addEventListener('click', function (){
    fetchAlbums('18')
    .then(value => {
        View.displayAlbums(value);
            })
})


// // Fetches artists, limited to 9
// fetch('https://folksa.ga/api/artists?limit=9&sort=desc&key=flat_eric')
//     .then((response) => response.json())
//     .then((artists) => {
//         artist = artists;
//         setTimeout(function () {
//             View.displayArtists(artist);
//         }, 1000);
//         console.log(artist);
//     });


function addEventListener(listType, divType, looplength) {
    for (i = 0; i < looplength; i++) {
        var itemId = document.getElementById(divType + [i]).getAttribute("value")
        var moreInfo = document.getElementById(divType + [i]);

        moreInfo.addEventListener('click', fetchSingleItem.bind(this, listType, itemId));
    }
}

function fetchSingleItem(listType, ItemId) {
    return fetch('https://folksa.ga/api/' + listType + '/' + ItemId + '?key=flat_eric')
        .then((response) => response.json())
        .then((data) => {
            console.log(listType);
            myFunction(data, listType)
        });
}

const View = {
    // Diplays the 6 latest albums on the main page.
    displayAlbumsLimited: function (albumsLimited) {
        const albumWrapper = document.getElementById('albumWrapper');
        let htmlBlock = '';

        for (i = 0; i < albumsLimited.length; i++) {
            if (albumsLimited[i].coverImage === "" ||
                albumsLimited[i].coverImage === null ||
                albumsLimited[i].coverImage === undefined
            ) {
                htmlBlock += `
                    <div class="albums" id="albums${[i]}" value="${albumsLimited[i]._id}">
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
                    <div class="albums" id="albums${[i]}" value="${albumsLimited[i]._id}">
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
        albumWrapper.innerHTML = htmlBlock;
        addEventListener("albums", "albums", 6);

    },
    displayAlbums: function (albums) {
        View.hideNavigation();
        View.scrollToMain();
        document.getElementById("navigation").style.width = "0";
        let htmlBlock =`
            <h3>Albums</h3>
            <p>Browse through our awesome albums</p>
            <div id="albumWrapper" class="albumWrapper">
        `
        for (i = 0; i < albums.length; i++) {
            htmlBlock +=`
                <div class="artists" id="albums${[i]}" value="${albums[i]._id}">
                    <img src="${albums[i].coverImage}" />
                    <div class="albumInfo">
                        <h4> ${albums[i].title} </h4>
                        <h4>(${albums[i].genres[0]}) </h4>
                        <p> <a href="${albums[i].spotifyURL}" target="_blank">Listen on Spotify</a> </p>
                    </div>
                </div>
            `
        }
        htmlBlock +=`
        </div>
        `
        mainWrapper.innerHTML = htmlBlock;
        addEventListener("albums", "albums", albums.length);
    },
    // Diplays the playlists on the main page.
    displayPlaylists: function (playlists) {
        const playlistWrapper = document.getElementById('playlistWrapper');
        let htmlBlock = '';
        for (i = 0; i < playlists.length; i++) {
            if (playlists[i].coverImage === "" ||
                playlists[i].coverImage === null ||
                playlists[i].coverImage === undefined
            ) {
                htmlBlock += `
                <div class="playlists" id="playlists${[i]}" value="${playlists[i]._id}">
                    <img src="images/noimage.jpg" />
                    <div class="playlistInfo">
                        <h4> ${playlists[i].title} </h4>
                        <p> ${playlists[i].createdBy} </p>
                    </div>
                </div>
            `

            } else {
                htmlBlock += `
                    <div class="playlists" id="playlists${[i]}" value="${playlists[i]._id}">
                        <img src="${playlists[i].coverImage}" />
                        <div class="playlistInfo">
                            <h4> ${playlists[i].title} </h4>
                            <p> ${playlists[i].createdBy} </p>
                        </div>
                    </div>
                `
            }

        }
        playlistWrapper.innerHTML = htmlBlock;
        addEventListener("playlists", "playlists", 6);

    },
    // Display artists
    displayArtists: function (artist) {
        View.hideNavigation();
        View.scrollToMain();
        document.getElementById("navigation").style.width = "0";
        let htmlBlock = `
            <h3>Artists</h3>
            <p>All the happy campers in our catalogue</p>
            <div id="artistWrapper" class="artistWrapper">
        `
        for (i = 0; i < artist.length; i++) {
            htmlBlock += `
                <div class="artists" id="artists${[i]}" value="${artist[i]._id}">
                    <img src="${artist[i].coverImage}" />
                    <div class="artistInfo">
                        <h4> ${artist[i].name} </h4>
                        <h4>(${artist[i].genres[0]}) </h4>
                        <p> <a href="${artist[i].spotifyURL}" target="_blank">Listen on Spotify</a> </p>
                    </div>
                </div>
            `
        }
        htmlBlock += `
        </div>
        `
        mainWrapper.innerHTML = htmlBlock;
        addEventListener("artists", "artists", artist.length);
    },
    // Styling functions
    hideNavigation: function () {
        document.getElementById("navigation").style.width = "0";
    },
    scrollToMain: function () {
        window.scrollTo({
            top: 502,
            behavior: "smooth"
        });
    },
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
async function myFunction(data, listType) {
    /* Modal content */
    modal.style.display = "block";
    var placeHolder = document.getElementById('modalContent')
    var CommentsplaceHolder = document.getElementById('playListComments')

    let htmlBlock = '';

    var rating = displayAverage(calculateAverage(calculateSum(data.ratings), data.ratings.length));
    if (isNaN(rating)) {
        rating = 0;
    }
    if (listType === "albums") {
        htmlBlock = `
            <div id="modalPadding">
                <div class="closeModal">
                    <img id="closeModal" src="images/close-black.svg" alt="Close" />
                </div>
                <div class="modalAlbumWrapper">
                    <div class="albumCover">
                        <img src="${data.coverImage}" alt="Album cover" />
                        <p><a href="${data.spotifyURL}" target="_blank">Listen on Spotify</a></p>
                        <p id="year">(${data.releaseDate})</p>
                    </div>
                    <div class="modalAlbumInfo">
                        <h1>${data.title}</h1>
                        <h2>${data.artists[0].name}</h2>
                        <h3>Rating: ${rating}</h3>
                        <div id="rating"> </div>
                        <ul id="trackList"> </ul>
                    </div>
                </div>
            </div>
        `

    }

    if (listType === "playlists") {
        htmlBlock = `
            <div id="modalPadding">
                <div class="closeModal">
                    <img id="closeModal" src="images/close-black.svg" alt="Close" />
                </div>
                <div class="modalPlaylistWrapper">
                    <div class="playlistCover">
                        <img src="${data.coverImage}" alt="Playlist cover" />
                    </div>
                    <div class="modalPlaylistInfo">
                        <h1>${data.title}</h1>
                        <h2>${data.createdBy}</h2>

                        <h3>Rating: 
                        ${rating}</h3>
                        <div id= "rating"> </div>
                        <ul id= "trackList"> </ul>
                        <div id="playListComments">
                        ${await fetchComments(data._id)}
                        </div>


                    </div>
                </div>
            </div>
        `

    }

    if (listType === "artists") {
        htmlBlock = `
            <div id="modalPadding">
                <div class="closeModal">
                    <img id="closeModal" src="images/close-black.svg" alt="Close" />
                </div>
                <div class="modalArtistWrapper">
                    <div class="modalArtistContainer">
                        <div class="artistInfoContainer">
                            <img src="${data.coverImage}" alt="Album cover" />
                            <div class="modalArtistInfo">
                                <h1>${data.name}</h1>
                                <h2>(${data.genres[0]})</h2>
                            </div>
                        </div>
                        <h3>Albums:</h3>  
                        <ul>
                            <li>${data.albums}</li>
                        </ul>
                    </div>
                </div>
            </div>
        `
    }

    placeHolder.innerHTML = htmlBlock;

    const closeModal = document.getElementById('closeModal');
    closeModal.addEventListener('click', function () {
        modal.style.display = "none";
    })

    createVoting(data._id, listType);

    var trackList = document.getElementById('trackList');
    var listElement = '';
    var trackNumber = 1;

    if (listType !== "playlists") {
        for (i = 0; i < data.tracks.length; i++) {
            listElement += `
                <li>${trackNumber}. ${data.tracks[i].title}</li>
            `
            trackNumber += 1
            trackList.innerHTML = listElement;
        }
    } else if (listType === "playlists") {
        for (i = 0; i < data.tracks.length; i++) {
            listElement += `
                <li> 
                    ${trackNumber}. ${data.tracks[i].title}
                    (${data.tracks[i].artists[0].name})
                </li>
            `
            trackNumber += 1
            trackList.innerHTML = listElement;
        }
    }
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

document.onkeydown = function (e) {
    if (e.keyCode == 27) {
        modal.style.display = "none";
    }
}

function fetchSearched(type) {
    return fetch(`https://folksa.ga/api/${type}?key=flat_eric&limit=1000&populateArtists=true`)
        .then((response) => response.json())
}

function search(list) {
    var searchBarValue = document.getElementById("searchBar").value.toLowerCase();
    var titleList = []

    for (i = 0; i < list.length; i++) {
        var lowerCaseValue = list[i].title.toLowerCase()

        if (lowerCaseValue.includes(searchBarValue)) {
            titleList.push(list[i]);
        }
    }
    return titleList;
}

// SEARCH FUNCTIONS
function searchArtist(list) {
    var searchBarValue = document.getElementById("searchBar").value.toLowerCase();
    var titleList = [];

    for (i = 0; i < list.length; i++) {
        var lowerCaseValue = list[i].name.toLowerCase()

        if (lowerCaseValue.includes(searchBarValue)) {
            titleList.push(list[i]);
        }
    }
    return titleList;
}

function createPlaceHolder() {
    modal.style.display = "block";

    var placeHolder = document.getElementById('modalContent');
    var listFrame = `
        <div id="modalPadding">
            <div class="closeModal">
                <img id="closeModal" src="images/close-black.svg" alt="Close" />
            </div>
            <h2 id="playlistHeader">Playlists:</h2>    
            <div id="playlists"> </div>
            <h2>Tracks:</h2>
            <div id="tracks"> </div>
            <h2>Albums:</h2>
            <div id="albums"> </div>
            <h2>Artists:</h2>
            <div id="artists"> </div>
        </div>
    `
    placeHolder.innerHTML = listFrame;
    document.getElementById('closeModal').addEventListener('click', function () {
        modal.style.display = "none";
    })
}

function searchError() {
    modal.style.display = "block";

    var placeHolder = document.getElementById('modalPadding');
    var listFrame = `
        <div class="closeModal">
            <img id="closeModal" src="images/close-black.svg" alt="Close" />
        </div>
        <h2 id="errorHeader">OH NOES!</h2>
        <p>Seems like you forgot to enter a search string...</p>
    `
    placeHolder.innerHTML = listFrame;
    document.getElementById('closeModal').addEventListener('click', function () {
        modal.style.display = "none";
    })
}


function printSearched(list, listDiv) {
    const jumjum = document.getElementById(listDiv);
    let htmlBlock = '';

    for (i = 0; i < list.length; i++) {
        if (listDiv == "playlists") {
            htmlBlock += `
                <div class="listAlbumContainer">
                    <img src="${list[i].coverImage}" alt="Album cover" />
                    <div class="listAlbumInfo">
                        <h3 id="playlists${[i]}" value="${list[i]._id}">${list[i].title}</h3>
                        <p>${list[i].createdBy}</p>
                    </div>
                </div>
            `
        } else if (listDiv == "tracks") {
            htmlBlock += `
                <h3>${list[i].title}</h3>
                <p>${list[i].artists[0].name}</p>

       `

        } else if (listDiv == "albums") {
            htmlBlock += `
                <div class="listAlbumContainer">
                    <img src="${list[i].coverImage}" alt="Album cover" />
                    <div class="listAlbumInfo">
                        <h3 id="albums${[i]}" value="${list[i]._id}"> ${list[i].title}</h3>
                        <p>${list[i].artists[0].name}</p>
                    </div>
                </div>
            `
        } else {
            htmlBlock += `
                <div class="listArtistContainer">
                    <img src="${list[i].coverImage}" alt="Artist image" />
                    <div class="listAlbumInfo">
                        <h3 id="artists${[i]}" value="${list[i]._id}">${list[i].name}</h3>
                        <p>(${list[i].genres[0]})</p>
                    </div>
                </div>
            `
            console.log(list.length)
        }
    }
    jumjum.innerHTML = htmlBlock;
    addEventListener(listDiv, listDiv, list.length);
    
}

/*function addEventListener(listType, divType, looplength) {
    for (i = 0; i < looplength; i++) {
        var itemId = document.getElementById(divType + [i]).getAttribute("value")
        var moreInfo = document.getElementById(divType + [i]);

        moreInfo.addEventListener('click', fetchSingleItem.bind(this, listType, itemId));
    }
}*/

document.getElementById("searchBar").addEventListener('keypress', function (e) {
    const enterKey = e.keyCode;
    if (enterKey === 13 && searchBar.value === '') {
        searchError();
        document.getElementById("navigation").style.width = "0";
        document.getElementById('searchBar').blur();
    } else if (enterKey === 13) {
        createPlaceHolder();
        document.getElementById("navigation").style.width = "0";
        document.getElementById('searchBar').blur();

        fetchSearched("playlists")
            .then(value => {
                printSearched(search(value), "playlists")
            })

        fetchSearched("tracks")
            .then(value => {
                printSearched(search(value), "tracks")
            })

        fetchSearched("albums")
            .then(value => {
                printSearched(search(value), "albums")
            })

        fetchSearched("artists")
            .then(value => {
                printSearched(searchArtist(value), "artists")
            })
    }
});
