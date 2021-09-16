/* 
/api/events
*/
const { Router } = require("express");
const { validateJWT } = require("../middlewares/validateJWT");
const { validateFields } = require("../middlewares/validateFields");
const {
  getEventos,
  createEvents,
  UpdateEvents,
  deleteEvents,
} = require("../controllers/events.controllers");
const { check } = require("express-validator");
const {isDate} = require('../helpers/isDate')

const router = Router();

router.use(validateJWT)

router.get("/", getEventos);
router.post("/",
 [
    check('title', 'El titulo es necesario').not().isEmpty(),
    check('start', 'Fecha inicio es obligatorio').custom(isDate),
    check('end', 'Fecha fin es obligatorio').custom(isDate),
    validateFields
],
 createEvents);
router.put("/:id",  UpdateEvents);
router.delete("/:id", deleteEvents);

module.exports = router;
