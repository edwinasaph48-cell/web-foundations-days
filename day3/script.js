// STEP 1: Starting data

let notes = [
    { id: 1, text: "Buy milk and bread", category: "personal" },
    { id: 2, text: "Finish the Day 3 assignment", category: "study" },
    { id: 3, text: "Email the project report to Grace", category: "work" },
    { id: 4, text: "Revise JavaScript arrays", category: "study" },
    { id: 5, text: "Call mum", category: "personal" }
];


// STEP 2: searchNotes()

function searchNotes(word) {
    const searchWord = word.toLowerCase();

    return notes.filter(note =>
        note.text.toLowerCase().includes(searchWord)
    );
}

// Normal case
console.log(searchNotes("JavaScript"));
// Expected: [{ id: 4, text: "Revise JavaScript arrays", category: "study" }]

// Edge case: no results
console.log(searchNotes("pizza"));
// Expected: []


// STEP 3: longestNote()

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

// Normal case
console.log(longestNote());
// Expected: { id: 3, text: "Email the project report to Grace", category: "work" }

// Edge case: empty array
const savedNotesForLongest = notes;
notes = [];
console.log(longestNote());
// Expected: null
notes = savedNotesForLongest;


// STEP 4: countByCategory()

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

// Normal case
console.log(countByCategory());
// Expected: { personal: 2, work: 1, study: 2 }

// Edge case: empty array
const savedNotesForCount = notes;
notes = [];
console.log(countByCategory());
// Expected: { personal: 0, work: 0, study: 0 }
notes = savedNotesForCount;


// STEP 5: getSummary()

function getSummary() {
    const counts = countByCategory();

    const noteWord = notes.length === 1 ? "note" : "notes";

    return `${notes.length} ${noteWord}: ${counts.personal} personal, ${counts.work} work, ${counts.study} study.`;
}

// Normal case
console.log(getSummary());
// Expected: "5 notes: 2 personal, 1 work, 2 study."

// Edge case: exactly one note
const savedNotesForSummary = notes;
notes = [
    { id: 1, text: "Call mum", category: "personal" }
];

console.log(getSummary());
// Expected: "1 note: 1 personal, 0 work, 0 study."

notes = savedNotesForSummary;


// STEP 6: isDuplicate()

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

// Normal case
console.log(isDuplicate("Call mum"));
// Expected: true

// Edge case: text does not exist
console.log(isDuplicate("Go to the gym"));
// Expected: false


// STEP 7: addNote()

function addNote(text, category) {
    const cleanedText = text.trim();

    const validCategories = ["personal", "work", "study"];

    // Check text length
    if (cleanedText.length < 1 || cleanedText.length > 200) {
        console.log("Note not added: text must be 1–200 characters.");
        return false;
    }

    // Check for duplicate
    if (isDuplicate(cleanedText)) {
        console.log("Note not added: duplicate note.");
        return false;
    }

    // Check category
    if (!validCategories.includes(category)) {
        console.log("Note not added: invalid category.");
        return false;
    }

    // Create a new ID
    const newId = notes.length > 0
        ? Math.max(...notes.map(note => note.id)) + 1
        : 1;

    // Add the note
    notes.push({
        id: newId,
        text: cleanedText,
        category: category
    });

    console.log("Note added successfully.");
    return true;
}

// Normal case
console.log(addNote("Learn JavaScript functions", "study"));
// Expected: true

// Edge case: duplicate note with different case and spaces
console.log(addNote("  CALL   MUM  ", "personal"));
// Expected: false

// Edge case: invalid category
console.log(addNote("Go shopping", "shopping"));
// Expected: false