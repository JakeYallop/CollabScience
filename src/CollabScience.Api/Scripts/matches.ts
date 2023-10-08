import { getProfileInformation } from "./profile.js";
import projectsApi from "./projectsApi.js";

window.addEventListener("DOMContentLoaded", () => {
    const profile = getProfileInformation();
    if (!profile || !profile.matchedWith) {
        document.getElementById("no-profile-message")?.classList.add("shown");
    }
    loadMatches(profile?.matchedWith ?? []);
});

async function loadMatches(projectIds: number[]) {
    const projectsResponse = await projectsApi.getProjects(projectIds);
    const projects = await projectsResponse.json();
    if (projects.length === 0) {
        const noMatchesHtml = `
            <h4>No matches found.
            <a href=/match>Go to the match page to find more matches.</a>
            </h4>
        `;
        document.getElementById("matches")!.innerHTML = noMatchesHtml;
        document.getElementById("go-to-match-page")?.remove();
        return;
    }

    //<th>Image</th>
    // <td><img src="${project.imageUrl}" alt="Project image"></td>
    const matchHtml = `
<table>
<tr>
<th>Project</th>
<th>Description</th>
<th></th>
</tr>
${projects
    .map(
        project => `
        <tr>
        <td>${project.name}</td>
        <td>${project.description}</td>
        <td><a href="${project.url}" target="_blank" >Go to project page</a></td>
        </tr>
        `
    )
    .join("")}
    </table>
    `;
    document.getElementById("matches")!.innerHTML = matchHtml;
}
