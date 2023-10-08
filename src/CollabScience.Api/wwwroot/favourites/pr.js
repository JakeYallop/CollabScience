document.addEventListener("DOMContentLoaded", () => {
    const profileData = getProfileInformation();
    
    if (profileData) {
      // populate the HTML elements with the retrieved data
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
        // save to localStorage
        profileData.name = newName;
        saveProfile(profileData);
      }
    });
    // ... similar event listeners for other edit buttons ...
  });
  
  function getProfileInformation() {
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
  
  function saveProfile(data) {
    localStorage.setItem(ProfileKey, JSON.stringify(data));
  }
  
  function clearProfile() {
    localStorage.removeItem(ProfileKey);
  }
  
  const ProfileKey = "UserProfile";
  