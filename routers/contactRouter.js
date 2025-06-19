const express = require("express");
const router = express.Router()

const contactController = require("../controllers/contactController");
const { identifier } = require("../middlewares/identification");

router.get('/all-contacts', identifier, contactController.getContacts);
router.post('/create-contact', contactController.createContact);

module.exports = router;