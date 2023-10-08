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
        return;
    }

    //<th>Image</th>
    // <td><img src="${project.imageUrl}" alt="Project image"></td>
    const matchHtml = `
<table>
<tr>
<th>Project</th>
<th>Description</th>
</tr>
${projects
    .map(
        project => `
        <tr>
        <td>${project.name}</td>
        <td>${project.description}</td>
        </tr>
        `
    )
    .join("")}
    </table>
    `;
    document.getElementById("matches")!.innerHTML = matchHtml;
}
