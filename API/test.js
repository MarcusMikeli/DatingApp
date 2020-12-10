"use strict";
// NPM install mongoose and chai. Make sure mocha is globally
// installed
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const chai = require('chai');
const expect = chai.expect;
// Create a new schema that accepts a 'name' object.
// 'name' is a required field
const userSign = new Schema({
  firstName: { type: String, required: true }
});

//Create a new collection called 'Name'
const FirstName = mongoose.model('firstName lastName gender birthday email password', userSign);
describe('Database Test', function() {
  //Before starting the test, create a sandboxed database connection
  //Once a connection is established invoke done()
  before(function (done) {
    mongoose.connect('mongodb+srv://MarcusMikeli:Rosenhuset31@datingapp.7q6br.mongodb.net/MarcusMikeli?retryWrites=true&w=majority');

    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error'));
    db.once('open', function() {
      console.log('We are connected to test database!');
      done();
    });
  });

  describe('Test Database', function() {
    //Save object with 'name' value of 'Mike"
    it('New name saved to test database', function(done) {
      var testfirstName = FirstName({
        firstName: 'Marcus'
      });
 
      testfirstName.save(done);
    });
    it('Dont save incorrect format to database', function(done) {
      //Attempt to save with wrong info. An error should trigger
      var wrongSave = FirstName({
        notName: 'Not Marcus'
      });
      wrongSave.save(err => {
        if(err) { return done(); }
        throw new Error('Should generate error!');
      });
    });
    
    it('Should retrieve data from test database', function(done) {
      //Look up the 'Mike' object previously saved.
      FirstName.find({firstName: 'Marcus'}, (err, name) => {
        if(err) 
        {throw err;}
        if(name.length === 0) {throw new Error ('Ingen Marcus');}
        done();
      });
    });
  });

  it('Should delete one', function(done) {
    //Look up the 'Mike' object previously saved.
    FirstName.deleteOne({firstName: 'Marcus'}, (err, firstName) => {
      if(err) 
      {throw err;}
      if(firstName.length === 0) {return ('User has been deleted');}
      done();
    });
  });
});

  //After all tests are finished drop database and close connection
  after(function(done){
    mongoose.connection.db.dropDatabase(function(){
      mongoose.connection.close(done);
    });
  });
