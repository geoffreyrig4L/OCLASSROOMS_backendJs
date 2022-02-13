const express = require("express");
const router = express.Router();
const stuffController = require("../controllers/stuff");
const auth = require("../middleware/auth");

router.post("/", auth, stuffController.createThing); //appel de la methode create thing dans controller/stuff.js
router.get("/:id", auth, stuffController.getOneThing);
router.get("/", auth, stuffController.getAllThings);
router.put("/:id", auth, stuffController.modifyThing);
router.delete("/:id", auth, stuffController.deleteThing);

//auth permet de proteger nos routes en appliquant le middleware dans auth.js
module.exports = router;
