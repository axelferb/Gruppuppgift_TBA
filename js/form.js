const artistSubmit = document.getElementById("artistSubmit");
const artistName = document.getElementById("artistName");
const artistGenre = document.getElementById("genre");
const artistCountry = document.getElementById("artistCountry");
const artistSpotifyUrl = document.getElementById("artistSpotifyUrl");
const artistImgLink = document.getElementById("artistImgLink");
const artistGender = document.getElementById("artistGender");
const artistDateBorn = document.getElementById("artistDateBorn");
// Get time and make it in to ISO format
function getTime() {
    var dateCreated = new Date();
    var ISODate = dateCreated.toISOString();
}
// What happens when you press "submit" on new artist form.
function submitArtistForm() {
    submitNewArtist();
    console.log("Test");
}
// Creates a new artist to POST in API.
function submitNewArtist() {
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
// Submits new artist.
artistSubmit.addEventListener("click", function (e) {
    e.preventDefault();
    submitArtistForm();
});