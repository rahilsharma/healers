// app/routes.js
var User = require('../app/models/user');
module.exports = function(app, passport) {
	// =====================================
	// HOME PAGE (with login links) ========
	// =====================================
	app.get('/', function(req, res) {
		res.render('firstpage.ejs'); // load the index.ejs file
	});
	app.get('/indexdoc', function(req, res) {
		res.render('indexdoc.ejs'); // load the index.ejs file
	});
	app.get('/indexpat', function(req, res) {
		res.render('indexpat.ejs'); // load the index.ejs file
	});
	// =====================================
	// LOGIN ===============================
	// =====================================
	// show the login form
	app.get('/login', function(req, res) {
		// render the page and pass in any flash data if it exists
		res.render('login.ejs', { message: req.flash('loginMessage') });
	});

	// process the login form
	app.post('/login', passport.authenticate('local-login', {
		successRedirect : '/profile', // redirect to the secure profile section
		failureRedirect : '/login', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));

	// =====================================
	// SIGNUP ==============================
	// =====================================
	// show the signup form
	app.get('/signup', function(req, res) {
		// render the page and pass in any flash data if it exists

		res.render('signup.ejs', { message: req.flash('signupMessage') });
	});
	app.get('/signuppat', function(req, res) {
		// render the page and pass in any flash data if it exists
		res.render('signuppat.ejs', { message: req.flash('signupMessage') });
	});

	// process the signup form
	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect : '/profile', // redirect to the secure profile section
		failureRedirect : '/signup', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));
	app.post('/signuppat', passport.authenticate('local-signup', {
		successRedirect : '/profile', // redirect to the secure profile section
		failureRedirect : '/signuppat', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}

	));
	// =====================================
	// PROFILE SECTION =========================
	// =====================================
	// we will want this protected so you have to be logged in to visit
	// we will use route middleware to verify this (the isLoggedIn function)
	app.get('/profile', isLoggedIn, function(req, res) {
		console.log(req.body);
		res.render('profile.ejs', {
			user : req.user // get the user out of session and pass to template
		});
	});
	app.post('/profile', isLoggedIn, function(req, res) {
		console.log('came till here');
		User.findById(req.user._id, function(err, user) {
			if (err) throw err;
			// change the users location
			user.dayss.mon.start = req.body.monstart;
			user.dayss.mon.endd = req.body.monend;

            user.dayss.tue.start =req.body.tuestart;
			user.dayss.tue.endd =req.body.tueend;

			user.dayss.wed.start =req.body.wedstart;
			user.dayss.wed.endd =req.body.wedend;

			user.dayss.thurs.start =req.body.thursstart;
			user.dayss.thurs.endd =req.body.thursend;

			user.dayss.fri.start =req.body.thursstart;
			user.dayss.fri.endd =req.body.thursend;

			user.dayss.sat.start =req.body.fristart;
			user.dayss.sat.endd =req.body.friend;

			user.dayss.sun.start =req.body.satstart;
			user.dayss.sun.endd =req.body.sunstart;


			// save the user
			user.save(function(err) {
				if (err) throw err;
				console.log('Doc details successfully updated!');
			});
		});
		res.redirect('/profile');
	});
	// =====================================
	// LOGOUT ==============================
	// =====================================
	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});
};

// route middleware to make sure
function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
	res.redirect('/');
}
