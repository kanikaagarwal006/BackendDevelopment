const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");

const app = express();
const PORT = 3000;

const mongoURL = "mongodb://127.0.0.1:27017";
const client = new MongoClient(mongoURL);

let notesCollection;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

async function connectDB() {
    await client.connect();

    const database = client.db("notes_lab");
    notesCollection = database.collection("notes");

    console.log("Connected to MongoDB");
}

// Display all notes
app.get("/", async (req, res) => {
    const notes = await notesCollection.find().toArray();
    res.render("index", { notes });
});

// Add a new note
app.post("/notes", async (req, res) => {
    const { title, content, category } = req.body;

    if (!title || !title.trim() || !content || !content.trim()) {
        return res.status(400).send("Title and content are required.");
    }

    await notesCollection.insertOne({
        title: title.trim(),
        content: content.trim(),
        category: category ? category.trim() : "",
        createdAt: new Date()
    });

    res.redirect("/");
});

// Delete a note
app.post("/notes/:id/delete", async (req, res) => {
    await notesCollection.deleteOne({
        _id: new ObjectId(req.params.id)
    });

    res.redirect("/");
});

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`My Notes app running at http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error("MongoDB connection failed:", error);
    });