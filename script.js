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
    document.body.style.backgroundColor = '#ff0000';
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
        document.body.style.backgroundColor = '#1a1a1a';
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
    }
}

updateDates();
setInterval(update, 1000);