import { Inter } from "next/font/google"
import Link from "next/link"
import "../styles/globals.css"

const inter = Inter({ subsets: ["latin"] })

function MyApp({ Component, pageProps }) {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <header className="border-b bg-background">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold">
            Entraide Locale
          </Link>
          <nav className="flex gap-4">
            <Link href="/annonces" className="text-sm font-medium hover:underline">
              Annonces
            </Link>
            <Link href="/proposer" className="text-sm font-medium hover:underline">
              Proposer
            </Link>
            <Link href="/demander" className="text-sm font-medium hover:underline">
              Demander
            </Link>
          </nav>
        </div>
      </header>
      <main>
        <Component {...pageProps} />
      </main>
      <footer className="border-t mt-12 bg-background">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-foreground/70">
          © {new Date().getFullYear()} Plateforme d'Entraide Locale - Un projet solidaire
        </div>
      </footer>
    </div>
  )
}

export default MyApp
