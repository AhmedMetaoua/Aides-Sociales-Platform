import mongoose from "mongoose"

// Vérifier si le modèle existe déjà pour éviter les erreurs en développement
// avec le rechargement à chaud
const AnnonceSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      enum: ["offre", "demande"],
    },
    titre: {
      type: String,
      required: true,
      trim: true,
    },
    categorie: {
      type: String,
      required: true,
      enum: ["vetements", "nourriture", "services", "logement", "transport", "autre"],
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    region: {
      type: String,
      required: true,
      trim: true,
    },
    contact: {
      type: String,
      required: true,
      trim: true,
    },
    dateCreation: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // Ajoute automatiquement createdAt et updatedAt
  },
)

// Vérifier si le modèle existe déjà pour éviter les erreurs en développement
export default mongoose.models.Annonce || mongoose.model("Annonce", AnnonceSchema)
