import { loadSWAPIData } from '../apiRequest.js';

// Déclaration de la variable pour stocker les données
const data = [];

// Fonction asynchrone pour charger les données et les manipuler
async function loadDataAndManipulate() {
    try {
        // Utilisation d'async/await pour attendre les données de chaque requête
        const mostWanted1 = await loadSWAPIData('people', 1);
        const mostWanted2 = await loadSWAPIData('people', 2);
        const mostWanted3 = await loadSWAPIData('people', 4);
        // etc etc etc t'as capté

        // Ajout des données au tableau 'data'
        data.push(mostWanted1, mostWanted2, mostWanted3);

        // Ici, 'data' contient les résultats et peut être manipulé
        // console.log(data); // Affiche le tableau 'data' mis à jour
        // TODO: Ajouter ici toute manipulation de data
    } catch (error) {
        console.error("Error:", error);
    }
}

// Appel de la fonction pour charger les données
loadDataAndManipulate();    