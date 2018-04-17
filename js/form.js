const ModelForm = {
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

const ViewForm = {
    // hideNavigation: function () {
    //     document.getElementById("navigation").style.width = "0";
    // },
    // scrollToMain: function () {
    //     window.scrollTo({
    //         top: 502,
    //         behavior: "smooth"
    //     });
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
// Replaces the innerHTML with the form to create a Artist.
addArtistButton.addEventListener("click", function () {
    ViewForm.replaceArtistForm();
    View.hideNavigation();
    View.scrollToMain();
    const artistSubmit = document.getElementById("artistSubmit");
    // Sends new artist to API when button is 
    addArtistForm.addEventListener("submit", function (e) {
        ModelForm.submitNewArtist()
        e.preventDefault();
        document.getElementById("addArtistForm").style.transition = "400ms";
        document.getElementById("addArtistForm").style.opacity = "0";
        setTimeout(function(){ 
            Fetch.fetchArtists('108')
            .then(value => {
                View.displayArtists(value);
            })
        }, 100);
    });
});
// What happens when you press "add new album".
addAlbumButton.addEventListener("click", function () {
    ModelForm.fetchArtist()
    ViewForm.replaceAlbumForm();
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
        ModelForm.submitNewAlbum()
        e.preventDefault();
        document.getElementById("addAlbumForm").style.transition = "300ms";
        document.getElementById("addAlbumForm").style.opacity = "0";
        setTimeout(function(){ 
            Fetch.fetchAlbums('108')
            .then(value => {
                View.displayAlbums(value);
            })
        }, 300);
    });
});
// What happens when you press "add new track".
addTrackButton.addEventListener("click", function () {
    ModelForm.fetchArtist()
    ModelForm.fetchAlbum()
    ViewForm.replaceTrackForm();
    View.hideNavigation();
    View.scrollToMain();
    const trackTitle = document.getElementById("trackTitle");
    const trackArtist = document.getElementById("trackArtist");
    const trackGenre = document.getElementById("trackGenre");
    const trackSubmit = document.getElementById("trackSubmit");
    // Submits new track.
    addTrackForm.addEventListener("submit", function (e) {
        ModelForm.submitNewTrack()
        e.preventDefault();
        document.getElementById('trackTitle').value = '';
    });
});
// What happens when you press "add new playlist".
addPlaylistButton.addEventListener("click", function () {
    ModelForm.fetchTrack()
    ViewForm.replacePlaylistForm()
    ViewForm.hideNavigation()
    ViewForm.scrollToMain()
    const playlistSubmit = document.getElementById("addPlaylistForm");
    playlistSubmit.addEventListener("submit", function (e) {
        e.preventDefault();
        ModelForm.submitNewPlaylist()
        document.getElementById("playlistTitle").value = "";
        document.getElementById("addPlaylistForm").style.transition = "400ms";
        document.getElementById("addPlaylistForm").style.opacity = "0";
        setTimeout(function(){ 
            Fetch.fetchPlaylists('108')
            .then(value => {
                View.displayAllPlaylists(value);
            })
        }, 300);
    });
})
// What happens when you press "delete".
deleteButton.addEventListener("click", function () {
    ViewForm.replaceDeleteForm()
    ViewForm.hideNavigation()
    ViewForm.scrollToMain()
    // Deletes artist by ID
    const deleteArtistForm = document.getElementById("deleteArtistForm");
    deleteArtistForm.addEventListener("submit", function (e) {
        const artistID = document.getElementById("artistID");
        e.preventDefault();
        ModelForm.deleteItem('artists', artistID.value);
        document.getElementById('artistID').value = '';

    });

    // Deletes album by ID
    const deleteAlbumForm = document.getElementById("deleteAlbumForm");
    deleteAlbumForm.addEventListener("submit", function (e) {
        const albumID = document.getElementById("albumID");
        e.preventDefault();
        ModelForm.deleteItem('albums', albumID.value);
        document.getElementById('albumID').value = '';
    });

    // Deletes track by ID
    const deleteTrackForm = document.getElementById("deleteTrackForm");
    deleteTrackForm.addEventListener("submit", function (e) {
        const trackID = document.getElementById("trackID");
        e.preventDefault();
        ModelForm.deleteItem('tracks', trackID.value);
        document.getElementById('trackID').value = '';
    });

    // Deletes playlist by ID
    const deletePlaylistButton = document.getElementById("deletePlaylistButton");
    deletePlaylistButton.addEventListener("click", function (e) {
        const playlistID = document.getElementById("playlistID")
        e.preventDefault();
        ModelForm.deleteItem('playlists', playlistID.value);
        document.getElementById('playlistID').value = '';
    });
})