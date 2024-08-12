const express = require('express');
const router = express.Router();
const userIdCardController = require('../controllers/userIdCard.controller');

router.post('/create-user-id-card', userIdCardController.createUserIdCard);

router.get('/user-id-card/:userId', userIdCardController.getUserIdCardByUserId);

module.exports = router;
