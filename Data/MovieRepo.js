const Movie = require('../Models/Movie');

class MovieRepo {

    // This is the constructor.
    MovieRepo() {
    }

    // Gets all products.
    async allMovies() {
        let movies = await Movie.find().exec();
        return movies;
    }

    async getMovie(id) {
        let movie = await Movie.findOne({ _id: id }).exec();
        return movie;
    }


    // creates a review if user does not already have one for the movie.

    async create(editedObj, username) { 

        let response = {
            obj: editedObj,
            errorMessage: ""
        };

        try {

            var error = await editedObj.validateSync();
            if (error) {
                response.errorMessage = error.message;
                return response;
            }

            let movieObject = await this.getMovie(editedObj._id);
            let exists = false;

            for (var i = 0; i < movieObject.reviewer.length; i++) {
                if (username == movieObject.reviewer[i]) {
                    exists = true
               } else {
                    exists = false
                }}

                if (movieObject && exists == false) {

                    let updated = await Movie.updateOne(
                        { _id: editedObj.id },

                        {
                            $push: {
                                rating: editedObj.rating,
                                review: editedObj.review,
                                date: editedObj.date,
                                reviewer: editedObj.reviewer
                            }
                        });


                    if (updated.nModified != 0) {
                        response.obj = editedObj;
                        return response;
                    }

                    else {
                        response.errorMessage =
                            "An error occurred during the update. The item did not save."
                    };
                    return response;
                }


                else {
                    response.errorMessage = "An item with this id cannot be found."
                };
                return response;
            
        }
        catch (err) {
            response.errorMessage = err.message;
            return response;
    
    }
    }
    
    async update(editedObj, username) {
        
        let response = {
            obj: editedObj,
            errorMessage: ""
        };

        try {

            var error = await editedObj.validateSync();
            if (error) {
                response.errorMessage = error.message;
                return response;
            }

            let movieObject = await this.getMovie(editedObj._id);

            let pos = 0
            for (var i = 0; i < movieObject.reviewer.length; i++) {
                if (username == movieObject.reviewer[i]) {
                    pos = movieObject.reviewer.indexOf(username);
                }  }
                console.log(username + ' is in the position ' + pos)
                console.log(movieObject.review[pos])


                let thisRating = movieObject.rating;
                let thisReview = movieObject.review;
                let thisDate   = movieObject.date;
                let thisReviewer = movieObject.reviewer;

                console.log(thisDate, thisRating, thisReview, thisReviewer)
                thisRating[pos] = editedObj.rating[0];
                thisReview[pos] = editedObj.review[0];
                thisDate[pos]   = editedObj.date[0];
                thisReviewer[pos] = editedObj.reviewer[0];
                
                console.log(thisRating[pos])

                if (movieObject) {

                    let updated = await Movie.updateOne(
                        { _id: editedObj.id },

                        {
                            $set: {
                                rating: thisRating,
                                review: thisReview,
                                date: thisDate,
                                reviewer: thisReviewer
                            }
                        });


                    if (updated.nModified != 0) {
                        response.obj = editedObj;
                        return response;
                    }

                    else {
                        response.errorMessage =
                            "An error occurred during the update. The item did not save."
                    };
                    return response;
                }


                else {
                    response.errorMessage = "An item with this id cannot be found."
                };
                return response;
            
        }
        catch (err) {
            response.errorMessage = err.message;
            return response;



        }
    

    }

    async delete(editedObj, username) {
        let response = {
            obj: editedObj,
            errorMessage: ""
        };

        try {

            var error = await editedObj.validateSync();
            if (error) {
                response.errorMessage = error.message;
                return response;
            }

            let movieObject = await this.getMovie(editedObj._id);

            let pos = 0
            for (var i = 0; i < movieObject.reviewer.length; i++) {
                if (username == movieObject.reviewer[i]) {
                    pos = movieObject.reviewer.indexOf(username);
                }  }
                console.log(username + ' is in the position ' + pos)
                console.log(movieObject.review[pos])

                let ratings = [];
                let reviews = [];
                let dates   = [];
                let reviewers = [];

                for(i=0; i < movieObject.reviewer.length; i++) {
                    if (i != pos) {
                        ratings.push(movieObject.rating[i]);
                        reviews.push(movieObject.review[i]);
                        dates.push(movieObject.date[i]);
                        reviewers.push(movieObject.reviewer[i]);
                    }
                }
                
                console.log(ratings)
                console.log(reviews)
                console.log(dates)
                console.log(reviewers)

                if (movieObject) {

                    let updated = await Movie.updateOne(
                        { _id: editedObj.id },

                        {
                            $set: {
                                rating: ratings,
                                review: reviews,
                                date: dates,
                                reviewer: reviewers
                            }
                        });


                    if (updated.nModified != 0) {
                        response.obj = editedObj;
                        return response;
                    }

                    else {
                        response.errorMessage =
                            "An error occurred during the update. The item did not save."
                    };
                    return response;
                }


                else {
                    response.errorMessage = "An item with this id cannot be found."
                };
                return response;
            
        }
        catch (err) {
            response.errorMessage = err.message;
            return response;



        }

 
    }

}

module.exports = MovieRepo;

         