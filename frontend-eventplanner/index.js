let baseURL = 'http://localhost:3000'
let eventsURL = `${baseURL}/events`
 
document.addEventListener("DOMContentLoaded", () => {
    console.log("We are loaded now")

    let events = fetch(eventsURL)
    .then(response => response.json())  
    .then(eventsJSON);

    function eventsJSON(resp) {
        console.log("we are receiving response");
        console.log(resp);
    }

})
    
