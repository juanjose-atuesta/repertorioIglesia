const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const Fuse = require('fuse.js');

const app = express();
app.use(cors());

const IMAGES_DIR = path.join(__dirname, 'images');

let fileNames = [];
let fuse;

function loadIndex() {
  fileNames = fs.readdirSync(IMAGES_DIR).filter(f =>
    /\.(jpg|jpeg|png|gif|webp)$/i.test(f)
  );
  fuse = new Fuse(fileNames, { threshold: 0.4 }); // ajusta tolerancia
}

loadIndex(); // se corre una vez al arrancar

const REPERTORIO_PATH = path.join(__dirname, 'data', 'repertorio.json');

function ensureRepertorioFile() {
  if (!fs.existsSync(REPERTORIO_PATH)) {
    fs.mkdirSync(path.dirname(REPERTORIO_PATH), { recursive: true });
    fs.writeFileSync(REPERTORIO_PATH, '[]');
  }
}

function leerRepertorio() {
  ensureRepertorioFile();
  return JSON.parse(fs.readFileSync(REPERTORIO_PATH, 'utf-8'));
}

function guardarRepertorio(canciones) {
  ensureRepertorioFile();
  fs.writeFileSync(REPERTORIO_PATH, JSON.stringify(canciones, null, 2));
}



// Listar todas o buscar por nombre
app.get('/api/images', (req, res) => {
  const q = req.query.q;
  if (!q) return res.json(fileNames);

  const results = fuse.search(q).map(r => r.item);
  res.json(results);
});

// Servir el archivo real
app.use('/api/images/file', express.static(IMAGES_DIR));


app.use(express.json()); // necesario para leer el body en POST

// Obtener el repertorio actual
app.get('/api/repertorio', (req, res) => {
  res.json(leerRepertorio());
});

// Reemplazar el repertorio completo
// Body esperado: ["cancion1.jpg", "cancion5.jpg"]
app.post('/api/repertorio', (req, res) => {
  const canciones = req.body;

  if (!Array.isArray(canciones)) {
    return res.status(400).json({ error: 'Se esperaba un array de nombres' });
  }

  guardarRepertorio(canciones);
  res.json({ ok: true, canciones });
});

// AQUI EMPIEZA EL BACKEND PARA LAS LETRAS DE LAS canciones
//
//
const LETRAS_PATH = path.join(__dirname, 'data', 'letras.json');

function ensureLetrasFile() {
  if (!fs.existsSync(LETRAS_PATH)) {
    fs.mkdirSync(path.dirname(LETRAS_PATH), { recursive: true });
    fs.writeFileSync(LETRAS_PATH, JSON.stringify({ canciones: [], letras: [] }, null, 2));
  }
}

function leerLetras() {
  ensureLetrasFile();
  return JSON.parse(fs.readFileSync(LETRAS_PATH, 'utf-8'));
}

function guardarLetras(data) {
  ensureLetrasFile();
  fs.writeFileSync(LETRAS_PATH, JSON.stringify(data, null, 2));
}

// 1. Nombre y letra de las canciones del repertorio actual
app.get('/api/letras/repertorio', (req, res) => {
  const { canciones, letras } = leerLetras();
  const repertorioActual = leerRepertorio(); // array de nombres, tu función ya existente

  const combinado = repertorioActual
    .map(nombre => {
      const index = canciones.indexOf(nombre);
      if (index === -1) return null;
      return { nombre, letra: letras[index] };
    })
    .filter(Boolean); // descarta las que no tengan letra guardada

  res.json(combinado);
});

// 2. Buscar la letra de UNA canción por nombre
app.get('/api/letras/buscar', (req, res) => {
  const { nombre } = req.query;

  if (!nombre) {
    return res.status(400).json({ error: 'Falta el parámetro nombre' });
  }

  const { canciones, letras } = leerLetras();
  const index = canciones.indexOf(nombre);

  if (index === -1) {
    return res.status(404).json({ error: 'Canción no encontrada' });
  }

  res.json({ nombre, letra: letras[index] });
});

// 3. Guardar nombre + letra de una canción nueva
// Body esperado: ["Nombre de la cancion", "letra completa aqui..."]
app.post('/api/letras', (req, res) => {
  const datos = req.body;

  if (!Array.isArray(datos) || datos.length !== 2) {
    return res.status(400).json({ error: 'Se esperaba un array [nombre, letra]' });
  }

  const [nombre, letra] = datos;
  const data = leerLetras();

  data.canciones.push(nombre);
  data.letras.push(letra);

  guardarLetras(data);
  res.json({ ok: true, nombre, letra });
});


app.listen(3001, () => console.log('Servidor en http://localhost:666'));
