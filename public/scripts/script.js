const popover = document.querySelector(".popover");

// Toggle popover bij klikken op message-btn
document.querySelectorAll(".message-btn, .close-popover").forEach(btn => {
    btn.addEventListener("click", () => {
        popover.classList.toggle("active");
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const skeleton = document.getElementById("skeleton-wrapper");
    const drops = document.getElementById("drops-wrapper");
  

    setTimeout(() => {
      if (skeleton) skeleton.style.display = "none";
      if (drops) drops.style.display = "block";
    }, 2000);
  });