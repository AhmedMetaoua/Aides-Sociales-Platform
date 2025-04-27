import connectToDatabase from "../../lib/mongodb"
import Annonce from "../../models/Annonce"

// Données initiales pour peupler la base de données
const donneesSeed = [
  {
    type: "offre",
    titre: "Don de vêtements pour enfants",
    categorie: "vetements",
    description:
      "Je donne des vêtements pour enfants de 2 à 5 ans en bon état. Plusieurs t-shirts, pantalons et pulls disponibles.",
    region: "Lyon",
    contact: "contact@example.com",
    dateCreation: new Date("2023-04-15"),
  },
  {
    type: "demande",
    titre: "Recherche aide pour déménagement",
    categorie: "services",
    description:
      "J'ai besoin d'aide pour déménager quelques meubles le weekend prochain. Petit appartement au 2ème étage sans ascenseur.",
    region: "Paris",
    contact: "0612345678",
    dateCreation: new Date("2023-04-18"),
  },
  {
    type: "offre",
    titre: "Cours de mathématiques gratuits",
    categorie: "services",
    description:
      "Professeur à la retraite, je propose des cours de mathématiques gratuits pour collégiens en difficulté.",
    region: "Marseille",
    contact: "prof.math@example.com",
    dateCreation: new Date("2023-04-20"),
  },
  {
    type: "demande",
    titre: "Recherche repas pour personne isolée",
    categorie: "nourriture",
    description: "Personne âgée isolée recherche aide pour repas quelques jours par semaine.",
    region: "Bordeaux",
    contact: "aidants@example.org",
    dateCreation: new Date("2023-04-22"),
  },
  {
    type: "offre",
    titre: "Transport solidaire",
    categorie: "transport",
    description:
      "Je propose de transporter des personnes sans moyen de locomotion pour leurs rendez-vous médicaux ou administratifs.",
    region: "Toulouse",
    contact: "transport.solidaire@example.com",
    dateCreation: new Date("2023-04-25"),
  },
]

export default async function handler(req, res) {
  // Cette route ne devrait être accessible qu'en développement
  if (process.env.NODE_ENV !== "development") {
    return res.status(403).json({ error: "Cette route n'est accessible qu'en environnement de développement" })
  }

  // Connexion à la base de données
  try {
    await connectToDatabase()
  } catch (error) {
    console.error("Erreur de connexion à MongoDB:", error)
    return res.status(500).json({ error: "Erreur de connexion à la base de données" })
  }

  if (req.method === "POST") {
    try {
      // Supprimer toutes les annonces existantes
      await Annonce.deleteMany({})

      // Insérer les nouvelles données
      await Annonce.insertMany(donneesSeed)

      return res.status(200).json({ message: "Base de données initialisée avec succès", count: donneesSeed.length })
    } catch (error) {
      console.error("Erreur lors de l'initialisation de la base de données:", error)
      return res.status(500).json({ error: "Erreur lors de l'initialisation de la base de données" })
    }
  }

  // Méthode non supportée
  res.setHeader("Allow", ["POST"])
  res.status(405).end(`Method ${req.method} Not Allowed`)
}
