import connectToDatabase from "../../../lib/mongodb"
import Annonce from "../../../models/Annonce"

export default async function handler(req, res) {
  const { id } = req.query

  if (!id) {
    return res.status(400).json({ error: "ID de l'annonce requis" })
  }

  // Connexion à la base de données
  try {
    await connectToDatabase()
  } catch (error) {
    console.error("Erreur de connexion à MongoDB:", error)
    return res.status(500).json({ error: "Erreur de connexion à la base de données" })
  }

  // GET - Récupérer une annonce spécifique
  if (req.method === "GET") {
    try {
      const annonce = await Annonce.findById(id).lean()

      if (!annonce) {
        return res.status(404).json({ error: "Annonce non trouvée" })
      }

      return res.status(200).json(annonce)
    } catch (error) {
      console.error("Erreur lors de la récupération de l'annonce:", error)
      return res.status(500).json({ error: "Erreur lors de la récupération de l'annonce" })
    }
  }

  // PUT - Mettre à jour une annonce
  if (req.method === "PUT") {
    const data = req.body

    // Validation des données
    if (!data.titre || !data.categorie || !data.description || !data.region || !data.contact) {
      return res.status(400).json({ error: "Tous les champs sont obligatoires" })
    }

    try {
      const annonceModifiee = await Annonce.findByIdAndUpdate(
        id,
        {
          type: data.type,
          titre: data.titre,
          categorie: data.categorie,
          description: data.description,
          region: data.region,
          contact: data.contact,
        },
        { new: true, runValidators: true }, // Retourne le document mis à jour et valide les données
      ).lean()

      if (!annonceModifiee) {
        return res.status(404).json({ error: "Annonce non trouvée" })
      }

      return res.status(200).json(annonceModifiee)
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'annonce:", error)
      return res.status(500).json({ error: "Erreur lors de la mise à jour de l'annonce" })
    }
  }

  // DELETE - Supprimer une annonce
  if (req.method === "DELETE") {
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
  res.setHeader("Allow", ["GET", "PUT", "DELETE"])
  res.status(405).end(`Method ${req.method} Not Allowed`)
}
