const express = require("express");
const { User } = require("../db");
const {
  registerUser,
  getUserById,
  editUser,
  deleteUser,
} = require("../controller/user_controller");

const router = express();
router.use(express.json());

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const user = await getUserById(id);

    if (!user) throw Error("No user has been found");
    else {
      res.status(200).json(user);
    }
  } catch (e) {
    res.status(404).send(e.message);
  }
});

router.post("/register", async (req, res) => {
  const { userName, email, password, admin } = req.body;

  try {
    await registerUser(userName, email, password, admin);
    res.status(200).send("Registration succesful");
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.put("/edit", async (req, res) => {
  const { userName, email, password, status, admin } = req.body;
  try {
    await editUser(userName, email, password, status, admin);
    res.status(200).send("User updated succesfully");
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await deleteUser(id);
  } catch (e) {
    res.status(400).send(e.message);
  }
});
