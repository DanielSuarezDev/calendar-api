const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User.model");
const {generateJWT} = require('../helpers/jwt')

const CreateUser = async (req, res = express.response) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        ok: false,
        msg: "usuario ya existe",
      });
    }
    user = new User(req.body);

    //encriptar password
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    await user.save();

    //generar jwt
    const token = await generateJWT(user.id, user.name)

    res.status(201).json({
      ok: true,
      uid: user.id,
      name: user.name,
      token
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Por favor comunicarse con el administrador",
    });
  }
};

const loginUser = async(req, res = express.response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: "el usuario no existe con email",
      });
    }

    // confirmar password
    const validPassword = bcrypt.compareSync(password, user.password)

    if (!validPassword) {
       return res.status(400).json({
            ok: false,
            msg: "password incorrecto",
          });
    }

    // generar jwt
    const token = await generateJWT(user.id, user.name)

    res.status(201).json({
        ok: true,
        name: user.name,
        uid: user.id,
        token
      });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Por favor comunicarse con el administrador",
    });
  }

 
};

const revalidateToken = async (req, res = express.response) => {

  const uid = req.uid
  const name = req.name

  //generar un nuevo JWT y retornar en esta peticion
  const token = await generateJWT(uid, name)

  res.json({
    ok: true,
    name,
    uid,
    token
  });
};

module.exports = {
  CreateUser,
  loginUser,
  revalidateToken,
};
