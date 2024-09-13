function getNextFriday13th(startDate = new Date()) {
    let date = new Date(startDate);
    date.setDate(date.getDate() + 1); // Start from the next day
    while (date.getDay() !== 5 || date.getDate() !== 13) {
        date.setDate(date.getDate() + 1);
    }
    return date;
}

function updateCountdown(targetDate, countdownElement) {
    const now = new Date();
    const timeLeft = targetDate - now;

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    countdownElement.querySelector('[id$=days]').textContent = days;
    countdownElement.querySelector('[id$=hours]').textContent = hours;
    countdownElement.querySelector('[id$=minutes]').textContent = minutes;
    countdownElement.querySelector('[id$=seconds]').textContent = seconds;

    return timeLeft <= 0;
}

function surprise() {
    document.body.classList.add('spooky-active');
    document.querySelector('h1').textContent = "It's Friday the 13th! Beware!";
    
    const nextFridayContainer = document.getElementById('next-friday-container');
    nextFridayContainer.style.display = 'block';
    
    const nextNextFriday13th = getNextFriday13th(new Date());
    document.getElementById('next-next-friday').textContent = `Date: ${nextNextFriday13th.toDateString()}`;

    // Hide the main countdown
    document.getElementById('countdown').style.display = 'none';

    // Show a message in place of the main countdown
    const mainContainer = document.getElementById('main-container');
    let message = document.getElementById('friday-13th-message');
    if (!message) {
        message = document.createElement('p');
        message.id = 'friday-13th-message';
        message.style.fontSize = '2rem';
        message.style.marginTop = '2rem';
        mainContainer.appendChild(message);
    }
    message.textContent = "It's here! Check the side box for the next one!";

    // Apply the appropriate background color
    applyBackgroundColor();
}

function updateDates() {
    const today = new Date();
    const nextFriday13th = getNextFriday13th();

    document.getElementById('today-date').textContent = `Today's Date: ${today.toDateString()}`;
    document.getElementById('next-friday').textContent = `Next Friday the 13th: ${nextFriday13th.toDateString()}`;

    if (today.getDay() === 5 && today.getDate() === 13) {
        surprise();
    }
}

function update() {
    const today = new Date();
    const mainCountdown = document.getElementById('countdown');
    const nextCountdown = document.getElementById('next-countdown');
    const nextFriday13th = getNextFriday13th();
    
    if (today.getDay() === 5 && today.getDate() === 13) {
        // It's Friday the 13th
        surprise();
        updateCountdown(getNextFriday13th(today), nextCountdown);
    } else {
        // It's not Friday the 13th
        document.body.classList.remove('spooky-active');
        document.querySelector('h1').textContent = "Spooky Friday the 13th Countdown";
        document.getElementById('next-friday-container').style.display = 'none';
        mainCountdown.style.display = 'flex';
        updateCountdown(nextFriday13th, mainCountdown);

        // Remove the message if it exists
        const message = document.getElementById('friday-13th-message');
        if (message) {
            message.remove();
        }

        // Reset background color based on dark mode
        applyBackgroundColor();
    }
}

function applyBackgroundColor() {
    const today = new Date();
    const isFriday13th = today.getDay() === 5 && today.getDate() === 13;

    if (isFriday13th) {
        if (document.body.classList.contains('dark-mode')) {
            document.body.style.backgroundColor = '#800000'; // Darker red for Friday 13th dark mode
        } else {
            document.body.style.backgroundColor = '#FF0000'; // Bright red for Friday 13th
        }
    } else {
        if (document.body.classList.contains('dark-mode')) {
            document.body.style.backgroundColor = '#4B0000'; // Darker shade of red for normal dark mode
        } else {
            document.body.style.backgroundColor = '#8B0000'; // Dark red for normal mode
        }
    }
}

function toggleDarkMode() {
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    document.body.classList.toggle('dark-mode');
    
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('darkMode', 'enabled');
        darkModeToggle.textContent = 'Turn Dark Mode Off';
    } else {
        localStorage.setItem('darkMode', 'disabled');
        darkModeToggle.textContent = 'Turn Dark Mode On';
    }
    applyBackgroundColor();
}

function shareCountdown() {
    const nextFriday13th = getNextFriday13th();
    const shareText = `Check out the countdown to the next Friday the 13th (${nextFriday13th.toDateString()}) at ${window.location.href}`;
    
    if (navigator.share) {
        navigator.share({
            title: 'Friday the 13th Countdown',
            text: shareText,
            url: window.location.href,
        })
        .catch((error) => console.log('Error sharing', error));
    } else {
        // Fallback for browsers that don't support the Web Share API
        prompt('Copy this link to share:', shareText);
    }
}

function loadDarkModePreference() {
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
        darkModeToggle.textContent = 'Turn Dark Mode Off';
    } else {
        darkModeToggle.textContent = 'Turn Dark Mode On';
    }
    applyBackgroundColor();
}

document.addEventListener('DOMContentLoaded', () => {
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const shareButton = document.getElementById('share-button');

    darkModeToggle.addEventListener('click', toggleDarkMode);
    shareButton.addEventListener('click', shareCountdown);

    // Load user's dark mode preference
    loadDarkModePreference();
});

updateDates();
setInterval(update, 1000);