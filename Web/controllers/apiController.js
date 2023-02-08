const Books = require("../models/Books");
const Book = require("../models/Books");
const LoanBook = require("../models/LoanBook");
const Member = require("../models/Members");
const Officer = require("../models/Officer");

module.exports = {
  bookPage: async (req, res) => {
    try {
      const book = await Book.find().limit(5);
      res.status(200).json({
        book,
      });
    } catch (error) {
      console.log('jdfd', error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  detailBookPage: async (req, res) => {
    var id = req.params.id
    Book.findById(id).lean().exec(function (err, results) {
      if (err) return res.status(500).json({ message: 'Data Kosong' });
      try {
        res.status(200).json({
          results,
        })
      } catch (error) {
        console.log("errror getting results")
        res.status(500).json({ message: "Internal server error" });
      }
    })
  },

  peminjamanByUserId: async (req, res) => {
    // var idAuth = res.auth.id
    // console.log(req)
    const loan = await LoanBook.find()
      .populate("booksId")
      .populate("memberId")
      .populate("officerId");
    const book = await Books.find();
    const member = await Member.find();
    const officer = await Officer.find();
    const alertMessage = req.flash("alertMessage");
    const alertStatus = req.flash("alertStatus");
    const alert = { message: alertMessage, status: alertStatus };
    const obj = {
      loan,
      book,
      member,
      officer,
      alert,
      title: "E-Library | Peminjaman Buku",
      user: req.session.user,
    }
    console.log(req)
    res.status(200).json({
      obj
    })

  },

  memberPage: async (req, res) => {
    const { nisn, name, kelas, tahun } = req.body;

    if (
      nisn === undefined ||
      name === undefined ||
      kelas === undefined ||
      tahun === undefined
    ) {
      res.status(404).json({ message: "Lengkapi semua field" });
    }

    const member = await Member.create({
      nisn,
      name,
      kelas,
      tahun,
    });
    console.log(member);
    res.status(201).json({ message: "Success Jadi Member", member });
  },
};
