import { makeRequest } from "./http.js";

export interface MatchParameters {
    areasOfInterest?: string[];
    equipment?: string[];
    expertise?: string[];
    alreadyViewed?: number[];
}

export interface Project {
    id: number;
    name: string;
    description: string;
    url: string;
    imageUrl: string;
    timeToHelp: string[];
    commitment: string;
    expertise: string[];
    areasOfResearch: string[];
}

const BASE = "/api/match";
const urls = {
    postNextMatch: `${BASE}`,
    postNextMatches: (count: number) => `${BASE}/${count}`,
};

const match = (parameters: MatchParameters) => {
    return makeRequest<Project[]>(urls.postNextMatch, "POST", parameters);
};

const matches = (parameters: MatchParameters, count: number) => {
    return makeRequest<Project[]>(urls.postNextMatches(count), "POST", parameters);
};

const matchApi = {
    match,
    matches,
};

export default matchApi;
