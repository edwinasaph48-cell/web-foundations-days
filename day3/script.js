// STEP 1: Starting data

let notes = [
    { id: 1, text: "Buy milk and bread", category: "personal" },
    { id: 2, text: "Finish the Day 3 assignment", category: "study" },
    { id: 3, text: "Email the project report to Grace", category: "work" },
    { id: 4, text: "Revise JavaScript arrays", category: "study" },
    { id: 5, text: "Call mum", category: "personal" }
];


// STEP 2: Display the starting notes

console.log(notes);


// STEP 3: searchNotes()

function searchNotes(word) {
    const searchWord = word.toLowerCase();

    return notes.filter(note =>
        note.text.toLowerCase().includes(searchWord)
    );
}

console.log(searchNotes("JavaScript"));
// Expected:
// [{ id: 4, text: "Revise JavaScript arrays", category: "study" }]

console.log(searchNotes("pizza"));
// Expected:
// []


// STEP 4: longestNote()

function longestNote() {
    if (notes.length === 0) {
        return null;
    }

    return notes.reduce((longest, note) => {
        if (note.text.length > longest.text.length) {
            return note;
        }

        return longest;
    });
}

console.log(longestNote());
// Expected:
// { id: 3, text: "Email the project report to Grace", category: "work" }


// Test longestNote() when there are no notes

const savedNotes = notes;

notes = [];

console.log(longestNote());
// Expected:
// null

notes = savedNotes;


// STEP 5: countByCategory()

function countByCategory() {
    const counts = {
        personal: 0,
        work: 0,
        study: 0
    };

    notes.forEach(note => {
        counts[note.category]++;
    });

    return counts;
}

console.log(countByCategory());
// Expected:
// { personal: 2, work: 1, study: 2 }


// STEP 6: Test countByCategory() when there are no notes

const notesBeforeEmptyTest = notes;

notes = [];

console.log(countByCategory());
// Expected:
// { personal: 0, work: 0, study: 0 }

notes = notesBeforeEmptyTest;


// STEP 7: getSummary()

function getSummary() {
    const counts = countByCategory();

    const noteWord = notes.length === 1 ? "note" : "notes";

    return `${notes.length} ${noteWord}: ${counts.personal} personal, ${counts.work} work, ${counts.study} study.`;
}

console.log(getSummary());
// Expected:
// "5 notes: 2 personal, 1 work, 2 study."


// Test getSummary() with only one note

const notesBeforeSummaryTest = notes;

notes = [
    { id: 1, text: "Call mum", category: "personal" }
];

console.log(getSummary());
// Expected:
// "1 note: 1 personal, 0 work, 0 study."

notes = notesBeforeSummaryTest;


// STEP 8: isDuplicate()

function isDuplicate(text) {
    const cleanedText = text
        .trim()
        .replace(/\s+/g, " ")
        .toLowerCase();

    return notes.some(note =>
        note.text
            .trim()
            .replace(/\s+/g, " ")
            .toLowerCase() === cleanedText
    );
}

console.log(isDuplicate("Call mum"));
// Expected:
// true

console.log(isDuplicate("Go to the gym"));
// Expected:
// false


// STEP 9: addNote()

function addNote(text, category) {
    const cleanedText = text.trim();

    const validCategories = ["personal", "work", "study"];

    // Check if the text is valid

    if (cleanedText.length < 1 || cleanedText.length > 200) {
        console.log("Note not added: text must be 1–200 characters.");
        return false;
    }

    // Check if the note is a duplicate

    if (isDuplicate(cleanedText)) {
        console.log("Note not added: duplicate note.");
        return false;
    }

    // Check if the category is valid

    if (!validCategories.includes(category)) {
        console.log("Note not added: invalid category.");
        return false;
    }

    // Create a new ID

    const newId = notes.length > 0
        ? Math.max(...notes.map(note => note.id)) + 1
        : 1;

    // Add the new note

    notes.push({
        id: newId,
        text: cleanedText,
        category: category
    });

    console.log("Note added successfully.");

    return true;
}


// Test 1: Valid note

console.log(addNote("Learn JavaScript functions", "study"));
// Expected:
// true


// Test 2: Duplicate note

console.log(addNote("  CALL   MUM  ", "personal"));
// Expected:
// false


// Test 3: Invalid category

console.log(addNote("Go shopping", "shopping"));
// Expected:
// false
// STEP 10: deleteNote()

function deleteNote(id) {
    const noteIndex = notes.findIndex(note => note.id === id);

    // Check if the note exists
    if (noteIndex === -1) {
        console.log("Note not found.");
        return false;
    }

    // Remove the note
    notes.splice(noteIndex, 1);

    console.log("Note deleted successfully.");
    return true;
}


// Test 1: Delete an existing note

console.log(deleteNote(5));
// Expected:
// Note deleted successfully.
// true


// Test 2: Try to delete a note that does not exist

console.log(deleteNote(99));
// Expected:
// Note not found.
// false


// Display notes after deletion

console.log(notes);
// STEP 11: updateNote()

function updateNote(id, newText, newCategory) {

    // Find the note
    const note = notes.find(note => note.id === id);

    // Check if the note exists
    if (!note) {
        console.log("Note not found.");
        return false;
    }

    // Clean the new text
    const cleanedText = newText.trim();

    // Valid categories
    const validCategories = ["personal", "work", "study"];

    // Check text length
    if (cleanedText.length < 1 || cleanedText.length > 200) {
        console.log("Note not updated: text must be 1–200 characters.");
        return false;
    }

    // Check category
    if (!validCategories.includes(newCategory)) {
        console.log("Note not updated: invalid category.");
        return false;
    }

    // Update the note
    note.text = cleanedText;
    note.category = newCategory;

    console.log("Note updated successfully.");
    return true;
}


// Test 1: Update an existing note

console.log(
    updateNote(
        4,
        "Revise JavaScript objects",
        "study"
    )
);

// Expected:
// Note updated successfully.
// true


// Display the updated note

console.log(notes.find(note => note.id === 4));


// Test 2: Try to update a note that does not exist

console.log(
    updateNote(
        99,
        "Learn Python",
        "study"
    )
);

// Expected:
// Note not found.
// false
// STEP 12: filterByCategory()

function filterByCategory(category) {
    const validCategories = ["personal", "work", "study"];

    // Check if the category is valid
    if (!validCategories.includes(category)) {
        console.log("Invalid category.");
        return [];
    }

    // Return notes matching the category
    return notes.filter(note => note.category === category);
}


// Test 1: Get study notes

console.log(filterByCategory("study"));

// Expected:
// [
//     { id: 2, text: "Finish the Day 3 assignment", category: "study" },
//     { id: 4, text: "Revise JavaScript objects", category: "study" },
//     { id: 6, text: "Learn JavaScript functions", category: "study" }
// ]


// Test 2: Get personal notes

console.log(filterByCategory("personal"));

// Expected:
// [
//     { id: 1, text: "Buy milk and bread", category: "personal" }
// ]


// Test 3: Get work notes

console.log(filterByCategory("work"));

// Expected:
// [
//     { id: 3, text: "Email the project report to Grace", category: "work" }
// ]


// Test 4: Invalid category

console.log(filterByCategory("shopping"));

// Expected:
// Invalid category.
// []
// STEP 13: Final Testing

console.log("========== FINAL TESTING ==========");


// TEST 1: Display all notes

console.log("TEST 1: All notes");
console.log(notes);


// TEST 2: Search notes

console.log("TEST 2: Search");
console.log(searchNotes("JavaScript"));


// TEST 3: Find longest note

console.log("TEST 3: Longest note");
console.log(longestNote());


// TEST 4: Count notes by category

console.log("TEST 4: Category counts");
console.log(countByCategory());


// TEST 5: Get summary

console.log("TEST 5: Summary");
console.log(getSummary());


// TEST 6: Check duplicate

console.log("TEST 6: Duplicate check");
console.log(isDuplicate("Buy milk and bread"));
console.log(isDuplicate("Go to the gym"));


// TEST 7: Filter study notes

console.log("TEST 7: Study notes");
console.log(filterByCategory("study"));


// TEST 8: Filter work notes

console.log("TEST 8: Work notes");
console.log(filterByCategory("work"));


// TEST 9: Filter personal notes

console.log("TEST 9: Personal notes");
console.log(filterByCategory("personal"));


// TEST 10: Delete a note

console.log("TEST 10: Delete note");
console.log(deleteNote(1));


// Display notes after deletion

console.log("Notes after deletion:");
console.log(notes);


// TEST 11: Update a note

console.log("TEST 11: Update note");
console.log(
    updateNote(
        2,
        "Complete the JavaScript Day 3 assignment",
        "study"
    )
);


// Display updated note

console.log("Updated note:");
console.log(notes.find(note => note.id === 2));


// TEST 12: Final summary

console.log("TEST 12: Final summary");
console.log(getSummary());


console.log("========== TESTING COMPLETE ==========");