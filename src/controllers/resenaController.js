const Resenas = require("../models/resenaModel");

// C - CREAR RESEÑA
exports.crearResena = async (req, res) => {
    try {
        const nuevaResena = new Resenas(req.body);
        const resenaGuardada = await nuevaResena.save();

        return res.status(201).json(resenaGuardada);
    } catch (error) {
        return res.status(400).json({
            mensaje: "Error al crear la reseña",
            error: error.message
        });
    }
};

// R - OBTENER TODAS LAS RESEÑAS
exports.obtenerResenas = async (req, res) => {
    try {
        const resenas = await Resenas.find()
            .populate("juegoId", "titulo plataforma genero") 
            .sort({ fechaCreacion: -1 });

        return res.status(200).json(resenas);
    } catch (error) {
        return res.status(500).json({
            mensaje: "Error al obtener las reseñas",
            error: error.message
        });
    }
};

// R - OBTENER RESEÑA POR ID
exports.obtenerResenaPorId = async (req, res) => {
    try {
        const resena = await Resenas.findById(req.params.id)
            .populate("juegoId", "titulo plataforma genero");

        if (!resena) {
            return res.status(404).json({ mensaje: "Reseña no encontrada" });
        }

        return res.status(200).json(resena);
    } catch (error) {
        return res.status(500).json({
            mensaje: "Error al obtener la reseña",
            error: error.message
        });
    }
};

// R - OBTENER RESEÑAS DE UN JUEGO ESPECÍFICO
exports.obtenerResenasPorJuego = async (req, res) => {
    try {
        const resenas = await Resenas.find({ juegoId: req.params.juegoId })
            .sort({ fechaCreacion: -1 });

        return res.status(200).json(resenas);
    } catch (error) {
        return res.status(500).json({
            mensaje: "Error al obtener las reseñas del juego",
            error: error.message
        });
    }
};

// U - ACTUALIZAR RESEÑA
exports.actualizarResena = async (req, res) => {
    try {
        const resenaActualizada = await Resenas.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!resenaActualizada) {
            return res.status(404).json({ mensaje: "Reseña no encontrada" });
        }

        return res.status(200).json(resenaActualizada);
    } catch (error) {
        return res.status(400).json({
            mensaje: "Error al actualizar la reseña",
            error: error.message
        });
    }
};

// D - ELIMINAR RESEÑA
exports.eliminarResena = async (req, res) => {
    try {
        const resenaEliminada = await Resenas.findByIdAndDelete(req.params.id);

        if (!resenaEliminada) {
            return res.status(404).json({ mensaje: "Reseña no encontrada" });
        }

        return res.status(200).json({ mensaje: "Reseña eliminada correctamente" });
    } catch (error) {
        return res.status(500).json({
            mensaje: "Error al eliminar la reseña",
            error: error.message
        });
    }
};