const fileUpload = require("express-fileupload");
const { getAllMaterial, getOneMaterial, createMaterial, updateMaterial, deleteMaterial } = require("../controllers/controller");

const router = require("express").Router();

router.get("/materials",getAllMaterial)
router.get("/materials/:id",getOneMaterial)
router.post("/materials",fileUpload(),createMaterial)
router.put("/materials/:id",updateMaterial)
router.delete("/materials/:id",deleteMaterial)

module.exports = router