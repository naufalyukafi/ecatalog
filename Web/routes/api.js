var express = require("express");
var router = express.Router();
const apiController = require("../controllers/apiController");

// const { uploadSingle } = require("../middlewares/multer");

router.get("/book-page", apiController.bookPage);
router.get("/book-page/:id", apiController.detailBookPage);
router.get("/peminjaman", apiController.peminjamanByUserId);
// router.get('/detail-page/:id', apiController.detailPage);
router.post("/member-page", apiController.memberPage);
module.exports = router;
