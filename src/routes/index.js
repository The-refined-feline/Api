const router = require('express').Router();

// import auth router
const authRouter = require('./auth/auth.route');
const adminAuth = require('./admin/auth/auth.route');
// import profile router
const Profile = require('./profile/profile.route');




//admin profile
const adminProfile = require('./admin/profile.route');

// Admin user management
const userManagement = require('./admin/user.route');

// Admin Setting
const adminSettings = require('./admin/page.route');
const adminFaq = require('./admin/faq.route');


// Admin view reports


//global router
const pageModule = require('./page.route');

// all routes
router.use('/auth', authRouter);
router.use('/profile', Profile);
router.use('/page-module', pageModule);


//all admin route
router.use('/admin', adminAuth);
router.use('/admin/profile', adminProfile);
router.use('/admin/user-management', userManagement);
router.use('/admin/page', adminSettings);
router.use('/admin/faq', adminFaq);


module.exports = router;
