const express = require('express');
const {getRestaurants, updateRestaurant, createRestaurant, getRestaurant, deleteRestaurant} = require('../controllers/restaurants')

const appointmentRouter = require('./appointments');

const router = express.Router();

const  {protect, authorize} = require('../middleware/auth');

router.use('/:restaurantId/appointments/', appointmentRouter);

router.route('/').get(getRestaurants).post(protect, authorize('admin'),createRestaurant);
router.route('/:id').get(getRestaurant).put(protect, authorize('admin'), updateRestaurant).delete(protect, authorize('admin'), deleteRestaurant);
module.exports = router;