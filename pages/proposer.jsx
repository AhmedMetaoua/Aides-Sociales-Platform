"use client"

import { useState } from "react"
import { useRouter } from "next/router"
import Head from "next/head"
import { HelpingHand, AlertCircle, CheckCircle2 } from 'lucide-react'

export default function ProposerPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [toast, setToast] = useState({ visible: false, title: "", message: "", type: "" })
  const [formErrors, setFormErrors] = useState({})

  async function handleSubmit(event) {
    event.preventDefault()
    setIsSubmitting(true)
    setFormErrors({})

    const formData = new FormData(event.currentTarget)
    const data = {
      type: "offre",
      titre: formData.get("titre"),
      categorie: formData.get("categorie"),
      description: formData.get("description"),
      region: formData.get("region"),
      contact: formData.get("contact"),
    }

    // Validation côté client
    const errors = {}
    if (!data.titre.trim()) errors.titre = "Le titre est requis"
    if (!data.description.trim()) errors.description = "La description est requise"
    if (!data.region.trim()) errors.region = "La région est requise"
    if (!data.contact.trim()) errors.contact = "Le contact est requis"

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      setIsSubmitting(false)
      return
    }

    try {
      const response = await fetch("/api/annonces", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Erreur lors de la création de l'annonce")
      }

      setToast({
        visible: true,
        title: "Annonce créée",
        message: "Votre proposition d'aide a été publiée avec succès.",
        type: "success",
      })
      setTimeout(() => {
        router.push("/annonces")
      }, 1500)
    } catch (error) {
      console.error("Erreur:", error)
      setToast({
        visible: true,
        title: "Erreur",
        message: error.message || "Un problème est survenu lors de la création de l'annonce.",
        type: "error",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Head>
        <title>Proposer une aide | Plateforme d'Entraide Locale</title>
        <meta name="description" content="Proposez votre aide à la communauté locale" />
      </Head>
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8 text-center">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-rose-100 dark:bg-rose-900/30 text-rose-500 dark:text-rose-400 mb-4">
              <HelpingHand className="h-8 w-8" />
            </div>
            <h1 className="text-3xl font-bold">Je propose une aide</h1>
            <p className="text-foreground/70 mt-2">
              Partagez les détails de l'aide que vous souhaitez apporter à votre communauté.
            </p>
          </div>
          
          <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div>
                <label htmlFor="titre" className="block text-sm font-medium text-foreground mb-1">
                  Titre de l'annonce
                </label>
                <input
                  id="titre"
                  name="titre"
                  placeholder="Ex: Dons de vêtements pour enfants"
                  required
                  className={`w-full px-3 py-2 border ${formErrors.titre ? "border-red-500 focus:ring-red-500" : "border-input focus:ring-rose-500"} rounded-lg focus:outline-none focus:ring-2 bg-background`}
                />
                {formErrors.titre && <p className="mt-1 text-sm text-red-500">{formErrors.titre}</p>}
              </div>

              <div>
                <label htmlFor="categorie" className="block text-sm font-medium text-foreground mb-1">
                  Catégorie
                </label>
                <select
                  id="categorie"
                  name="categorie"
                  required
                  defaultValue="vetements"
                  className="w-full px-3 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 bg-background text-foreground"
                >
                  <option value="vetements">Vêtements</option>
                  <option value="nourriture">Nourriture</option>
                  <option value="services">Services</option>
                  <option value="logement">Logement</option>
                  <option value="transport">Transport</option>
                  <option value="autre">Autre</option>
                </select>
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-foreground mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  placeholder="Décrivez ce que vous proposez, quantité, état, conditions, etc."
                  rows={4}
                  required
                  className={`w-full px-3 py-2 border ${formErrors.description ? "border-red-500 focus:ring-red-500" : "border-input focus:ring-rose-500"} rounded-lg focus:outline-none focus:ring-2 bg-background`}
                />
                {formErrors.description && <p className="mt-1 text-sm text-red-500">{formErrors.description}</p>}
              </div>

              <div>
                <label htmlFor="region" className="block text-sm font-medium text-foreground mb-1">
                  Région
                </label>
                <input
                  id="region"
                  name="region"
                  placeholder="Votre ville ou quartier"
                  required
                  className={`w-full px-3 py-2 border ${formErrors.region ? "border-red-500 focus:ring-red-500" : "border-input focus:ring-rose-500"} rounded-lg focus:outline-none focus:ring-2 bg-background`}
                />
                {formErrors.region && <p className="mt-1 text-sm text-red-500">{formErrors.region}</p>}
              </div>

              <div>
                <label htmlFor="contact" className="block text-sm font-medium text-foreground mb-1">
                  Contact
                </label>
                <input
                  id="contact"
                  name="contact"
                  placeholder="Email ou numéro de téléphone"
                  required
                  className={`w-full px-3 py-2 border ${formErrors.contact ? "border-red-500 focus:ring-red-500" : "border-input focus:ring-rose-500"} rounded-lg focus:outline-none focus:ring-2 bg-background`}
                />
                {formErrors.contact && <p className="mt-1 text-sm text-red-500">{formErrors.contact}</p>}
              </div>
              
              <div className="flex justify-between pt-4 border-t">
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="px-4 py-2 border border-input rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2 bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:pointer-events-none"
                >
                  {isSubmitting ? "Publication en cours..." : "Publier l'annonce"}
                </button>
              </div>
            </form>
          </div>
        </div>

        {toast.visible && (
          <div
            className={`fixed bottom-4 right-4 p-4 rounded-xl shadow-lg max-w-md animate-in slide-in-from-bottom ${
              toast.type === "success"
                ? "bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800"
                : "bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800"
            }`}
          >
            <div className="flex">
              <div className="flex-shrink-0">
                {toast.type === "success" ? (
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-red-500" />
                )}
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium">{toast.title}</h3>
                <div className="mt-1 text-sm text-foreground/70">{toast.message}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
