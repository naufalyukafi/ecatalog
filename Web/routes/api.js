var express = require("express");
var router = express.Router();
const apiController = require("../controllers/apiController");
const auth = require("../middleware/auth");

// const { uploadSingle } = require("../middlewares/multer");
// auth.verifikasi('user')
router.get("/book-page", apiController.bookPage);
router.get("/book-page/:id", apiController.detailBookPage);
router.get("/peminjaman/:username", apiController.peminjamanByUserId);

//auth
router.post("/auth/regist", apiController.registerUser);
router.post("/auth/login", apiController.loginUser);

//member
router.get("/auth/:username", apiController.checkMember);


// router.get('/detail-page/:id', apiController.detailPage);
router.post("/member-page", apiController.memberPage);

module.exports = router;
