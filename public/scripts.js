document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('maintenanceForm');
    const arretOui = document.querySelector('input[name="arret"][value="oui"]');
    const arretNon = document.querySelector('input[name="arret"][value="non"]');
    const debutArretProduction = document.getElementById('startProduction');
    const finArretProduction = document.getElementById('endProduction');

    // Fonction pour gérer le required des champs de date en fonction de l'arrêt de production
    function updateRequiredFields() {
        if (arretOui.checked) {
            debutArretProduction.required = true;
            finArretProduction.required = true;
        } else {
            debutArretProduction.required = false;
            finArretProduction.required = false;
        }
    }

    // Appeler la fonction à chaque changement de sélection de l'arrêt de production
    arretOui.addEventListener('change', updateRequiredFields);
    arretNon.addEventListener('change', updateRequiredFields);

    form.addEventListener('submit', async function(event) {
        event.preventDefault(); // Empêche la soumission du formulaire

        // Récupérer les données du formulaire
        const data = {
            machine: document.getElementById('machine').value,
            type_maintenance: document.querySelector('input[name="maintenance"]:checked').value,
            arret_machine: document.querySelector('input[name="arret"]:checked').value,
            debut_intervention: document.getElementById('start').value,
            fin_intervention: document.getElementById('end').value,
            debut_arret_production: debutArretProduction.value,
            fin_arret_production: finArretProduction.value,
            technicien: document.getElementById('technician').value,
            notes: document.getElementById('notes').value
        };

        try {
            const response = await fetch('https://script.google.com/macros/s/AKfycby0kV_2dqU6qR_UcvSqpk4m6u8xRnpcowvUVqkVE92lfUbWgdFWWNvNrB0tNI2dca97nw/exec', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams(data)
            });

            const result = await response.json();

            if (response.ok) {
                alert('Données soumises avec succès !');
                form.reset(); // Réinitialiser le formulaire après soumission réussie
            } else {
                alert('Erreur lors de la soumission : ' + result.message);
            }
        } catch (error) {
            console.error('Erreur:', error);
            alert('Erreur lors de la soumission. Veuillez réessayer.');
        }
    });

    // Initialiser le formulaire pour désactiver le required si nécessaire
    updateRequiredFields();
});
