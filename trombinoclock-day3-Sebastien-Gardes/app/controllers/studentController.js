// on commence par récupérer les données (en fait non, on utilise plus les json, on envoie des requetes à la DB!)
// const allStudents = require('../../data/students.json');
// const promos = require('../../data/promos.json');

// pour connecter le serveur express à la BDD, on a besoin du module
const sqlite3 = require('sqlite3');
// on utilise le module pour instancier une connexion à la DB
const database = new sqlite3.Database('./trombi.db');

const studentController = {

  // méthode pour afficher les étudiants appartenant à une promotion
  showStudentsInPromotion: (req, res, next) => {
    // 1. récupérer l'id de la promo dans les paramètres de la requete
    const promoId = req.params.id;

    // 2. faire une requete pour récupérer les étudiants de la promo visée
    const query = `SELECT * FROM "student" WHERE "promo_id"=${promoId} ORDER BY "last_name" ASC`;

    database.all(query, (error, students) => {
      // comme dans tous les callbacks, on commence par tester si on a une erreur
      if (error) {
        // la classique : on log l'erreur en console, et n l'envoie au navigateur
        console.trace(error);
        res.status(500).send(error);
      } else {
        // ok, on a réupéré nos students...
        // 2bis. Finalement, on veut aussi le nom de la promo.
        // on va donc faire une autre requete pour récupérer la promo visée dans la bonne table
        const query2 = `SELECT * FROM "promo" WHERE "id"=${promoId}`;
        // qui dit 2ème requete, dit 2ème callback !
        database.get(query2, (error2, goodPromo) => {
          // on commence à en avoir ras le bol, mais faut le faire quand meme...
          if (error2) {
            console.trace(error2);
            res.status(500).send(error2);
          } else {
            // aucun des 2 callback n'a intercepté d'erreur, on a donc toutes nos données !
            // on peut appeler la view !
            if (goodPromo) {
              // 3. si on a trouvé la promo, on envoie les données à la view
              res.render('students', {
                students,
                goodPromo
              });
            } else {
              // si on n'a pas trouvé la promo, on "passe au middleware suivant"
              // or, dans router, le middleware suivant qui correspond à la route, c'est 404!
              // les autres routes ne captureront pas ce next() car l'url ne correspond pas.
              next();
            }
          }
        });


      }
    });

  },

  showAllStudents: (req, res) => {
    // avec les données en json, on passait "simplement" tous les étudiants à la view
    // mais maintenant, on va devoir faire une requête SQL, et donc définir un callback.

    // 1. écrire la requête dans une constante
    const query = `SELECT * FROM "student" ORDER BY "last_name" ASC;` ;

    // 2. on envoie la requete à la DB
    database.all(query, (error, data) => {
      // 3. on définit un callback pour traiter la réponse de la BDD.
      if (error) {
        // si on a une erreur, on la log en console pour mieux la comprendre
        console.trace(error);
        // on envoie l'erreur au navigateur, avec un code 500 ("erreur serveur")
        res.status(500).send(error);
      } else {
        // ici, on a pas d'erreur (donc on a des données)
        // data est un array, qui contient les données des étudiants. Je peux donc passer ces données à la view
        res.render('students', {
          students: data
        });
      }
    });
  }

};

module.exports = studentController;