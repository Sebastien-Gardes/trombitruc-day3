// SoC : l'unique rôle de ce module, c'est d'afficher la page d'accueil (le la page 404)


// on définit un objet, qui va contenir des fonctions (c'est la définition même d'un module)
const mainController = {

  // dans ce module, on va définir une méthode pour afficher la page d'accueil
  homePage: (req, res) => {
    // on appelle simplement la méthode render de la response
    res.render('index');
  },

  notFound: (req, res) => {
    res.status(404).render('404');
  }
};


// on oublie pas d'exporter notre module
module.exports = mainController;