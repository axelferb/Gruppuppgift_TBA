fetch('https://folksa.ga/api/albums?key=flat_eric')
    .then((response) => response.json())
    .then((albums) => {
        view.display(albums);
        console.log(albums);
    });

function fetchSingleArtist(artistId) {
    fetch(`https://folksa.ga/api/artists/${artistId}?key=flat_eric`)

        .then((response) => response.json())
        .then((artists) => {

            var artistName = artists.name
            return artistName;
        });
}

const view = {
    display: function (albums) {
        var albumListElement = document.getElementById("listMain")
        var albumList = ''
        var artistName = ""
        
        for (i = 0; i < albums.length; i++) {
            artistName = fetchSingleArtist(albums[i].artists[0])
            
            console.log(artistName)
            albumList +=`
                <p> 
                    ${albums[i].title} 
                    ${artistName}
                </p>
            `
        }
        albumListElement.innerHTML = albumList;
    }
}

window.onscroll = function() {
    navbarOpacity();
}

function navbarOpacity() {
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        document.getElementById('navbar').style.backgroundColor = "transparent";
        document.getElementById('searchBar').style.display = "none";
        document.getElementById('navbarLogo').style.filter = "invert(100%)";
    } else {
        document.getElementById('navbar').style.backgroundColor = "#000000";
        document.getElementById('searchBar').style.display = "block";
        document.getElementById('navbarLogo').style.filter = "invert(0%)";
    }
}

/*aids = "5aae2d13b9791d0344d8f717"

fetchSingleArtist(aids).then(artistName => {
    console.log(artistName)
    return artistName
});*/
