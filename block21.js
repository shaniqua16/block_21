//Creat a list of names: dates : times: locations: discription of event
// Add a delete button to each event so that the user can remove the event from the list.
//creat a form that the user can input info to creat a new event.
// User input: Name: date: time: location: desription:;
//creat a submitt button so that the user can add new event to display on web page.

const state = {
  event:[],
};
const url= "https://fsa-crud-2aa9294fe819.herokuapp.com/api/2109-CPU-RM-WEB-PT/events";


const buildEvents = () => {
  const col = document.querySelector(".col");
  const eventCard = state.event.map((event) => {
    // console.log(event);
    const card = document.createElement('div');
    const li = document.createElement("li");
// creat and link event on HTML (.col)
    const pTag = document.createElement("p");
    pTag.innerText = event.name;
    const pTag2 = document.createElement("p");
    pTag2.innerText = event.date;
    const pTag3 = document.createElement("p");
    pTag3.innerText = event.description;
    const pTag4 = document.createElement("p");
    pTag4.innerText = event.location;


      const button = document.createElement("button");
button.innerHTML = "delete";
button.setAttribute("id", event.id);
button.addEventListener("click", (e)=>{
deleteEvent(e.target.id);
} )

    li.append(pTag);
    li.append(pTag2);
    li.append(pTag3);
    li.append(pTag4);
    li.append(button);
    card.append(li);
    return card;
  });
  col.replaceChildren(...eventCard)
};
const deleteEvent = async (id) => {
  try {
    console.log(id);
    const response = await fetch(`${url}/${id}`,
      {method:'DELETE'}
    );
    const results = await response.json();
  } catch (error) {
    console.error(error);
  }
  render();
}

const getAllEvent = async () => {
  try {
    const response = await fetch(url);
    const Json = await response.json();
    state.event= Json.data;
  } catch (error) {
    console.error(error);
  }
};

const addNewEvent = async (event) => {
  try {
    const response = await fetch(url, {
      method:"POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(event),
    });
    const results = await response.json();
  } catch (error) {
    console.error(error);
  }
}


const render = async () => {await getAllEvent();
  buildEvents();
}

render ();


const form = document.getElementById("form");

  form.addEventListener("submit", async (e)=>{
    e.preventDefault();
const data = new FormData(e.target);
console.log(data);
const party = {
  name: data.get("name"),
  date: new Date(data.get("date")),
  description:data.get("description"),
  location: data.get("location"),
};
console.log(party);
await addNewEvent(party);
form.reset();
render();
  })

