import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();

app.use(cors());
app.use(
  bodyParser.json({
    type(req) {
      return true;
    },
  })
);
app.use(function (req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  next();
});

const messages = [];
let nextId = 1;

app.get("/messages", async (req, res) => {
  const from = Number(req.query.from);
  if (req.query.from === 0) {
    return res.send(JSON.stringify(messages));
  }

  const fromIndex = messages.findIndex((o) => o.id === from);
  if (fromIndex === -1) {
    return res.send(JSON.stringify(messages));
  }
  return res.send(JSON.stringify(messages.slice(fromIndex + 1)));
});

app.post("/messages", (req, res) => {
  messages.push({ ...req.body, id: nextId++ });
  res.status(204);
  res.end();
});

const port = process.env.PORT || 7070;
app.listen(port, () => console.log(`The server is running on port ${port}.`));
