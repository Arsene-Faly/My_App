// Navigation mobile
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Fermer le menu en cliquant sur un lien
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Gestion des catégories du menu
const categoryButtons = document.querySelectorAll('.category-btn');
const menuCategories = document.querySelectorAll('.menu-category');

categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Retirer la classe active de tous les boutons
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        // Ajouter la classe active au bouton cliqué
        button.classList.add('active');
        
        // Masquer toutes les catégories
        menuCategories.forEach(category => category.classList.remove('active'));
        
        // Afficher la catégorie correspondante
        const categoryId = button.getAttribute('data-category');
        const targetCategory = document.getElementById(categoryId);
        if (targetCategory) {
            targetCategory.classList.add('active');
        }
    });
});

// Gestion du formulaire de contact
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Récupération des données du formulaire
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Simulation d'envoi
        console.log('Données du formulaire contact:', data);
        
        // Affichage message de succès
        alert('Merci pour votre message ! Nous vous répondrons dans les plus brefs délais.');
        contactForm.reset();
    });
}

// Gestion du formulaire de réservation
const reservationForm = document.getElementById('reservationForm');
if (reservationForm) {
    reservationForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(reservationForm);
        const data = Object.fromEntries(formData);
        
        console.log('Données de réservation:', data);
        
        // Validation de la date
        const selectedDate = new Date(data.date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (selectedDate < today) {
            alert('Veuillez sélectionner une date future.');
            return;
        }
        
        alert('Votre réservation a été envoyée ! Vous recevrez une confirmation par email.');
        reservationForm.reset();
    });
}

// Gestion du formulaire de connexion
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(loginForm);
        const data = Object.fromEntries(formData);
        
        console.log('Tentative de connexion:', data);
        
        // Simulation de connexion
        alert('Connexion réussie ! Redirection...');
        // window.location.href = 'index.html';
    });
}

// Gestion du formulaire d'inscription
const registerForm = document.getElementById('registerForm');
if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(registerForm);
        const data = Object.fromEntries(formData);
        
        // Validation du mot de passe
        const password = data.password;
        const confirmPassword = data['confirm-password'];
        
        if (password !== confirmPassword) {
            alert('Les mots de passe ne correspondent pas.');
            return;
        }
        
        if (password.length < 6) {
            alert('Le mot de passe doit contenir au moins 6 caractères.');
            return;
        }
        
        console.log('Inscription:', data);
        
        alert('Inscription réussie ! Vous pouvez maintenant vous connecter.');
        window.location.href = 'login.html';
    });
}

// Animation au scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observer les éléments à animer
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.specialty-card, .value-card, .team-member, .menu-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Gestion de la date minimale pour les réservations
const reservationDate = document.getElementById('reservation-date');
if (reservationDate) {
    const today = new Date().toISOString().split('T')[0];
    reservationDate.min = today;
    
    // Désactiver les lundis
    reservationDate.addEventListener('change', function() {
        const selectedDate = new Date(this.value);
        const day = selectedDate.getDay();
        
        if (day === 1) { // Lundi = 1
            alert('Le restaurant est fermé le lundi. Veuillez choisir une autre date.');
            this.value = '';
        }
    });
}

// Amélioration de l'UX pour les sélecteurs d'heure
const timeSelect = document.getElementById('reservation-time');
if (timeSelect) {
    timeSelect.addEventListener('focus', function() {
        this.size = 6;
    });
    
    timeSelect.addEventListener('blur', function() {
        this.size = 1;
    });
    
    timeSelect.addEventListener('change', function() {
        this.size = 1;
        this.blur();
    });
}