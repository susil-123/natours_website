const express = require('express');

const tc = require(`${__dirname}/../controller/tourController`);

const router = express.Router();

router.route('/top-five-cheap').get(tc.aliasTopTours, tc.getAllTours);
router.route('/monthly-plan/:year').get(tc.monthlyPlan);

router.route('/').get(tc.getAllTours).post(tc.createTour);
router
  .route('/:id')
  .get(tc.getTourById)
  .patch(tc.updateTour)
  .delete(tc.deleteTour);

module.exports = router;
