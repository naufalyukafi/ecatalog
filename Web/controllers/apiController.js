const Books = require("../models/Books");
const Book = require("../models/Books");
const LoanBook = require("../models/LoanBook");
const Members = require("../models/Members");
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
    var username = req.params.username
    const user = await LoanBook.findOne({ name: username });
    res.status(200).json({
      user,
    });

  },

  checkMember: async (req, res) => {
    var username = req.params.username
    const user = await Members.findOne({ name: username });
    res.status(200).json({
      user,
    });
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
