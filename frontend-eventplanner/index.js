let baseURL = 'http://localhost:3000'
let eventsURL = `${baseURL}/events`
 
document.addEventListener("DOMContentLoaded", () => {
    console.log("We are loaded now")
    // turnOffDivsExcept('show-events')
    // document.querySelector('#create-event').style.display = "none"
    fetchAllEvents()
    // let events = fetch(eventsURL)
    // .then(response => response.json())  
    // .then(eventsJSON);

    let events = fetch(eventsURL)
    .then(response => response.json())  
    .then(showEvents);

})
    
function showEvents(eJSON){
    let showEventsDiv = document.querySelector('#show-events')
    showEventsDiv.style.display = "block"
    eJSON.forEach(event => {
        showEventsDiv.appendChild(eventDisplay(event))
    });
}

///////////////////////////////////////
///////////////////////////////////////

function eventDisplay(eJSON){
    let eventElement = document.createElement('div')

    eventElement.setAttribute('data-user-id', eJSON["user_id"])

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
        eventElement.appendChild(eventMaxAttendees)
    }

    if (eventJSON["max_attendees"]){
        let eventMaxAttendees = document.createElement('p')
        eventMaxAttendees.innerText = `Tickets Left: ${eventJSON["max_attendees"]}`
        console.log("this value is not null!")
        eventElement.appendChild(eventMaxAttendees)
    }
    
    let buyTicketButton = document.createElement("button")
    buyTicketButton.setAttribute('data-event-id',eventJSON.id)
    buyTicketButton.innerText = "Buy Ticket"
    eventElement.appendChild(buyTicketButton)

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

