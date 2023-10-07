import { makeRequest } from "http";

export interface MatchParameters {
    areasOfInterest?: string[];
    equipment?: string[];
    expertise?: string[];
    alreadyMatched?: number[];
}

export interface Project {
    id: string;
    projectName: string;
    description: string;
    link: string;
    imageUrl: string;
    timeToHelp: string[];
    commitment: string;
    expertise: string[];
    areasOfResearch: string[];
}

const BASE = "/api/match";
const urls = {
    postNextMatch: `${BASE}/match`,
    postNextMatches: (count: number) => `${BASE}/match/${count}`,
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
