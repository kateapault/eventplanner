url = 'http://localhost:3000/events'

document.addEventListener("DOMContentLoaded", (event) => {
    fetch(url)
    .then(response => { 
        response.json()
    })
    .then(eventsJSON => {
        console.log(eventsJSON)
        let jsonText = document.createElement("h1")
        jsonText.innerText = eventsJSON
    })
})