document.addEventListener("DOMContentLoaded", function() {
    const profile = getProfileInformation();

    // If there's profile data, populate the fields
    if (profile) {
        document.getElementById('name').textContent = profile.name;
        document.getElementById('email').textContent = profile.email;
        document.getElementById('time-zone').textContent = profile.timeZone;
        document.getElementById('location').textContent = profile.location;
        document.getElementById('equipment').textContent = profile.equipment.join(', ');
        document.getElementById('expertise').textContent = profile.expertise.join(', ');
        document.getElementById('interest').textContent = profile.areasOfInterest.join(', ');
    }

    // Add event listeners for edit buttons
    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', () => {
            const field = button.id.split('-')[1]; // Get the field name from the button id
            const textElement = document.getElementById(field);
            const currentText = textElement.textContent;

            // Prompt the user for the new value
            const newValue = prompt(`Edit ${field.replace(/-/g, ' ')}:`, currentText);

            // If the user clicked "OK" and the new value is different, update it
            if (newValue !== null && newValue !== currentText) {
                textElement.textContent = newValue;

                // Update the profile data in local storage
                if (profile) {
                    // Update the specific field. Note: this might need adjustment for array fields
                    profile[field] = newValue.includes(',') ? newValue.split(', ').map(s => s.trim()) : newValue;
                    saveProfile(profile);
                }
            }
        });
    });
});
