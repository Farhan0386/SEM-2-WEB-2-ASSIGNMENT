let events = [];

function addEvent(){
    let title = document.getElementById("title").value;
    let date = document.getElementById("date").value;
    let category = document.getElementById("category").value;
    let desc = document.getElementById("desc").value;

    

    events.push({title, date, category, desc});
    renderEvents();

    document.getElementById("title").value="";
    document.getElementById("date").value="";
    document.getElementById("desc").value="";
}

function renderEvents(){
    let list = document.getElementById("eventList");
    list.innerHTML = "";

    events.forEach((e, index) => {
        list.innerHTML += `
        <div class="event-card">
            <button class="delete" onclick="deleteEvent(${index})">×</button>
            <h3>${e.title}</h3>
            <div class="date">📅 ${e.date}</div>
            <span class="badge">${e.category}</span>
            <p>${e.desc}</p>
        </div>
        `;
    });
}

function deleteEvent(index){
    events.splice(index, 1);
    renderEvents();
}

function clearEvents(){
    events = [];
    renderEvents();
}


console.log("Event Dashboard Loaded");
console.log(events);