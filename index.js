const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Datos de ejemplo para los servicios (simulando una base de datos)
let servicios = [
    { id: 1, titulo: 'Cirugía Ambulatoria', descripcion: 'Ponemos a tu disposición los procedimientos quirúrgicos sin necesidad de un internamiento prolongado.' },
    { id: 2, titulo: 'Quirófano', descripcion: 'Quirófano altamente equipado para realizar distintos procedimientos de manera segura y eficaz.' },
    { id: 3, titulo: 'Rayos X', descripcion: 'Contamos con el personal especializado y el equipo de alta calidad para ofrecerte el mejor servicio de Rayos X.' },
    // Agrega más servicios aquí según sea necesario
];

// Obtener todos los servicios
app.get('/servicios', (req, res) => {
    res.json(servicios);
});

// Obtener un servicio por ID
app.get('/servicios/:id', (req, res) => {
    const { id } = req.params;
    const servicio = servicios.find(servicio => servicio.id === parseInt(id));
    if (servicio) {
        res.json(servicio);
    } else {
        res.status(404).json({ error: 'Servicio no encontrado' });
    }
});

// Crear un nuevo servicio
app.post('/servicios', (req, res) => {
    const { titulo, descripcion } = req.body;
    const nuevoServicio = { id: servicios.length + 1, titulo, descripcion };
    servicios.push(nuevoServicio);
    res.json({ message: 'Servicio creado correctamente', servicio: nuevoServicio });
});

// Actualizar un servicio por ID
app.put('/servicios/:id', (req, res) => {
    const { id } = req.params;
    const { titulo, descripcion } = req.body;

    const index = servicios.findIndex(servicio => servicio.id === parseInt(id));
    if (index !== -1) {
        servicios[index].titulo = titulo;
        servicios[index].descripcion = descripcion;
        res.json({ message: 'Servicio actualizado correctamente', servicio: servicios[index] });
    } else {
        res.status(404).json({ error: 'Servicio no encontrado' });
    }
});

// Eliminar un servicio por ID
app.delete('/servicios/:id', (req, res) => {
    const { id } = req.params;
    servicios = servicios.filter(servicio => servicio.id !== parseInt(id));
    res.json({ message: 'Servicio eliminado correctamente' });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});
