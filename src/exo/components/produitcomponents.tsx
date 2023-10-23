import React from 'react';
import Produit from './produitstype';

const ProduitComponent: React.FC<{ produit: Produit }> = ({ produit }) => {
  return (
    <div>
      <h2>{produit.nom}</h2>
      <p>Prix: {produit.prix}€</p>
    </div>
  );
}

export default ProduitComponent;
