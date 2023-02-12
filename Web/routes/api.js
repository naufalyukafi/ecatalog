var express = require("express");
var router = express.Router();
const apiController = require("../controllers/apiController");
const auth = require("../middleware/auth");

// auth.verifikasi('user')
router.get("/book-page", apiController.bookPage);
router.get("/book-page/:id", apiController.detailBookPage);

// peminjaman buku
router.get("/loan-book", auth.verifikasi('user'), apiController.getLoanBook);
router.post("/loan-book", auth.verifikasi('user'), apiController.newLoanBook);
router.put("/loan-book", auth.verifikasi('user'), apiController.putLoanBook);
router.put("/extension-book", auth.verifikasi('user'), apiController.bookExtension);

// pengembalian buku
router.get("/return-book", auth.verifikasi('user'), apiController.getReturnBook);
router.post("/return-book", auth.verifikasi('user'), apiController.newReturnBook);

//auth
router.post("/auth/regist", apiController.registerUser);
router.post("/auth/login", apiController.loginUser);

//member
router.get("/auth/:username", apiController.checkMember);


// router.get('/detail-page/:id', apiController.detailPage);
router.post("/member-page", apiController.memberPage);

module.exports = router;
