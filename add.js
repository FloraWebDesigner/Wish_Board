import {initializeApp} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import {
    getDatabase,
    push,
    serverTimestamp,
    set,
    ref
} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";

import { getAllEmoji} from "./api.js";

//https://console.firebase.google.com/project/love-board-ad5ca/database/love-board-ad5ca-default-rtdb/data
const firebaseConfig = {
    apiKey: "AIzaSyBd_782Cn17jjvRisbr621Eoz5ZlUpsW3I",
    authDomain: "love-board-ad5ca.firebaseapp.com",
    databaseURL: "https://love-board-ad5ca-default-rtdb.firebaseio.com",
    projectId: "love-board-ad5ca",
    storageBucket: "love-board-ad5ca.firebasestorage.app",
    messagingSenderId: "1034054926905",
    appId: "1:1034054926905:web:c055cb044554f6fa70c3e8",
    measurementId: "G-N1T3XKYE7Y"
  };


  loadEmojis();

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  // Initializa Database
  const database = getDatabase();
  const messages = ref(database, "/messages");

  submit.addEventListener("click", function () {
    const name = document.getElementById("name");
    const wish = document.getElementById("wish");
    const emojiSelect = document.getElementById("emoji-select");
    const anonymous = document.getElementById("anonymous").checked;

    const userName = anonymous ? "Anonymous" : name.value;
    const selectedUnicodeName = emojiSelect.value;

    const newMessage = push(messages);

    console.log({
        name: userName,
        wish: wish.value,
        emoji: selectedUnicodeName,
        createdAt: serverTimestamp(),
    });
    set(newMessage, {
        name: userName,
        wish: wish.value,
        emoji: selectedUnicodeName,
        createdAt: serverTimestamp(),
    });

    name.value = "";
    wish.value = "";
    emojiSelect.value = "";   
});

  async function loadEmojis() {
    const emojiList = await getAllEmoji();
    console.log(emojiList); 
    const emojiSelect = document.getElementById("emoji-select");

    emojiList.forEach(emoji => {
        const option = document.createElement("option");
        option.value = emoji.unicodeName; 
        option.textContent = emoji.character; 
        emojiSelect.appendChild(option); 
    });
}

