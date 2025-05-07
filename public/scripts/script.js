const popover = document.querySelector(".popover");

// Toggle popover bij klikken op message-btn
document.querySelectorAll(".message-btn, .close-popover").forEach(btn => {
    btn.addEventListener("click", () => {
        popover.classList.toggle("active");
    });
});

// Success state handling
document.querySelector("form").addEventListener("submit", async function (event) {
    event.preventDefault(); // Voorkom standaard form-verzending
        document.querySelector('.success-message').classList.remove('inactive');
});
