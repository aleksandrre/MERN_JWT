import express from "express";
import { RepArtists } from "../models/bookModel.js";
import bcrypt from "bcryptjs";
import { Users } from "../models/usersModel.js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.get("/", authMiddleware, async (req, res) => {
  try {
    const allArtists = await RepArtists.find();
    return res.status(201).send(allArtists);
  } catch (error) {
    console.log(error.message);
  }
});
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const oneArtist = await RepArtists.findById(id);
    return res.status(201).send(oneArtist);
  } catch (error) {
    res.status(401).send("no item");
    console.log(error.message);
  }
});

router.post("/", authMiddleware, async (req, res) => {
  try {
    if (!req.body.name || !req.body.genre || !req.body.age) {
      return res.status(400).send({
        message: "Send all required fields:name,genre,age",
      });
    }
    const newArtist = {
      name: req.body.name,
      genre: req.body.genre,
      age: req.body.age,
    };

    const artist = await RepArtists.create(newArtist);
    console.log("yreep");
    return res.status(201).send(artist);
  } catch (error) {
    console.log(error.message);
  }
});

router.put("/:id", authMiddleware, async (req, res) => {
  try {
    if (!req.body.name || !req.body.genre || !req.body.age) {
      return res.status(400).send({
        message: "Send all required fields:name,genre,age",
      });
    }
    const { id } = req.params;
    const editedArtist = await RepArtists.findByIdAndUpdate(id, req.body);
    if (!editedArtist) {
      return res.status(404).send({ message: "Artist isn't found" });
    }
    return res.status(200).send({ message: "Artist is updated" });
  } catch (error) {
    console.log(error.message);
  }
});

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const deleteArtist = await RepArtists.findByIdAndDelete(id);
    if (!deleteArtist) {
      return res.status(404).send("Artist not found");
    }
    return res.status(200).send({ message: "artist deleted successfully" });
  } catch (error) {
    console.log(error.message);
  }
});

//authentication

router.post("/users", authMiddleware, async (req, res) => {
  try {
    if (!req.body.name || !req.body.password) {
      return res.status(400).send({
        message: "Send all required fields:name,password",
      });
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = { name: req.body.name, password: hashedPassword };
    const oneuser = await Users.create(user);
    return res.status(201).send(oneuser);
  } catch (error) {
    console.log(error.message);
  }
});

router.post("/users/login", async (req, res) => {
  const user = await Users.findOne({ name: req.body.name });
  if (!user) {
    return res.send({ message: "user isn't found" });
  }
  try {
    const data = await bcrypt.compare(req.body.password, user.password);
    if (!data) {
      res.send({ message: "Not Allowed" });
    } else {
      const jwttoken = jwt.sign({ userId: user._id }, "pass");

      res.status(200).json({ jwttoken });
    }
  } catch (error) {
    console.log(error.message);
  }
});

async function authMiddleware(req, res, next) {
  const jwttoken = req.headers.authorization;
  const token = jwttoken && jwttoken.split(" ")[1];

  if (!jwttoken) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const user = await jwt.verify(token, "pass");

    next();
  } catch (error) {
    return res.status(403).json({ message: "Forbidden" });
  }
}

export default router;
