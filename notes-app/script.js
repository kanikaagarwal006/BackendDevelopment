function getNotes() {
    const raw = localStorage.getItem("notes");

    return raw ? JSON.parse(raw) : [];
}


function saveNotes(notes) {
    localStorage.setItem("notes", JSON.stringify(notes));
}
function addNote() {

    const input = document.getElementById("noteInput");

    const text = input.value.trim();

    if (text === "") {
        alert("Please enter a note.");
        return;
    }

    const notes = getNotes();

    const newNote = {
        id: Date.now(),
        text: text,
        completed: false,
        createdAt: new Date().toISOString(),
        updatedAt: null
    };

    notes.push(newNote);

    saveNotes(notes);

    input.value = "";

    renderNotes();
}

function renderNotes() {

    const container = document.getElementById("notesList");

    const notes = getNotes();

    if (notes.length === 0) {
        container.innerHTML = "<p>No notes yet.</p>";
        return;
    }

    container.innerHTML = notes.map(note => {

        return `
            <div class="note-card">

                <p class="note-text">
                    ${note.completed ? "✅ " : ""}
                    ${note.text}
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
        `;

    }).join("");
}

function deleteNote(id) {

    const notes = getNotes();

    const updatedNotes = notes.filter(note => note.id !== id);

    saveNotes(updatedNotes);

    renderNotes();
}

function editNote(id) {

    const notes = getNotes();

    const note = notes.find(note => note.id === id);

    if (!note) {
        return;
    }

    const newText = prompt("Edit your note:", note.text);

    if (newText === null) {
        return;
    }

    const updatedText = newText.trim();

    if (updatedText === "") {
        alert("Note cannot be empty.");
        return;
    }

    note.text = updatedText;

    note.updatedAt = new Date().toISOString();

    saveNotes(notes);

    renderNotes();
}

function toggleComplete(id) {

    const notes = getNotes();

    const note = notes.find(note => note.id === id);

    if (!note) {
        return;
    }

    note.completed = !note.completed;

    note.updatedAt = new Date().toISOString();

    saveNotes(notes);

    renderNotes();
}
window.onload = renderNotes;