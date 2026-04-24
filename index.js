const express = require("express");
const sqlite3 = require("sqlite3").verbose();

const app = express();
app.use(express.json());

// Base de datos
const db = new sqlite3.Database("./base.sqlite3");

// Crear tabla si no existe
db.run(`CREATE TABLE IF NOT EXISTS todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    todo TEXT NOT NULL,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
)`);

// Ruta raíz
app.get("/", (req, res) => {
    res.json({ status: "ok" });
});

// Login (dummy)
app.post("/login", (req, res) => {
    res.json({ status: "ok" });
});

// Insertar datos
app.post("/insert", (req, res) => {
    const { todo } = req.body;

    if (!todo) {
        return res.status(400).json({ error: "Falta información necesaria" });
    }

    const stmt = `INSERT INTO todos (todo) VALUES (?)`;

    db.run(stmt, [todo], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        return res.status(201).json({
            id: this.lastID,
            message: "Insert was successful"
        });
    });
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});
