const User = require("../models/User");
const bcrypt = require("bcrypt"); //pour hasher les logins
const jwt = require("jsonwebtoken");

//inscription
exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10) //hash est la fonction qui permet de hashé
    //le 10 designe le salt -> cb de x on execute l algo de hashage
    .then((hash) => {
      const user = new User({
        email: req.body.email,
        password: hash,
      });
      user
        .save()
        .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

/*dans le then :
1. on récupère le hash du password
2. on créé un nouvel user, on construit ce nouvel user avec l'email passe dans la requete et le password hashé
3. on enregistre ce nouvel user dans la bdd grace a la promise save() 
*/

//connexion
exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email }) //on recherche un user ayant le meme id que celui entrer dans la req
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Utilisateur non trouvée" });
      }
      //si on trouve l'user, on compare le mdp entrée avec celui dans notre bdd en utilisant bcrypt.compare()
      bcrypt
        .compare(req.body.password, user.password)
        //cette func retourne un boolean
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          }
          //on renvoie un token et le userId
          res.status(200).json({
            userId: user._id,
            token: jwt.sign(
              //on encode un nouveau token
              { userId: user._id }, //il contiendra l'id de l'utilisateur
              "RANDOM_TOKEN_SECRET", //c une chaine secrete de developpement temporaire pour encoder notre token
              //à remplacer par une chaîne aléatoire beaucoup plus longue pour la production
              { expiresIn: "24h" } //durée de validité du token
            ),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
