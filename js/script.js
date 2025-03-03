// Select the "overview" div
const overview = document.querySelector(".overview");
// Select the username element
const username = "amanda-bann";

// Function to fetch GitHub profile data
const getGitProfile = async function () {
    const userData = await fetch(`https://api.github.com/users/${username}`);
    const profile = await userData.json();
    return profile;
    // displayUserData(profile);
};

console.log(getGitProfile());
