# **App Name**: AccessLink

## Core Features:

- Access Popup: Displays a popup/modal on page load to prompt the user for access.
- Email Request: Email Tab: Allows users to enter their email to request access.
- Hash Code Access: Hash Code Tab: Allows users to enter a hash code to gain access.
- AI-Powered Access Code Generation: Uses a generative AI tool to assess the email and automatically generate and send a unique, secure access code to the provided email address. The tool monitors email sending limits, and can suggest alternate email addresses to send from.

## Style Guidelines:

- Primary color: Use a calming blue (#3498db) for the header and main elements.
- Secondary color: Light gray (#f0f0f0) for backgrounds to ensure readability.
- Accent: Emerald green (#2ecc71) for success messages and interactive elements to convey trust and security.
- Ensure the popup is centered and responsive for different screen sizes.
- Use subtle fade-in and fade-out animations for the popup and overlay to create a smooth user experience.
- Incorporate simple, recognizable icons for email and hash code inputs to improve UX.

## Original User Request:
improve this apps idea:

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Access Link Popup</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
        }
        #popup, #overlay {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 1000;
        }
        #popup {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 20px;
            background: white;
            border-radius: 8px;
            box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
            margin: auto;
            width: 300px;
            top: 50%;
            transform: translateY(-50%);
        }
        #overlay {
            background: rgba(0, 0, 0, 0.5);
        }
        h2 {
            margin: 0 0 15px;
        }
        .tab {
            display: flex;
            margin-bottom: 10px;
        }
        .tab button {
            flex: 1;
            padding: 10px;
            border: none;
            background-color: #007bff;
            color: white;
            cursor: pointer;
            border-radius: 4px 4px 0 0;
        }
        .tab button.active {
            background-color: #0056b3;
        }
        .tab-content {
            display: none;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 0 0 4px 4px;
            width: 100%;
        }
        .tab-content.active {
            display: block;
        }
        input {
            margin-bottom: 10px;
            padding: 10px;
            width: 100%;
            border: 1px solid #ccc;
            border-radius: 4px;
        }
        button.submit-btn {
            padding: 10px;
            background-color: #28a745;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            width: 100%;
        }
        button.submit-btn:hover {
            background-color: #218838;
        }
    </style>
</head>
<body>

<div id="overlay"></div>
<div id="popup">
    <h2>Request Access</h2>
    <div class="tab">
        <button id="emailTab" class="active">Request Access</button>
        <button id="hashTab">Access with Hash Code</button>
    </div>
    <div id="emailContent" class="tab-content active">
        <label for="emailInput">Enter Your Email:</label>
        <input type="email" id="emailInput" placeholder="Your Email" required>
        <button class="submit-btn" id="requestAccess">Request Access</button>
    </div>
    <div id="hashContent" class="tab-content">
        <label for="hashInput">Enter Hash Code:</label>
        <input type="text" id="hashInput" placeholder="Hash Code">
        <button class="submit-btn" id="accessWithCode">Access Directly</button>
    </div>
    <button class="submit-btn" id="closePopup">Cancel</button>
</div>

<script>
    window.onload = function() {
        document.getElementById('popup').style.display = 'flex';
        document.getElementById('overlay').style.display = 'block';
    };

    document.getElementById('closePopup').onclick = function() {
        closePopup();
    };

    document.getElementById('requestAccess').onclick = function() {
        const email = document.getElementById('emailInput').value;
        if (validateEmail(email)) {
            const hashCode = generateHashCode();
            sendEmail(email, hashCode);
        } else {
            alert('Please enter a valid email address.');
        }
    };

    document.getElementById('accessWithCode').onclick = function() {
        const hashCode = document.getElementById('hashInput').value;
        if (hashCode) {
            // Logic to verify the hash code would go here
            alert(`Access granted with hash code: ${hashCode}`);
            window.open('https://www.google.com', '_blank'); // Redirect to the link
            closePopup();
        } else {
            alert('Please enter a valid hash code.');
        }
    };

    document.getElementById('emailTab').onclick = function() {
        document.getElementById('emailContent').classList.add('active');
        document.getElementById('hashContent').classList.remove('active');
        document.getElementById('emailTab').classList.add('active');
        document.getElementById('hashTab').classList.remove('active');
    };

    document.getElementById('hashTab').onclick = function() {
        document.getElementById('hashContent').classList.add('active');
        document.getElementById('emailContent').classList.remove('active');
        document.getElementById('hashTab').classList.add('active');
        document.getElementById('emailTab').classList.remove('active');
    };

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    function generateHashCode() {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }

    function closePopup() {
        document.getElementById('popup').style.display = 'none';
        document.getElementById('overlay').style.display = 'none';
    }

    async function sendEmail(email, hashCode) {
        const response = await fetch('/.netlify/functions/sendEmail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, hashCode })
        });

        if (response.ok) {
            alert(`Access granted! A hash code (${hashCode}) will be sent to ${email}.`);
            window.open('https://www.google.com', '_blank'); // Redirect to the link
            closePopup();
        } else {
            alert('Failed to send email. Please try again later.');
        }
    }
</script>

</body>
</html>
  