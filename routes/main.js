const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth') 
const homeController = require('../controllers/home')
const { ensureAuth, ensureGuest, adminAuth } = require('../middleware/auth')

router.get('/', homeController.getIndex)
router.get('/meltzergpt', adminAuth, homeController.getMeltzerGPT)
router.get('/profile', ensureAuth, homeController.getProfile)
router.get('/roster', homeController.getRoster)
router.get('/login', authController.getLogin)
router.post('/login', authController.postLogin)
router.get('/logout', authController.logout)
router.get('/signup', authController.getSignup)
router.post('/signup', authController.postSignup)

module.exports = router