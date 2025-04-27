import Link from "next/link"
import Head from "next/head"
import { HelpingHand, HandHeart, ArrowRight, Users, Calendar, MapPin } from 'lucide-react'
import Image from "next/image"

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
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-rose-50 to-white dark:from-gray-900 dark:to-background py-20 sm:py-32">
        <div className="absolute inset-0 bg-grid-slate-900/[0.04] bg-[center_top_-1px] dark:bg-grid-slate-400/[0.05] bg-[size:32px]"></div>
        <div className="container relative mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
            <div className="flex flex-col gap-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-rose-100 dark:bg-rose-900/30 px-3 py-1 text-sm font-medium text-rose-600 dark:text-rose-400 w-fit">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
                </span>
                Plateforme solidaire
              </div>
              
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl bg-gradient-to-r from-gray-900 via-rose-600 to-purple-700 dark:from-white dark:via-rose-400 dark:to-purple-400 bg-clip-text text-transparent">
                Entraide Locale
              </h1>
              
              <p className="text-xl text-foreground/80 max-w-[600px]">
                Connectez-vous avec votre communauté locale pour offrir ou recevoir de l'aide. Ensemble, nous pouvons faire
                la différence.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <Link href="/proposer">
                  <button className="flex items-center gap-2 px-8 py-3 text-white bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 rounded-full transition-all shadow-md hover:shadow-lg">
                    <HelpingHand className="h-5 w-5" />
                    Je propose une aide
                  </button>
                </Link>
                <Link href="/demander">
                  <button className="flex items-center gap-2 px-8 py-3 text-gray-800 dark:text-white bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full hover:bg-gray-50 dark:hover:bg-gray-700 transition-all shadow-sm">
                    <HandHeart className="h-5 w-5" />
                    J'ai besoin d'aide
                  </button>
                </Link>
              </div>
              
              <div className="flex items-center gap-4 mt-4">
                <Link href="/annonces" className="text-sm font-medium text-rose-500 hover:text-rose-600 dark:text-rose-400 dark:hover:text-rose-300 flex items-center gap-1">
                  Voir toutes les annonces
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <div className="h-1 w-1 rounded-full bg-gray-300 dark:bg-gray-700"></div>
                <div className="flex -space-x-2">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-gray-900 bg-gray-200 dark:bg-gray-700"></div>
                  ))}
                </div>
                <span className="text-sm text-foreground/70">+120 utilisateurs</span>
              </div>
            </div>
            
            <div className="relative lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-rose-500/20 to-purple-600/20 mix-blend-overlay"></div>
              <Image 
                src="/placeholder.svg?height=500&width=600" 
                alt="Entraide communautaire" 
                width={600} 
                height={500}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How it works section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Comment ça marche ?</h2>
            <p className="text-foreground/70 max-w-2xl mx-auto">
              Notre plateforme facilite l'entraide entre voisins et membres de la communauté locale.
              Suivez ces étapes simples pour commencer.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative group">
              <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-rose-500 to-purple-600 opacity-20 group-hover:opacity-30 blur transition duration-300"></div>
              <div className="relative flex flex-col items-center p-8 bg-card border border-border rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="rounded-full bg-rose-100 dark:bg-rose-900/30 p-4 mb-6 text-rose-500 dark:text-rose-400">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Créez une annonce</h3>
                <p className="text-center text-foreground/70">
                  Proposez votre aide ou exprimez votre besoin en quelques clics. Décrivez précisément ce que vous offrez ou recherchez.
                </p>
              </div>
            </div>
            
            <div className="relative group">
              <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-rose-500 to-purple-600 opacity-20 group-hover:opacity-30 blur transition duration-300"></div>
              <div className="relative flex flex-col items-center p-8 bg-card border border-border rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="rounded-full bg-rose-100 dark:bg-rose-900/30 p-4 mb-6 text-rose-500 dark:text-rose-400">
                  <MapPin className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Connectez-vous</h3>
                <p className="text-center text-foreground/70">
                  Entrez en contact avec des personnes de votre région. Discutez des détails et organisez votre entraide.
                </p>
              </div>
            </div>
            
            <div className="relative group">
              <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-rose-500 to-purple-600 opacity-20 group-hover:opacity-30 blur transition duration-300"></div>
              <div className="relative flex flex-col items-center p-8 bg-card border border-border rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="rounded-full bg-rose-100 dark:bg-rose-900/30 p-4 mb-6 text-rose-500 dark:text-rose-400">
                  <Calendar className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Entraidez-vous</h3>
                <p className="text-center text-foreground/70">
                  Échangez des services, des biens ou du temps pour aider votre communauté et créer des liens durables.
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-16 text-center">
            <Link href="/annonces">
              <button className="px-8 py-3 bg-gray-100 dark:bg-gray-800 text-foreground rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors shadow-sm">
                Voir toutes les annonces
              </button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Testimonials/Stats Section */}
      <section className="py-20 bg-gradient-to-b from-white to-rose-50 dark:from-background dark:to-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="text-4xl font-bold text-rose-500">120+</div>
              <p className="text-foreground/70 mt-2">Utilisateurs actifs</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="text-4xl font-bold text-rose-500">85+</div>
              <p className="text-foreground/70 mt-2">Annonces publiées</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="text-4xl font-bold text-rose-500">50+</div>
              <p className="text-foreground/70 mt-2">Aides réalisées</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="text-4xl font-bold text-rose-500">12</div>
              <p className="text-foreground/70 mt-2">Régions couvertes</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
