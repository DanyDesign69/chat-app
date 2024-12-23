const socket = io();

document.getElementById('message-input').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        sendMessage();
    } else {
        showTypingIndicator();
    }
});

let typingTimeout;

function showTypingIndicator() {
    clearTimeout(typingTimeout);
    const username = document.getElementById('username-input').value.trim() || 'Anônimo';
    socket.emit('typing', username);
    typingTimeout = setTimeout(() => {
        socket.emit('stopTyping');
    }, 1000);
}

socket.on('typing', (username) => {
    document.getElementById('typing-indicator').innerText = `${username} está digitando...`;
});

socket.on('stopTyping', () => {
    document.getElementById('typing-indicator').innerText = '';
});

socket.on('receiveMessage', (message) => {
    const chatBox = document.getElementById('chat-box');
    const messageElement = document.createElement('div');
    messageElement.innerHTML = `<strong>${message.username}:</strong> ${message.text}`;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
});

function sendMessage() {
    const usernameInput = document.getElementById('username-input');
    const messageInput = document.getElementById('message-input');
    const username = usernameInput.value.trim() || 'Anônimo';
    const message = messageInput.value.trim();
    
    if (message) {
        socket.emit('sendMessage', { username, text: message });
        messageInput.value = '';
    }
}
