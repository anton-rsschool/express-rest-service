/* eslint-disable callback-return */
const router = require('express').Router();

const loginService = require('./login.service');
const { createError } = require('../../middlewars/errorHandler');

router.route('/').post(async (req, res, next) => {
  try {
    const token = await loginService.getToken(req.body);
    if (!token) return next(createError(403));
    res.json({ token });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
