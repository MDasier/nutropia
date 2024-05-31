const { Schema, model } = require("mongoose");

const planNutricionalSchema = new Schema(
  {
    nutricionista: {
      type: Schema.Types.ObjectId, 
      ref:"User"
    },
    paciente: {
      type: Schema.Types.ObjectId, 
      ref:"User"
    },
    dieta: {
      type: Schema.Types.ObjectId, 
      ref:"Diet"
    }
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`    
    timestamps: true
  }
);

const Plan = model("Planes", planNutricionalSchema);

module.exports = Plan;