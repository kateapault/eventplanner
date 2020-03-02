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
        showEvents(resp)
    }

})
    


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
    eventElement.setAttribute('data-user-id',eventJSON["user_id"])
    eventElement.className = "event-list"
    
    if (!!eventJSON["img_url"]) {
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

    let eventDateAndTime = document.createElement("div")
    eventDateAndTime.innerText = `${eventJSON.date}`
    eventDateAndTime.innerText += ` | Start: ${eventJSON["start_time"]}`
    eventDateAndTime.innerText += ` | End: ${eventJSON["end_time"]}`
    eventElement.appendChild(eventDateAndTime)

    if (!!eventJSON["min_age"]){
        let eventMaxAttendees = document.createElement('p')
        eventMaxAttendees.innerText = `Minimum Age: ${eventJSON["min_age"]}`
        eventElement.appendChild(eventMaxAttendees)
    }

    if (!!eventJSON["max_attendees"]){
        let eventMaxAttendees = document.createElement('p')
        eventMaxAttendees.innerText = `Total Tickets: ${eventJSON["max_attendees"]}`
        console.log("this value is not null!")
        eventElement.appendChild(eventMaxAttendees)
    }
    
    let buyTicketButton = document.createElement("button")
    buyTicketButton.setAttribute('data-event-id',eventJSON.id)
    buyTicketButton.innerText = "Buy Ticket"
    eventElement.appendChild(buyTicketButton)

    return eventElement
}