var modal = document.getElementById('modal');

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
}

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