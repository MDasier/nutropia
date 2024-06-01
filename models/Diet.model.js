const { Schema, model } = require("mongoose");

const menuDiarioSchema = new Schema({
  desayuno: { type: String },
  almuerzo: { type: String },
  comida: { type: String },
  merienda: { type: String },
  cena: { type: String }
})

const menuSemanalSchema = new Schema({
  lunes: { type: Schema.Types.Map,
    of: menuDiarioSchema
  },
  martes: { type: Schema.Types.Map,
    of: menuDiarioSchema
  },
  miercoles: { type: Schema.Types.Map,
    of: menuDiarioSchema
  },
  jueves: { type: Schema.Types.Map,
    of: menuDiarioSchema
  },
  viernes: { type: Schema.Types.Map,
    of: menuDiarioSchema
  },
  sabado: { type: Schema.Types.Map,
    of: menuDiarioSchema
  },
  domingo: { type: Schema.Types.Map,
    of: menuDiarioSchema
  }
})

const dietaSchema = new Schema(
  {
    tipo: {
      type: [String],
      enum: ['low-carb','lactose-free']
    },
    menuSemana1: {
      type: Schema.Types.Map,
      of: menuSemanalSchema
    },
    menuSemana2: {
      type: Schema.Types.Map,
      of: menuSemanalSchema
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