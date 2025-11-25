const mongoose = require('mongoose');
const { Schema } = mongoose;

const resenaSchema = new Schema(
  {
    juegoId: {
      type: Schema.Types.ObjectId,
      ref: "juegos",
      required: true
    },

    puntuacion: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },

    textoResena: {
      type: String,
      trim: true
    },

    horasJugadas: {
      type: Number,
      min: 0,
      default: 0
    },

    dificultad: {
      type: String,
      enum: ["Fácil", "Normal", "Difícil"],
      required: true
    },

    recomendaria: {
      type: Boolean,
      default: false
    }
  },

  {
    timestamps: {
      createdAt: "fechaCreacion",
      updatedAt: "fechaActualizacion"
    }
  }
);

module.exports = mongoose.model("resenas", resenaSchema);
