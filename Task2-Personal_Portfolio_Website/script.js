const typingText = document.getElementById("typing-text");

const developerRoles = [
    "Full Stack Developer",
    "MERN Stack Developer",
    "Software Engineer"
];

let currentRoleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function animateRoleText() {
    const currentRole = developerRoles[currentRoleIndex];

    typingText.textContent = currentRole.substring(0, charIndex);

    if (!isDeleting) {
        charIndex++;

        if (charIndex > currentRole.length) {
            isDeleting = true;
            setTimeout(animateRoleText, 1200);
            return;
        }
    } else {
        charIndex--;

        if (charIndex < 0) {
            charIndex = 0;
            isDeleting = false;
            currentRoleIndex = (currentRoleIndex + 1) % developerRoles.length;
        }
    }

    setTimeout(animateRoleText,isDeleting ? 45 : 90);
}

animateRoleText();

const back_ToTop_Button = document.getElementById("back-ToTop-Button");

window.addEventListener("scroll", () => {
    back_ToTop_Button.classList.toggle("show", window.scrollY > 400);
});

back_ToTop_Button.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});