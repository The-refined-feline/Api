const router = require('express').Router();
const controller = require('../../controllers/search/search.controller');
const validationSchema = require('../../validators/profile.validator');
const validator = require('express-joi-validation').createValidator({
  passError: true,
});
auth = require('../../middlewares/auth.middleware');
router.use(auth('', true));

router.post('/search-seeker/:limit?/:page?', controller.search);

module.exports = router;
