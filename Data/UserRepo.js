const User = require('../Models/User');

class UserRepo {
    UserRepo() {        
    }

    async getUserByEmail(email) {
        var user = await User.findOne({email: email});
        if(user) {
            let respose = { obj: user, errorMessage:"" }
            return respose;
        }
        else {
            return null;
        }
    }

    async getUserById(id) {
        var user = await User.findOne({_id: id});
        if(user) {
            let respose = { obj: user, errorMessage:""}
            return respose;
        }
     else {
        return null;
    }
    }

    async update(editedObj) {   
    
        let response = {
            obj:          editedObj,
            errorMessage: "" };
    
        try {

            var error = await editedObj.validateSync();
            if(error) {
                response.errorMessage = error.message;
                return response;
            } 
    

            let userObject = await this.getUserById(editedObj.id);
            console.log(userObject, 'Repo userobject')
        
            if(userObject) {
    
                let updated = await User.updateOne(
                    { _id: editedObj.id}, 
    

                    {$set: { 
                        _id     : editedObj.id,
                        username: editedObj.username,
                        email: editedObj.email,
                        firstName : editedObj.firstName,
                        lastName : editedObj.lastName }}); 
    

                if(updated.nModified!=0) {
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
                response.errorMessage = "An item with this id cannot be found." };
                return response; 
            }
    

        catch (err) {
            response.errorMessage = err.message;
            return  response;
        }    
    }  

}
module.exports = UserRepo;

