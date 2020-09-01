const RequestService = require('../Services/RequestService');
const MovieRepo = require('../Data/MovieRepo');
const _MovieRepo = new MovieRepo();
const Movie = require('../Models/Movie')
var passport = require('passport');


exports.Reviews = async function (req, res) {
    let reqInfo = RequestService.reqHelper(req);
    let movieID = req.query._id;
    let movieObj = await _MovieRepo.getMovie(movieID);
    res.render('Movie/Reviews', { movie: movieObj, reqInfo: reqInfo });
}

exports.WriteReview = async function (req, res) {
    let reqInfo = RequestService.reqHelper(req);
    let movieID = req.query._id;

    if (reqInfo.authenticated) {
        let username = req.user.username;
        let movieObj = await _MovieRepo.getMovie(movieID);
        res.render('Movie/WriteReview', { movie: movieObj, username: username, errorMessage: "", reqInfo: reqInfo })
    }
    else {
        res.redirect('/Movie/LoginFailed?errorMessage=You ' +
            'must be logged in to write a review.');
    }
}

// Adds reviews to the movie matching the ID
exports.AddReview = async function (req, res) {
    let movieID = req.body._id;
    let reqInfo = RequestService.reqHelper(req);
    let username = req.user.username;
    console.log(movieID, username, reqInfo)
    let tempMovieObj = new Movie({
        _id: movieID,
        rating: req.body.rating,
        review: req.body.review,
        reviewer: username,
        date: new Date().toDateString()
    })
    console.log('Before await')
    let responseObject = await _MovieRepo.create(tempMovieObj, username);
    let movies         = await _MovieRepo.allMovies();
    let movieObj       = await _MovieRepo.getMovie(movieID);

    if (responseObject.errorMessage == "") {
        res.render('User/UserReviews', {
            movies: movies,
            username: username,
            errorMessage: "", reqInfo: reqInfo
        });
    }

    else {
        res.render('Movie/WriteReview', {
            movie:movieObj,
            errorMessage: responseObject.errorMessage,
            reqInfo: reqInfo
        });
    }
}



exports.LoginFailed = async function (req, res) {
    let reqInfo = RequestService.reqHelper(req);
    return res.render('Movie/LoginFailed', { reqInfo: reqInfo });
};


exports.UpdateReview = async function (req, res) {
    let reqInfo = RequestService.reqHelper(req);
    let movieID = req.body._id;
    let username = req.user.username;
    console.log(movieID, username, reqInfo)
    let tempMovieObj = new Movie({
        _id: movieID,
        rating: req.body.rating,
        review: req.body.review,
        reviewer: username,
        date: new Date().toDateString()
    })
    console.log('Before await')
    let responseObject = await _MovieRepo.update(tempMovieObj, username);
    let movies = await _MovieRepo.allMovies();
    let movieObj       = await _MovieRepo.getMovie(movieID);

    if (responseObject.errorMessage == "") {
        res.render('User/UserReviews', {
            movies: movies,
            username: username,
            errorMessage: "", reqInfo: reqInfo
        });
    }

    else {
        res.render('User/EditReview', {
            movie: movieObj,
            errorMessage: responseObject.errorMessage,
            reqInfo: reqInfo,
            username:username
        });
    }
}

exports.DeleteReview = async function(req, res) {
    let reqInfo  = RequestService.reqHelper(req);
    let username = req.user.username;
    let movieID  = req.body._id;
    let movie    = await _MovieRepo.getMovie(movieID); 
    let deleted = await _MovieRepo.delete(movie, username)
    let movies = await _MovieRepo.allMovies();
    if(movies!=null) {
        return res.render('User/UserReviews', {movies:movies, reqInfo:reqInfo, username:username });
    }
    else {
        res.render('User/UserReviews', {movies:[], reqInfo:reqInfo, username:username});
    }

}