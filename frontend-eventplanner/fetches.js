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

function fetchUsersCreatedEvents() {
    // GET      | returns array of event JSONs
    fetch(EVENTSURL)
    .then(response => response.json())
    .then(filterEventsByUserId)
    function filterEventsByUserId(resp) {
        
    }
}

function fetchCreateNewEvent() {          // This does not reload DOM but is posting correctly
    // POST     |
    let data = getDataFromCreateEventForm()
    data['user_id'] = loggedInID
    console.log(data)

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

function fetchLogin() {
    console.log("LOGIN METHOD STARTED")
    // GET      | returns userID to then set

    // let loginUsername = document.querySelector('#login-username').value
    // console.log(`loginusername: ${loginUsername}`)

    // fetch(USERSURL)
    // .then(response => response.json())
    // .then(findUserInList)
    // .then(resp => {
    //     if (!!loggedInID) {
            document.querySelector('#login-signup').style.display = "none"
            document.querySelector('#logout').style.display = "inline"
            fetchAllEvents()
    //         console.log(`OUTSIDE this function and after the fetch, loggedInId = ${loggedInID}`)
    //     } else {
    //         alert('Incorrect username. Please try again.')
    //         location = location
    //         console.log(`OUTSIDE this function, the loggedInId did not get saved!`)
    //     }
    //     console.log(`just for fun: resp : ${resp}`)
    // })
    // function findUserInList(response) {
    //     console.log(response)
    //     response.forEach(user => {
    //         if (user.username == loginUsername) {
    //             loggedInID = user.id
    //             console.log(`REQUESTED MATCHES ${user.username} YAY`)
    //         } else {
    //             console.log(`REQUESTED DOES NOT MATCH ${user.username}`)
    //         }
    //     })
    //     console.log(`inside this function, loggedinid = ${loggedInID}`)
    // }
}

function fetchSignup(userData) {
    // POST     | adds user to db, returns newly created userID

    fetch(USERSURL,{
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
    .then(response => response.json())
    .then(newUser => {
        loggedInID = newUser.id
        console.log(`loggedInID set to ${loggedInID}`)
    })
}