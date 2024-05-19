import { loadSWAPIData } from '../apiRequest.js';

// Déclaration de la variable pour stocker les données
const data = [];

// Fonction asynchrone pour charger les données et les manipuler
async function loadDataAndManipulate() {
    try {
        // Utilisation d'async/await pour attendre les données de chaque requête
        const vehicle = await loadSWAPIData('vehicles', 18);
        // Mise à jour du DOM avec les données récupérées
        updateDOMWithData(vehicle.properties);
        // etc etc etc t'as capté

        // Ajout des données au tableau 'data'
        data.push(vehicle);

        // Ici, 'data' contient les résultats et peut être manipulé
        // console.log(data); // Affiche le tableau 'data' mis à jour
        // TODO: Ajouter ici toute manipulation de data
    } catch (error) {
        console.error("Error:", error);
    }
}

function updateDOMWithData(data) {
    // Mise à jour des informations sur le modèle
    const cellsLeft = document.querySelectorAll('#vehicle .blueprint-tableLeft .blueprint-cell p');
    cellsLeft[0].textContent = formatText(data.model);
    cellsLeft[1].textContent = formatText(data.manufacturer);
    cellsLeft[2].textContent = formatText(data.vehicle_class);

    // Mise à jour des informations sur les capacités et la vitesse
    const cellsRight = document.querySelectorAll('#vehicle .blueprint-tableRight .blueprint-cell p');
    cellsRight[0].textContent = data.max_atmosphering_speed;
    cellsRight[1].textContent = `${data.passengers}`;
    cellsRight[2].textContent = `${data.cargo_capacity} kg`;

    function formatText(text) {
        return text.replace(/^\w|\s\w/g, letter => letter.toUpperCase());
    }
}


console.log(data);
// Appel de la fonction pour charger les données
document.addEventListener('DOMContentLoaded', function () {
    loadDataAndManipulate();
});