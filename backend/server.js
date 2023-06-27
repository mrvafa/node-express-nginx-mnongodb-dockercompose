const express = require("express");
const mongoose = require("mongoose");

const mongodb_uri = process.env.MONGODB_URI;
mongoose
  .connect(mongodb_uri, { useNewUrlParser: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const messageSchema = new mongoose.Schema({
  id: String,
  text: String,
});

const Message = mongoose.model("Message", messageSchema);

const app = express();

const items = [
  { id: 1, name: "Item 1" },
  { id: 2, name: "Item 2" },
  { id: 3, name: "Item 3" },
];

app.get("/api/sample", (request, response) => {
  response.json(items);
});

app.get("/api/messages", async (req, res) => {
  try {
    const messages = await Message.find();
    res.json(messages);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error retrieving messages from database");
  }
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
