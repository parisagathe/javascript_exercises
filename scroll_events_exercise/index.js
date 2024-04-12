let playOnce = true;

window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        navbar.style.height = "45px";
    } else {
        navbar.style.height = "90px";
    }

    // Image

    let scrollValue = (window.scrollY + window.innerHeight) / document.body.offsetHeight;

    if (scrollValue > 0.45) {
        imgImprovise.style.opacity = 1;
        imgImprovise.style.transform = "none";
    }

    // Popup

    if (scrollValue > 0.85 && playOnce) {
        popup.style.opacity = 1;
        popup.style.transform = "none";
        playOnce = false;
    }
});

closeBtn.addEventListener("click", () => {
    popup.style.opacity = 0;
    popup.style.transform = "translateX(500px)";
});