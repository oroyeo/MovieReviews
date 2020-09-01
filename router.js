var HomeController = require('./Controllers/HomeController');
var UserController = require('./Controllers/UserController');
var MovieController = require('./Controllers/MovieController')

// Routes
module.exports = function(app){  
    // Main Routes
    app.get('/',      HomeController.Index);

    app.get('/User/Register', UserController.Register);
    app.post('/User/RegisterUser', UserController.RegisterUser);
    app.get('/User/Login', UserController.Login);
    app.post('/User/LoginUser', UserController.LoginUser);
    app.get('/User/Logout', UserController.Logout);
    app.get('/User/SecureArea', UserController.SecureArea);
    app.get('/User/UserReviews', UserController.UserReviews);
    app.get('/Movie/LoginFailed', MovieController.LoginFailed);
    app.get('/Movie/Reviews', MovieController.Reviews);
    app.get('/Movie/WriteReview', MovieController.WriteReview);
    app.post('/Movie/AddReview', MovieController.AddReview);
    app.post('/Movie/UpdateReview', MovieController.UpdateReview)
    app.get('/User/EditProfile', UserController.EditProfile);
    app.get('/User/EditReview', UserController.EditReview);
    app.post('/User/UpdateProfile', UserController.UpdateProfile);
    app.post('/Movie/DeleteReview', MovieController.DeleteReview);


};

