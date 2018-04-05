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
    console.log(artistID.value);
    deleteFunction('artists', artistID.value);
    document.getElementById('artistID').value = '';
    
});

// Deletes album by ID
const deleteAlbumButton= document.getElementById("deleteAlbumButton");

deleteAlbumButton.addEventListener("click", function (e) {
    const albumID = document.getElementById("albumID");
    
    e.preventDefault();
    console.log(albumID.value);
    deleteFunction('albums', albumID.value);
    document.getElementById('albumID').value = '';
});