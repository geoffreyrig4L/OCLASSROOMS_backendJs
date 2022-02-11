const Thing = require("../models/Thing");

exports.createThing = (req, res, next) => {
  //post signifie qu'on intercepte uniquement les requete POST avec ce middleware
  delete req.body._id; //permet de retirer l'id, on le fait car mongo les genere a  utomatiquement
  const thing = new Thing({
    ...req.body, //L'opérateur spread ... est utilisé pour faire une copie de tous les éléments de req.body
  }); //copie les champs qui sont dans le body de la request
  thing
    .save() //retourne une promise et enregistre l'objet dans la base
    .then(() => res.status(201).json({ message: "Objet enregistré !" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.modifyThing = (req, res, next) => {
  Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id }) // 1e arg : quelle objet on modifie
    //2e arg : ce qui va remplacer l'objet //...req.body recupere le thing dans le corps de la req //_id verifie a celui que l'on recupere en param
    .then(() => res.status(200).json({ message: "Objet modifié !" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.deleteThing = (req, res, next) => {
  Thing.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: "Objet supprimé !" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.getAllThings = (req, res, next) => {
  //get signifie qu'on intercepte uniquement les requete GET avec ce middleware
  Thing.find()
    .then((things) => res.status(200).json(things))
    .catch((error) => res.status(400).json({ error }));
};

exports.getOneThing = (req, res, next) => {
  // : symbole que le id est dynamique
  Thing.findOne({ _id: req.params.id }) //req.params.id donne l'accès a à l'id dans l url //si l'id est le même que celui passe en param de req
    .then((thing) => res.status(200).json(thing))
    .catch((error) => res.status(404).json({ error }));
};
