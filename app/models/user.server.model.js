const mongoose = require('mongoose'); 
const Schema = mongoose.Schema; 

const UserSchema = new Schema({
   firstName: String, 
   lastName: String,
   email: {
      type: String,
      index: true,
      match: /.+\@.+\..+/
   },
   username: {
      type: String,
      trim: true,
      unique: true,
      required: true
   },
   password: {
      validate: true
   },
   created: {
      type: Date,
      default: Date.now
   },
   website: {
      type: String,
      set: function(url) {
        if (!url) {
          return url;
        } else {
          if (url.indexOf('http://') !== 0   &&           url.indexOf('https://') !== 0) {
            url = 'http://' + url;
          }
  
          return url;
          }
      },
      get: function(url) {
         if (!url) {
           return url;
         } else {
           if (url.indexOf('http://') !== 0 &&           url.indexOf('https://') !== 0) {
               url = 'http://' + url;
             }
   
           return url;
        }
      }
   },
   role: {
      type: String,
      enum: ['Admin', 'Owner', 'User']
   }
});



UserSchema.virtual('fullName').get(function() {
   return this.firstName + ' ' + this.lastName;
 }).set(function(fullName) {
   const splitName = fullName.split(' '); 
   this.firstName = splitName[0] || ''; 
   this.lastName = splitName[1] || ''; 
 });

 UserSchema.statics.findOneByUsername = function(username, callback) {
   this.findOne({ username: new RegExp(username, 'i') }, 
 callback);
};

 UserSchema.pre('save', function(next){
   if (err) {
     next()
   } else {
     next(new Error('An Error Occurred'));
   }
 });

 UserSchema.post('save', function(next){
   console.log('The user "' + this.username +  '" details were saved.');
});
UserSchema.pre('save', function(next){
   if (err) {
     next()
   } else {
     next(new Error('An Error Occurred'));
   }
 });

 UserSchema.post('save', function(next){
   console.log('The user "' + this.username +  '" details were saved.');
});

mongoose.model('User', UserSchema);