// Key used to save/retrieve profile data from localStorage
const ProfileKey = "UserProfile";

// Event that triggers after the whole content of the page is loaded
document.addEventListener("DOMContentLoaded", () => {
    const profileData = getProfileInformation();
    
    // If there's profile data, populate the HTML with it
    if (profileData) {
      document.getElementById("name").innerText = profileData.name;
      document.getElementById("email").innerText = profileData.email;
      document.getElementById("location").innerText = profileData.location;
      document.getElementById("time-zone").innerText = profileData.timeZone;
      document.getElementById("equipment").innerText = profileData.equipment.join(', ');
      document.getElementById("expertise").innerText = profileData.expertise.join(', ');
      document.getElementById("interest").innerText = profileData.areasOfInterest.join(', ');
    }
  
    // Add event listeners for the edit buttons
    document.getElementById("edit-name-btn").addEventListener("click", () => {
        const newName = prompt("Enter new name:", document.getElementById("name").innerText);
        if (newName) {
            document.getElementById("name").innerText = newName;
            // Save to localStorage
            profileData.name = newName;
            saveProfile(profileData);
        }
    });
  
});

function getProfileInformation(): ProfileData | null {
    const profile = localStorage.getItem(ProfileKey);
    if (!profile) {
        return null;
    }
    try {
        const data: ProfileData = JSON.parse(profile);
        return data;
    } catch {
        clearProfile();
        return null;
    }
}

function saveProfile(data: ProfileData): void {
    localStorage.setItem(ProfileKey, JSON.stringify(data));
}

function clearProfile(): void {
    localStorage.removeItem(ProfileKey);
}

// Define the structure of the profile data
interface ProfileData {
    name: string;
    email: string;
    location: string;
    timeZone: string;
    areasOfInterest: string[];
    contributionTime: string;
    expertise: string[];
    equipment: string[];
    matchedWith: number[];
    favourites: number[];
}
