const mainWrapper = document.getElementById("mainWrapper");
const addArtistButton = document.getElementById("addArtist");
const addAlbumButton = document.getElementById("addAlbum");
const addSongButton = document.getElementById("addSong");
const model = {
    // Creates a new artist to POST in API.
    fetchArtist: function () {
        function fetchArtists() {
            return fetch('https://folksa.ga/api/artists?sort=desc&limit=1000&key=flat_eric')
                .then((response) => response.json())
        }

        function loopArtists(artists) {
            for (i = 0; i < artists.length; i++) {
                songArtist.innerHTML += `
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
                songAlbum.innerHTML += `
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
        let newAlbum = {
            title: albumTitle.value,
            artists: songArtist.value,
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
    submitNewSong: function () {
        let newSong = {
            title: songTitle.value,
            artists: songArtist.value,
            album: songAlbum.value,
            genres: songGenre.value,
        }
        return fetch('https://folksa.ga/api/tracks?key=flat_eric', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newSong),
            })
            .then((response) => response.json())
            .then((newSong) => {
                return newSong;
            });
    },
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
                <select id="songArtist" name="Artist"> </select>
                
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
    replaceSongForm: function () {
        mainWrapper.innerHTML = `
            <h3>Add song</h3>
            <p>Add a new song to the API</p>
            <form id="addSongForm">
                <label for="Title">Title:</label>
                <input id="songTitle" name="Title" type="text">

                <label for="Artist">Artist(s)</label>
                <select id="songArtist" name="Artist">
                </select>

                <label for="Album">Album</label>
                <select id="songAlbum" name="Album">
                </select>

                <label for="Genre">Genre:</label>
                <input id="songGenre" name="Genre" type="text">
                <button id="songSubmit" type="submit">Submit</button>
            </form>
        `
    }
}
// Replaces the innerHTML with the form to create a Artist.
addArtistButton.addEventListener("click", function () {
    view.replaceArtistForm();
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
    const songTitle = document.getElementById("songTitle");
    const songArtist = document.getElementById("songArtist");
    const songGenre = document.getElementById("songGenre");
    const songSubmit = document.getElementById("songSubmit");
    // Sends new artist to API when button is 
    artistSubmit.addEventListener("click", function (e) {
        model.submitNewArtist()
            .then(console.log)
        e.preventDefault();
    });
})
// Replaces the innerHTML with the form to create a Artist.
addAlbumButton.addEventListener("click", function () {
    model.fetchArtist()
    view.replaceAlbumForm();
    view.hideNavigation();
    view.scrollToMain();
    document.getElementById("navigation").style.width = "0";
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
    const songTitle = document.getElementById("songTitle");
    const songArtist = document.getElementById("songArtist");
    const songGenre = document.getElementById("songGenre");
    const songSubmit = document.getElementById("songSubmit");
    // Submits new Album.
    albumSubmit.addEventListener("click", function (e) {
        model.submitNewArtist()
            .then(console.log)
        e.preventDefault();
    });
})
addSongButton.addEventListener("click", function () {
    model.fetchArtist()
    model.fetchAlbum()
    view.replaceSongForm();
    view.hideNavigation();
    view.scrollToMain();
    document.getElementById("navigation").style.width = "0";
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
    const songTitle = document.getElementById("songTitle");
    const songArtist = document.getElementById("songArtist");
    const songGenre = document.getElementById("songGenre");
    const songSubmit = document.getElementById("songSubmit");
    // Submits new song.
    songSubmit.addEventListener("click", function (e) {
        model.submitNewSong()
            .then(console.log)
        e.preventDefault();
    });
})