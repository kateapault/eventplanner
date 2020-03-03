const BASEURL = 'http://localhost:3000'
const EVENTSURL = `${BASEURL}/events`
const TICKETSURL = `${BASEURL}/tickets`
// users?

function fetchAllEvents() {
    // GET      | returns array of event JSONs
    fetch(EVENTSURL)
    .then(response => response.json())  
    .then(eventsJSON);
    function eventsJSON(resp) {
        console.log("we are receiving response for fetch all events");
        showEvents(resp)
    }
}

function fetchSingleEvent(eventID) {
    // GET      | returns event JSON
    fetch(`${EVENTSURL}/${eventID}`)
    .then(response => response.json())  
    .then(eventJSON);
    function eventJSON(resp) {
        console.log(resp);
        let singleEventDiv = document.querySelector('#single-event')
        singleEventDiv.innerHTML = eventDisplaySingle(resp)
    }
}

function fetchBuyTicket(eventID,userID) {
    // POST     |
}

function fetchUsersTickets(userID) {
    // GET      | returns array of ticket JSONs
    fetch(TICKETSURL)
    .then(response => response.json())
    .then(eventJSON);
    function eventJSON(resp){
        console.log(resp)
        
    }
}

function fetchUsersCreatedEvents(userID) {
    // GET      | returns array of event JSONs
}

function fetchCreateNewEvent(userID) {
    // POST     |
}