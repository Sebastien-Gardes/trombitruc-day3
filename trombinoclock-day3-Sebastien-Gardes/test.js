// Un petit fichier pour tester et comprendre comment fonctionne le module sqlite3

// on commence par require le module
const sqlite3 = require('sqlite3');

// ensuite, on a suivi un peu bêtement la doc, pour créer un connexion à la BDD
const database = new sqlite3.Database('./trombi.db');

// maintenant, on va stocker la requête qu'on veut executer dans une constante (il parait que c'est une bonne pratique...)
const query = "SELECT * FROM promo";

// d'après la doc (ici: https://github.com/mapbox/node-sqlite3/wiki/API#databaseallsql-param--callback), pour executer une requete, et récupérer plusieurs résultat, on doit utiliser `database.all()`

// on essaie, intuitivement : 
// const resultats = database.all(query);
// console.log(resultats);

// PROBLEME : ca marche pas, on réupère pas nos infos

// En fait, on ne sait jamais a quel moment la BDD va répondre.
// on doit donc passer à la fonction "all" un CALLBACK, c'est-à-dire une fonction de retour.
// Lorsque la BDD va répondre, notre module sqlite va se charger d'appeler le callback en lui passant la réponse de la BDD.

// Ce principe de callback, en fait on l'a déjà croisé : dans le front avec les addEventListener, ou même dans le router avec les router.get('route', (req, res)=>{} )

// par convention, un callbcak respecte toujours le format (error, data)
// il y aura parfois d'autres paramètres, mais l'éventuelle erreur sera TOUJOURS en premier paramètre !

database.all(query, (error, data) => {
  if (error) {
    // on utilise console.trace, histoire de savoir d'ou vient l'erreur (fichier et numéro de ligne - très pratique !)
    console.trace(error);
  } else {
    console.log(data);
  }
});

// une autre syntaxe possible (qui va vous rappeler ce qu'on fait dans le router avec les controller), c'est de définir la fonction de retour (le "callback") à part.
function maFonctionDeRetour (error, data) {
  if (error) {
    console.trace(error);
  } else {
    console.log(data);
  }
};

database.all(query, maFonctionDeRetour );
