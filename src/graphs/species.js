import { loadSWAPIData } from '../apiRequest.js';

// Déclaration de la variable pour stocker les données
const data = [];

// Fonction asynchrone pour charger les données et les manipuler
async function loadDataAndManipulate() {
    try {
        // Utilisation d'async/await pour attendre les données de chaque requête
        const species1 = await loadSWAPIData('species', 1);
        const species2 = await loadSWAPIData('species', 2);
        const species4 = await loadSWAPIData('species', 4);

        // Ajout des données au tableau 'data'
        data.push(species1, species2, species4);

        // Ici, 'data' contient les résultats et peut être manipulé
        console.log(data); // Affiche le tableau 'data' mis à jour
        // Ajoutez ici toute manipulation supplémentaire de 'data'

    } catch (error) {
        console.error("Error:", error);
    }
}

// Appel de la fonction pour charger les données
loadDataAndManipulate();