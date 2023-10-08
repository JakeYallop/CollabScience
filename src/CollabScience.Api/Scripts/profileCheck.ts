import { getProfileInformation } from "./profile.js";

window.addEventListener("DOMContentLoaded", () => {
    const profile = getProfileInformation();
    if (!profile) {
        const noProfileMessage = `
        <div style="position: absolute; top: 0.5em; left: 35%; z-index: 99999">
            <h2>No profile found, <a href="/profile">go to the profile page to setup a profile</a></h2>
        </div>`;
        document.body.insertAdjacentHTML("afterbegin", noProfileMessage);
    }
});
