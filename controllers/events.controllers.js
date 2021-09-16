const express = require("express");
const { json } = require("express/lib/response");
const Event = require("../models/Evento.models");

const getEventos = async (req, res = express.response) => {

  const event = await Event.find()
  .populate('user', 'name')

  res.json({
    ok: true,
    event
  });
};

const createEvents = async (req, res = express.response) => {
  const event = new Event(req.body);

  try {
    event.user = req.uid
    console.log(event.user)
    const eventSave = await event.save();

    res.json({
      ok: true,
      evento: eventSave,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el admi",
    });
  }
};

const UpdateEvents = async (req, res = express.response) => {

  const evetnID = req.params.id
  const uid = req.uid

  try {
    const event = await Event.findById(evetnID)
    if(!event){
      res.status(404).json({
        ok:false,
        msg: 'event no por id'
      })
    }

    if(event.user.toString() !== uid){
      return res.status(401),json({
        ok:false,
        msg: 'no tiene privilegios'
      })
    }

    const newEvent = {
      ...req.body,
      user: uid
    }

    const eventUpdate = await Event.findByIdAndUpdate(evetnID, newEvent, {new: true})

    res.json({
      ok:true,
      event: eventUpdate
    })



  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'hable con el administrador'
    })
    
  }

};
const deleteEvents = async (req, res = express.response) => {
  const evetnID = req.params.id
  const uid = req.uid

  try {
    const event = await Event.findById(evetnID)
    if(!event){
      return res.status(404).json({
        ok:false,
        msg: 'event no por id'
      })
    }

    if(event.user.toString() !== uid){
      return res.status(401),json({
        ok:false,
        msg: 'no tiene privilegios'
      })
    }

     await Event.findOneAndDelete(evetnID)

    res.json({
      ok:true,
    })



  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'hable con el administrador'
    })
    
  }
};

module.exports = {
  getEventos,
  createEvents,
  UpdateEvents,
  deleteEvents,
};
