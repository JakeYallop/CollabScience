export const ProfileKey = "UserProfile";

export interface ProfileData {
    name: string;
    email: string;
    location: string;
    timeZone: string;
    areasOfInterest: string[];
    contributionTime: string;
    expertise: string[];
    areaOfInterest: string[];
    equipment: string[];
    matchedWith: number[];
    favourites: number[];
}

export function saveProfile(data: ProfileData) {
    localStorage.setItem(ProfileKey, JSON.stringify(data));
}

export function getProfileInformation(): ProfileData | null {
    const profile = localStorage.getItem(ProfileKey);
    if (!profile) {
        return null;
    }
    try {
        const data = JSON.parse(profile);
        return data;
    } catch {
        clearProfile();
        return null;
    }
}

export function clearProfile() {
    localStorage.removeItem(ProfileKey);
}

export function addFavourite(projectId: number) {
    const profile = getProfileInformation();
    if (!profile) {
        return;
    }

    profile.favourites.push(projectId);
    saveProfile(profile);
}

export function addMatch(profileId: number) {
    const profile = getProfileInformation();
    if (!profile) {
        return;
    }

    profile.matchedWith.push(profileId);
    saveProfile(profile);
}
