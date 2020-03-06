const BASEURL = 'http://localhost:3000'
const EVENTSURL = `${BASEURL}/events`
const USERSURL = `${BASEURL}/users`
const TICKETSURL = `${BASEURL}/tickets`
let loggedInID
 
document.addEventListener("DOMContentLoaded", () => {
    console.log("We are loaded now")
    document.querySelector('#logout').style.display = "none"

    document.querySelector("#login-form").addEventListener("submit",(event) => {
        event.preventDefault()
        fetchLogin()
    })
    
    document.querySelector("#signup-form").addEventListener("submit",(event) => {
        event.preventDefault()
        fetchSignup()
    })


    document.querySelector("#signup-form").addEventListener("submit",(event) => {
        event.preventDefault()
        let signupData = getDataFromSignupForm()
        fetchSignup(signupData)

    document.querySelector("form").addEventListener("submit",(event) => {
        event.preventDefault()
        fetchCreateNewEvent("1")
        document.querySelector("form").reset()
    })

    let mainDiv = document.querySelector("#main-view")
    mainDiv.addEventListener("click", (event) => {
        let clickedElement = event.target
        if (clickedElement.className === "buy-ticket") {
            let eventID = clickedElement.getAttribute("event-id")
            fetchBuyTicket(eventID,"1") // fake user ID
            let ticketsLeft = clickedElement.previousSibling.lastChild
            ticketsLeft.innerText = ticketsLeft.innerText - 1
        }
    })

    // let eventsList = document.querySelector("#show-events")
    // eventsList.addEventListener("click", (event) => {
    //     let clickedElement = event.target
    //     if (clickedElement.className === "buy-ticket") {
    //         let eventID = clickedElement.getAttribute("event-id")
    //         fetchBuyTicket(eventID,"1") // fake user ID
    //         let ticketsLeft = clickedElement.previousSibling.lastChild
    //         ticketsLeft.innerText = ticketsLeft.innerText - 1
    //     }
    // })

    document.querySelector("#nav").addEventListener("click", (event) => {
        let clickedElement = event.target
        console.log(`clicked element: ${clickedElement.id}`)
        switch (clickedElement.id) {
            case "show-events":
                allEvents()
                break
            case "create-event":
                createEvent()
                break
            case "my-tickets":
                myTickets()
                break
            case "my-created-events":
                myCreatedEvents()
                break
            case "logout":
                location = location
                break
        }

    })

}) ////////// DOMContentLoaded ///////////////

    //////////////////////////////////////////////////////
   //////////////////////////////////////////////////////
  ////////////////// SHOW ALL EVENTS ///////////////////
 //////////////////////////////////////////////////////
//////////////////////////////////////////////////////

function allEvents() { ////////////////////////////////////////////////////////////
    document.querySelector("#main-view").innerHTML = ''
    fetchAllEvents()
}

function fetchAllEvents() { //////////////////////////////////////////////////////
    // GET      | returns array of event JSONs
    fetch(EVENTSURL)
    .then(response => response.json())  
    .then(eventsJSON);
    function eventsJSON(resp) {
        showEvents(resp)
    }
}

function showEvents(eJSON){ /////////////////////////////////////////////////////////
    let cardsDiv = document.createElement("div")
    cardsDiv.className = "cards"
    eJSON.forEach(event => {
        cardsDiv.appendChild(eventDisplay(event))
    });

    document.querySelector("#main-view").appendChild(cardsDiv)
}

function eventDisplay(eJSON){ //////////////////////////////////////////////////////////
    let eventWrapper = document.createElement('div');
    eventWrapper.className = "wrapper"

    let eventElement = document.createElement('div');
    eventWrapper.appendChild(eventElement)

    eventElement.setAttribute('data-user-id', eJSON["user_id"])
    eventElement.className = "card"
    
    if (eJSON["img_url"]) {
        let eventImage = document.createElement('img')
        eventImage.setAttribute('src',eJSON["img_url"])
        eventElement.appendChild(eventImage)
    }

    let eventTitle = document.createElement('h2')
    eventTitle.innerText = eJSON.title
    eventElement.appendChild(eventTitle)

    let eventLocation = document.createElement("p")
    eventLocation.innerText = eJSON.location
    eventElement.appendChild(eventLocation)

    if (!!eJSON["min_age"]){
        let eventMaxAge = document.createElement('p')
        eventMaxAge.innerText = `Minimum Age: ${eJSON["min_age"]}`
        eventElement.appendChild(eventMaxAge)
    }

    if (eJSON["max_attendees"]){
        let eventMaxAttendees = document.createElement('p')
        eventMaxAttendees.innerHTML = `Tickets Left: <span class="tickets-left">${eJSON["max_attendees"]-eJSON.tickets.length}</span>`
        eventElement.appendChild(eventMaxAttendees)
    }
    
    if (eJSON.user_id != loggedInID) {
        let buyTicketButton = document.createElement("button")
        buyTicketButton.className = "buy-ticket"
        buyTicketButton.setAttribute('event-id',eJSON.id)
        buyTicketButton.innerText = "Buy Ticket"
        eventElement.appendChild(buyTicketButton)
    }

    return eventWrapper
}

function fetchBuyTicket(eventID,userID) { //////////////////////////////////////////
    let data = {
        user_id: userID,
        event_id: eventID
    }
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




    //////////////////////////////////////////////////////
   //////////////////////////////////////////////////////
  ////////////// DISPLAY USER'S TICKETS ////////////////
 //////////////////////////////////////////////////////
//////////////////////////////////////////////////////

function myTickets() { ///////////////////////////////////////////////////////////
    document.querySelector("#main-view").innerHTML = ''
    fetchUsersTickets()
}

function fetchUsersTickets() { //////////////////////////////////////////////
    let ul = document.createElement('ul')
    document.querySelector('#main-view').appendChild(ul)
    // GET      | returns array of ticket JSONs
    fetch(TICKETSURL)
    .then(response => response.json())
    .then(ticketsJSON);
    function ticketsJSON(resp){
        // ticketDisplay(resp[0],ul)
        resp.forEach(ticket => {
            if (ticket.user_id == loggedInID) {
                ticketDisplay(ticket,ul)
            }
        })
    }
}

function ticketDisplay(ticketJSON,ul) {
    let ticketListing = ul.querySelector(`#event${ticketJSON["event_id"]}`)
    console.log(` THIS TICKET LISTING IS ${ticketListing}`)
    if (ticketListing) {
        console.log("there is already a ticket for this event")
        let numOfTickets = ticketListing.querySelector('span.num-tickets')
        numOfTickets.innerText = parseInt(numOfTickets.innerText) + 1
    } else {
        console.log("there is no ticket for this event yet")
        newTicketListing = document.createElement("div")
        newTicketListing.id = `event${ticketJSON.event_id}`
        newTicketListing.innerHTML += `Event: <span class="event-link">${ticketJSON.event.title}</span><br>My tickets: <span class="num-tickets">1</span>`

        let li = document.createElement('li')
        li.appendChild(newTicketListing)
        ul.appendChild(li)
    }
}


    //////////////////////////////////////////////////////
   //////////////////////////////////////////////////////
  ////////////////// CREATE NEW EVENT //////////////////
 //////////////////////////////////////////////////////
//////////////////////////////////////////////////////

function createEvent() { /////////////////////////////////////////////////////////
    document.querySelector("#main-view").innerHTML = ''
    showCreateEventForm()
}

function showCreateEventForm() { ////////////////////////////////////////////////////////
    // newInput(inputType,inputId,placeholderText,labelText,parentForm) 

    let createEventForm = document.createElement('form')
    newInput('text','title','Event Title','Event Title: ',createEventForm)
    newInput('text','location','New York City','Event Location: ',createEventForm)
    newInput('date','date',todaysDate(),'Date: ',createEventForm)
    newInput('text','start_time','4:00 PM','Start Time: ',createEventForm)
    newInput('text','end_time','10:00 PM','End Time: ',createEventForm)
    newInput('number','max_attendees','30','Total Number of Tickets: ',createEventForm)
    newInput('number','min_age','18','Minimum Age for Event: ',createEventForm)
    newInput('url','img_url','paste image url here','Image URL: ',createEventForm)
    
    let submitButton = document.createElement('button')
    submitButton.id = 'submit'
    submitButton.innerText = 'Sign Up'
    createEventForm.appendChild(submitButton)

    document.querySelector("#main-view").appendChild(createEventForm)
}

function todaysDate() {
    let today = new Date
    let dd = today.getDate()
    dd.length === 1 ? (dd = '0' + dd) : (dd)
    let mm = today.getMonth()
    mm.length === 1 ? (mm = '0' + mm) : (mm)
    let yyyy = today.getFullYear()
    return `${yyyy}-${mm}-${dd}`
}

function getDataFromCreateEventForm() { ///////////////////////////////////////////
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

function fetchCreateNewEvent() { /////////// This does not reload DOM but is posting correctly
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

    //////////////////////////////////////////////////////
   //////////////////////////////////////////////////////
  ////////// DISPLAY USER'S CREATED EVENTS /////////////
 //////////////////////////////////////////////////////
//////////////////////////////////////////////////////

function myCreatedEvents() { ////////////////////////////////////////////////////////
    let mainView = document.querySelector("#main-view")
    mainView.innerHTML = ''

    if (!!loggedInID) {
        fetchUsersCreatedEvents()
    } else {
        mainView.innerHTML = "<h1>Something has gone wrong... there doesn't seem to be a logged in user!</h1>"
    }
}

function fetchUsersCreatedEvents() { ///////////////////////////////////////////////
    // GET      | returns array of event JSONs
    let cardsDiv = document.createElement("div")
    cardsDiv.className = "cards"

    fetch(EVENTSURL)
    .then(response => response.json())
    .then(myEvents)
    function myEvents(resp) {
        resp.forEach(event => {
            if (event.user_id == loggedInID) {
                cardsDiv.appendChild(eventDisplay(event))
            }
        })
    }

    document.querySelector("#main-view").appendChild(cardsDiv)
}

///////////////////////////////////////
///////////////////////////////////////
// function fetchSingleEvent(eventID) {
//     // GET      | returns event JSON
//     fetch(`${EVENTSURL}/${eventID}`)
//     .then(response => response.json())  
//     .then(eventJSON);
//     function eventJSON(resp) {
//         console.log(resp);
//         let singleEventDiv = document.querySelector('#single-event')
//         singleEventDiv.innerHTML = eventDisplaySingle(resp)
//     }
// }

// function eventDisplaySingle(eJSON) {
//     let eventElement = document.querySelector("div#single-event")

//     let eventDateAndTime = document.createElement("div")
//     eventDateAndTime.innerText = `${eJSON.date}`
//     eventDateAndTime.innerText += ` | Start: ${eJSON["start_time"]}`
//     eventDateAndTime.innerText += ` | End: ${eJSON["end_time"]}`
//     eventElement.appendChild(eventDateAndTime)
// }



    //////////////////////////////////////////////////////
   //////////////////////////////////////////////////////
  ////////////////////// SIGN UP FORM //////////////////
 //////////////////////////////////////////////////////
//////////////////////////////////////////////////////


function getDataFromSignupForm() { ///////////////////////////////////////////////
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

function fetchSignup(userData) { /////////////////////////////////////////////////
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

function fetchLogin() { /////////////////////////////////////////////////////////
    // GET      | returns userID to then set
    let loginUsername = document.querySelector('#login-username').value

    fetch(USERSURL)
    .then(response => response.json())
    .then(findUserInList)
    .then(resp => {
        if (!!loggedInID) {
            document.querySelector("#main-view").innerHTML = ''
            document.querySelector('#logout').style.display = 'inline'
            allEvents()
        } else {
            alert('Incorrect username. Please try again.')
            location = location
        }
    })
    function findUserInList(response) {
        response.forEach(user => {
            if (user.username == loginUsername) {
                loggedInID = user.id
            }
        })
    }
}

function newInput(inputType,inputId,placeholderText,labelText,parentForm) { //////////////////////
    let label = document.createElement('label')
    label.setAttribute('for',inputId)
    label.innerText = labelText
    let input = document.createElement('input')
    input.setAttribute('type',inputType)
    input.id = inputId
    input.setAttribute('placeholder',placeholderText)
    parentForm.appendChild(label)
    parentForm.appendChild(input)
}

})