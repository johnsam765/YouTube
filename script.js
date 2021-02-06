let URL = "https://www.googleapis.com/youtube/v3/playlistItems"
let playlistId = "PLs5NCSnYowgNHLzXapEJDTKF-dlFryat4"
let key = "AIzaSyA0GC2myTCgYivkepiwoua9A6k94-PMcIM"
const vid = document.querySelector("#video")
let options =
{
    playlistId: playlistId,
    key: key,
    part: "snippet",
    maxResults: 10
}
const urlParams = new URLSearchParams(Object.entries(options))

fetch(URL + "?" + urlParams)
    .then((data) => { return data.json() })
    .then(d => {
        let id = d.items[0].snippet.resourceId.videoId
        mainVid(id)
        results(d)
    })

function mainVid(id) {
    vid.innerHTML = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${id}" frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen></iframe>`
}

function results(d) {
    d.items.forEach(i=> {   
    var thumb = i.snippet.thumbnails.medium.url
    var title=i.snippet.title
    var description=i.snippet.description.substring(0,100)
    var vid=i.snippet.resourceId.videoId

    $("main").append(`<article class="item" data-key=${vid}>
    <img src=${thumb} alt="" class="thumb">
    <div class="details">
        <h4>${title}</h4>
        <p>${description}</p>
    </div>
</article>`)
})
}

document.querySelector("main").addEventListener("click",function(e)
{
    let a=e.target.parentElement.getAttribute("data-key");
    mainVid(a)
},false)