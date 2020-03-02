let baseURL = 'http://localhost:3000'
let eventsURL = `${baseURL}/events`

document.addEventListener("DOMContentLoaded", () => {
    fetch(eventsURL)
    .then(response => { 
        // response.json()
        console.log(response.json())
    })
    .then(eventsJSON => {

        // let testFetchResponse = document.querySelector("h1")
        // testFetchResponse.innerText = eventsJSON
    })
})