var express = require("express");
var router = express.Router();
const apiController = require("../controllers/apiController");
const auth = require("../middleware/auth");

// auth.verifikasi('member')
router.get("/book-page", apiController.bookPage);
router.get("/book-page/:id", apiController.detailBookPage);

// peminjaman buku
router.get("/loan-book", auth.verifikasi('member'), apiController.getLoanBook);
router.post("/loan-book", auth.verifikasi('member'), apiController.newLoanBook);
router.put("/loan-book", auth.verifikasi('member'), apiController.putLoanBook);
router.put("/extension-book", auth.verifikasi('member'), apiController.bookExtension);

// pengembalian buku
router.get("/return-book", auth.verifikasi('member'), apiController.getReturnBook);
router.post("/return-book", auth.verifikasi('member'), apiController.newReturnBook);

//auth
router.post("/auth/regist", apiController.registerUser);
router.post("/auth/login", apiController.loginUser);
router.post("/auth/forgot-password", apiController.forgotPassword);

//member
router.get("/auth/:username", apiController.checkMember);


// router.get('/detail-page/:id', apiController.detailPage);
router.post("/member-page", apiController.memberPage);

module.exports = router;
