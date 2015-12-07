// app/models/user.js
// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var userSchema = mongoose.Schema({

    local            : {
        email        : String,
        password     : String,
    },
    dayss:{
        mon:{
            start:{ type: String, default: '10' } ,
            endd:{ type: String, default: '18' }
        },
        tue:{
            start:{ type: String, default: '10' } ,
            endd:{ type: String, default: '18' }
        },
        wed:{
            start:{ type: String, default: '10' } ,
            endd:{ type: String, default: '18' }
        },
        thurs:{
            start:{ type: String, default: '10' } ,
            endd:{ type: String, default: '18' }
        },
        fri:{
            start:{ type: String, default: '10' } ,
            endd:{ type: String, default: '18' }
        },
        sat:{
            start:{ type: String, default: '10' } ,
            endd:{ type: String, default: '18' }
        },
        sun:{
            start:{ type: String, default: '10' } ,
            endd:{ type: String, default: '18' }
        }
    }
});

// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};


// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);
