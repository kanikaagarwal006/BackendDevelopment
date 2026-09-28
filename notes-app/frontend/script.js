// LocalStorage-based substitute for API_URL
const STORAGE_KEY = 'notes_app_data';

// Helper to retrieve notes from localStorage
function getStoredNotes() {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch (err) {
        return [];
    }
}

// Helper to save notes to localStorage
function saveStoredNotes(notes) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

function renderNotes() {
    const container = document.getElementById("notesList");

    try {
        const notes = getStoredNotes();

        if (notes.length === 0) {
            container.innerHTML = "<p>No notes yet.</p>";
            return;
        }

        container.innerHTML = notes.map(note => `
            <div class="note-card">
                <p class="note-text">
                    ${note.completed ? "✅ " : ""}
                    ${escapeHtml(note.text)}
                </p>
                <p class="note-date">
                    Created: ${new Date(note.createdAt).toLocaleString()}
                </p>
                ${
                    note.updatedAt
                    ? `<p class="note-date">
                        Updated: ${new Date(note.updatedAt).toLocaleString()}
                       </p>`
                    : ""
                }
                <button
                    class="complete-btn"
                    onclick="toggleComplete(${note.id})">
                    ${note.completed ? "Mark Incomplete" : "Complete"}
                </button>
                <button
                    class="edit-btn"
                    onclick="editNote(${note.id})">
                    Edit
                </button>
                <button
                    class="delete-btn"
                    onclick="deleteNote(${note.id})">
                    Delete
                </button>
            </div>
        `).join("");
    } catch (err) {
        container.innerHTML = "<p>Error loading notes.</p>";
    }
}

function addNote() {
    const input = document.getElementById("noteInput");
    const text = input.value.trim();

    if (text === "") {
        alert("Please enter a note.");
        return;
    }

    try {
        const notes = getStoredNotes();
        const newNote = {
            id: Date.now(),
            text: text,
            completed: false,
            createdAt: new Date().toISOString()
        };

        notes.unshift(newNote);
        saveStoredNotes(notes);

        input.value = "";
        renderNotes();
    } catch (err) {
        alert("Failed to add note.");
    }
}

function toggleComplete(id) {
    try {
        const notes = getStoredNotes();
        const updatedNotes = notes.map(note => {
            if (note.id === id) {
                return {
                    ...note,
                    completed: !note.completed,
                    updatedAt: new Date().toISOString()
                };
            }
            return note;
        });

        saveStoredNotes(updatedNotes);
        renderNotes();
    } catch (err) {
        alert("Failed to update status.");
    }
}

function editNote(id) {
    const newText = prompt("Edit your note:");
    if (newText === null) return;

    const updatedText = newText.trim();
    if (updatedText === "") {
        alert("Note cannot be empty.");
        return;
    }

    try {
        const notes = getStoredNotes();
        const updatedNotes = notes.map(note => {
            if (note.id === id) {
                return {
                    ...note,
                    text: updatedText,
                    updatedAt: new Date().toISOString()
                };
            }
            return note;
        });

        saveStoredNotes(updatedNotes);
        renderNotes();
    } catch (err) {
        alert("Failed to edit note.");
    }
}

function deleteNote(id) {
    try {
        const notes = getStoredNotes();
        const filteredNotes = notes.filter(note => note.id !== id);

        saveStoredNotes(filteredNotes);
        renderNotes();
    } catch (err) {
        alert("Failed to delete note.");
    }
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

window.onload = renderNotes;