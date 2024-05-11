const { invoke } = window.__TAURI__.tauri;
//import { emit, listen } from '@tauri-apps/api/event'

//import tauriapi from '@tauri-apps/api'

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command

let greetInputEl;
let greetMsgEl;
let fileListEl;

async function greet() {
  // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
  greetMsgEl.textContent = await invoke("greet", { name: greetInputEl.value });
  await invoke("get_files");
  addChildEntry("orange");
}

async function addChildEntry(item_name) {
  const newChild = document.createElement("button");

  newChild.appendChild(document.createTextNode(item_name));

  //document.getElementById("file-list").appendChild(newChild)

  fileListEl.appendChild(newChild);
}

window.addEventListener("DOMContentLoaded", () => {
  greetInputEl = document.querySelector("#greet-text-input");
  greetMsgEl = document.querySelector("#greet-msg");
  fileListEl = document.querySelector("#file-list");

  document.querySelector("#greet-form").addEventListener("submit", (e) => {
    e.preventDefault();
    greet();
    addChildEntry("blue");
  });

  window.addEventListener("event1", (event) => {
    event.preventDefault();
    // addChildEntry(event.payload)
    addChildEntry("aab");
  });
  
  
  setupListener();
  addChildEntry("green");

  emit_event_23();
  addChildEntry("green2");
});


// import { emit, listen } from '@tauri-apps/api/event'

// listen to the `click` event and get a function to remove the event listener
// there's also a `once` function that subscribes to an event and automatically unsubscribes the listener on the first event
async function setupListener() {
  const unlisten = await listen('click', (event) => {
    // event.event is the event name (useful if you want to use a single callback fn for multiple event types)
    // event.payload is the payload object
    //addChildEntry(event.payload.theMessage);
    addChildEntry("bbbbbbbbbbb")
  })
}

async function emit_event_23() {
  emit('click', {
    theMessage: 'Tauri is awesome!',
  })
}


