const router = require('express').Router();

// import auth router
const authRouter = require('./auth/auth.route');
const adminAuth = require('./admin/auth/auth.route');
// import profile router
const Profile = require('./profile/profile.route');

//invitation
const invitation = require('./invitation/invitation.router');

// Model withdraw
const addBank = require('./model/withdraw/bank.route');
const withdraw = require('./model/withdraw/withdraw.route');

//report
const report = require('./report.route');
//user search & sort seeker
const seekerSearch = require('./search/search.route');

//admin profile
const adminProfile = require('./admin/profile.route');

// Admin user management
const userManagement = require('./admin/user.route');

// Admin Setting
const adminSettings = require('./admin/page.route');
const adminFaq = require('./admin/faq.route');
const adminFilter = require('./admin/filter.route');

// Admin view reports
const reportView = require('./admin/report.route');

//global router
const pageModule = require('./page.route');
const like = require('./like.route');
//admin view support
const supportview = require('./admin/support.route');

// all routes
router.use('/auth', authRouter);
router.use('/profile', Profile);
router.use('/page-module', pageModule);
router.use('/invitation', invitation);
router.use('/like', like);
router.use('/report', report);
router.use('/model/bank', addBank);
router.use('/model/withdraw', withdraw);

router.use('/model-dashboard', seekerSearch);

//all admin route
router.use('/admin', adminAuth);
router.use('/admin/profile', adminProfile);
router.use('/admin/user-management', userManagement);
router.use('/admin/page', adminSettings);
router.use('/admin/faq', adminFaq);
router.use('/admin/filter', adminFilter);
router.use('/admin/report', reportView);

module.exports = router;
