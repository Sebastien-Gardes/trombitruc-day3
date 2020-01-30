// SoC : Ce fichier router ne va servir qu'à une seule chose : **définir** les routes.
// Lui non plus ne contiendra pas de "logique" (pas de calcul, pas de manipulation...)
// toutes les manips, on va les déléguer à d'autres modules (qu'on appelle des "controllers")

// on réquire les dépendances
const express = require('express');

// on require nos controllers, pour pouvoir "lier" les routes à des méthodes
const mainController = require('./controllers/mainController');
const promotionController = require('./controllers/promotionController');
const studentController = require('./controllers/studentController');

// on instancie notre routeur
const router = express.Router();

/**
 * ROUTES
 **/
// page d'accueil
router.get('/', mainController.homePage );

// page "liste des promos"
router.get('/promotions', promotionController.showAllPromotions );

// page "liste des étudians d'une promo"
router.get('/promotions/:id', studentController.showStudentsInPromotion);

// page "liste de tous les étudiants"
router.get('/students', studentController.showAllStudents);


// on définit le middleware 404 EN DERNIER !
router.use( mainController.notFound );


// on exporte le routeur pour le rendre diponible dans d'autres fichiers
module.exports = router;
