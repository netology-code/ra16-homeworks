import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { readFileSync } from "fs";

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

const news = JSON.parse(readFileSync("./news.json"));
const limit = 5;

function fortune(res, body = null, status = 200) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.3) {
        res.status(status).send(JSON.stringify(body));
        resolve();
        return;
      }
      reject();
    }, 3 * 1000);
  });
}

app.get("/api/news", (req, res) => {
  const { lastSeenId } = req.query;
  if (lastSeenId === undefined) {
    return fortune(res, news.slice(0, limit)).catch(() =>
      res.status(500).send("Something went wrong")
    );
  }

  const id = Number(lastSeenId);
  if (Number.isNaN(id)) {
    const status = 400;
    return fortune(res, null, status).catch(() =>
      res.status(500).send("Something went wrong")
    );
  }

  const index = news.findIndex((o) => o.id === id);
  if (index === -1) {
    const status = 404;
    return fortune(res, null, status).catch(() =>
      res.status(500).send("Something went wrong")
    );
  }

  const body = news.slice(index + 1, index + 1 + limit);
  return fortune(res, body).catch(() =>
    res.status(500).send("Something went wrong")
  );
});

const port = process.env.PORT || 7070;
app.listen(port, () => console.log(`The server is running on port ${port}.`));
