// Dans apiRequest.js
import * as d3 from 'd3';

export function loadSWAPIData(category, id) {
    const url = `https://www.swapi.tech/api/${category}/${id}`;
    
    // Retourne une promesse qui résout avec le contenu JSON de la réponse
    return d3.json(url) // d3.json effectue la requête et parse le JSON
        .then(data => {
            if (data && data.result) {
                return data.result; // Retourne directement le résultat si présent
            } else {
                throw new Error('No result found');
            }
        })
        .catch(error => {
            // Log l'erreur ou la rejette pour la gérer plus loin dans la chaîne de promesses
            console.error(error);
            throw error; // Rethrow l'erreur pour permettre sa gestion ultérieure
        });
}