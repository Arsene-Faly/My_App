// Admin JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Gestion des formulaires admin
    const adminForms = document.querySelectorAll('form');
    adminForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulation de sauvegarde
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            console.log('Données admin:', data);
            
            // Message de succès
            showNotification('Modifications sauvegardées avec succès !', 'success');
        });
    });

    // Gestion des boutons de suppression
    const deleteButtons = document.querySelectorAll('.btn-danger');
    deleteButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (confirm('Êtes-vous sûr de vouloir supprimer cet élément ?')) {
                // Simulation de suppression
                const item = this.closest('tr') || this.closest('.menu-item');
                if (item) {
                    item.style.opacity = '0';
                    item.style.transform = 'translateX(-100%)';
                    setTimeout(() => {
                        item.remove();
                        showNotification('Élément supprimé avec succès', 'success');
                    }, 300);
                }
            }
        });
    });

    // Fonction de notification
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            background: ${type === 'success' ? '#d4edda' : '#fff3cd'};
            color: ${type === 'success' ? '#155724' : '#856404'};
            border: 1px solid ${type === 'success' ? '#c3e6cb' : '#ffeaa7'};
            border-radius: var(--border-radius);
            box-shadow: var(--shadow);
            z-index: 10000;
            transition: var(--transition);
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // Gestion des statuts de réservation
    const statusSelects = document.querySelectorAll('.status-select');
    statusSelects.forEach(select => {
        select.addEventListener('change', function() {
            const row = this.closest('tr');
            const statusCell = row.querySelector('.status');
            
            // Mettre à jour le badge de statut
            statusCell.textContent = this.options[this.selectedIndex].text;
            statusCell.className = 'status ' + this.value;
            
            showNotification('Statut mis à jour', 'success');
        });
    });

    // Initialisation des sélecteurs de date
    const dateInputs = document.querySelectorAll('input[type="date"]');
    dateInputs.forEach(input => {
        if (!input.value) {
            input.value = new Date().toISOString().split('T')[0];
        }
    });

    // Gestion des onglets dans l'admin
    const adminTabs = document.querySelectorAll('.admin-tab');
    const adminTabPanes = document.querySelectorAll('.admin-tab-pane');
    
    if (adminTabs.length > 0) {
        adminTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                const target = this.getAttribute('data-tab');
                
                // Désactiver tous les onglets
                adminTabs.forEach(t => t.classList.remove('active'));
                adminTabPanes.forEach(p => p.classList.remove('active'));
                
                // Activer l'onglet courant
                this.classList.add('active');
                document.getElementById(target).classList.add('active');
            });
        });
    }
});