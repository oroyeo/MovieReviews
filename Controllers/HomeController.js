const RequestService = require('../Services/RequestService');
const MovieRepo      = require('../Data/MovieRepo');
const _MovieRepo     = new MovieRepo();


exports.Index = async function(req, res) {
    let reqInfo = RequestService.reqHelper(req);
    let movies = await _MovieRepo.allMovies();
    if(movies!=null) {
        return res.render('Home/Index', {movies:movies, reqInfo:reqInfo });
    }
    else {
        res.render('Home/Index', {movies:[], reqInfo:reqInfo})
    }
};

