const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Books = require("../models/Books");
const Book = require("../models/Books");
const LoanBook = require("../models/LoanBook");
const Members = require("../models/Members");
const Member = require("../models/Members");
const Officer = require("../models/Officer");
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

  // auth
  registerUser: async (req, res) => {
    const { nisn, username, password, role, email } = req.body;
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(password, salt);

    if (
      nisn === undefined ||
      username === undefined ||
      password === undefined ||
      email === undefined
    ) {
      res.status(404).json({ message: "Lengkapi semua field" });
    }
    await Users.findOne({ username }).then((data) => {
      if (data) {
        res.status(200).send(createJSON(501, "Username Sudah digunakan", null))
      } else {
        Users.create({
          nisn,
          email,
          username,
          password: hash,
          role
        }).then((resp) => {
          res.status(200).send(createJSON(200, "Success register"))
        });

      }
    })
  },

  loginUser: async (req, res) => {
    const { username, password } = req.body;

    if (
      username === undefined ||
      password === undefined
    ) {
      res.status(404).json({ message: "Lengkapi semua field" });
    }

    Users.findOne({ username }, (err, user) => {
      if (err) {
        return res.status(500).json({ error: 'Internal server error' });
      }

      if (!user) {
        return res.status(401).json({ error: 'Incorrect username' });
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
        }, 'ecatalog', {
          expiresIn: 86400, // 1 hari
        });

        res.json({ token });
      });

    })
  },
};
