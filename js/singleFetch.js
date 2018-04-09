

// fetching a page with 20 front-end developer job-ads depinding on pageId, 
function getJobs(pageId = 1, WorkId = 7633) {

    fetch(`http://api.arbetsformedlingen.se/af/v0/platsannonser/matchning?kommunid=180&yrkesid=${WorkId}&sida=${pageId}&antalrader=20`)
        .then(function (response) {
            return response.json();
        })
        .then(function (jobData) {
            display(jobData);
        })
        .catch(function (error) {
            console.log(error)
        })
} 



// looping out all the the job-ads
function display(jobData) {
        
    var jobList = jobData.matchningslista.matchningdata
    var jobInfoElement = document.getElementById("listJobs")
    var jobInfo = ''

    
    for (i = 0; i < jobList.length; i++) {
       jobInfo +=
            `
            <div class = "jobWrapper" id="wrapper${[i]}" value="${jobList[i].annonsid}" >
                <h4 class = "arbetsplatsnamn"> ${jobList[i].arbetsplatsnamn.toUpperCase()} </h4>
                <p class = "annonsrubrik"> ${jobList[i].annonsrubrik} </p>   

            </div> 
            `
    }
    jobInfoElement.innerHTML = jobInfo;
    createReadMoreButton();
}



//adding a read more button to every job-ad
function createReadMoreButton() {

    for (i = 0; i < 20; i++) {
        var buttonReadMore = document.createElement("BUTTON");

        var wrapperValue = document.getElementById(`wrapper${[i]}`).getAttribute("value")
        var wrapperId = document.getElementById(`wrapper${[i]}`).appendChild(buttonReadMore);

        var buttonReadMoreValue = document.createTextNode(`Read More`);

        buttonReadMore.appendChild(buttonReadMoreValue);
        buttonReadMore.addEventListener('click', fetchSingleJob.bind(this, wrapperValue));
    }
}


//fetching all avalible front-end developer jobs for the pagination loop.
function getAllJobs(newWorkId = 7633) {

    fetch(`http://api.arbetsformedlingen.se/af/v0/platsannonser/matchning?kommunid=180&yrkesid=${newWorkId}&antalrader=500`)
        .then(function (response) {
            return response.json();
        })
        .then(function (allJobData) {
            createPagination(allJobData)
        })
        .catch(function (error) {
            console.log(error)
        })
}

//fetching a single job ad
function fetchSingleJob(annonsId) {

    fetch(`http://api.arbetsformedlingen.se/af/v0/platsannonser/${annonsId}`)
        .then(function (response) {
            return response.json();
        })
        .then(function (singleJobData) {
            myFunction(singleJobData);
        })
        .catch(function (error) {
            console.log(error)
        })
}



//Get the modal
var modal = document.getElementById('myModal');

//looping out job ad information
function myFunction(singleJobData) {

    var word = document.getElementById("modal-padding");
    var jobInfo = ''
    console.log("ad")

    jobInfo +=
        `
        <h4 class = "arbetsplatsnamn"> ${singleJobData.platsannons.arbetsplats.arbetsplatsnamn.toUpperCase()} </h4>
        <p class = "annonsrubrik"> ${singleJobData.platsannons.annons.annonsrubrik} </p>
        <p class = "annonstext"> ${singleJobData.platsannons.annons.annonstext.replace(/(\r\n|\n|\r)/gm, "<br />")} </p>
        <a href ="${singleJobData.platsannons.annons.platsannonsUrl}"> <button>Search job</button> </a>
        <a href ="${singleJobData.platsannons.arbetsplats.hemsida}"> <button>Homepage</button> </a>
       `

    word.innerHTML = jobInfo;
    modal.style.display = "block";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

getAllJobs();
getJobs();
