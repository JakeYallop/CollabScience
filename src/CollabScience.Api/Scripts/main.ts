import { getProfileInformation } from "./profile.js";

window.addEventListener("DOMContentLoaded", () => {
    const getStartedButton = document.querySelector("#getStarted");
    if (!getStartedButton) {
        return;
    }

    const profile = getProfileInformation();
    if (profile) {
        getStartedButton.textContent = "Go to matches";

        getStartedButton!.addEventListener("click", () => {
            window.location.assign("match");
        });
    } else {
        getStartedButton!.addEventListener("click", () => {
            window.location.assign("profile");
        });
    }
});
