const { Schema, model } = require("mongoose");

const alimentoSchema = new Schema(
  {
    nombre: {
      type: String
    },
    categoria: {
      type: String,
      enum: ['lacteos','hortaliza-verdura','fruta-zumo','cereales-derivados','alimentos-proteicos','alimentos-grasos','azucares-dulces'],
      lowercase: true
    },
    medida: {
      type: String
    },
    energiaKCAL: {
      type: String
    },
    HC: {
      type: String
    },
    grasas: {
      type: String
    },
    proteinas: {
      type: String
    }


  }
);

const Alimentos = model("Alimentos", alimentoSchema);

module.exports = Alimentos;