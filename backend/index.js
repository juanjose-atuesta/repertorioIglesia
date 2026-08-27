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


app.listen(3001, () => console.log('Servidor en http://localhost:666'));
