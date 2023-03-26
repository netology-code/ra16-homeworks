import passport from "passport";
import { Strategy } from "passport-http-bearer";
import bcrypt from "bcrypt";
import faker from "faker";
import express from "express";
import * as uuid from "uuid";
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

const tokens = new Map();
const users = new Map();
const rounds = 10;

users.set("vasya", {
  id: uuid.v4(),
  login: "vasya",
  name: "Vasya",
  password: bcrypt.hashSync("password", rounds),
  avatar: "https://i.pravatar.cc/40",
});

const news = [
  {
    id: uuid.v4(),
    title: faker.lorem.words(),
    image: "https://placeimg.com/640/480/nature",
    content: faker.lorem.paragraph(),
  },
  {
    id: uuid.v4(),
    title: faker.lorem.words(),
    image: "https://placeimg.com/640/480/arch",
    content: faker.lorem.paragraph(),
  },
  {
    id: uuid.v4(),
    title: faker.lorem.words(),
    image: "https://placeimg.com/640/480/tech",
    content: faker.lorem.paragraph(),
  },
  {
    id: uuid.v4(),
    title: faker.lorem.words(),
    image: "https://placeimg.com/640/480/sepia",
    content: faker.lorem.paragraph(),
  },
];

passport.use(
  new Strategy((token, callback) => {
    const user = tokens.get(token);
    if (user === undefined) {
      return callback(null, false);
    }

    return callback(null, user);
  })
);
const bearerAuth = passport.authenticate("bearer", { session: false });

app.post("/auth", async (req, res) => {
  try {
    const { login, password } = req.body;
    const user = users.get(login);
    if (user === undefined) {
      return res
        .status(400)
        .send(JSON.stringify({ message: "user not found" }));
    }

    const result = await bcrypt.compare(password, user.password);
    if (result === false) {
      return res
        .status(400)
        .send(JSON.stringify({ message: "invalid password" }));
    }
    const token = uuid.v4();
    tokens.set(token, user);
    return res.send(JSON.stringify({ token }));
  } catch (error) {
    console.error(error);
    res.status(500).send(JSON.stringify({ message: "Server internal error" }));
  }
});

app.use("/private**", bearerAuth);
app.get("/private/me", async (req, res) => {
  try {
    res.send(
      JSON.stringify({
        id: req.user.id,
        login: req.user.login,
        name: req.user.name,
        avatar: req.user.avatar,
      })
    );
  } catch (error) {
    console.error(error);
    res.status(500).send(JSON.stringify({ message: "Server internal error" }));
  }
});
app.get("/private/news", async (req, res) => {
  try {
    res.send(JSON.stringify(news));
  } catch (error) {
    res.status(500).send(JSON.stringify({ message: "Server internal error" }));
  }
});
app.get("/private/news/:id", async (req, res) => {
  try {
    const [item] = news.filter((o) => o.id === req.params.id);
    if (item === undefined) {
      return res.status(404).send(JSON.stringify({ message: "not found" }));
    }
    res.send(JSON.stringify(item));
  } catch (error) {
    res.status(500).send(JSON.stringify({ message: "Server internal error" }));
  }
});

const port = process.env.PORT || 7070;
app.listen(port, () => console.log(`The server is running on port ${port}.`));
