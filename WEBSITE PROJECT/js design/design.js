// 1. Dynamic Greeting based on time
const greetingElement = document.getElementById('greeting');
const hour = new Date().getHours();
let welcomeMessage = "";

if (hour < 12) welcomeMessage = "Good Morning! I'm Mark Ani";
else if (hour < 18) welcomeMessage = "Good Afternoon! I'm Mark Ani";
else welcomeMessage = "Good Evening! I'm Mark Ani";

greetingElement.innerText = welcomeMessage + " • IT Student @ APC";

// 2. Simple Skill Highlighter
const badges = document.querySelectorAll('.skill-badge');

badges.forEach(badge => {
    badge.addEventListener('mouseover', () => {
        badge.style.transform = "scale(1.15)";
        badge.style.transition = "0.2s";
    });
    
    badge.addEventListener('mouseout', () => {
        badge.style.transform = "scale(1)";
    });
});