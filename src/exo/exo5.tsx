import React, { useState } from 'react';
import Produit from './components/produitstype';
import ProduitComponent from './components/produitcomponents';

const Exo5: React.FC = () => {
    const produits: Produit[] = [
        { id: 1, nom: 'Ordinateur', prix: 1200 },
        { id: 2, nom: 'Téléphone', prix: 600 },
        { id: 3, nom: 'Tablette', prix: 500 },
        { id: 4, nom: 'Casque', prix: 250 },
        { id: 5, nom: 'Clavier', prix: 100 },
        { id: 6, nom: 'Souris', prix: 50 },
        { id: 7, nom: 'Enceinte', prix: 75 },
        { id: 8, nom: 'Imprimante', prix: 300 },
        { id: 9, nom: 'Disque dur', prix: 200 },
        { id: 10, nom: 'Câble', prix: 10 },
        { id: 11, nom: 'Chargeur', prix: 30 },
        { id: 12, nom: 'Batterie', prix: 50 },
        { id: 13, nom: 'Écran', prix: 150 },
        { id: 14, nom: 'Webcam', prix: 40 },
        { id: 15, nom: 'Micro', prix: 800 },
        { id: 16, nom: 'Lave-linge', prix: 400 },
        { id: 17, nom: 'Lave-vaisselle', prix: 350 },
        { id: 18, nom: 'Frigo', prix: 300 },
        { id: 19, nom: 'Four', prix: 200 },
        { id: 20, nom: 'Télé', prix: 150 },
        { id: 21, nom: 'Canapé', prix: 500 }
    ];
    const [page, setPage] = useState(1);
    const itemsPerPage = 7;
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentProduits = produits.slice(startIndex, endIndex);

    return (
        <div>
            <h1>Liste de produits</h1>
            {currentProduits.map(produit => (
                <ProduitComponent key={produit.id} produit={produit} />
            ))}
            <div>
                <button onClick={() => setPage(page - 1)} disabled={page === 1}>
                    Précédent
                </button>
                <button onClick={() => setPage(page + 1)} disabled={endIndex >= produits.length}>
                    Suivant
                </button>
            </div>
        </div>
    );
}

export default Exo5;