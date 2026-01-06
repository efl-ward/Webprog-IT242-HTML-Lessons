// script.js — simple JS for 70% success
document.addEventListener("DOMContentLoaded", function () {
    const greeting = document.getElementById("greeting");
    const hour = new Date().getHours();

    if (hour < 12) {
        greeting.textContent = "Good Morning! I'm Eduard Serna";
    } else if (hour < 18) {
        greeting.textContent = "Good Afternoon! I'm Eduard Serna";
    } else {
        greeting.textContent = "Good Evening! I'm Eduard Serna";
    }

    // Optional: simple console message to show JS works
    console.log("JavaScript loaded: Greeting updated based on time of day.");
});
