var modal = document.getElementById('modal');
const mainWrapper = document.getElementById("mainWrapper");
const addArtistButton = document.getElementById("addArtist");
const addAlbumButton = document.getElementById("addAlbum");
const addTrackButton = document.getElementById("addTrack");
const addPlaylistButton = document.getElementById("addPlaylist");
const deleteButton = document.getElementById("deleteButton");

const Fetch = {
    fetchAlbums: function (amount) {
        return fetch(`https://folksa.ga/api/albums?limit=${amount}&sort=desc&key=flat_eric&populateArtists=true`)
            .then((response) => response.json())
    },

    fetchPlaylists: function (amount) {
        return fetch(`https://folksa.ga/api/playlists?limit=${amount}&sort=desc&key=flat_eric&populateArtists=true`)
            .then((response) => response.json())
    },

    fetchArtists: function (amount) {
        return fetch(`https://folksa.ga/api/artists?limit=${amount}&sort=desc&key=flat_eric&populateArtists=true`)
            .then((response) => response.json())
    },

    fetchComments: function (id) {
        return fetch(` https://folksa.ga/api/playlists/${id}/comments?key=flat_eric`)
            .then((response) => response.json())
            .then(function (value) {
                return Model.displayComments(value);
            })
    },

    fetchSingleItem: function (listType, ItemId) {
        return fetch('https://folksa.ga/api/' + listType + '/' + ItemId + '?key=flat_eric')
            .then((response) => response.json())
            .then((data) => {
                View.modalPrint(data, listType)
            });
    },

    fetchSearched: function (type) {
        return fetch(`https://folksa.ga/api/${type}?key=flat_eric&limit=1000&populateArtists=true`)
            .then((response) => response.json())
    },

    vote: function (ratingNumber, id, type) {
        fetch(`https://folksa.ga/api/${type}/${id}/vote?key=flat_eric`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    rating: ratingNumber
                })
            })
            .then((response) => response.json())
    },
}


const View = {
    // Diplays the 6 latest albums on the main page.
    displayAlbumsLimited: function (albumsLimited) {
        const albumWrapper = document.getElementById('albumWrapper');
        let htmlBlock = '';

        for (i = 0; i < albumsLimited.length; i++) {
            htmlBlock += `
                <div class='albums' id='albums${[i]}' value='${albumsLimited[i]._id}'>
                `
            if (albumsLimited[i].coverImage === '' ||
                albumsLimited[i].coverImage === null ||
                albumsLimited[i].coverImage === undefined
            ) {
                htmlBlock += `
                    <img src='images/noimage.jpg' alt='No image available' />
                `
            } else {
                htmlBlock += `
                    <img src='${albumsLimited[i].coverImage}' alt='Cover image' />
                `
            }
            htmlBlock += `
                <div class='albumInfo'>
                    <h4> ${albumsLimited[i].title} </h4>
                    <h4> (${albumsLimited[i].releaseDate}) </h4>
                    <p> ${albumsLimited[i].artists[0].name} </p>
                    <p id='spotifyLink'>
                        <a href='${albumsLimited[i].spotifyURL}' target='_blank'>Listen on Spotify</a>
                    </p>
                </div>
            </div>
            `
        }
        albumWrapper.innerHTML = htmlBlock;
        Controller.addEventListener('albums', 'albums', 6);

    },
    displayAlbums: function (albums) {
        View.hideNavigation();
        View.scrollToMain();
        document.getElementById('navigation').style.width = '0';
        let htmlBlock = `
            <h3>Albums</h3>
            <p>Browse through our awesome albums</p>
            <div id='albumWrapper' class='albumWrapper'>
        `
        for (i = 0; i < albums.length; i++) {
            htmlBlock += `
                    <div class='artists' id='albums${[i]}' value='${albums[i]._id}'>
                `
            if (albums[i].coverImage === '' ||
                albums[i].coverImage === null ||
                albums[i].coverImage === undefined
            ) {
                htmlBlock += `
                    <img src='images/noimage.jpg' alt='No image available' />
                `
            } else {
                htmlBlock += `
                    <img src='${albums[i].coverImage}' alt='Cover image' />
                `
            }
            htmlBlock += `
                <div class='albumInfo'>
                    <h4> ${albums[i].title} </h4>
                    <p>(${albums[i].genres[0]}) </p>
                    <p> <a href='${albums[i].spotifyURL}' target='_blank'>Listen on Spotify</a> </p>
                </div>
            </div>
            `
        }
        htmlBlock += `
        </div>
        `
        mainWrapper.innerHTML = htmlBlock;
        Controller.addEventListener('albums', 'albums', albums.length);
    },
    // Diplays the playlists on the main page.
    displayPlaylists: function (playlists) {
        const playlistWrapper = document.getElementById('playlistWrapper');
        let htmlBlock = '';
        for (i = 0; i < playlists.length; i++) {
            htmlBlock += `
                <div class='playlists' id='playlists${[i]}' value='${playlists[i]._id}'>
            `
            if (playlists[i].coverImage === '' ||
                playlists[i].coverImage === undefined ||
                playlists[i].coverImage === null
            ) {
                htmlBlock += `
                    <img src='images/noimage.jpg' alt='No image' />
                `
            } else {
                htmlBlock += `
                    <img src='${playlists[i].coverImage}' alt='Playlist cover' />
                `
            }
            htmlBlock += ` 
                    <div class='albumInfo'>
                        <h4> ${playlists[i].title} </h4>
                        <p> ${playlists[i].createdBy} </p>
                    </div>
                </div>
            `
        }
        playlistWrapper.innerHTML = htmlBlock;
        Controller.addEventListener('playlists', 'playlists', 6);

    },
    displayAllPlaylists: function (playlists) {
        View.hideNavigation();
        View.scrollToMain();
        document.getElementById('navigation').style.width = '0';
        let htmlBlock = `
            <h3>Playlists</h3>
            <p>Try to find one great playlists and you'll win a cookie</p>
            <div id='playlistWrapper' class='playlistWrapper'>
        `
        for (i = 0; i < playlists.length; i++) {
            htmlBlock += `
                <div class='playlists' id='playlists${[i]}' value='${playlists[i]._id}'>
            `
            if (playlists[i].coverImage === '' ||
                playlists[i].coverImage === undefined ||
                playlists[i].coverImage === null
            ) {
                htmlBlock += `
                    <img src='images/noimage.jpg' alt='No image' />
                `
            } else {
                htmlBlock += `
                    <img src='${playlists[i].coverImage}' alt='Playlist cover' />
                `
            }
            htmlBlock += ` 
                    <div class='albumInfo'>
                        <h4> ${playlists[i].title} </h4>
                        <p> ${playlists[i].createdBy} </p>
                    </div>
                </div>
            `
        }
        htmlBlock += `
        </div>
        `
        mainWrapper.innerHTML = htmlBlock;
        Controller.addEventListener('playlists', 'playlists', playlists.length);
    },
    // Display artists
    displayArtists: function (artist) {
        View.hideNavigation();
        View.scrollToMain();
        document.getElementById('navigation').style.width = '0';
        let htmlBlock = `
            <h3>Artists</h3>
            <p>All the happy campers in our catalogue</p>
            <div id='artistWrapper' class='artistWrapper'>
        `
        for (i = 0; i < artist.length; i++) {
            htmlBlock += `
                <div class='artists' id='artists${[i]}' value='${artist[i]._id}'>
            `
            if (artist[i].coverImage === '' ||
                artist[i].coverImage === undefined ||
                artist[i].coverImage === null
            ) {
                htmlBlock += `
                    <img src='images/noimage.jpg' alt='No image' />
                `
            } else {
                htmlBlock += `
                    <img src='${artist[i].coverImage}' alt='Artist image' />
                `
            }
            htmlBlock += ` 
                <div class='artistInfo'>
                    <h4> ${artist[i].name} </h4>
                    <h4>(${artist[i].genres[0]}) </h4>
                    <p> <a href='${artist[i].spotifyURL}' target='_blank'>Listen on Spotify</a> </p>
                </div>
            </div>
            `
        }
        htmlBlock += `
        </div>
        `
        mainWrapper.innerHTML = htmlBlock;
        Controller.addEventListener('artists', 'artists', artist.length);
    },

    //print out Single information
    modalPrint: async function (data, listType) {
        /* Modal content */
        modal.style.display = 'block';
        var placeHolder = document.getElementById('modalContent')
        var CommentsplaceHolder = document.getElementById('playListComments')

        let htmlBlock = '';

        var rating = Model.displayAverage(Model.calculateAverage(Model.calculateSum(data.ratings), data.ratings.length));
        if (isNaN(rating)) {
            rating = 0;
        }
        if (listType === 'albums') {
            htmlBlock = `
                <div id='modalPadding'>
                    <div class='closeModal'>
                        <img id='closeModal' src='images/close-black.svg' alt='Close' />
                    </div>
                    <div class='modalAlbumWrapper'>
                        <div class='albumCover'>
                            <img src='${data.coverImage}' alt='Album cover' />
                            <p><a href='${data.spotifyURL}' target='_blank'>Listen on Spotify</a></p>
                            <p id='year'>(${data.releaseDate})</p>
                        </div>
                        <div class='modalAlbumInfo'>
                            <h1>${data.title}</h1>
                            <h2>${data.artists[0].name}</h2>
                            <h3>Rating: ${rating}</h3>
                            <div id='rating'> </div>
                            <ul id='trackList'> </ul>
                        </div>
                    </div>
                </div>
            `
        }
        if (listType === 'playlists') {
            htmlBlock = `
                <div id='modalPadding'>
                    <div class='closeModal'>
                        <img id='closeModal' src='images/close-black.svg' alt='Close' />
                    </div>
                    <div class='playlistContainer'>
                        <div class='modalPlaylistWrapper'>
                            <div class='playlistCover'>
                                <img src='${data.coverImage}' alt='Playlist cover' />
                            </div>
                            <div class='modalPlaylistInfo'>
                                <h1>${data.title}</h1>
                                <h2>${data.createdBy}</h2>
                                <h3>Rating: 
                                ${rating}</h3>
                                <div id= 'rating'> </div>
                                <ul id= 'trackList'> </ul>
                            </div>
                        </div>
                        <div id='playListComments'>
                            <h2>Comments:</h2>
                            ${await Fetch.fetchComments(data._id)}
                        </div>
                    </div>
                </div>
            `
        }

        if (listType === 'artists') {
            htmlBlock = `
                <div id='modalPadding'>
                    <div class='closeModal'>
                        <img id='closeModal' src='images/close-black.svg' alt='Close' />
                    </div>
                    <div class='modalArtistWrapper'>
                        <div class='modalArtistContainer'>
                            <div class='artistInfoContainer'>
                                <img src='${data.coverImage}' alt='Artist image' />
                                <div class='modalArtistInfo'>
                                    <h1>${data.name}</h1>
                                    <h2>(${data.genres[0]})</h2>
                                    <a href='${data.spotifyURL}'>Listen on Spotify</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `
        }

        placeHolder.innerHTML = htmlBlock;

        const closeModal = document.getElementById('closeModal');
        closeModal.addEventListener('click', function () {
            modal.style.display = 'none';
        })

        View.createVoting(data._id, listType);

        var trackList = document.getElementById('trackList');
        var listElement = '';
        var trackNumber = 1;

        if (listType !== 'playlists') {
            for (i = 0; i < data.tracks.length; i++) {
                listElement += `
                    <li>${trackNumber}. ${data.tracks[i].title}</li>
                `
                trackNumber += 1
                trackList.innerHTML = listElement;
            }
        } else if (listType === 'playlists') {
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
    },

    printSearched: function (list, listDiv) {
        const searchPlaceHolder = document.getElementById(listDiv);
        let htmlBlock = '';

        for (i = 0; i < list.length; i++) {
            if (listDiv == 'playlists') {
                htmlBlock += `
                    <div class='listAlbumContainer'>
                        <img src='${list[i].coverImage}' alt='Playlist cover' />
                        <div class='listAlbumInfo'>
                            <h3 id='playlists${[i]}' value='${list[i]._id}'>${list[i].title}</h3>
                            <p>${list[i].createdBy}</p>
                        </div>
                    </div>
                `
            } else if (listDiv == 'tracks') {
                htmlBlock += `
                    <h3>${list[i].title}</h3>
                    <p>${list[i].artists[0].name}</p>
    
                `
            } else if (listDiv == 'albums') {
                htmlBlock += `
                    <div class='listAlbumContainer'>
                        <img src='${list[i].coverImage}' alt='Album cover' />
                        <div class='listAlbumInfo'>
                            <h3 id='albums${[i]}' value='${list[i]._id}'> ${list[i].title}</h3>
                            <p>${list[i].artists[0].name}</p>
                        </div>
                    </div>
                `
            } else {
                htmlBlock += `
                    <div class='listArtistContainer'>
                        <img src='${list[i].coverImage}' alt='Artist image' />
                        <div class='listAlbumInfo'>
                            <h3 id='artists${[i]}' value='${list[i]._id}'>${list[i].name}</h3>
                            <p>(${list[i].genres[0]})</p>
                        </div>
                    </div>
                `
            }
        }
        searchPlaceHolder.innerHTML = htmlBlock;
        Controller.addEventListener(listDiv, listDiv, list.length);
    },

    createPlaceHolder: function () {
        modal.style.display = 'block';

        var placeHolder = document.getElementById('modalContent');
        var listFrame = `
            <div id='modalPadding'>
                <div class='closeModal'>
                    <img id='closeModal' src='images/close-black.svg' alt='Close' />
                </div>
                <h2 id='playlistHeader'>Playlists:</h2>    
                <div id='playlists'> </div>
                <h2>Tracks:</h2>
                <div id='tracks'> </div>
                <h2>Albums:</h2>
                <div id='albums'> </div>
                <h2>Artists:</h2>
                <div id='artists'> </div>
            </div>
        `
        placeHolder.innerHTML = listFrame;
        document.getElementById('closeModal').addEventListener('click', function () {
            modal.style.display = 'none';
        })
    },
    searchError: function () {
        modal.style.display = 'block';

        var placeHolder = document.getElementById('modalPadding');
        var listFrame = `
            <div class='closeModal'>
                <img id='closeModal' src='images/close-black.svg' alt='Close' />
            </div>
            <h2 id='errorHeader'>OH NOES!</h2>
            <p>Seems like you forgot to enter a search string...</p>
        `
        placeHolder.innerHTML = listFrame;
        document.getElementById('closeModal').addEventListener('click', function () {
            modal.style.display = 'none';
        })
    },

    createVoting: function (id, type) {
        votingValue = 10;
        for (i = 10; i > 0; i--) {
            var ratingPlaceHolder = document.getElementById('rating');
            var ratings = document.createElement('SPAN');
            var ratingSymbol = document.createTextNode('⬤');

            ratings.appendChild(ratingSymbol);
            ratings.addEventListener('click', Fetch.vote.bind(this, votingValue, id, type));

            ratingPlaceHolder.appendChild(ratings);

            votingValue -= 1;
        }
    },

    // Styling functions
    hideNavigation: function () {
        document.getElementById('navigation').style.width = '0';
    },

    scrollToMain: function () {
        window.scrollTo({
            top: 502,
            behavior: 'smooth'
        });
    },

    navbarShift: function () {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            document.getElementById('navbar').style.backgroundColor = '#000';
            document.getElementById('addDropDownContent').style.backgroundColor = '#000';
            document.getElementById('browseDropDownContent').style.backgroundColor = '#000';
        } else {
            document.getElementById('navbar').style.backgroundColor = 'transparent';
            document.getElementById('addDropDownContent').style.backgroundColor = 'transparent';
            document.getElementById('browseDropDownContent').style.backgroundColor = 'transparent';
        }
    },

    heroTextParallax: function () {
        const heroText = document.getElementById('heroText');
        heroText.style.transform = 'translateY(' + scrollY / 2 + 'px)';
        if (scrollY > 450) {
            heroText.style.transform = 'translateY(225px)';
        }
    },

    heroOpacity: function () {
        if (document.body.scrollTop > 425 || document.documentElement.scrollTop > 425) {
            document.getElementById('hero').style.backgroundColor = '#000';
            document.getElementById('heroText').style.opacity = '0';
        } else {
            document.getElementById('hero').style.backgroundColor = '#4e2791';
            document.getElementById('heroText').style.opacity = '1';
        }
    },
    hideNavigation: function () {
        document.getElementById("navigation").style.width = "0";
    },
    scrollToMain: function () {
        window.scrollTo({
            top: 502,
            behavior: "smooth"
        });
    },
    // Replaces the htmlcontent on the page with the form to create a new artist.
    replaceArtistForm: function () {
        mainWrapper.innerHTML = `
        <h3>Add new artist</h3>
        <p>Add a new artist to the API</p>
        <form id="addArtistForm">
            <label for="Name">Artist(s):</label>
            <input id="artistName" name="Name" type="text" />
            
            <label for="Genre">Genre:</label>
            <input id="genre" name="Genre" type="text" />
            
            <label for="Country">Country:</label>
            <input id="artistCountry" name="Country" type="text" />
            
            <label for="Birthdate">Born:</label>
            <input id="artistDateBorn" type="date" />
            
            <label for="spotifyURL">Spotify URL:</label>
            <input id="artistSpotifyUrl" name="spotifyURL" type="text" placeholder="http://" />
            
            <label for="imageLink">Image URL:</label>
            <input id="artistImageLink" name="imageLink" type="text" placeholder="http://" />
            
            <label for="Gender">Gender:</label>
            <select id="artistGender" name="Gender">
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
            </select>
            <button id="artistSubmit" type="submit">Submit</button>
        </form>
        `
    },
    // Replaces the htmlcontent on the page with the form to create a new album.
    replaceAlbumForm: function () {
        mainWrapper.innerHTML = `
            <h3>Add new album</h3>
            <p>Add a new album to the API</p>
            <form id="addAlbumForm">
                <label for="Title">Album title:</label>
                <input id="albumTitle" name="Title" type="text" />
                
                <label for="Artist">Artist(s):</label>
                <select id="trackArtist" name="Artist"> </select>
                
                <label for="ReleaseDate">Year of release:</label>
                <input id="albumRelease" name="ReleaseDate" type="number" />
                
                <label for="Genre">Genre:</label>
                <input id="albumGenre" name="Genre" type="text" />
                
                <label for="spotifyURL">Spotify URL:</label>
                <input id="albumSpotifyUrl" name="spotifyURL" type="text" placeholder="http://" />
                
                <label for="imageLink">Image URL:</label>
                <input id="albumImageLink" name="imageLink" type="text"placeholder="http://" />
                
                <button id="albumSubmit" type="submit">Submit</button>
            </form>
        `
    },
    // Replaces the htmlcontent on the page with the form to create a new track.
    replaceTrackForm: function () {
        mainWrapper.innerHTML = `
            <h3>Add track</h3>
            <p>Add a new track to the API</p>
            <form id="addTrackForm">
                <label for="Title">Title:</label>
                <input id="trackTitle" name="Title" type="text">

                <label for="Artist">Artist(s):</label>
                <select id="trackArtist" name="Artist">
                </select>

                <label for="Album">Album:</label>
                <select id="trackAlbum" name="Album">
                </select>

                <label for="Genre">Genre:</label>
                <input id="trackGenre" name="Genre" type="text">
                <button id="trackSubmit" type="submit">Submit</button>
            </form>
        `
    },
    // Replaces the htmlcontent on the page with the form to create a new playlist.
    replacePlaylistForm: function () {
        mainWrapper.innerHTML = `
            <h3>Add playlist</h3>
            <p>Add a new playlist to the API</p>
            <form id="addPlaylistForm">
                <label for="Title">Title:</label>
                <input id="playlistTitle" name="Title" type="text">

                <label for="Genre">Genre:</label>
                <input id="playlistGenre" name="Genre" type="text">

                <label for="Author">Author:</label>
                <input id="playlistAuthor" name="Author" type="text">

                <label for="imageLink">Image URL:</label>
                <input id="playlistImageLink" name="imageLink" type="text" placeholder="http://" />
                
                <div id="playlistTrackWrapper"> </div>

                <button id="playlistSubmit" type="submit">Submit</button>
            </form>
        `
    },
    // Replaces the htmlcontent on the page with the form to delete.
    replaceDeleteForm: function () {
        mainWrapper.innerHTML = `
            <h3>Clean up the API</h3>
                <p>Here you can delete all the shitty shit that
                <br />makes the API look really sad.</p>
                <div id="deleteSuccess"> </div>
                <form id="deleteArtistForm">
                    <label for="deleteArtist">Delete artist by ID:</label>
                    <input id="artistID" name="deleteArtist" type="text" />

                    <button id="deleteArtistButton" type="submit">Delete artist</button>
                </form>
                <form id="deleteTrackForm">
                        <label for="deleteTrack">Delete track by ID:</label>
                        <input id="trackID" name="deleteTrack" type="text" />

                        <button id="deleteTrackButton" type="submit">Delete track</button>
                    </form>
                <form id="deleteAlbumForm">
                    <label for="deleteAlbum">Delete album by ID:</label>
                    <input id="albumID" name="deleteAlbum" type="text" />

                    <button id="deleteAlbumButton" type="submit">Delete album</button>
                </form>
                <form id="deletePlaylistForm">
                    <label for="deletePlaylist">Delete playlist by ID:</label>
                    <input id="playlistID" name="deletePlaylist" type="text" />

                    <button id="deletePlaylistButton" type="submit">Delete playlist</button>
                </form>
            </div>
        `
    }
}

const Model = {
    displayComments: function (value) {
        var commentHtmlBlock = '';

        if (value === undefined || value.length == 0) {
            commentHtmlBlock = `
                <p class='comment'> No comments yet </p>
            `
        } else {
            for (let comment of value) {
                commentHtmlBlock += `
                    <p> ${comment.username}</p>
                    <p class='comment'> ${comment.body} </p>   
                `
            }
        }
        return commentHtmlBlock;
    },

    search: function (list) {
        var searchBarValue = document.getElementById('searchBar').value.toLowerCase();
        var titleList = [];

        for (i = 0; i < list.length; i++) {
            var lowerCaseValue = list[i].title.toLowerCase();

            if (lowerCaseValue.includes(searchBarValue)) {
                titleList.push(list[i]);
            }
        }
        return titleList;
    },

    searchArtist: function (list) {
        var searchBarValue = document.getElementById('searchBar').value.toLowerCase();
        var titleList = [];

        for (i = 0; i < list.length; i++) {
            var lowerCaseValue = list[i].name.toLowerCase();

            if (lowerCaseValue.includes(searchBarValue)) {
                titleList.push(list[i]);
            }
        }
        return titleList;
    },
    calculateSum: function (array) {
        var sum = array.reduce((a, b) => a + b, 0);
        return sum;
    },

    calculateAverage: function (sum, arrayLength) {
        average = sum / arrayLength;
        return average;
    },

    displayAverage: function (average) {
        var display = parseFloat(average.toFixed(1));
        return display;
    },
    // Fetches artists and loops through them to use later in the HTML.
    fetchArtist: function () {
        function fetchArtists() {
            return fetch('https://folksa.ga/api/artists?sort=desc&limit=1000&key=flat_eric')
                .then((response) => response.json())
        }

        function loopArtists(artists) {
            for (i = 0; i < artists.length; i++) {
                trackArtist.innerHTML += `
                    <option value="${artists[i]._id}" id="${artists[i]._id}">
                        ${artists[i].name.toUpperCase()}
                    </option>
                    `
            }
        }
        fetchArtists()
            .then(loopArtists);
    },
    // Fetches albums and loops through them to use later in the HTML.
    fetchAlbum: function () {
        function fetchAlbums() {
            return fetch('https://folksa.ga/api/albums?sort=desc&limit=1000&key=flat_eric')
                .then((response) => response.json())
        }

        function loopAlbums(albums) {
            for (i = 0; i < albums.length; i++) {
                trackAlbum.innerHTML += `
            <option value="${albums[i]._id}" id="${albums[i]._id}">
                ${albums[i].title.toUpperCase()}
            </option >
            `
            }
        }
        fetchAlbums()
            .then(loopAlbums);
    },
    // Fetches tracks and loops through them to use later in the HTML.
    fetchTrack: function () {
        function fetchTracks() {
            return fetch('https://folksa.ga/api/tracks?sort=desc&limit=10000&key=flat_eric')
                .then((response) => response.json())
        }

        function loopTracks(tracks) {
            for (i = 0; i < tracks.length; i++) {
                const playlistTrackWrapper = document.getElementById('playlistTrackWrapper');
                playlistTrackWrapper.innerHTML += `
                    <p class="loopedTracks" id="${tracks[i]._id}">
                        ${tracks[i].title} (${tracks[i].artists[0].name})
                    </p>
                    `
                // Creates a empty array where the user puts the songs Id's selected below. 
                trackArray = []
                const loopedTracks = document.getElementsByClassName("loopedTracks");
                // Loops through all tracks and adds a eventlistener to them so you can add songs to a playlist by just clicking the song desired.
                for (let loopedTrack of loopedTracks) {
                    loopedTrack.addEventListener("click", function () {
                        loopedTrack.style.color = "#fff";
                        loopedTrack.style.backgroundColor = "#4e2791";
                        trackArray.push(this.id);
                    })
                }
            }
        }
        fetchTracks()
            .then(loopTracks)
    },
    // Creates a template on what to send to the api when creating a new artist.
    submitNewArtist: function () {
        const artistSubmit = document.getElementById("artistSubmit");
        const artistName = document.getElementById("artistName");
        const artistGenre = document.getElementById("genre");
        const artistCountry = document.getElementById("artistCountry");
        const artistSpotifyUrl = document.getElementById("artistSpotifyUrl");
        const artistImageLink = document.getElementById("artistImageLink");
        const artistGender = document.getElementById("artistGender");
        const artistDateBorn = document.getElementById("artistDateBorn");
        let newArtist = {
            name: artistName.value,
            born: artistDateBorn.value,
            countryBorn: artistCountry.value,
            gender: artistGender.value,
            genres: artistGenre.value,
            spotifyURL: artistSpotifyUrl.value,
            coverImage: artistImageLink.value,
        }
        return fetch('https://folksa.ga/api/artists?key=flat_eric', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newArtist),
            })
            .then((response) => response.json())
            .then((newArtist) => {
                return newArtist;
            });
    },
    // Creates a template on what to send to the api when creating a new album.
    submitNewAlbum: function () {
        const albumTitle = document.getElementById("albumTitle");
        const albumArtist = document.getElementById("albumArtist");
        const albumRelease = document.getElementById("albumRelease");
        const albumGenre = document.getElementById("albumGenre");
        const albumSpotifyUrl = document.getElementById("albumSpotifyUrl");
        const albumImageLink = document.getElementById("albumImageLink");
        const albumSubmit = document.getElementById("albumSubmit");
        let newAlbum = {
            title: albumTitle.value,
            artists: trackArtist.value,
            releaseDate: albumRelease.value,
            genres: albumGenre.value,
            spotifyURL: albumSpotifyUrl.value,
            coverImage: albumImageLink.value,
        }
        return fetch('https://folksa.ga/api/albums?key=flat_eric', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newAlbum),
            })
            .then((response) => response.json())
            .then((newAlbum) => {
                return newAlbum;
            });
    },
    // Creates a template on what to send to the api when creating a new track.
    submitNewTrack: function () {
        const trackTitle = document.getElementById("trackTitle");
        const trackArtist = document.getElementById("trackArtist");
        const trackGenre = document.getElementById("trackGenre");
        const trackSubmit = document.getElementById("trackSubmit");
        let newTrack = {
            title: trackTitle.value,
            artists: trackArtist.value,
            album: trackAlbum.value,
            genres: trackGenre.value,
        }
        return fetch('https://folksa.ga/api/tracks?key=flat_eric', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newTrack),
            })
            .then((response) => response.json())
            .then((newTrack) => {
                return newTrack;
            });
    },
    // Creates a template on what to send to the api when creating a new playlist.
    submitNewPlaylist: function () {
        const playlistTitle = document.getElementById("playlistTitle");
        const playlistGenre = document.getElementById("playlistGenre");
        const playlistAuthor = document.getElementById("playlistAuthor");
        const playlistTracks = document.getElementById("playlistTracks");
        const playlistImageLink = document.getElementById("playlistImageLink");
        let newPlaylist = {
            title: playlistTitle.value,
            genres: playlistGenre.value,
            createdBy: playlistAuthor.value,
            tracks: trackArray.join(","),
            coverImage: playlistImageLink.value,
        }
        return fetch('https://folksa.ga/api/playlists?key=flat_eric', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newPlaylist),
            })
            .then((response) => response.json())
            .then((newPlaylist) => {
                return newPlaylist;
            });
    },
    // Handles all the deletes a user can make.
    deleteItem: function (param, id) {
        fetch(`https://folksa.ga/api/${param}/${id}?key=flat_eric`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => response.json())
    }
}

const Controller = {
    triggerEventListeners: function () {
        const browseArtists = document.getElementById('browseArtists');
        browseArtists.addEventListener('click', function () {
            Fetch.fetchArtists('108')
                .then(value => {
                    View.displayArtists(value);
                })
        })

        const browseAlbums = document.getElementById('browseAlbums');
        browseAlbums.addEventListener('click', function () {
            Fetch.fetchAlbums('106')
                .then(value => {
                    View.displayAlbums(value);
                })
        })

        const browsePlaylists = document.getElementById('browsePlaylists');
        browsePlaylists.addEventListener('click', function () {
            Fetch.fetchPlaylists('108')
                .then(value => {
                    View.displayAllPlaylists(value);
                })
        })
        const openSideNav = document.getElementById('openSideNav');
        openSideNav.addEventListener('click', function () {
            document.getElementById('navigation').style.width = '100%';
        })

        const closeSideNav = document.getElementById('closeSideNav');
        closeSideNav.addEventListener('click', function () {
            document.getElementById('navigation').style.width = '0';
        })
    },

    addEventListener: function (listType, divType, looplength) {
        for (i = 0; i < looplength; i++) {
            var itemId = document.getElementById(divType + [i]).getAttribute('value')
            var moreInfo = document.getElementById(divType + [i]);

            moreInfo.addEventListener('click', Fetch.fetchSingleItem.bind(this, listType, itemId));
        }
    },

    searchFunction: function () {
        document.getElementById('searchBar').addEventListener('keypress', function (e) {
            const enterKey = e.keyCode;
            if (enterKey === 13 && searchBar.value === '') {
                View.searchError();
                document.getElementById('navigation').style.width = '0';
                document.getElementById('searchBar').blur();
            } else if (enterKey === 13) {
                View.createPlaceHolder();
                document.getElementById('navigation').style.width = '0';
                document.getElementById('searchBar').blur();

                Fetch.fetchSearched('playlists')
                    .then(value => {
                        View.printSearched(Model.search(value), 'playlists')
                    })

                Fetch.fetchSearched('tracks')
                    .then(value => {
                        View.printSearched(Model.search(value), 'tracks')
                    })

                Fetch.fetchSearched('albums')
                    .then(value => {
                        View.printSearched(Model.search(value), 'albums')
                    })

                Fetch.fetchSearched('artists')
                    .then(value => {
                        View.printSearched(Model.searchArtist(value), 'artists')
                    })
            }
        });
    },
    // Code for all formsubmits.
    formSubmitFunctions: function () {
        // Replaces the innerHTML with the form to create a Artist.
        addArtistButton.addEventListener("click", function () {
            View.replaceArtistForm();
            View.hideNavigation();
            View.scrollToMain();
            const artistSubmit = document.getElementById("artistSubmit");
            // Sends new artist to API when button is 
            addArtistForm.addEventListener("submit", function (e) {
                Model.submitNewArtist()
                e.preventDefault();
            });
        });
        // What happens when you press "add new album".
        addAlbumButton.addEventListener("click", function () {
            Model.fetchArtist()
            View.replaceAlbumForm();
            View.hideNavigation();
            View.scrollToMain();
            const albumTitle = document.getElementById("albumTitle");
            const albumArtist = document.getElementById("albumArtist");
            const albumRelease = document.getElementById("albumRelease");
            const albumGenre = document.getElementById("albumGenre");
            const albumSpotifyUrl = document.getElementById("albumSpotifyUrl");
            const albumImageLink = document.getElementById("albumImageLink");
            const albumSubmit = document.getElementById("albumSubmit");
            // Submits new Album.
            addAlbumForm.addEventListener("submit", function (e) {
                Model.submitNewAlbum()
                e.preventDefault();
            });
        });
        // What happens when you press "add new track".
        addTrackButton.addEventListener("click", function () {
            Model.fetchArtist()
            Model.fetchAlbum()
            View.replaceTrackForm();
            View.hideNavigation();
            View.scrollToMain();
            const trackTitle = document.getElementById("trackTitle");
            const trackArtist = document.getElementById("trackArtist");
            const trackGenre = document.getElementById("trackGenre");
            const trackSubmit = document.getElementById("trackSubmit");
            // Submits new track.
            addTrackForm.addEventListener("submit", function (e) {
                Model.submitNewTrack()
                e.preventDefault();
                document.getElementById('trackTitle').value = '';
            });
        });
        // What happens when you press "add new playlist".
        addPlaylistButton.addEventListener("click", function () {
            Model.fetchTrack()
            View.replacePlaylistForm()
            View.hideNavigation()
            View.scrollToMain()
            const playlistSubmit = document.getElementById("addPlaylistForm");
            playlistSubmit.addEventListener("submit", function (e) {
                e.preventDefault();
                Model.submitNewPlaylist()
                document.getElementById("playlistTitle").value = "";
            });
        })
        // What happens when you press "delete".
        deleteButton.addEventListener("click", function () {
            View.replaceDeleteForm()
            View.hideNavigation()
            View.scrollToMain()
            // Deletes artist by ID
            const deleteArtistForm = document.getElementById("deleteArtistForm");
            deleteArtistForm.addEventListener("submit", function (e) {
                const artistID = document.getElementById("artistID");
                e.preventDefault();
                Model.deleteItem('artists', artistID.value);
                document.getElementById('artistID').value = '';

            });

            // Deletes album by ID
            const deleteAlbumForm = document.getElementById("deleteAlbumForm");
            deleteAlbumForm.addEventListener("submit", function (e) {
                const albumID = document.getElementById("albumID");
                e.preventDefault();
                Model.deleteItem('albums', albumID.value);
                document.getElementById('albumID').value = '';
            });

            // Deletes track by ID
            const deleteTrackForm = document.getElementById("deleteTrackForm");
            deleteTrackForm.addEventListener("submit", function (e) {
                const trackID = document.getElementById("trackID");
                e.preventDefault();
                Model.deleteItem('tracks', trackID.value);
                document.getElementById('trackID').value = '';
            });

            // Deletes playlist by ID
            const deletePlaylistButton = document.getElementById("deletePlaylistButton");
            deletePlaylistButton.addEventListener("click", function (e) {
                const playlistID = document.getElementById("playlistID")
                e.preventDefault();
                Model.deleteItem('playlists', playlistID.value);
                document.getElementById('playlistID').value = '';
            });
        })
    },
}
Controller.formSubmitFunctions();

Fetch.fetchAlbums('6')
    .then(value => {
        View.displayAlbumsLimited(value);
    })

Fetch.fetchPlaylists('6')
    .then(value => {
        View.displayPlaylists(value);
    })

Controller.triggerEventListeners();
Controller.searchFunction();

window.onscroll = function () {
    View.navbarShift();
    View.heroTextParallax();
    View.heroOpacity();
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

document.onkeydown = function (e) {
    if (e.keyCode == 27) {
        modal.style.display = 'none';
    }
}