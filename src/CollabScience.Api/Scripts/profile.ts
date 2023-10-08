export const ProfileKey = "UserProfile";

export interface ProfileData {
    name: string;
    email: string;
    location: string;
    timeZone: string;
    areasOfInterest: string[];
    contributionTime: string;
    expertise: string[];
    equipment: string[];
    matchedWith: number[];
    viewed: number[];
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

export function addViewed(projectId: number) {
    const profile = getProfileInformation();
    if (!profile) {
        return;
    }

    profile.viewed.push(projectId);
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

window.addEventListener("DOMContentLoaded", () => {
    const submit = document.querySelector("#submit");
    if (!submit) {
        return;
    }
    submit.addEventListener("click", () => {
        const name = (document.querySelector("#name") as HTMLInputElement).value;
        const email = (document.querySelector("#email") as HTMLInputElement).value;
        const location = (document.querySelector("#location") as HTMLInputElement).value;
        const timeZone = (document.querySelector("#timezone") as HTMLInputElement).value;
        let contributionTime = (document.querySelector("#contribution-time") as HTMLInputElement).value;
        const areasOfInterest = (document.querySelector("#areas-of-interest") as HTMLInputElement).value.split(",");
        const expertise = (document.querySelector("#expertise") as HTMLInputElement).value.split(",");
        const equipment = (document.querySelector("#equipment") as HTMLInputElement).value.split(",");

        contributionTime = contributionTime ? contributionTime : "0";

        const profile: ProfileData = {
            name,
            email,
            location,
            timeZone,
            areasOfInterest,
            contributionTime,
            expertise,
            equipment,
            matchedWith: [],
            viewed: [],
            favourites: [],
        };

        saveProfile(profile);
        window.location.href = "/index.html";
    });
});
