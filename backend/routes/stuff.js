const express = require("express");
const router = express.Router();
const stuffController = require("../controllers/stuff");

router.post("/", stuffController.createThing); //appel de la methode create thing dans controller/stuff.js
router.get("/:id", stuffController.getOneThing);
router.get("/", stuffController.getAllThings);
router.put("/:id", stuffController.modifyThing);
router.delete("/:id", stuffController.deleteThing);

module.exports = router;
