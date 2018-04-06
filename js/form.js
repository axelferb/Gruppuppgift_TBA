const artistName = document.getElementById("artistName");
const artistGenre = document.getElementById("genre");
const artistCountry = document.getElementById("artistCountry");
const artistSpotifyUrl = document.getElementById("artistSpotifyUrl");
const artistImgLink = document.getElementById("artistImgLink");
const artistGender = document.getElementById("artistGender");
const artistDateBorn = document.getElementById("artistDateBorn");
const mainWrapper = document.getElementById("mainWrapper");
// What to replace the innerHTML on index with!
const view = {
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
    }
}
// Replaces the innerHTML with the form to create a Artist.
view.replaceArtistForm();
const artistSubmit = document.getElementById("artistSubmit");
const model = {
    // Creates a new artist to POST in API.
    submitNewArtist: function () {
        let newArtist = {
            name: artistName.value,
            born: artistDateBorn.value,
            gender: artistGender.value,
            genres: artistGenre.value,
            spotifyURL: artistSpotifyUrl.value,
            coverImage: artistImgLink.value,
        }
        fetch('https://folksa.ga/api/artists?key=flat_eric', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newArtist),
        })
            .then((response) => response.json())
            .then((newArtist) => {
                console.log(newArtist);
            });
    }
}
artistSubmit.addEventListener("click", function (e) {
    model.submitNewArtist();
    e.preventDefault();
    console.log(newArtist);
})