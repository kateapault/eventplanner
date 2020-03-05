const BASEURL = 'http://localhost:3000'
const EVENTSURL = `${BASEURL}/events`
const USERSURL = `${BASEURL}/users`
const TICKETSURL = `${BASEURL}/tickets`
let loggedInID
 
document.addEventListener("DOMContentLoaded", () => {
    console.log("We are loaded now")
    document.querySelector('#logout').style.display = "none"
    generateSignupForm()
    generateLoginForm()

    document.querySelector("#login-form").addEventListener("submit",(event) => {
        event.preventDefault()
        fetchLogin()
    })
    


    // document.querySelector("#signup-form").addEventListener("submit",(event) => {
    //     event.preventDefault()
    //     let signupData = getDataFromSignupForm()
    //     fetchSignup(signupData)

    // document.querySelector("form").addEventListener("submit",(event) => {
    //     event.preventDefault()
    //     fetchCreateNewEvent("1")
    //     document.querySelector("form").reset()
    // })

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

        let viewDiv = document.create
        switch (clickedElement.id) {
            case "show-events":
                allEvents()
            case "create-event":
                createEvent()
            case "my-tickets":
                myTickets()
            case "my-created-events":
                myCreatedEvents()
            case "logout":
                location = location
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
        console.log("we are receiving response for fetch all events");
        showEvents(resp)
    }
}

function showEvents(eJSON){ /////////////////////////////////////////////////////////
    let cardsDiv = document.querySelector('.cards')
    eJSON.forEach(event => {
        cardsDiv.appendChild(eventDisplay(event))
    });
}

function eventDisplay(eJSON){ //////////////////////////////////////////////////////////
    let eventWrapper = document.createElement('div');
    eventWrapper.className = "wrapper"

    let eventElement = document.createElement('div');
    eventWrapper.appendChild(eventElement)

    eventElement.setAttribute('data-user-id', eJSON["user_id"])

    // eventElement.dataset.userId = eJSON["user_id"] is equivalent. 
    
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




    //////////////////////////////////////////////////////
   //////////////////////////////////////////////////////
  ////////////// DISPLAY USER'S TICKETS ////////////////
 //////////////////////////////////////////////////////
//////////////////////////////////////////////////////

function myTickets() { ///////////////////////////////////////////////////////////
    document.querySelector("#main-view").innerHTML = ''

}

function fetchUsersTickets(userID) { //////////////////////////////////////////////
    // GET      | returns array of ticket JSONs
    fetch(USERSURL)
    .then(response => response.json())
    .then(eventJSON);
    function eventJSON(resp){
        console.log(`resp: ${resp}`)
        // show concerts 
        // if (ticket.user_id === userID) {
        //     console.log(ticket)
        // }
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
    let mainDiv = document.querySelector('#main-view')

    let createEventForm = document.createElement('form')
    

    document.querySelector('#date').setAttribute('max',${todaysDate()})
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
    document.querySelector("#main-view").innerHTML = ''
}

function fetchUsersCreatedEvents() { ///////////////////////////////////////////////
    // GET      | returns array of event JSONs
    let usersCreatedEvents = []
    fetch(USERSURL)
    .then(response => response.json())
    .then(resp => {
        console.log(`loggedInId: ${loggedInID}`)
        resp.forEach(user => {
            if (user.id == loggedInID) {
                console.log("we have a match!")
                usersCreatedEvents = user.events
            } else {
                console.log("no match")
            }
        })
    })
    return usersCreatedEvents
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

function generateSignupForm() { //////////////////////////////////////////////////
    let viewDiv = document.querySelector("div#main-view")

    let signupForm = document.createElement('form')
    signupForm.id = 'signup-form'
    newInput('text','username','username','Username: ',signupForm)
    newInput('text','name','Firstname Lastname','Name: ',signupForm)
    newInput('number','age','18','Age: ',signupForm)
    newInput('text','email','me@example.com','Email: ',signupForm)
    newInput('number','phone_number','5556667788','Phone: ',signupForm)

    let submitButton = document.createElement('button')
    submitButton.id = 'signup-submit'
    submitButton.innerText = 'Sign Up'
    signupForm.appendChild(submitButton)

    viewDiv.appendChild(signupForm)
}

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

function generateLoginForm() { ////////////////////////////////////////////////////
    let viewDiv = document.querySelector("div#main-view")
    
    let loginForm = document.createElement('form')
    loginForm.id = "login-form"
    newInput('text','login-username','login-username','Username: ',loginForm)

    let submitButton = document.createElement('button')
    submitButton.id = 'login-submit'
    submitButton.innerText = 'Sign Up'
    loginForm.appendChild(submitButton)

    viewDiv.appendChild(loginForm)
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