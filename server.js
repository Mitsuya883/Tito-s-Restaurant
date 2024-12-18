const express = require('express');
const mysql = require('mysql2');
const app = express();

// Configuración de la base de datos
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',  // Si tu usuario es diferente, cámbialo aquí
  password: '',  // Si tienes una contraseña, ponla aquí
  database: 'restaurante'
});

// Conectar a la base de datos
db.connect((err) => {
  if (err) throw err;
  console.log('Conectado a la base de datos MySQL');
});

app.use(express.json());  // Para poder recibir datos JSON

// Endpoint para obtener todos los productos
app.get('/productos', (req, res) => {
  db.query('SELECT * FROM productos', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Endpoint para agregar un nuevo producto
app.post('/productos', (req, res) => {
  const { nombre, descripcion, precio } = req.body;
  const query = 'INSERT INTO productos (nombre, descripcion, precio) VALUES (?, ?, ?)';
  db.query(query, [nombre, descripcion, precio], (err, results) => {
    if (err) throw err;
    res.json({ message: 'Producto agregado', id: results.insertId });
  });
});

// Endpoint para eliminar un producto
app.delete('/productos/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM productos WHERE id = ?', [id], (err, results) => {
    if (err) throw err;
    res.json({ message: `Producto con ID ${id} eliminado` });
  });
});

// Iniciar el servidor
app.listen(3000, () => {
  console.log('Servidor escuchando en puerto 3000');
});

  