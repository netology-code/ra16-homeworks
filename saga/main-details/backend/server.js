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
  res.setHeader("Content-Type", "application/json");
  next();
});

let nextId = 1;
const services = [
  {
    id: nextId++,
    name: "Замена стекла",
    price: 21000,
    content: "Стекло оригинал от Apple",
  },
  {
    id: nextId++,
    name: "Замена дисплея",
    price: 25000,
    content: "Дисплей оригинал от Foxconn",
  },
  {
    id: nextId++,
    name: "Замена аккумулятора",
    price: 4000,
    content: "Новый на 4000 mAh",
  },
  {
    id: nextId++,
    name: "Замена микрофона",
    price: 2500,
    content: "Оригинальный от Apple",
  },
];

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

app.get("/api/services", (req, res) => {
  const body = services.map((o) => ({
    id: o.id,
    name: o.name,
    price: o.price,
  }));
  return fortune(res, body).catch(() =>
    res.status(500).send("Something went wrong")
  );
});
app.get("/api/services/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = services.findIndex((o) => o.id === id);
  if (index === -1) {
    const status = 404;
    return fortune(res, null, status).catch(() =>
      res.status(500).send("Something went wrong")
    );
  }
  const body = services[index];
  return fortune(res, body).catch(() =>
    res.status(500).send("Something went wrong")
  );
});

const port = process.env.PORT || 7070;
app.listen(port, () => console.log(`The server is running on port ${port}.`));
