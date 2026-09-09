const API_URL = '/api/notes';

async function renderNotes() {
    const container = document.getElementById("notesList");

    try {
        const res = await fetch(API_URL);
        const notes = await res.json();

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
                    onclick="toggleComplete(${note.id}, ${note.completed})">
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

async function addNote() {
    const input = document.getElementById("noteInput");
    const text = input.value.trim();

    if (text === "") {
        alert("Please enter a note.");
        return;
    }

    try {
        const res = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text })
        });

        if (res.ok) {
            input.value = "";
            renderNotes();
        }
    } catch (err) {
        alert("Failed to add note.");
    }
}

async function toggleComplete(id, currentStatus) {
    try {
        await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ completed: !currentStatus })
        });
        renderNotes();
    } catch (err) {
        alert("Failed to update status.");
    }
}

async function editNote(id) {
    const newText = prompt("Edit your note:");
    if (newText === null) return;

    const updatedText = newText.trim();
    if (updatedText === "") {
        alert("Note cannot be empty.");
        return;
    }

    try {
        await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: updatedText })
        });
        renderNotes();
    } catch (err) {
        alert("Failed to edit note.");
    }
}

async function deleteNote(id) {
    try {
        await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
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