const mainWrapper = document.getElementById("mainWrapper");
const addArtistButton = document.getElementById("addArtist");
const addAlbumButton = document.getElementById("addAlbum");
const addTrackButton = document.getElementById("addTrack");
const deleteButton = document.getElementById("deleteButton");
const model = {
    // Creates a new artist to POST in API.
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
    fetchAlbum: function () {
        // Fetch all albums.
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
    submitNewArtist: function () {
        const artistSubmit = document.getElementById("artistSubmit");
        const artistName = document.getElementById("artistName");
        const artistGenre = document.getElementById("genre");
        const artistCountry = document.getElementById("artistCountry");
        const artistSpotifyUrl = document.getElementById("artistSpotifyUrl");
        const artistImgLink = document.getElementById("artistImgLink");
        const artistGender = document.getElementById("artistGender");
        const artistDateBorn = document.getElementById("artistDateBorn");
        let newArtist = {
            name: artistName.value,
            born: artistDateBorn.value,
            gender: artistGender.value,
            genres: artistGenre.value,
            spotifyURL: artistSpotifyUrl.value,
            coverImage: artistImgLink.value,
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
    submitNewAlbum: function () {
        const albumTitle = document.getElementById("albumTitle");
        const albumArtist = document.getElementById("albumArtist");
        const albumRelease = document.getElementById("albumRelease");
        const albumGenre = document.getElementById("albumGenre");
        const albumSpotifyUrl = document.getElementById("albumSpotifyUrl");
        const albumImgLink = document.getElementById("albumImgLink");
        const albumSubmit = document.getElementById("albumSubmit");
        let newAlbum = {
            title: albumTitle.value,
            artists: trackArtist.value,
            releaseDate: albumRelease.value,
            genres: albumGenre.value,
            spotifyURL: albumSpotifyUrl.value,
            coverImage: albumImgLink.value,
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
    deleteItem: function (param, id) {
        fetch(`https://folksa.ga/api/${param}/${id}?key=flat_eric`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => response.json())
            .then((artist) => {
                console.log(artist);
            });
    }
}
// What to replace the innerHTML on index with!
const view = {
    hideNavigation: function () {
        document.getElementById("navigation").style.width = "0";
    },
    scrollToMain: function () {
        window.scrollTo({
            top: 502,
            behavior: "smooth"
        });
    },

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
            
            <label for="imgLink">Image URL:</label>
            <input id="artistImgLink" name="imgLink" type="text" placeholder="http://" />
            
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
                
                <label for="imgLink">Image URL:</label>
                <input id="albumImgLink" name="imgLink" type="text"placeholder="http://" />
                
                <button id="albumSubmit" type="submit">Submit</button>
            </form>
        `
    },
    replaceTrackForm: function () {
        mainWrapper.innerHTML = `
            <h3>Add track</h3>
            <p>Add a new track to the API</p>
            <form id="addTrackForm">
                <label for="Title">Title:</label>
                <input id="trackTitle" name="Title" type="text">

                <label for="Artist">Artist(s)</label>
                <select id="trackArtist" name="Artist">
                </select>

                <label for="Album">Album</label>
                <select id="trackAlbum" name="Album">
                </select>

                <label for="Genre">Genre:</label>
                <input id="trackGenre" name="Genre" type="text">
                <button id="trackSubmit" type="submit">Submit</button>
            </form>
        `
    },
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
    view.replaceArtistForm();
    view.hideNavigation();
    view.scrollToMain();
    const artistSubmit = document.getElementById("artistSubmit");
    // Sends new artist to API when button is 
    artistSubmit.addEventListener("click", function (e) {
        model.submitNewArtist()
            .then(console.log)
        e.preventDefault();
    });
});
// Replaces the innerHTML with the form to create a Artist.
addAlbumButton.addEventListener("click", function () {
    model.fetchArtist()
    view.replaceAlbumForm();
    view.hideNavigation();
    view.scrollToMain();
    const artistSubmit = document.getElementById("artistSubmit");
    const artistName = document.getElementById("artistName");
    const artistGenre = document.getElementById("genre");
    const artistCountry = document.getElementById("artistCountry");
    const artistSpotifyUrl = document.getElementById("artistSpotifyUrl");
    const artistImgLink = document.getElementById("artistImgLink");
    const artistGender = document.getElementById("artistGender");
    const artistDateBorn = document.getElementById("artistDateBorn");
    const albumTitle = document.getElementById("albumTitle");
    const albumArtist = document.getElementById("albumArtist");
    const albumRelease = document.getElementById("albumRelease");
    const albumGenre = document.getElementById("albumGenre");
    const albumSpotifyUrl = document.getElementById("albumSpotifyUrl");
    const albumImgLink = document.getElementById("albumImgLink");
    const albumSubmit = document.getElementById("albumSubmit");
    // Submits new Album.
    albumSubmit.addEventListener("click", function (e) {
        model.submitNewAlbum()
            .then(console.log)
        e.preventDefault();
    });
});
addTrackButton.addEventListener("click", function () {
    model.fetchArtist()
    model.fetchAlbum()
    view.replaceTrackForm();
    view.hideNavigation();
    view.scrollToMain();
    const artistSubmit = document.getElementById("artistSubmit");
    const artistName = document.getElementById("artistName");
    const artistGenre = document.getElementById("genre");
    const artistCountry = document.getElementById("artistCountry");
    const artistSpotifyUrl = document.getElementById("artistSpotifyUrl");
    const artistImgLink = document.getElementById("artistImgLink");
    const artistGender = document.getElementById("artistGender");
    const artistDateBorn = document.getElementById("artistDateBorn");
    const albumTitle = document.getElementById("albumTitle");
    const albumArtist = document.getElementById("albumArtist");
    const albumRelease = document.getElementById("albumRelease");
    const albumGenre = document.getElementById("albumGenre");
    const albumSpotifyUrl = document.getElementById("albumSpotifyUrl");
    const albumImgLink = document.getElementById("albumImgLink");
    const albumSubmit = document.getElementById("albumSubmit");
    const trackTitle = document.getElementById("trackTitle");
    const trackArtist = document.getElementById("trackArtist");
    const trackGenre = document.getElementById("trackGenre");
    const trackSubmit = document.getElementById("trackSubmit");
    // Submits new track.
    trackSubmit.addEventListener("click", function (e) {
        model.submitNewTrack()
            .then(console.log)
        e.preventDefault();
        document.getElementById('trackTitle').value = '';
    });
});
deleteButton.addEventListener("click", function () {
    view.replaceDeleteForm()
    view.hideNavigation()
    view.scrollToMain()
    // Deletes artist by ID
    const deleteArtistButton = document.getElementById("deleteArtistButton");
    deleteArtistButton.addEventListener("click", function (e) {
        const artistID = document.getElementById("artistID");

        e.preventDefault();
        console.log(artistID.value);
        model.deleteItem('artists', artistID.value);
        document.getElementById('artistID').value = '';

    });

    // Deletes album by ID
    const deleteAlbumButton = document.getElementById("deleteAlbumButton");
    deleteAlbumButton.addEventListener("click", function (e) {
        const albumID = document.getElementById("albumID");

        e.preventDefault();
        console.log(albumID.value);
        model.deleteItem('albums', albumID.value);
        document.getElementById('albumID').value = '';
    });

    // Deletes track by ID
    const deleteTrackButton = document.getElementById("deleteTrackButton");
    deleteTrackButton.addEventListener("click", function (e) {
        const trackID = document.getElementById("trackID");

        e.preventDefault();
        console.log(trackID.value);
        model.deleteItem('tracks', trackID.value);
        document.getElementById('trackID').value = '';
    });

    // Deletes playlist by ID
    const deletePlaylistButton = document.getElementById("deletePlaylistButton");
    deletePlaylistButton.addEventListener("click", function (e) {
        const playlistID = document.getElementById("playlistID");

        e.preventDefault();
        console.log(playlistID.value);
        model.deleteItem('playlists', playlistID.value);
        document.getElementById('playlistID').value = '';
    });
})