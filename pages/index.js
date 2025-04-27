import Link from "next/link"
import Head from "next/head"
import { HelpingHand, HandHeart } from 'lucide-react'

export default function Home() {
  return (
    <>
      <Head>
        <title>Plateforme d'Entraide Locale</title>
        <meta
          name="description"
          content="Connectez-vous avec votre communauté locale pour offrir ou recevoir de l'aide"
        />
      </Head>
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col items-center justify-center space-y-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Plateforme d'Entraide Locale</h1>
          <p className="max-w-[700px] text-lg text-foreground/70">
            Connectez-vous avec votre communauté locale pour offrir ou recevoir de l'aide. Ensemble, nous pouvons faire
            la différence.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Link href="/proposer">
              <button className="flex items-center gap-2 px-8 py-3 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors shadow-md">
                <HelpingHand className="h-5 w-5" />
                Je propose une aide
              </button>
            </Link>
            <Link href="/demander">
              <button className="flex items-center gap-2 px-8 py-3 text-gray-800 bg-white border-2 border-blue-500 rounded-md hover:bg-blue-50 transition-colors shadow-sm">
                <HandHeart className="h-5 w-5" />
                J'ai besoin d'aide
              </button>
            </Link>
          </div>

          <div className="mt-12 w-full max-w-4xl">
            <h2 className="text-2xl font-semibold mb-6">Comment ça marche ?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="rounded-full bg-blue-100 p-3 mb-4">
                  <span className="text-2xl font-bold text-blue-600">1</span>
                </div>
                <h3 className="text-lg font-medium mb-2 text-gray-800">Créez une annonce</h3>
                <p className="text-center text-gray-600">
                  Proposez votre aide ou exprimez votre besoin en quelques clics.
                </p>
              </div>
              <div className="flex flex-col items-center p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="rounded-full bg-blue-100 p-3 mb-4">
                  <span className="text-2xl font-bold text-blue-600">2</span>
                </div>
                <h3 className="text-lg font-medium mb-2 text-gray-800">Connectez-vous</h3>
                <p className="text-center text-gray-600">Entrez en contact avec des personnes de votre région.</p>
              </div>
              <div className="flex flex-col items-center p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="rounded-full bg-blue-100 p-3 mb-4">
                  <span className="text-2xl font-bold text-blue-600">3</span>
                </div>
                <h3 className="text-lg font-medium mb-2 text-gray-800">Entraidez-vous</h3>
                <p className="text-center text-gray-600">
                  Échangez des services, des biens ou du temps pour aider votre communauté.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <Link href="/annonces">
              <button className="px-6 py-2 bg-gray-100 text-gray-800 border border-gray-300 rounded-md hover:bg-gray-200 transition-colors shadow-sm">
                Voir toutes les annonces
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
