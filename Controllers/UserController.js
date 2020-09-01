const User = require('../Models/User');
const _UserRepo = require('../Data/UserRepo');
var passport = require('passport');
const RequestService = require('../Services/RequestService');
const MovieRepo = require('../Data/MovieRepo');
const _MovieRepo = new MovieRepo();
const _userRepo = new _UserRepo();

// Displays registration form.
exports.Register = async function (req, res) {
    let reqInfo = RequestService.reqHelper(req);
    res.render('User/Register', { errorMessage: "", user: {}, reqInfo: reqInfo })
};

// Handles 'POST' with registration form submission.
exports.RegisterUser = async function (req, res) {

    var password = req.body.password;
    var passwordConfirm = req.body.passwordConfirm;

    if (password == passwordConfirm) {

        // Creates user object with mongoose model.
        // Note that the password is not present.
        var newUser = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            username: req.body.username,
        });


        User.register(new User(newUser), req.body.password,
            function (err, account) {

                if (err) {
                    let reqInfo = RequestService.reqHelper(req);
                    return res.render('User/Register',
                        {
                            user: newUser, errorMessage: err,
                            reqInfo: reqInfo
                        });
                }

                passport.authenticate('local')(req, res,
                    function () { res.redirect('/User/SecureArea'); });
            });

    }
    else {
        res.render('User/Register', {
            user: newUser,
            errorMessage: "Passwords do not match.",
            reqInfo: reqInfo
        })
    }
};


exports.Login = async function (req, res) {
    let reqInfo = RequestService.reqHelper(req);
    let errorMessage = req.query.errorMessage;

    res.render('User/Login', {
        user: {}, errorMessage: errorMessage,
        reqInfo: reqInfo
    });
}


exports.LoginUser = (req, res, next) => {

    passport.authenticate('local', {
        successRedirect: '/User/SecureArea',
        failureRedirect: '/User/Login?errorMessage=Invalid login.',
    })(req, res, next);
};


exports.Logout = (req, res) => {
    req.logout();
    let reqInfo = RequestService.reqHelper(req);

    res.render('User/Login', {
        user: {}, isLoggedIn: false, errorMessage: "",
        reqInfo: reqInfo
    });
};


exports.SecureArea = async function (req, res) {
    let reqInfo = RequestService.reqHelper(req);

    if (reqInfo.authenticated) {
        res.render('User/SecureArea', { errorMessage: "", reqInfo: reqInfo })
    }
    else {
        res.redirect('/User/Login?errorMessage=You ' +
            'must be logged in to view this page.')
    }
}

exports.UserReviews = async function (req, res) {
    let reqInfo = RequestService.reqHelper(req);
    let username = req.user.username;
    console.log(username)

    if (reqInfo.authenticated) {
        let movies = await _MovieRepo.allMovies();
        if (movies != null) {
            let reqInfo = RequestService.reqHelper(req);
            res.render('User/UserReviews', { movies: movies, username: username, reqInfo: reqInfo });
        }
    }
    else {
        res.redirect('/User/Login?errorMessage=You ' +
            'must be logged in to view this page.')
    }
}

// Creates the form for a post request
exports.EditProfile = async function (req, res) {
    let reqInfo = RequestService.reqHelper(req);
    res.render('User/EditProfile', { user: req.user, errorMessage: "", reqInfo: reqInfo });
}

// Updates the profile given the values in the POST 
exports.UpdateProfile = async function (req, res) {
    let reqInfo = RequestService.reqHelper(req);
    let userID = req.user._id;
    console.log('User ID is ' + userID);
    console.log('User email is ' + req.user.email);
    console.log('Username is ' + req.user.username);
    console.log('first name is ' + req.user.firstName);
    console.log('last name is ' + req.user.lastName)

    let tempUserObj = new User({
        _id: userID,
        email: req.body.email,
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName
    });

    console.log(tempUserObj, 'POST temp user')
    let responseObject = await _userRepo.update(tempUserObj);
    console.log('after await')


    if (responseObject.errorMessage == "") {
        res.render('User/Login', {
            user: responseObject.obj,
            errorMessage: "",
            reqInfo:reqInfo
        });
    }


    else {
        console.log("An error occured. Item not created.");
        res.render('User/EditProfile', {
            user: responseObject.obj,
            errorMessage: responseObject.errorMessage,
            reqInfo: reqInfo
        });
    }
}

exports.EditReview = async function (req, res) {
    let reqInfo = RequestService.reqHelper(req);
    let movieID = req.query._id;

    if (reqInfo.authenticated) {
        let username = req.user.username;
        let movieObj = await _MovieRepo.getMovie(movieID);
        res.render('User/EditReview', { movie: movieObj, username: username, errorMessage: "", reqInfo: reqInfo })
    }
    else {
        res.redirect('/')
    }
}
