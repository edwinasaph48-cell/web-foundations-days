// ================================
// QUICKNOTES APP
// ================================

// STEP 1: Starting data

let notes = [
    {
        id: 1,
        text: "Buy milk and bread",
        category: "personal"
    },
    {
        id: 2,
        text: "Finish the Day 3 assignment",
        category: "study"
    },
    {
        id: 3,
        text: "Email the project report to Grace",
        category: "work"
    },
    {
        id: 4,
        text: "Revise JavaScript",
        category: "study"
    }
];


// STEP 2: Select HTML elements

const noteInput = document.getElementById("note-input");
const categorySelect = document.getElementById("category-select");
const addNoteBtn = document.getElementById("add-note-btn");
const notesContainer = document.getElementById("notes-container");
const searchInput = document.getElementById("search-input");
const filterSelect = document.getElementById("filter-select");


// STEP 3: Display notes

function displayNotes(notesToDisplay = notes) {

    notesContainer.innerHTML = "";

    if (notesToDisplay.length === 0) {
        notesContainer.innerHTML = `
            <p class="no-notes">No notes found.</p>
        `;
        return;
    }

    notesToDisplay.forEach(function(note) {

        const noteElement = document.createElement("div");

        noteElement.classList.add("note-card");

        noteElement.innerHTML = `
            <div class="note-content">
                <h3>${note.text}</h3>
                <span class="note-category">${note.category}</span>
            </div>

            <button class="delete-btn" data-id="${note.id}">
                Delete
            </button>
        `;

        notesContainer.appendChild(noteElement);
    });
}


// STEP 4: Add a new note

function addNote() {

    const text = noteInput.value.trim();
    const category = categorySelect.value;

    if (text === "") {
        alert("Please enter a note.");
        return;
    }

    const newNote = {
        id: Date.now(),
        text: text,
        category: category
    };

    notes.push(newNote);

    noteInput.value = "";

    displayNotes();
}


// STEP 5: Delete a note

function deleteNote(id) {

    notes = notes.filter(function(note) {
        return note.id !== id;
    });

    displayNotes();
}


// STEP 6: Search notes

function searchNotes() {

    const searchTerm = searchInput.value.toLowerCase();

    const filteredNotes = notes.filter(function(note) {

        return note.text.toLowerCase().includes(searchTerm);

    });

    displayNotes(filteredNotes);
}


// STEP 7: Filter notes by category

function filterNotes() {

    const selectedCategory = filterSelect.value;

    if (selectedCategory === "all") {
        displayNotes();
        return;
    }

    const filteredNotes = notes.filter(function(note) {

        return note.category === selectedCategory;

    });

    displayNotes(filteredNotes);
}


// STEP 8: Add note button event

addNoteBtn.addEventListener("click", addNote);


// STEP 9: Allow Enter key to add a note

noteInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
        addNote();
    }

});


// STEP 10: Search event

searchInput.addEventListener("input", searchNotes);


// STEP 11: Category filter event

filterSelect.addEventListener("change", filterNotes);


// STEP 12: Delete button event

notesContainer.addEventListener("click", function(event) {

    if (event.target.classList.contains("delete-btn")) {

        const noteId = Number(event.target.dataset.id);

        deleteNote(noteId);
    }

});


// STEP 13: Display notes when page loads

displayNotes();