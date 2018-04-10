// Only fetches 6 Albums to display on the main page.
fetch('https://folksa.ga/api/albums?limit=9&sort=desc&key=flat_eric&populateArtists=true')
    .then((response) => response.json())
    .then((albumsLimited) => {
        setTimeout(function () {
            View.displayAlbumsLimited(albumsLimited);
        }, 1000);
        console.log(albumsLimited);
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

        var itemId = document.getElementById(divType+[i]).getAttribute("value")
     
        
        var moreInfo = document.getElementById(divType+[i]);
        
        moreInfo.addEventListener('click', fetchSingleItem.bind(this, listType, itemId));

    }
}

function fetchSingleItem(listType, ItemId) {
    return fetch('https://folksa.ga/api/' + listType + '/' + ItemId + '?key=flat_eric')
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            myFunction(data)
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
                    <div class="latestAlbum" id="latestAlbum${[i]}" value="${albumsLimited[i]._id}">
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
        addEventListener("albums", "latestAlbum", 9);
        
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
        //artistWrapper.innerHTML = htmlBlock;
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
function myFunction(data) {

    /* Modal content */
    modal.style.display = "block";
    var placeHolder = document.getElementById('modalContent') 
    var htmlBlock = 
    
    `            <div id="modalPadding">
                    <img id="closeModal" src="images/close-black.svg" alt="Close" />
                    <div class="modalAlbumWrapper">
                        <div class="albumCover">
                            <img src="${data.coverImage}" alt="Album cover" />
                            <p><a href="${data.spotifyURL}">Listen on Spotify</a></p>
                            <p id="year">(${data.releaseDate})</p>
                        </div>
                        <div class="modalAlbumInfo">
                            <h1>${data.title}</h1>
                            <h2>${data.artists[0].name}</h2>
                            <h3>Rating:${displayAverage(calculateAverage(calculateSum(data.ratings), data.ratings.length))}</h3>
                            <h3 id ="rating"></h3>
                            <ul id= "songList">
                            </ul>
                        </div>
                    </div>
                </div>
     `
    
    placeHolder.innerHTML = htmlBlock
    createVoting(data._id)
    var songList = document.getElementById('songList')
    var listElement = ""
    var songNumber = 1; 
        for (i = 0; i < data.tracks.length; i++) {
        
        listElement += 
            `
            <li> ${songNumber}. ${data.tracks[i].title}</li>
    `
            
    songNumber+=1    
    songList.innerHTML = listElement
        
        }
    
    
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
