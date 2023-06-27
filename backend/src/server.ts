import express from "express";
import mongoose from "mongoose";

const mongodb_uri: string = process.env.MONGODB_URI as string;
mongoose
  .connect(mongodb_uri, JSON.parse('{"useNewUrlParser": true }'))
  .then(() => console.log("MongoDB connected"))
  .catch((err: any) => console.log(err));

interface IMessage {
  id: string;
  text: string;
}

const messageSchema = new mongoose.Schema<IMessage>({
  id: String,
  text: String,
});

const Message = mongoose.model<IMessage>("Message", messageSchema);

const app = express();

const items = [
  { id: 1, name: "Item 1" },
  { id: 2, name: "Item 2" },
  { id: 3, name: "Item 3" },
];

app.get(
  "/api/sample",
  (request: express.Request, response: express.Response) => {
    response.json(items);
  }
);

app.get(
  "/api/messages",
  async (req: express.Request, res: express.Response) => {
    try {
      const messages = await Message.find();
      res.json(messages);
    } catch (err) {
      console.log(err);
      res.status(500).send("Error retrieving messages from database");
    }
  }
);

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
