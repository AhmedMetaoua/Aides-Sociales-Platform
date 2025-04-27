import { Inter } from 'next/font/google'
import Link from "next/link"
import "../styles/globals.css"
import { Heart, Menu, X } from 'lucide-react'
import { useState } from "react"

const inter = Inter({ subsets: ["latin"] })

function MyApp({ Component, pageProps }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className={`bg-background text-foreground min-h-screen ${inter.className}`}>
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center gap-2 text-xl font-bold">
              <Heart className="h-6 w-6 text-rose-500 fill-rose-500" />
              <span className="bg-gradient-to-r from-rose-500 to-purple-600 bg-clip-text text-transparent">
                Entraide Locale
              </span>
            </Link>
            
            {/* Mobile menu button */}
            <button 
              className="md:hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
            
            {/* Desktop navigation */}
            <nav className="hidden md:flex gap-6">
              <Link href="/annonces" className="text-sm font-medium hover:text-rose-500 transition-colors">
                Annonces
              </Link>
              <Link href="/proposer" className="text-sm font-medium hover:text-rose-500 transition-colors">
                Proposer
              </Link>
              <Link href="/demander" className="text-sm font-medium hover:text-rose-500 transition-colors">
                Demander
              </Link>
            </nav>
          </div>
          
          {/* Mobile navigation */}
          {isMenuOpen && (
            <nav className="md:hidden flex flex-col gap-4 pt-4 pb-2 border-t mt-4 animate-in slide-in-from-top">
              <Link 
                href="/annonces" 
                className="text-sm font-medium py-2 px-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => setIsMenuOpen(false)}
              >
                Annonces
              </Link>
              <Link 
                href="/proposer" 
                className="text-sm font-medium py-2 px-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => setIsMenuOpen(false)}
              >
                Proposer
              </Link>
              <Link 
                href="/demander" 
                className="text-sm font-medium py-2 px-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => setIsMenuOpen(false)}
              >
                Demander
              </Link>
            </nav>
          )}
        </div>
      </header>
      <main>
        <Component {...pageProps} />
      </main>
      <footer className="border-t mt-12 bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-rose-500 fill-rose-500" />
              <span className="font-medium">Entraide Locale</span>
            </div>
            <div className="flex gap-6">
              <Link href="/a-propos" className="text-sm text-foreground/70 hover:text-rose-500 transition-colors">
                À propos
              </Link>
              <Link href="/confidentialite" className="text-sm text-foreground/70 hover:text-rose-500 transition-colors">
                Confidentialité
              </Link>
              <Link href="/contact" className="text-sm text-foreground/70 hover:text-rose-500 transition-colors">
                Contact
              </Link>
            </div>
            <div className="text-sm text-foreground/70">
              © {new Date().getFullYear()} Plateforme d'Entraide Locale
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default MyApp
