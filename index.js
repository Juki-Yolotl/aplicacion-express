const express = require("express");
const sqlite3 = require("sqlite3").verbose();

const app = express();
app.use(express.json());

const db = new sqlite3.Database("./base.sqlite3");

db.run(`CREATE TABLE IF NOT EXISTS todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    todo TEXT NOT NULL,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
)`);

app.get("/", (req, res) => {
    res.json({ status: "ok" });
});

app.post("/login", (req, res) => {
    res.json({ status: "ok" });
});

app.post("/insert", (req, res) => {
    const { todo } = req.body;

    if (!todo) {
        return res.status(400).json({ error: "Falta información necesaria" });
    }

    const stmt = `INSERT INTO todos (todo) VALUES (?)`;

db.run(stmt, [todo], function (err) {
    if (err) {
        console.log("Error al insertar:", err.message);
        return res.status(500).json({ error: err.message });
    }

    console.log("Dato guardado:", todo);

    return res.status(201).json({
        id: this.lastID,
        message: "Insert was successful"
    });
 });
});

app.get("/todos", (req, res) => {
    const stmt = `SELECT * FROM todos ORDER BY id DESC`;

    db.all(stmt, [], (err, rows) => {
        if (err) {
            console.log("Error al obtener datos:", err.message);
            return res.status(500).json({ error: err.message });
        }

        console.log("Datos obtenidos:", rows);

        return res.status(200).json(rows);
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});
