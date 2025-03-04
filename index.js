const express = require('express');
const pool = require('./connection'); 


const app = express();
app.use(express.json());


app.get("/api/prueba", async (req, res) => {
    try {
        const resultado = await pool.query("SELECT * FROM libros");
        res.json(resultado.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error en la base de datos");
    }
});


app.get("/api/saludo", (req, res) => {
    res.json({ mensaje: "Hola mundo" });
});


app.get("/api/dato/:id", async (req, res) => {
    try {
        console.log(req.params.id);
        const resultado = await pool.query("SELECT * FROM algunatabla WHERE id = $1", [req.params.id]);
        res.json(resultado.rows);
    } catch (error) {
        res.status(500).send("Error en la consulta");
    }
});


app.get("/api/Halo/post", (req, res) => {
    console.log(req.params.gus);
    res.json({ mensaje: "Hola " + req.params.gus });
});


app.post("/api/post", (req, res) => {
    console.log(req.body);
    const { nombre, apellido, edad } = req.body;
    res.json({ mensaje: `Hola ${nombre} ${apellido}, tu edad es: ${edad}` });
});


app.get("/api/actores", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM actores");
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.get("/api/actores/:id", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM actores WHERE id_actor = $1", [req.params.id]);
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.post("/api/actores", async (req, res) => {
    try {
        const { nombre, fecha_nacimiento, nacionalidad } = req.body;
        const result = await pool.query(
            "INSERT INTO actores (nombre, fecha_nacimiento, nacionalidad) VALUES ($1, $2, $3) RETURNING *",
            [nombre, fecha_nacimiento, nacionalidad]
        );
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.put("/api/actores/:id", async (req, res) => {
    try {
        const { nombre, fecha_nacimiento, nacionalidad } = req.body;
        const result = await pool.query(
            "UPDATE actores SET nombre=$1, fecha_nacimiento=$2, nacionalidad=$3 WHERE id_actor=$4 RETURNING *",
            [nombre, fecha_nacimiento, nacionalidad, req.params.id]
        );
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.delete("/api/actores/:id", async (req, res) => {
    try {
        await pool.query("DELETE FROM actores WHERE id_actor = $1", [req.params.id]);
        res.json({ mensaje: "Actor eliminado" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.get("/api/personajes", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM personajes");
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.get("/api/personajes/:id", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM personajes WHERE id_personaje = $1", [req.params.id]);
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.post("/api/personajes", async (req, res) => {
    try {
        const { nombre, descripcion, id_actor } = req.body;
        const result = await pool.query(
            "INSERT INTO personajes (nombre, descripcion, id_actor) VALUES ($1, $2, $3) RETURNING *",
            [nombre, descripcion, id_actor]
        );
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.put("/api/personajes/:id", async (req, res) => {
    try {
        const { nombre, descripcion, id_actor } = req.body;
        const result = await pool.query(
            "UPDATE personajes SET nombre=$1, descripcion=$2, id_actor=$3 WHERE id_personaje=$4 RETURNING *",
            [nombre, descripcion, id_actor, req.params.id]
        );
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.delete("/api/personajes/:id", async (req, res) => {
    try {
        await pool.query("DELETE FROM personajes WHERE id_personaje = $1", [req.params.id]);
        res.json({ mensaje: "Personaje eliminado" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(3000, () => {
    console.log("3000");
});
