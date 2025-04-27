"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Head from "next/head"
import { HelpingHand, HandHeart, Search, Trash2 } from "lucide-react"

export default function AnnoncesPage() {
  const [annonces, setAnnonces] = useState([])
  const [filteredAnnonces, setFilteredAnnonces] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [typeFilter, setTypeFilter] = useState("tous")
  const [categorieFilter, setCategorieFilter] = useState("tous")
  const [searchQuery, setSearchQuery] = useState("")
  const [error, setError] = useState(null)

  useEffect(() => {
    async function loadAnnonces() {
      try {
        setIsLoading(true)
        const response = await fetch("/api/annonces")
        if (!response.ok) {
          throw new Error("Erreur lors du chargement des annonces")
        }
        const data = await response.json()
        setAnnonces(data)
        setFilteredAnnonces(data)
        setError(null)
      } catch (error) {
        console.error("Erreur lors du chargement des annonces:", error)
        setError("Impossible de charger les annonces. Veuillez réessayer plus tard.")
      } finally {
        setIsLoading(false)
      }
    }

    loadAnnonces()
  }, [])

  useEffect(() => {
    let result = annonces

    // Filtre par type
    if (typeFilter !== "tous") {
      result = result.filter((annonce) => annonce.type === typeFilter)
    }

    // Filtre par catégorie
    if (categorieFilter !== "tous") {
      result = result.filter((annonce) => annonce.categorie === categorieFilter)
    }

    // Filtre par recherche
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (annonce) =>
          annonce.titre.toLowerCase().includes(query) ||
          annonce.description.toLowerCase().includes(query) ||
          annonce.region.toLowerCase().includes(query),
      )
    }

    setFilteredAnnonces(result)
  }, [typeFilter, categorieFilter, searchQuery, annonces])

  async function handleDeleteAnnonce(id) {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette annonce ?")) {
      try {
        const response = await fetch(`/api/annonces/${id}`, {
          method: "DELETE",
        })

        if (!response.ok) {
          throw new Error("Erreur lors de la suppression de l'annonce")
        }

        // Mettre à jour la liste des annonces
        setAnnonces(annonces.filter((annonce) => annonce._id !== id))
      } catch (error) {
        console.error("Erreur lors de la suppression:", error)
        alert("Impossible de supprimer l'annonce. Veuillez réessayer.")
      }
    }
  }

  function getTypeIcon(type) {
    return type === "offre" ? <HelpingHand className="h-5 w-5" /> : <HandHeart className="h-5 w-5" />
  }

  function getTypeColor(type) {
    return type === "offre" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
  }

  function getCategorieLabel(categorie) {
    const categories = {
      vetements: "Vêtements",
      nourriture: "Nourriture",
      services: "Services",
      logement: "Logement",
      transport: "Transport",
      autre: "Autre",
    }
    return categories[categorie] || categorie
  }

  function formatDate(dateString) {
    const date = new Date(dateString)
    return date.toLocaleDateString()
  }

  if (isLoading) {
    return (
      <>
        <Head>
          <title>Annonces | Plateforme d'Entraide Locale</title>
          <meta name="description" content="Consultez les annonces d'entraide dans votre région" />
        </Head>
        <div className="container mx-auto px-4 py-12 text-center">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/3 mb-12"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-background border border-gray-200 rounded-lg shadow-md overflow-hidden p-4">
                  <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                  <div className="h-20 bg-gray-200 rounded w-full mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </>
    )
  }

  if (error) {
    return (
      <>
        <Head>
          <title>Erreur | Plateforme d'Entraide Locale</title>
        </Head>
        <div className="container mx-auto px-4 py-12 text-center">
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8">
            <p className="text-red-700">{error}</p>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Réessayer
          </button>
        </div>
      </>
    )
  }

  return (
    <>
      <Head>
        <title>Annonces | Plateforme d'Entraide Locale</title>
        <meta name="description" content="Consultez les annonces d'entraide dans votre région" />
      </Head>
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col items-start gap-6">
          <div className="flex flex-col sm:flex-row justify-between w-full gap-4">
            <h1 className="text-3xl font-bold">Annonces d'entraide</h1>
            <div className="flex gap-2">
              <Link href="/proposer">
                <button className="flex items-center gap-1 px-3 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  <HelpingHand className="h-4 w-4" />
                  Proposer
                </button>
              </Link>
              <Link href="/demander">
                <button className="flex items-center gap-1 px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-100 text-foreground">
                  <HandHeart className="h-4 w-4" />
                  Demander
                </button>
              </Link>
            </div>
          </div>

          <div className="w-full bg-background border border-gray-200 p-4 rounded-lg shadow-sm">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-foreground/50" />
                  <input
                    type="text"
                    placeholder="Rechercher une annonce..."
                    className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-background"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <div className="w-40">
                  <select
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-background text-foreground"
                  >
                    <option value="tous">Tous les types</option>
                    <option value="offre">Offres</option>
                    <option value="demande">Demandes</option>
                  </select>
                </div>

                <div className="w-40">
                  <select
                    value={categorieFilter}
                    onChange={(e) => setCategorieFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-background text-foreground"
                  >
                    <option value="tous">Toutes</option>
                    <option value="vetements">Vêtements</option>
                    <option value="nourriture">Nourriture</option>
                    <option value="services">Services</option>
                    <option value="logement">Logement</option>
                    <option value="transport">Transport</option>
                    <option value="autre">Autre</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {filteredAnnonces.length === 0 ? (
            <div className="w-full text-center py-12">
              <p className="text-foreground/70">Aucune annonce ne correspond à vos critères.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
              {filteredAnnonces.map((annonce) => (
                <div
                  key={annonce._id}
                  className="bg-background border border-gray-200 rounded-lg shadow-md overflow-hidden flex flex-col h-full"
                >
                  <div className="p-4 pb-2">
                    <div className="flex justify-between items-start">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(annonce.type)}`}
                      >
                        {getTypeIcon(annonce.type)}
                        {annonce.type === "offre" ? "Je propose" : "Je recherche"}
                      </span>
                      <span className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {getCategorieLabel(annonce.categorie)}
                      </span>
                    </div>
                    <h2 className="text-xl font-semibold mt-2">{annonce.titre}</h2>
                    <p className="text-sm text-foreground/70 flex items-center gap-1">
                      <span className="font-medium">Région:</span> {annonce.region}
                    </p>
                  </div>
                  <div className="p-4 pt-0 flex-grow">
                    <p className="text-sm text-foreground/70 line-clamp-4">{annonce.description}</p>
                  </div>
                  <div className="p-4 pt-2 border-t">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm">
                          <span className="font-medium">Contact:</span> {annonce.contact}
                        </p>
                        <p className="text-xs text-foreground/50 mt-1">Publié le {formatDate(annonce.dateCreation)}</p>
                      </div>
                      <button
                        onClick={() => handleDeleteAnnonce(annonce._id)}
                        className="p-1 text-red-500 hover:bg-red-50 rounded"
                        title="Supprimer l'annonce"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
