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
        // show concerts 
        // if (ticket.user_id === userID) {
        //     console.log(ticket)
        // }
    }
}

function fetchUsersCreatedEvents(userID) {
    // GET      | returns array of event JSONs
    fetch(EVENTSURL)
    .then(response => response.json())
    .then(filterEventsByUserId)
    function filterEventsByUserId(resp,userID) {

    }
}

function fetchCreateNewEvent(userID) {          // This does not reload DOM but is posting correctly
    // POST     |
    let data = getDataFromCreateEventForm()
    data['user_id'] = userID
    console.log(data)
    // data['tickets'] = []

    fetch(EVENTSURL, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(resp => {
        console.log(`post successful:`)
        console.log(resp)
    })

}