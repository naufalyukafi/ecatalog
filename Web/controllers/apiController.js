const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Books = require("../models/Books");
const Book = require("../models/Books");
const LoanBook = require("../models/LoanBook");
const Members = require("../models/Members");
const Officer = require("../models/Officer");
const ReturnBook = require("../models/ReturnBook");
const Users = require("../models/Users");

const createJSON = (code, message, results) => {
  return {
    status: code === 200 ? true : false,
    code,
    message,
    results,
    createAt: Date.now()
  }
}

module.exports = {
  bookPage: async (req, res) => {
    try {
      const book = await Book.find();
      res.status(200).json({
        book,
      });
    } catch (error) {
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

  getLoanBook: async (req, res) => {
    const loan = await LoanBook.find()
      .populate("booksId")
      .populate("memberId")
      .populate("officerId");

    let check = loan.filter(element => element.memberId.nisn === req.auth.nisn);

    const obj = check.map(el => ({
      idLoanBook: el._id,
      booksId: el.booksId._id,
      title: el.booksId.title,
      image: el.booksId.image,
      dateLoan: el.dateLoan,
      dateReturn: el.dateReturn,
      status: el.status,
      jumlah: el.jumlah
    }))

    res.status(200).json({
      data: obj,
    });
  },

  newLoanBook: async (req, res) => {
    const { dateLoan, dateReturn, officerId, booksId, jumlah } = req.body;

    const newItem = {
      dateLoan,
      dateReturn,
      memberId: req.auth.id,
      officerId,
      booksId,
      jumlah: (jumlah - 1)
    };

    await LoanBook.create(newItem).then(() => {
      Books.findOneAndUpdate({ _id: booksId }, { $set: { jumlah: (jumlah - 1) } }, { new: true }, () => {
        res.status(200).send(createJSON(200, "Buku berhasil di pinjam!"))
      });

    });
  },

  putLoanBook: async (req, res) => {
    const { id, dateLoan, dateReturn, booksId, officerId } =
      req.body;
    const loan = await LoanBook.findOne({ _id: id });
    loan.dateLoan = dateLoan;
    loan.dateReturn = dateReturn;
    loan.booksId = booksId;
    loan.memberId = req.auth.nisn;
    loan.officerId = officerId;
    await loan.save();
  },

  bookExtension: async (req, res) => {
    const { id, dateReturn } = req.body;
    LoanBook.findOneAndUpdate({ _id: id }, { $set: { dateReturn } }, { new: true }, () => {
      res.status(200).send(createJSON(200, "Peminjaman berhasil diperpanjang!"))
    });
  },

  getReturnBook: async (req, res) => {
    const returnBook = await ReturnBook.find()
      .populate("booksId")
      .populate("memberId")
      .populate("officerId");
    let check = returnBook.filter(element => element.memberId.nisn === req.auth.nisn);

    const obj = check.map(el => ({
      id: el.booksId._id,
      title: el.booksId.title,
      image: el.booksId.image
    }))

    res.status(200).json({
      data: obj,
    });
  },


  newReturnBook: async (req, res) => {
    const { dateReturn, booksId, idLoanBook, jumlah } = req.body;

    const newItem = {
      dateReturn,
      memberId: req.auth.id,
      officerId: '63ceed9b4113a66c63cc3696',
      booksId,
      status: 'returned',
      jumlah: (jumlah + 1)
    };
    // console.log(idLoanBook)
    await ReturnBook.create(newItem).then(() => {
      LoanBook.findOneAndUpdate({ _id: idLoanBook }, { $set: { status: 'returned', jumlah: (jumlah + 1) } }, { new: true }, () => {
        res.status(200).send(createJSON(200, "Buku berhasil di kembalikan!"))
      })

    });
    // await 
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

    const member = await Members.create({
      nisn,
      name,
      kelas,
      tahun,
    });
    res.status(201).json({ message: "Success Jadi Member", member });
  },

  // auth
  registerUser: async (req, res) => {
    const { nisn, username, password, email, name, tahun, kelas } = req.body;
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(password, salt);

    if (
      nisn === undefined ||
      username === undefined ||
      password === undefined ||
      email === undefined ||
      tahun === undefined ||
      kelas === undefined
    ) {
      res.status(404).json({ message: "Lengkapi semua field" });
    }
    await Members.findOne({ username }).then((data) => {
      if (data) {
        res.status(200).send(createJSON(501, "Username Sudah digunakan", null))
      } else {
        Members.create({
          nisn,
          email,
          name,
          tahun,
          username,
          password: hash,
          kelas
        }).then(() => {
          res.status(200).send(createJSON(200, "Success register", null))
        }).catch((err) => console.error(err))

      }
    })
  },

  loginUser: async (req, res) => {
    const { nisn, password } = req.body;

    if (
      nisn === undefined ||
      password === undefined
    ) {
      res.status(404).json({ message: "Lengkapi semua field" });
    }

    Members.findOne({ nisn }, (err, user) => {
      if (err) {
        return res.status(500).json({ error: 'Internal server error' });
      }

      if (!user) {
        return res.status(401).json({ error: 'Incorrect nisn' });
      }

      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) {
          return res.status(500).json({ error: 'Internal server error' });
        }

        if (!isMatch) {
          return res.status(401).json({ error: 'Incorrect password' });
        }

        const token = jwt.sign({
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role,
          nisn: user.nisn
        }, 'ecatalog');

        res.json({ payload: token });
      });

    })
  },

  forgotPassword: async (req, res) => {
    const { nisn, password } = req.body;
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(password, salt);

    await Members.findOne({ nisn }).then((data) => {
      if (data) {
        Members.findOneAndUpdate({ nisn }, { $set: { password: hash } }, { new: true }, () => {
          res.status(200).send(createJSON(200, "Reset Password Success"))
        });
      } else {
        res.status(200).send(createJSON(501, `NISN ${nisn} Tidak Ditemukan`, null))
      }
    })
  },
};
