const BASEURL = 'http://localhost:3000'
const EVENTSURL = `${BASEURL}/events`
const USERSURL = `${BASEURL}/users`
const TICKETSURL = `${BASEURL}/tickets`
// users has 

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
    let data = {
        user_id: userID,
        event_id: eventID
    }
    console.log(`data:`)
    console.log(data)
    // POST     |
    fetch(TICKETSURL, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(resp => console.log(resp.json()))
}

function fetchUsersTickets(userID) {
    // GET      | returns array of ticket JSONs
    fetch(USERSURL)
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
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(resp => {
        console.log(`post successful:`)
        console.log(resp)
    })

}

function fetchLogin(loginUsername) {
    // GET      | returns userID to then set
    fetch(USERSURL)
    .then(response => response.json())
    .then(response => findUserInList(response))
    function findUserInList(response) {
        let userID = response.forEach(user => {
            console.log(user)
            if (user.username == loginUsername) {
                loggedInID = user.id
                console.log(`loggedInID set to ${loggedInID}`)
            }
        })
    }
}

function fetchSignup(userData) {
    // POST     | adds user to db, returns newly created userID
    
}