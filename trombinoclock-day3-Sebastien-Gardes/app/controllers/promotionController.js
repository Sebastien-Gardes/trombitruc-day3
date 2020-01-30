// SoC : ce module regroupe les manipulations en lien avec les promos

// on récupère le json qui contient toutes nos promos
// finalement, non ! On va se servir d'une base de données !
// const promos = require("../../data/promos.json");

const sqlite3 = require('sqlite3');
const database = new sqlite3.Database('./trombi.db');

const promotionController = {

  // on définit une première méthode, dont le rôle est d'afficher la liste des promos
  showAllPromotions: (req, res) => {

    // "database" représente une connexion à la base de données SQLite3
    // on va d'abord stocker la requete SQL dans une constante
    const query = "SELECT * FROM promo" ;

    // et ensuite, on appelle database.all, en lui passant la requete ET un callback
    database.all(query, (error, data) => {
      // si on a reçu une erreur de la part de la BDD, on va l'envoyer au navigateur
      if (error) {
        // on met le code de retour à 500 (="erreur serveur"), et on envoie le contenu de l'erreur
        res.status(500).send(error);
        console.error(error);
      } else {
        // sinon (donc on a pas d'erreur), on a donc bien reçu les données de la BDD
        // on affiche la view "promos"
        // en lui passant la liste des promos
        res.render("promos", {
          promos: data
        });

        // si on avait besoin, on pourrait refaire des requetes à la db ici.
        // Mais il faudrait aussi définir un autre callback

      }
    });
  }

};

// on oublie pas d'exporter le module
module.exports = promotionController;