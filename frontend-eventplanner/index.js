let baseURL = 'http://localhost:3000'
let eventsURL = `${baseURL}/events`
 
document.addEventListener("DOMContentLoaded", () => {
    console.log("We are loaded now")

    fetchAllEvents()

    let events = fetch(eventsURL)
    .then(response => response.json())  
    .then(showEvents);

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

})
    
function showEvents(eJSON){
    let cardsDiv = document.querySelector('.cards')
    // showEventsDiv.style.display = "block"
    eJSON.forEach(event => {
        cardsDiv.appendChild(eventDisplay(event))
    });
}

///////////////////////////////////////
///////////////////////////////////////

function eventDisplay(eJSON){
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
    
    let buyTicketButton = document.createElement("button")
    buyTicketButton.className = "buy-ticket"
    buyTicketButton.setAttribute('event-id',eJSON.id)
    buyTicketButton.innerText = "Buy Ticket"
    eventElement.appendChild(buyTicketButton)

    return eventWrapper
}

function eventDisplaySingle(eJSON) {
    let eventElement = document.querySelector("div#single-event")

    let eventDateAndTime = document.createElement("div")
    eventDateAndTime.innerText = `${eJSON.date}`
    eventDateAndTime.innerText += ` | Start: ${eJSON["start_time"]}`
    eventDateAndTime.innerText += ` | End: ${eJSON["end_time"]}`
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

// function turnOffDivsExcept(divIdToKeep) {
//     let divs = document.querySelectorAll("body>div")
//     divs.forEach( div => {
//         // switch div.id
//         if (div.id === "nav" || div.id === divIdToKeep) {
//             div.style.display = "block"
//         } else {
//             div.style.display = "none"
//         }
//     })
// }

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