// Store all users loaded from the API
let users = [];

// Select HTML elements
const loadUsersButton = document.getElementById("load-users");
const filterInput = document.getElementById("filter-input");
const statusMessage = document.getElementById("status");
const usersList = document.getElementById("users-list");

// API URL
const API_URL = "https://jsonplaceholder.typicode.com/users";

// Load users from the API
async function loadUsers() {
    loadUsersButton.disabled = true;
    statusMessage.textContent = "Loading users...";

    try {
        const response = await fetch(API_URL);

        // Check whether the HTTP response was successful
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        // Convert the response to JSON
        users = await response.json();

        // Display the users
        renderUsers(users);

        statusMessage.textContent =
            `Successfully loaded ${users.length} users.`;
    } catch (error) {
        console.error("Error loading users:", error);
        statusMessage.textContent =
            "Unable to load users. Please try again.";
        usersList.textContent = "";
    } finally {
        loadUsersButton.disabled = false;
    }
}

// Render users on the page
function renderUsers(list) {
    usersList.textContent = "";

    if (list.length === 0) {
        const noUsersMessage = document.createElement("li");

        noUsersMessage.textContent =
            "No users match your filter.";

        usersList.appendChild(noUsersMessage);
        return;
    }

    list.forEach(function(user) {
        const listItem = document.createElement("li");

        const name = document.createElement("h3");
        name.textContent = user.name;

        const email = document.createElement("p");
        email.textContent = `Email: ${user.email}`;

        const city = document.createElement("p");
        city.textContent = `City: ${user.address.city}`;

        const company = document.createElement("p");
        company.textContent = `Company: ${user.company.name}`;

        listItem.appendChild(name);
        listItem.appendChild(email);
        listItem.appendChild(city);
        listItem.appendChild(company);

        usersList.appendChild(listItem);
    });
}

// Load users when the button is clicked
loadUsersButton.addEventListener("click", loadUsers);

// Filter users when the user types
filterInput.addEventListener("input", function() {
    const searchText = filterInput.value.toLowerCase().trim();

    const filteredUsers = users.filter(function(user) {
        return user.name.toLowerCase().includes(searchText);
    });

    renderUsers(filteredUsers);
});