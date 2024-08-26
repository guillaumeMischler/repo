/*const axios = require('axios');

// URL de votre API REST Google Apps Script
const API_URL = 'https://script.google.com/macros/s/AKfycby0kV_2dqU6qR_UcvSqpk4m6u8xRnpcowvUVqkVE92lfUbWgdFWWNvNrB0tNI2dca97nw/exec';

// Fonction pour récupérer les données
async function fetchSheetData() {
    try {
        const response = await axios.get(API_URL);
        console.log('Data from Google Sheets:', response.data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Appel de la fonction
fetchSheetData();
*/

/*

const axios = require('axios');
const qs = require('qs'); // Importer qs pour l'encodage des données

// URL de votre API REST Google Apps Script
const API_URL = 'https://script.google.com/macros/s/AKfycby0kV_2dqU6qR_UcvSqpk4m6u8xRnpcowvUVqkVE92lfUbWgdFWWNvNrB0tNI2dca97nw/exec';

// Fonction pour ajouter des données
async function addSheetData(newData) {
    try {
        // Encoder les données en URL
        const response = await axios.post(API_URL, qs.stringify(newData));
        console.log('Response from Google Sheets:', response.data);
    } catch (error) {
        console.error('Error adding data:', error);
    }
}

// Appel de la fonction avec des données d'exemple
addSheetData({
    id: 'ettt',
    test: 'trqsfsdffdffs'
});

*/
const express = require('express');
const axios = require('axios');
const qs = require('qs');
const path = require('path');

const app = express();

// Servir des fichiers statiques à partir du répertoire "public"
app.use(express.static(path.join(__dirname, 'public')));

// Analyser le JSON des requêtes entrantes
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Pour analyser les données URL-encoded

// URL de votre API Google Apps Script
const API_URL = 'https://script.google.com/macros/s/AKfycby0kV_2dqU6qR_UcvSqpk4m6u8xRnpcowvUVqkVE92lfUbWgdFWWNvNrB0tNI2dca97nw/exec';

// Point de terminaison pour ajouter des données
app.post('/api/addData', async (req, res) => {
    const data = req.body; // Récupère les données du formulaire

    // Affiche les données reçues dans la console
    console.log('Données reçues du client:', data);

    try {
        // Encoder les données en URL-encoded
        const encodedData = qs.stringify(data);
        // Envoie les données à l'API Google Sheets
        const response = await axios.post(API_URL, encodedData, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        console.log('Réponse de l\'API Google Sheets:', response.data);

        res.json({ success: true, data: response.data });
    } catch (error) {
        console.error('Erreur lors de l\'envoi des données:', error);
        res.json({ success: false, message: 'Erreur lors de l\'envoi des données.' });
    }
});

// Démarrer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
