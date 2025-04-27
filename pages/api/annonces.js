import connectToDatabase from "../../lib/mongodb"
import Annonce from "../../models/Annonce"

export default async function handler(req, res) {
  // Connexion à la base de données
  try {
    await connectToDatabase()
  } catch (error) {
    console.error("Erreur de connexion à MongoDB:", error)
    return res.status(500).json({ error: "Erreur de connexion à la base de données" })
  }

  // GET - Récupérer toutes les annonces
  if (req.method === "GET") {
    try {
      // Récupérer toutes les annonces, triées par date de création (plus récent en premier)
      const annonces = await Annonce.find({}).sort({ dateCreation: -1 }).lean() // Convertit les documents Mongoose en objets JavaScript simples

      return res.status(200).json(annonces)
    } catch (error) {
      console.error("Erreur lors de la récupération des annonces:", error)
      return res.status(500).json({ error: "Erreur lors de la récupération des annonces" })
    }
  }

  // POST - Créer une nouvelle annonce
  if (req.method === "POST") {
    const data = req.body

    // Validation des données
    if (!data.titre || !data.categorie || !data.description || !data.region || !data.contact) {
      return res.status(400).json({ error: "Tous les champs sont obligatoires" })
    }

    try {
      // Créer une nouvelle annonce
      const nouvelleAnnonce = new Annonce({
        type: data.type,
        titre: data.titre,
        categorie: data.categorie,
        description: data.description,
        region: data.region,
        contact: data.contact,
        dateCreation: new Date(),
      })

      // Sauvegarder l'annonce dans la base de données
      await nouvelleAnnonce.save()

      return res.status(201).json(nouvelleAnnonce)
    } catch (error) {
      console.error("Erreur lors de la création de l'annonce:", error)
      return res.status(500).json({ error: "Erreur lors de la création de l'annonce" })
    }
  }

  // DELETE - Supprimer une annonce
  if (req.method === "DELETE") {
    const { id } = req.query

    if (!id) {
      return res.status(400).json({ error: "ID de l'annonce requis" })
    }

    try {
      const annonceSupprimer = await Annonce.findByIdAndDelete(id)

      if (!annonceSupprimer) {
        return res.status(404).json({ error: "Annonce non trouvée" })
      }

      return res.status(200).json({ message: "Annonce supprimée avec succès" })
    } catch (error) {
      console.error("Erreur lors de la suppression de l'annonce:", error)
      return res.status(500).json({ error: "Erreur lors de la suppression de l'annonce" })
    }
  }

  // Méthode non supportée
  res.setHeader("Allow", ["GET", "POST", "DELETE"])
  res.status(405).end(`Method ${req.method} Not Allowed`)
}
