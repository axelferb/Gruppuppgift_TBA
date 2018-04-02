// Get time and make it in to ISO format
function getTime() {
    var date = new Date();
    var ISODate = date.toISOString();
    console.log(ISODate);
}
// What happens when you press "submit" on new artist form.
function submitArtistForm() {
    getTime();
}
// New artist form.
const artistForm = document.getElementById("artistSubmit")
artistForm.addEventListener("click", submitArtistForm);