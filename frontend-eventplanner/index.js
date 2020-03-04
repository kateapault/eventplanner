let baseURL = 'http://localhost:3000'
let eventsURL = `${baseURL}/events`
let loggedInID
 
document.addEventListener("DOMContentLoaded", () => {
    console.log("We are loaded now")

    console.log("no loggedInID yet!")
    document.querySelector('#logout').style.display = "none"
    let loginSignup = document.querySelector("div#login-signup")
    loginSignup.style.height = "100vh"
    loginSignup.style.width = "100vw"

    document.querySelector("#login-form").addEventListener("submit",(event) => {
        event.preventDefault()
        fetchLogin()
    })
    
    document.querySelector("#signup-form").addEventListener("submit",(event) => {
        event.preventDefault()
        let signupData = getDataFromSignupForm()
        fetchSignup(signupData)

    })

    document.querySelector("#event-form").addEventListener("submit",(event) => {
        event.preventDefault()
        fetchCreateNewEvent(loggedInID)
        document.querySelector("#event-form").reset()
    })

    let eventsList = document.querySelector("#show-events")
    eventsList.addEventListener("click", (event) => {
        let clickedElement = event.target
        if (clickedElement.className === "buy-ticket") {
            let eventID = clickedElement.getAttribute("event-id")
            fetchBuyTicket(eventID,"1") // fake user ID
            let ticketsLeft = clickedElement.previousSibling.lastChild
            ticketsLeft.innerText = ticketsLeft.innerText - 1
        }
    })

    let logoutButton = document.querySelector('#logout')
    logoutButton.addEventListener("click", () => {
        location = location
    })

    document.querySelector("#nav").addEventListener("click", (event) => {
        let clickedElement = event.target

        let viewDiv = document.create
        switch (clickedElement.id) {
            case "show-events":
                
            case "create-event":

            case "user-tickets":

            case "user-created-events":

            case "logout":
                
        }

    })

}) ////////// DOMContentLoaded ///////////////
    
function showEvents(eventsJSON){
    let showEventsDiv = document.querySelector('#show-events')
    showEventsDiv.style.display = "block"
    eventsJSON.forEach(event => {
        showEventsDiv.appendChild(eventDisplay(event))
    });
}

///////////////////////////////////////
///////////////////////////////////////

function eventDisplay(eventJSON){
    let eventElement = document.createElement('div')
    eventElement.setAttribute('data-user-id', eventJSON["user_id"])

    // eventElement.dataset.userId = eventJSON["user_id"] is equivalent. 

    eventElement.className = "event-list"
    
    if (eventJSON["img_url"]) {
        let eventImage = document.createElement('img')
        eventImage.setAttribute('src',eventJSON["img_url"])
        eventElement.appendChild(eventImage)
    }

    let eventTitle = document.createElement('h2')
    eventTitle.innerText = eventJSON.title
    eventElement.appendChild(eventTitle)

    let eventLocation = document.createElement("p")
    eventLocation.innerText = eventJSON.location
    eventElement.appendChild(eventLocation)


    if (!!eventJSON["min_age"]){
        let eventMaxAge = document.createElement('p')
        eventMaxAge.innerText = `Minimum Age: ${eventJSON["min_age"]}`
        eventElement.appendChild(eventMaxAge)
    }

    if (eventJSON["max_attendees"]){
        let eventMaxAttendees = document.createElement('p')
        eventMaxAttendees.innerHTML = `Tickets Left: <span class="tickets-left">${eventJSON["max_attendees"]-eventJSON.tickets.length}</span>`
        eventElement.appendChild(eventMaxAttendees)
    }
    
    if (eventJSON.user_id != loggedInID) {
        let buyTicketButton = document.createElement("button")
        buyTicketButton.className = "buy-ticket"
        buyTicketButton.setAttribute('event-id',eventJSON.id)
        buyTicketButton.innerText = "Buy Ticket"
        eventElement.appendChild(buyTicketButton)
    }

    return eventElement
}

function eventDisplaySingle(eventJSON) {
    let eventElement = document.querySelector("div#single-event")

    let eventDateAndTime = document.createElement("div")
    eventDateAndTime.innerText = `${eventJSON.date}`
    eventDateAndTime.innerText += ` | Start: ${eventJSON["start_time"]}`
    eventDateAndTime.innerText += ` | End: ${eventJSON["end_time"]}`
    eventElement.appendChild(eventDateAndTime)
}


////////////////////////////////
////////////////////////////////

function showEventForm() {
    document.querySelector('#show-events')
    document.querySelector('#create-event')
    let today = new Date
    let dd = today.getDate()
    dd.length === 1 ? (dd = '0' + dd) : (dd)
    let mm = today.getMonth()
    mm.length === 1 ? (mm = '0' + mm) : (mm)
    let yyyy = today.getFullYear()
    document.querySelector('#date').setAttribute('max',`${yyyy}-${mm}-${dd}`)
}

function turnOffDivsExcept(divIdToKeep) {
    let divs = document.querySelectorAll("body>div")
    divs.forEach( div => {
        // switch div.id
        if (div.id === "nav" || div.id === divIdToKeep) {
            div.style.display = "block"
        } else {
            div.style.display = "none"
        }
    })
}

function getDataFromCreateEventForm() {
    // make empty data hash
    let newEventData = {
        title: null,
        location: null,
        date: null,
        start_time: null,
        end_time: null,
        min_age: null,
        max_attendees: null,
        img_url: null
    }
    
    for (let [key,value] of Object.entries(newEventData)) {
        newEventData[`${key}`] = document.querySelector(`#${key}`).value
    }

    return newEventData
}

function getDataFromSignupForm() {
    let newUserData = {
        username: null,
        name: null,
        age: null,
        email: null,
        phone: null
    }

    for (let [key,value] of Object.entries(newUserData)) {
        newUserData[`${key}`] = document.querySelector(`#${key}`).value
    }

    return newUserData
}

function showUsersCreatedEvents() {
    let userCreatedEventsDiv = document.querySelector("#user-created-events")
    let myEvents = fetchUsersCreatedEvents()
    userCreatedEventsDiv.innerText = showEvents(myEvents)
}

function showUsersTickets() {
    let usersTicketsDiv = document.querySelector("#user-tickets")
    let myTickets = fetchUsersTickets()
    // myTickets = fetchEventInfoForTickets(myTickets)
    usersTicketsDiv.innerText = myTickets
}

function actionsAfterLogin() {
    document.querySelector('#login-signup').style.display = "none"
    document.querySelector('#logout').style.display = "inline"
    fetchAllEvents()
    showUsersCreatedEvents()
    showUsersTickets()
}


function allEvents() {
    fetchAllEvents()
}

function createEvent() {
    // fetchCr
    eateNewEvent(loggedInID)
}
