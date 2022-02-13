const jwt = require("jsonwebtoken");

//Les middlewares de ce fichier sont exec avant les controllers de nos routes

//voici notre token : Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MjA5NTU0MDYyYTE5MmYwMWYzMGNmMDIiLCJpYXQiOjE2NDQ3ODAyNTgsImV4cCI6MTY0NDg2NjY1OH0.MWgYgvM_KmfJ6znnUlRnDCTMHGc6EzinPGnUVHIfIXs
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET"); //permet de decoder notre token
    //le 2e param constitue la clé d'encodage, elle doit etre identique à celle qu'on retourve dans la fonction login de ctrl/user.js
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      throw "User ID non valable !";
    } else {
      next();
    }
  } catch (error) {
    res.status(401).json({ error: error | "Requête non authentifiée ! " }); //c'est un ternaire
  }
};
/* dans le try : 
1.recupere le token
2.split génére un tableau qui intègre tout les mots de notre token, 1 mot = 1 élément, les espaces separes les mots
3. on recupere le second element du token a savoir la grande chaine de carac
*/
