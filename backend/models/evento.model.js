import mongoose from "mongoose";

const eventoSchema = new mongoose.Schema({
    titulo: { 
        type: String,
        required: true
     },
     categoria: {
        type: String, 
        required: true
     },
     data: {
        type: String, 
        required: true
     },
     inicio: {
        type: String, 
        required: true
     },
     fim: {
        type: String, 
        required: true
     },
     criador: {
        type: String, 
        required: true
     },
     usuariosAssociados : {
      type: [String],
      required: false
     },
     dataFim: {
      type: String,
      required: false
     },
     cancelado: {
      type: Boolean, 
      required: false,
      default: false
   }

}, {timestamps: true})

const Evento = mongoose.model("Evento", eventoSchema)

export default Evento