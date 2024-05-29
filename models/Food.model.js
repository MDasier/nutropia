const { Schema, model } = require("mongoose");

const foodSchema = new Schema(
  {//PROBLEMAS HEREDADOS DEL JSON-GPT
    Alimento: {
      type: String,
      unique: true
    },
    Medida_culinaria: {
      type: String
    },
    PB: {
      type: String
    },
    PN: {
      type:String
    },
    Energía_kcal: {
      type:String
    },
    Agua_g: {
      type: String
    },
    Proteína_g: {
      type: String
    },
    PA: {
      type: String
    },
    PV: {
      type:String
    },
    Grasas_g: {
      type:String
    },
    AGS: {
      type:String
    },
    AGM: {
      type:String
    },
    AGP: {
      type:String
    },
    Colest_mg: {
      type:String
    },
    HC_g: {
      type:String
    },
    Azúcar: {
      type:String
    },
    Polis: {
      type:String
    },
    Fibra_g: {
      type:String
    }
  }
);

const Food = model("Food", foodSchema);

module.exports = Food;