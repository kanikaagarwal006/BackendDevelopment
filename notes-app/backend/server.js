const express = require('express');
const Database = require('better-sqlite3');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5500;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static frontend files from notes-app/frontend
app.use(express.static(path.join(__dirname, '../frontend')));

// Initialize SQLite Database
const db = new Database('database.db');

// Create table if it doesn't exist
db.exec(`
    CREATE TABLE IF NOT EXISTS notes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        text TEXT NOT NULL,
        completed INTEGER DEFAULT 0,
        createdAt TEXT NOT NULL,
        updatedAt TEXT
    )
`);

// --- REST API Endpoints ---

// Get all notes
app.get('/api/notes', (req, res) => {
    try {
        const stmt = db.prepare('SELECT * FROM notes ORDER BY createdAt DESC');
        const notes = stmt.all().map(note => ({
            ...note,
            completed: Boolean(note.completed)
        }));
        res.json(notes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add a new note
app.post('/api/notes', (req, res) => {
    const { text } = req.body;
    if (!text || text.trim() === '') {
        return res.status(400).json({ error: 'Note text cannot be empty' });
    }

    const createdAt = new Date().toISOString();
    try {
        const stmt = db.prepare(`
            INSERT INTO notes (text, completed, createdAt) 
            VALUES (?, 0, ?)
        `);
        const result = stmt.run(text.trim(), createdAt);
        res.status(201).json({
            id: result.lastInsertRowid,
            text: text.trim(),
            completed: false,
            createdAt,
            updatedAt: null
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update note (edit text or toggle completed status)
app.put('/api/notes/:id', (req, res) => {
    const { id } = req.params;
    const { text, completed } = req.body;
    const updatedAt = new Date().toISOString();

    try {
        const currentNote = db.prepare('SELECT * FROM notes WHERE id = ?').get(id);

        if (!currentNote) {
            return res.status(404).json({ error: 'Note not found' });
        }

        const updatedText = text !== undefined ? text.trim() : currentNote.text;
        const updatedCompleted = completed !== undefined ? (completed ? 1 : 0) : currentNote.completed;

        db.prepare(`
            UPDATE notes 
            SET text = ?, completed = ?, updatedAt = ? 
            WHERE id = ?
        `).run(updatedText, updatedCompleted, updatedAt, id);

        res.json({
            id: Number(id),
            text: updatedText,
            completed: Boolean(updatedCompleted),
            createdAt: currentNote.createdAt,
            updatedAt
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete a note
app.delete('/api/notes/:id', (req, res) => {
    const { id } = req.params;
    try {
        const result = db.prepare('DELETE FROM notes WHERE id = ?').run(id);

        if (result.changes === 0) {
            return res.status(404).json({ error: 'Note not found' });
        }

        res.json({ message: 'Note deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});