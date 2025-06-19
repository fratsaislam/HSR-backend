const express = require("express");
const router = express.Router();
const { identifier } = require("../middlewares/identification");
const reservController = require("../controllers/reservController")


router.get('/all-reserv', identifier, reservController.getReservs);
router.post('/create-reserv', reservController.createReserv);
router.delete('/delete-reserv', identifier, reservController.deleteReserv);

module.exports = router;