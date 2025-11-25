const Juegos = require("../models/juegoModel");

// C - CREAR
exports.crearJuego = async (req, res) => {
    try {
        const nuevoJuego = new Juegos(req.body);
        const juegoGuardado = await nuevoJuego.save();
        return res.status(201).json(juegoGuardado);
    } catch (error) {
        return res.status(400).json({
            mensaje: "Error al crear el juego",
            error: error.message
        });
    }
};

// R - Obtener todos los juegos
exports.obtenerJuegos = async (req, res) => {
    try {
        const juegos = await Juegos.find().sort({ fechaCreacion: -1 });
        return res.status(200).json(juegos);
    } catch (error) {
        return res.status(500).json({
            mensaje: "Error al obtener los juegos",
            error: error.message
        });
    }
};

// R - Obtener un juego por ID
exports.obtenerJuegoPorId = async (req, res) => {
    try {
        const juego = await Juegos.findById(req.params.id);

        if (!juego) {
            return res.status(404).json({ mensaje: "Juego no encontrado" });
        }

        return res.status(200).json(juego);
    } catch (error) {
        return res.status(500).json({
            mensaje: "Error al obtener el juego",
            error: error.message
        });
    }
};

// U - ACTUALIZAR
exports.actualizarJuego = async (req, res) => {
    try {
        const juegoActualizado = await Juegos.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!juegoActualizado) {
            return res.status(404).json({ mensaje: "Juego no encontrado" });
        }

        return res.status(200).json(juegoActualizado);
    } catch (error) {
        return res.status(400).json({
            mensaje: "Error al actualizar el juego",
            error: error.message
        });
    }
};

// D - ELIMINAR
exports.eliminarJuego = async (req, res) => {
    try {
        const juegoEliminado = await Juegos.findByIdAndDelete(req.params.id);

        if (!juegoEliminado) {
            return res.status(404).json({ mensaje: "Juego no encontrado" });
        }

        return res.status(200).json({ mensaje: "Juego eliminado correctamente" });
    } catch (error) {
        return res.status(500).json({
            mensaje: "Error al eliminar el juego",
            error: error.message
        });
    }
};

// BÚSQUEDA Y FILTROS AVANZADOS
exports.buscarJuegos = async (req, res) => {
    try {
        const { 
            titulo, 
            genero, 
            plataforma, 
            completado, 
            desarrollador,
            sortBy = 'fechaCreacion',
            order = 'desc'
        } = req.query;

        let filtro = {};

        if (titulo) {
            filtro.titulo = { $regex: titulo, $options: 'i' };
        }

        if (genero) {
            filtro.genero = genero;
        }

        if (plataforma) {
            filtro.plataforma = plataforma;
        }

        if (completado !== undefined) {
            filtro.completado = completado === 'true';
        }

        if (desarrollador) {
            filtro.desarrollador = { $regex: desarrollador, $options: 'i' };
        }

        const orden = order === 'asc' ? 1 : -1;
        const juegos = await Juegos.find(filtro).sort({ [sortBy]: orden });

        return res.status(200).json(juegos);
    } catch (error) {
        return res.status(500).json({
            mensaje: "Error en la búsqueda de juegos",
            error: error.message
        });
    }
};
