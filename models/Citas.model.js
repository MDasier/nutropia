const { Schema, model } = require("mongoose");

const citasSchema = new Schema(
  {
    estado: {
      type: String,
      enum: ['pendiente','realizada']
    },
    fecha: {
      type: Date
    },
    nutricionista: {
      type: Schema.Types.ObjectId, 
      ref:"User"
    },
    paciente: {
      type: Schema.Types.ObjectId,
      ref:"User"
    }
  }
);

const Citas = model("Citas", citasSchema);

module.exports = Citas;