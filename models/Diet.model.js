const { Schema, model } = require("mongoose");

const dietaSchema = new Schema(
  {
    tipo: {
      type: [String],
      enum: ['low-carb','lactose-free']
    },
    menuSemana1: {
      type: Schema.Types.Map
    },
    menuSemana2: {
      type: Schema.Types.Map
    },
    recomendacion: {
      type: String
    },
    nutricionista: {
      type: Schema.Types.ObjectId, 
      ref:"User"
    },
    planNutricional: {
      type: Schema.Types.ObjectId,
      ref:"Plan"
    }
  }
);

const Dietas = model("Diet", dietaSchema);

module.exports = Dietas;