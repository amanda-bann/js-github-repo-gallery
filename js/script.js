// Select the "overview" div
const overview = document.querySelector(".overview");
// Select the username element
const username = "amanda-bann";

// Function to fetch GitHub profile data
const getGitProfile = async function () {
    const userData = await fetch(`https://api.github.com/users/${username}`);
    const profile = await userData.json();
    console.log(profile);
    // return profile;
    showUserData(profile);
};

getGitProfile();

// Fetch and display user data
const showUserData = function (profile) {
    const div = document.createElement("div");
    div.classList.add("user-info");
    div.innerHTML = `
    <figure>
      <img alt="user avatar" src=${profile.avatar_url} />
    </figure>
    <div>
        <p><strong>Name:</strong> ${profile.name}</p>
        <p><strong>Bio:</strong> ${profile.bio}</p>
        <p><strong>Location:</strong> ${profile.location}</p>
        <p><strong>Number of public repos:</strong> ${profile.public_repos}</p>
    </div>
    `;
    overview.append(div);
};
