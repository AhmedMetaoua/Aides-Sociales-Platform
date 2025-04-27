"use client"

import { useState } from "react"
import { useRouter } from "next/router"
import Head from "next/head"

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
        <div className="max-w-2xl mx-auto bg-background border border-gray-200 rounded-lg shadow-md overflow-hidden">
          <div className="p-6 border-b">
            <h2 className="text-2xl font-bold">Je propose une aide</h2>
            <p className="text-foreground/70 mt-1">
              Partagez les détails de l'aide que vous souhaitez apporter à votre communauté.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="p-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="titre" className="block text-sm font-medium text-foreground mb-1">
                  Titre de l'annonce
                </label>
                <input
                  id="titre"
                  name="titre"
                  placeholder="Ex: Dons de vêtements pour enfants"
                  required
                  className={`w-full px-3 py-2 border ${formErrors.titre ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-background`}
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-background"
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
                  className={`w-full px-3 py-2 border ${formErrors.description ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-background`}
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
                  className={`w-full px-3 py-2 border ${formErrors.region ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-background`}
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
                  className={`w-full px-3 py-2 border ${formErrors.contact ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-background`}
                />
                {formErrors.contact && <p className="mt-1 text-sm text-red-500">{formErrors.contact}</p>}
              </div>
            </div>
            <div className="flex justify-between mt-6 pt-4 border-t">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100"
              >
                Annuler
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                {isSubmitting ? "Publication en cours..." : "Publier l'annonce"}
              </button>
            </div>
          </form>
        </div>

        {toast.visible && (
          <div
            className={`fixed bottom-4 right-4 p-4 rounded-md shadow-lg ${
              toast.type === "success"
                ? "bg-green-100 border-l-4 border-green-500"
                : "bg-red-100 border-l-4 border-red-500"
            }`}
          >
            <div className="flex">
              <div className="ml-3">
                <h3 className="text-sm font-medium">{toast.title}</h3>
                <div className="mt-1 text-sm text-gray-700">{toast.message}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
