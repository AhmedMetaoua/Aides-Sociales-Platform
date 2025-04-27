import { useState } from 'react';
import { useRouter } from 'next/router';

export default function NouvelleAnnonce() {
  const [form, setForm] = useState({ type: 'propose', description: '', categorie: '', region: '' });
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('/api/annonces', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    router.push('/');
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl mb-4">Nouvelle Annonce</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="p-2 border rounded">
          <option value="propose">Je propose une aide</option>
          <option value="besoin">J'ai besoin d'aide</option>
        </select>
        <input placeholder="Catégorie (ex: vêtements, repas)" value={form.categorie} onChange={(e) => setForm({ ...form, categorie: e.target.value })} className="p-2 border rounded" />
        <input placeholder="Région" value={form.region} onChange={(e) => setForm({ ...form, region: e.target.value })} className="p-2 border rounded" />
        <textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="p-2 border rounded"></textarea>
        <button type="submit" className="p-2 bg-green-500 text-white rounded">Envoyer</button>
      </form>
    </div>
  );
}