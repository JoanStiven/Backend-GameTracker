const { Schema, model } = require('mongoose');

const juegoSchema = new Schema(
    {
        titulo: {
            type: String,
            required: true,
            trim: true
        },

        genero: {
            type: String,
            required: true,
            enum: ['Acción','RPG','Aventura','Deportes','Roguelike', 'Shooter', 'Metroidvania', 'Terror'],
            trim: true
        },

        plataforma: {
            type: String,
            required: true,
            enum: ["PC", "PlayStation", "Xbox", "Nintendo", "Mobile"],
            trim: true
        },

        lanzamientoAnio: {
            type: Number,
            required: true,
        },

        desarrollador: {
            type: String,
            required: true,
            trim: true
        },

        imagenPortada: {
            type: String,
            default: null,
            trim: true
        },

        descripcion: {
            type: String,
            trim: true
        },

        completado: {
            type: Boolean,
            default: false
        }
    },

    {
        timestamps: { createdAt: "fechaCreacion", updatedAt: "fechaActualizacion" }
    }
);

juegoSchema.pre('findOneAndDelete', async function(next) {
    const juegoId = this.getQuery()._id;

    const Resena = require('./resenaModel'); 

    await Resena.deleteMany({ juegoId: juegoId });

    next();
});

module.exports = model("juegos", juegoSchema);