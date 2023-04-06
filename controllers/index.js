const router = require('express').Router();

const apiRoutes = require('./api/');
const homeRoutes = require('./home-routes.js');

router.use('/', homeRoutes);
router.use('/dashboard', homeRoutes);
router.use('/api', apiRoutes);

module.exports = router;
