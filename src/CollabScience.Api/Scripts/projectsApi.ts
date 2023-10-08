import { makeRequest } from "./http.js";
import { Project } from "./matchApi.js";

const BASE = "/api/projects";

const getProjects = (ids: number[]) => {
    if (ids.length === 0) {
        return Promise.resolve({ json: () => [] });
    }
    const queryString = ids.map(id => `projectIds=${id}`).join("&");
    return makeRequest<Project[]>(`${BASE}?${queryString}`, "GET");
};

const projectsApi = {
    getProjects,
};

export default projectsApi;
