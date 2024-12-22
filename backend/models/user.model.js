import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
   nome: {
      type: String,
      required: true
   },
   email: {
      type: String,
      required: true
   },
   senha: {
      type: String,
      required: true
   },
   rua: { type: String, required: true },
   cidade: { type: String, required: true },
   estado: { type: String, required: true },

   interesses: {
      type: [String],
      required: true
   },
   notificacoes: {
      type: [{
         titulo: { type: String, required: true },
         corpo: { type: String, required: true },
         lida: { type: Boolean, default: false },
         criadaEm: { type: Date, default: Date.now }
      }],
      default: [],
      required: false
   },


}, { timestamps: true })

const User = mongoose.model("User", userSchema)

export default User