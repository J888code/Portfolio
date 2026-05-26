const inputElement = document.getElementById("messageInput");
const sendButton = document.getElementById("sendButton");
const messagesContainer = document.getElementById("messages");

const botResponses = [
  { keywords: ["hello", "hi", "hey"], response: "Hi there! 👋" },
  { keywords: ["how are you", "how's it going", "wsg"], response: "I'm doing great, thanks for asking!" },
];
const botCommands = {
  "/help": "Available commands: /help, /dreamrift, /codingtips, /leetcode, /about, /projects, /stack, /goals, /achiements",
  "/dreamrift": "Dreamrift is my Roblox game project.",
  "/codingtips": "Here are my top coding tips: 1. Plan first",
  "/leetcode": "I've solved 16 leetcode problems",
  "/about": "I love tech and coding. I'm doing leetcode and building projects. I'm also creating my own Roblox game called Dreamrift as a solo developer, for devlogs see my yt channel @eggdev888",
  "/projects": "Dreamrift, web scrapper, password checker, cryptography",
  "/stack": "HTML, CSS, JavaScript, Python, Luau",
  "/goals": "Break into big tech.",
  "/achievements": "PCTC - Finals: Merit, 16 leetcode solved"
};

let messagesData = []

function getTimestamp() {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  return `[${hours}:${minutes}]`;
}
function sendMessage() {
    const message = inputElement.value.trim();
    
    // Display user message
    const userDiv = document.createElement("div");
    messagesData.push({ type: "user", text: message, timestamp: getTimestamp() });
    userDiv.className = "user-message";
    userDiv.textContent = getTimestamp()+" "+message;
    messagesContainer.appendChild(userDiv);
    
    // Check for command and display bot response
    if (message.startsWith("/")) {
        if (message in botCommands) {
            const botDiv = document.createElement("div");
            messagesData.push({ type: "bot", text: message, timestamp: getTimestamp() });
            botDiv.className = "bot-message";
            botDiv.textContent = getTimestamp()+" "+botCommands[message];
            messagesContainer.appendChild(botDiv);
        }
    }
    localStorage.setItem("chatMessages", JSON.stringify(messagesData));
    inputElement.value = "";
}

function loadMessages() {
  const saved = localStorage.getItem("chatMessages");
  if (saved) {
    messagesData = JSON.parse(saved);  // JSON.parse converts string back to array
    // Then loop through messagesData and display each message
    for (let msg of messagesData) {
        const div = document.createElement("div");
        div.className = msg.type + "-message";
        div.textContent = msg.text;
        messagesContainer.appendChild(div);
    }
  }
}

sendButton.addEventListener("click", sendMessage);

loadMessages();