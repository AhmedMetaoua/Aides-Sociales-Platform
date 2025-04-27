# Aide Platform - Plateforme d'Entraide Locale

Aide Platform is a Next.js-based web application that facilitates local community assistance by connecting people who need help with those who can provide it. The platform allows users to post both offers and requests for various types of assistance.

## Features

- **Dual Posting System**: Users can post both offers ("offres") and requests ("demandes") for assistance
- **Categorized Assistance**: Posts are organized into categories:
  - Vêtements (Clothing)
  - Nourriture (Food)
  - Services
  - Logement (Housing)
  - Transport
  - Autre (Other)
- **Regional Organization**: Posts are organized by region for better local matching
- **Contact Information**: Direct contact details for connecting helpers with those in need
- **Modern UI**: Built with Next.js and Tailwind CSS for a responsive and user-friendly interface

## Tech Stack

- **Frontend**:
  - Next.js 15.2.4
  - React 19.0.0
  - Tailwind CSS 4.1.4
  - Lucide React for icons

- **Backend**:
  - Next.js API Routes
  - MongoDB with Mongoose 8.14.0

## Getting Started

### Prerequisites

- Node.js (Latest LTS version recommended)
- MongoDB instance (local or cloud)

### Installation

1. Clone the repository:
   ```bash
   git clone [repository-url]
   cd aide-platform
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory with:
   ```
   MONGODB_URI=your_mongodb_connection_string
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

- `/pages` - Next.js pages and API routes
  - `/api` - Backend API endpoints
  - `annonces.jsx` - Main listings page
  - `proposer.jsx` - Form for posting offers
  - `demander.jsx` - Form for posting requests
- `/models` - MongoDB schemas
- `/public` - Static assets
- `/styles` - Global styles and Tailwind configuration

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build production bundle
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built with Next.js and React
- Styled with Tailwind CSS
- Icons from Lucide React
# Aides-Sociales-Platform
