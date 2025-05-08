import {initializeApp} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import {
    getDatabase,
    onValue,
    ref
} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";

import {getOneEmoji,getAllEmoji } from "./api.js";

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

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // Initializa Database
  const database = getDatabase();
  const messages = ref(database, "/messages");

  // Load messages on data event
  onValue(
    messages,
    async (snapshot) => {
        // Create a reference
        const ul=document.getElementById('wishes');
        ul.replaceChildren();
        const messages = snapshot.val();
        const allEmojis = getAllEmoji();

         let isFirstElement = true;

    for (const key in messages) {
        if (messages.hasOwnProperty(key)) {
            const childData = messages[key]; 

        
                // Fetch the emoji character from the API
                const selectedUnicodeName = childData.emoji;
                const emojiCharacter = getOneEmoji(selectedUnicodeName);
        
                // Create a new element to hold both emoji and text
                const li = document.createElement("li");
                li.classList.add('animation');
                
                // Set the background and padding for the li (container)
                li.style.background = getRandomColor();
                li.style.display = "flex"; // Use flexbox to align emoji and text
                li.style.alignItems = "center"; // Center the items vertically
                li.style.padding = "5px 5px"; // Add padding to the container
                li.style.margin = "5px"; // Optional: Add margin for spacing between list items
                li.style.animationDuration = `${16 + Math.random() * 8}s`;
                // Create the emoji element and set the font size
                const emojiElement = document.createElement("span");
                emojiElement.textContent = emojiCharacter;
                emojiElement.style.fontSize = "3em";
                emojiElement.style.position = "relative";
                emojiElement.style.left = "-0.4em";
                emojiElement.style.top = "-0.1em";

                const textElement = document.createElement("span");
                textElement.textContent = childData.name + ": " + childData.wish;
                textElement.style.position = "relative";
                textElement.style.left = "-1.2em"; 
        
                li.appendChild(emojiElement);
                li.appendChild(textElement);
        
                if (isFirstElement) {
                    li.style.animationDelay = "0"; 
                    isFirstElement = false; 
                } else {
                    li.style.animationDelay = getRandomDelay(8);
                }
                const position = getRandomPosition();
                li.style.top = position.top;
                li.style.left = position.left;

                const direction = getRandomDirection();
                if (direction === 'left') {
                    li.style.animationName = 'moveLeft';
                } else {
                    li.style.animationName = 'moveRight';
                }
                ul.appendChild(li);
            }
        }        
});

function getRandomColor() {
    // puple yellow red
    const colorArr=['rgba(131, 56, 236, 0.5)','rgba(255, 189, 0, 0.5)','rgba(112, 224, 0,0.5)'];
    const random = Math.floor(Math.random() * colorArr.length);
    return colorArr[random];
}

function getRandomDirection() {
    const directions = ['left', 'right'];
    return directions[Math.floor(Math.random() * directions.length)];
}

let lastPosition = window.innerHeight * 0.25; 
const minDistance = 80; 

function getRandomPosition() {
    const left = Math.random() * (window.innerWidth - 300);     
    const top = lastPosition;
    lastPosition += minDistance;
    if (lastPosition > window.innerHeight) {
        lastPosition = window.innerHeight * 0.2; 
    }

    return { left: left + 'px', top: top + 'px' };
}

function getRandomDelay(maxSeconds) {
    return `${Math.random() * maxSeconds}s`; 
}


const video = document.getElementById('myVideo');
// Set playback speed to 0.5 (half speed)
video.playbackRate = 0.5;
