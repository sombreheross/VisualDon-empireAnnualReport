import { loadSWAPIData } from '../apiRequest.js';

// Déclaration de la variable pour stocker les données
const data = [];

// Fonction asynchrone pour charger les données et les manipuler
async function loadDataAndManipulate() {
    try {
        // Utilisation d'async/await pour attendre les données de chaque requête
        const planet1 = await loadSWAPIData('planets', 1);
        const planet2 = await loadSWAPIData('planets', 2);
        const planet3 = await loadSWAPIData('planets', 4);
        // etc etc etc t'as capté

        // Ajout des données au tableau 'data'
        data.push(planet1, planet2, planet3);

        // Ici, 'data' contient les résultats et peut être manipulé
        console.log(data); // Affiche le tableau 'data' mis à jour
        // TODO: Ajouter ici toute manipulation de data
    } catch (error) {
        console.error("Error:", error);
    }
}

// Appel de la fonction pour charger les données
loadDataAndManipulate();