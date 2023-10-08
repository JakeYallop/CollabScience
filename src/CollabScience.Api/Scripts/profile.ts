const ProfileKey = "UserProfile";

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

    if (!profile.viewed.includes(projectId)) {
        profile.viewed.push(projectId);
        saveProfile(profile);
    }
}

export function addMatch(profileId: number) {
    const profile = getProfileInformation();
    if (!profile) {
        return;
    }

    if (!profile.matchedWith.includes(profileId)) {
        profile.matchedWith.push(profileId);
        saveProfile(profile);
    }
}

window.addEventListener("DOMContentLoaded", () => {
    const submit = document.querySelector("#submit");
    if (!submit) {
        return;
    }
    submit.addEventListener("click", e => {
        e.preventDefault();
        const name = (document.querySelector("#name") as HTMLInputElement)?.value;
        const email = (document.querySelector("#email") as HTMLInputElement)?.value;
        const location = (document.querySelector("#location") as HTMLInputElement)?.value;
        const timeZone = (document.querySelector("#timeZone") as HTMLInputElement)?.value;
        let contributionTime = (document.querySelector("#contribution-time") as HTMLInputElement).value;
        const expertise = getMultiSelectValues("expertise");
        const areasOfInterest = getMultiSelectValues("interest");
        const equipment = getMultiSelectValues("equipment");

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
        window.location.assign("/match");
    });

    const profile = getProfileInformation();
    if (profile) {
        const name = document.querySelector("#name") as HTMLInputElement;
        const email = document.querySelector("#email") as HTMLInputElement;
        const location = document.querySelector("#location") as HTMLInputElement;
        const timeZone = document.querySelector("#timeZone") as HTMLInputElement;
        const contributionTime = document.querySelector("#contribution-time") as HTMLInputElement;
        const expertise = document.querySelector("#expertise") as HTMLInputElement;
        const areasOfInterest = document.querySelector("#interest") as HTMLInputElement;
        const equipment = document.querySelector("#equipment") as HTMLInputElement;

        name.value = profile.name ?? "";
        email.value = profile.email ?? "";
        location.value = profile.location ?? "";
        timeZone.value = profile.timeZone ?? "";
        contributionTime.value = profile.contributionTime ?? "0";
        setMultiSelectValues("expertise", profile.expertise ?? []);
        setMultiSelectValues("interest", profile.areasOfInterest ?? []);
        setMultiSelectValues("equipment", profile.equipment ?? []);
    }
});

if (document.querySelector("#resetMatches") != null) {
    if (getProfileInformation() == null) {
        (document.querySelector("#resetMatches")! as HTMLButtonElement).style.display = "none";
    }

    (document.querySelector("#resetMatches")! as HTMLButtonElement).addEventListener("click", () => {
        clearProfile();

        const name = (document.querySelector("#name") as HTMLInputElement)?.value;
        const email = (document.querySelector("#email") as HTMLInputElement)?.value;
        const location = (document.querySelector("#location") as HTMLInputElement)?.value;
        const timeZone = (document.querySelector("#timezone") as HTMLInputElement)?.value;
        let contributionTime = (document.querySelector("#contribution-time") as HTMLInputElement).value;
        const expertise = (document.querySelector("#expertise") as HTMLInputElement).value.split(",");
        const areasOfInterest = (document.querySelector("#interest") as HTMLInputElement).value.split(",");
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
    });
}

const getMultiSelectValues = (id: string) => {
    const selected = document.querySelectorAll(`#${id} option:checked`) as NodeListOf<HTMLOptionElement>;
    const values = Array.from(selected).map(el => el.value);
    return values;
};

const setMultiSelectValues = (id: string, values: string[]) => {
    const select = document.querySelector(`#${id}`);
    const options = document.querySelectorAll(`#${id} option`) as NodeListOf<HTMLOptionElement>;
    options.forEach(option => {
        if (values.includes(option.value)) {
            option.selected = true;
        }
    });
    const event = new Event("chosen:updated");
    select?.dispatchEvent(event);
};
