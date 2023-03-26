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

let nextId = 1;
const skills = [
  { id: nextId++, name: "React" },
  { id: nextId++, name: "Redux" },
  { id: nextId++, name: "Redux Thunk" },
  { id: nextId++, name: "RxJS" },
  { id: nextId++, name: "Redux Observable" },
  { id: nextId++, name: "Redux Saga" },
];

let isEven = true;
app.get("/api/search", async (req, res) => {
  if (Math.random() > 0.75) {
    return res.status(500).end();
  }
  const { q } = req.query;
  return new Promise((resolve, reject) => {
    setTimeout(
      () => {
        const data = skills.filter((o) =>
          o.name.toLowerCase().startsWith(q.toLowerCase())
        );
        res.send(JSON.stringify(data));
        resolve();
      },
      isEven ? 1000 : 5 * 1000
    );
    isEven = !isEven;
  });
});

const port = process.env.PORT || 7070;
app.listen(port, () => console.log(`The server is running on port ${port}.`));
