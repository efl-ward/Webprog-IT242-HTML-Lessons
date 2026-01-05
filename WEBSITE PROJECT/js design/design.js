// Change greeting based on time of day
document.addEventListener('DOMContentLoaded', () => {
    const greeting = document.getElementById('greeting');
    const hour = new Date().getHours();
    
    let message = "Welcome to my profile!";
    if (hour < 12) message = "Good Morning! I'm Mark Ani";
    else if (hour < 18) message = "Good Afternoon! I'm Mark Ani";
    else message = "Good Evening! I'm Mark Ani";
    
    greeting.innerText = message + " • IT Student @ APC";

    // Small interaction for skills
    const badges = document.querySelectorAll('.skill-badge');
    badges.forEach(badge => {
        badge.onmouseover = () => badge.style.backgroundColor = "#0d6efd";
        badge.onmouseover = () => badge.style.color = "white";
        badge.onmouseout = () => badge.style.backgroundColor = "#e7f1ff";
        badge.onmouseout = () => badge.style.color = "#0d6efd";
    });
});