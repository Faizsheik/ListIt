const mongoose = require('mongoose');
const {Schema} =  mongoose;
const bcrypt = require('bcrypt');

const userSchema = new Schema({

    firstname : String,
    lastname : String,
    username : {type:String,required:true},
    password: {type:String,required:true}
})

//Converting password into hash
userSchema.pre("save",async function(next)
{
    const user = this;
    if(!user.isModified)   return next(); // Do this whenere the data is fresh no need to hash the alreasy existing passwoed.
    let salt = await bcrypt.genSalt(10);
    let hash = await bcrypt.hash(user.password,salt);
    user.password = hash;
    next(); 
})

//Comparing password (Login ,method)
//Checking user enetred password is valid with the password(which is stored as hash in the database).

userSchema.methods.comparePassword = async function(password)
{
    return bcrypt.compare(password,this.password);
}


const User =mongoose.model("User",userSchema);

module.exports = User;