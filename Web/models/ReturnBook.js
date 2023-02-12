const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const returnSchema = new mongoose.Schema({
  dateReturn: {
    type: Date,
  },
  booksId: {
    type: ObjectId,
    ref: "Books",
  },
  memberId: {
    type: ObjectId,
    ref: "Members",
  },
  officerId: {
    type: ObjectId,
    ref: "Officer",
  },
  status: {
    type: String,
    default: 'not-returned',
  }
});

module.exports = mongoose.model("ReturnBook", returnSchema);
