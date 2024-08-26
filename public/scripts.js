document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('maintenanceForm');

    form.addEventListener('submit', async function(event) {
        event.preventDefault(); // Empêche la soumission du formulaire

        // Récupérer les données du formulaire
        const data = {
            machine: document.getElementById('machine').value,
            type_maintenance: document.querySelector('input[name="maintenance"]:checked').value,
            arret_machine: document.querySelector('input[name="arret"]:checked').value,
            debut: document.getElementById('start').value,
            fin: document.getElementById('end').value,
            technicien: document.getElementById('technician').value,
            notes: document.getElementById('notes').value
        };

        try {
            const response = await fetch('/api/addData', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (result.success) {
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
});
