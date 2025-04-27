"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Head from "next/head"
import { HelpingHand, HandHeart, Search, Trash2, Filter, MapPin, Calendar, User, AlertCircle } from 'lucide-react'

export default function AnnoncesPage() {
  const [annonces, setAnnonces] = useState([])
  const [filteredAnnonces, setFilteredAnnonces] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [typeFilter, setTypeFilter] = useState("tous")
  const [categorieFilter, setCategorieFilter] = useState("tous")
  const [searchQuery, setSearchQuery] = useState("")
  const [error, setError] = useState(null)
  const [isFilterOpen, setIsFilterOpen] = useState(false)

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
    return type === "offre" 
      ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" 
      : "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400"
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
        <div className="container mx-auto px-4 py-12">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-full w-1/4 mb-8"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full w-1/2 mb-4"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full w-1/3 mb-12"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-card border border-border rounded-xl shadow-sm overflow-hidden p-4">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full w-1/4 mb-4"></div>
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full w-1/2 mb-4"></div>
                  <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded-lg w-full mb-4"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full w-2/3"></div>
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
          <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 p-6 rounded-xl mb-8 max-w-md mx-auto">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <p className="text-foreground">{error}</p>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-gradient-to-r from-rose-500 to-purple-600 text-white rounded-lg hover:from-rose-600 hover:to-purple-700 transition-colors"
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
          <div className="flex flex-col sm:flex-row justify-between w-full gap-4 items-center">
            <h1 className="text-3xl font-bold">Annonces d'entraide</h1>
            <div className="flex gap-2">
              <Link href="/proposer">
                <button className="flex items-center gap-1 px-4 py-2 text-sm bg-gradient-to-r from-rose-500 to-purple-600 text-white rounded-lg hover:from-rose-600 hover:to-purple-700 transition-colors shadow-sm">
                  <HelpingHand className="h-4 w-4" />
                  Proposer
                </button>
              </Link>
              <Link href="/demander">
                <button className="flex items-center gap-1 px-4 py-2 text-sm border border-input bg-card rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors shadow-sm">
                  <HandHeart className="h-4 w-4" />
                  Demander
                </button>
              </Link>
            </div>
          </div>

          <div className="w-full bg-card border border-border p-4 rounded-xl shadow-sm">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/50" />
                  <input
                    type="text"
                    placeholder="Rechercher une annonce..."
                    className="w-full pl-10 pr-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 bg-background"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              <div className="sm:hidden">
                <button 
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-input rounded-lg bg-card hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <Filter className="h-4 w-4" />
                  Filtres
                </button>
              </div>

              <div className={`flex gap-2 ${isFilterOpen ? 'flex' : 'hidden sm:flex'}`}>
                <div className="w-full sm:w-40">
                  <select
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 bg-background text-foreground"
                  >
                    <option value="tous">Tous les types</option>
                    <option value="offre">Offres</option>
                    <option value="demande">Demandes</option>
                  </select>
                </div>

                <div className="w-full sm:w-40">
                  <select
                    value={categorieFilter}
                    onChange={(e) => setCategorieFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 bg-background text-foreground"
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
            <div className="w-full text-center py-12 bg-card border border-border rounded-xl">
              <div className="max-w-md mx-auto p-6">
                <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
                  <Search className="h-8 w-8 text-foreground/50" />
                </div>
                <h2 className="text-xl font-semibold mb-2">Aucune annonce trouvée</h2>
                <p className="text-foreground/70 mb-6">Aucune annonce ne correspond à vos critères de recherche.</p>
                <button 
                  onClick={() => {
                    setTypeFilter("tous");
                    setCategorieFilter("tous");
                    setSearchQuery("");
                  }}
                  className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  Réinitialiser les filtres
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
              {filteredAnnonces.map((annonce) => (
                <div
                  key={annonce._id}
                  className="group bg-card border border-border rounded-xl shadow-sm overflow-hidden flex flex-col h-full hover:shadow-md transition-shadow"
                >
                  <div className="p-5 pb-3">
                    <div className="flex justify-between items-start">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${getTypeColor(annonce.type)}`}
                      >
                        {getTypeIcon(annonce.type)}
                        {annonce.type === "offre" ? "Je propose" : "Je recherche"}
                      </span>
                      <span className="inline-block px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-800 text-foreground/80">
                        {getCategorieLabel(annonce.categorie)}
                      </span>
                    </div>
                    <h2 className="text-xl font-semibold mt-3 group-hover:text-rose-500 dark:group-hover:text-rose-400 transition-colors">{annonce.titre}</h2>
                    <p className="text-sm text-foreground/70 flex items-center gap-1 mt-1">
                      <MapPin className="h-3.5 w-3.5" />
                      {annonce.region}
                    </p>
                  </div>
                  <div className="p-5 pt-0 flex-grow">
                    <p className="text-sm text-foreground/70 line-clamp-4">{annonce.description}</p>
                  </div>
                  <div className="p-5 pt-3 border-t border-border">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm flex items-center gap-1">
                          <User className="h-3.5 w-3.5" />
                          <span className="text-foreground/70">{annonce.contact}</span>
                        </p>
                        <p className="text-xs text-foreground/50 mt-1 flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          Publié le {formatDate(annonce.dateCreation)}
                        </p>
                      </div>
                      <button
                        onClick={() => handleDeleteAnnonce(annonce._id)}
                        className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors"
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
