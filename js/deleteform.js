function deleteFunction(param, id) {
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

// Deletes artist by ID
const deleteArtistButton = document.getElementById("deleteArtistButton");

deleteArtistButton.addEventListener("click", function (e) {
    const artistID = document.getElementById("artistID");
    
    e.preventDefault();
    deleteFunction('artists', artistID.value);
    document.getElementById('artistID').value = '';
    console.log("Artist with ID:" + " " + artistID.value + " " + "was successfully deleted!");
});

// Deletes album by ID
const deleteAlbumButton= document.getElementById("deleteAlbumButton");

deleteAlbumButton.addEventListener("click", function (e) {
    const albumID = document.getElementById("albumID");
    
    e.preventDefault();
    deleteFunction('albums', albumID.value);
    document.getElementById('albumID').value = '';
    console.log("Album with ID:" + " " + albumID.value + " " + "was successfully deleted!");
});