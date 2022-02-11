const express = require("express");
const res = require("express/lib/response");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const stuffRoutes = require("./routes/stuff");

mongoose
  .connect(
    "mongodb+srv://jojoka:jojo_Lesuperdev99@cluster0.xnvbe.mongodb.net/Cluster0?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

const app = express(); //créer une application express

app.use(express.json()); //permet d intercepter toute les requetes qui contiennent du JSON et met ce contenu sur l objet requete dans req.body
//indispensable pour faire des requete post

//middleware du CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(bodyParser.json());

app.use("/api/stuff", stuffRoutes);

module.exports = app; //exporte l'application pour y accéder depuis les autre fichier de notre appli
