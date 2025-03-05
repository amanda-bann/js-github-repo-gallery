// Select the "overview" div
const overview = document.querySelector(".overview");
// Select the username element
const username = "amanda-bann";
// Select the unordered list to display the repos list
const repoList = document.querySelector(".repo-list");
// Select the "repos" div
const repos = document.querySelector(".repos");
// Select the "repo-data" div
const repoData = document.querySelector(".repo-data");


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
    getGitRepos();
};

// Function to fetch repos from github by usernam and sort by creation date (preferrable to updated date)
const getGitRepos = async function () {
    const gitRepoData = await fetch(`https://api.github.com/users/${username}/repos?sort=created&per_page=100`);
    const gitRepos = await gitRepoData.json();
    console.log(gitRepos);
    displayRepos(gitRepos);
};

// Function to display the list of the user's public github repositories
const displayRepos = function (repos) {
    for (const repo of repos){
        const repoListItem = document.createElement("li");
        repoListItem.classList.add("repo");
        repoListItem.innerHTML = `<h3>${repo.name}</h3>`;
        repoList.append(repoListItem);
    }
};

// Add a click event to the unordered list with a class of "repo-list"
repoList.addEventListener ("click", function (e) {
    if (e.target.matches("h3")) {
        const repoName = e.target.innerText;
        getRepoInfo(repoName);
        };
});

// Function to get specific repo data
const getRepoInfo = async function (repoName) {
    const fetchRepoInfo = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await fetchRepoInfo.json();
    console.log(repoInfo);
    // Fetch languages
    const fetchLanguages = await fetch(repoInfo.languages_url);
    const languageData = await fetchLanguages.json();
    console.log(languageData);

    // Create a list of languages
    const languages = [];
    for (const language in languageData) {
        languages.push(language);
    }
    console.log(languages);
};