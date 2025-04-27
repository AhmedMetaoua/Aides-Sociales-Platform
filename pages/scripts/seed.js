// Ce script peut être utilisé pour initialiser la base de données en dehors de l'API
const { MongoClient } = require("mongodb")
require("dotenv").config({ path: ".env.local" })

const uri = process.env.MONGODB_URI
const client = new MongoClient(uri)

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

async function main() {
  try {
    await client.connect()
    console.log("Connecté à MongoDB")

    const database = client.db("entraide-locale")
    const annonces = database.collection("annonces")

    // Supprimer toutes les annonces existantes
    const deleteResult = await annonces.deleteMany({})
    console.log(`${deleteResult.deletedCount} annonces supprimées`)

    // Insérer les nouvelles données
    const insertResult = await annonces.insertMany(donneesSeed)
    console.log(`${insertResult.insertedCount} annonces insérées`)
  } finally {
    await client.close()
    console.log("Connexion fermée")
  }
}

main().catch(console.error)
