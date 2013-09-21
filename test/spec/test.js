/*global describe, it */

'use strict';
(function () {
  describe('The chat app', function(){
    this.timeout(15000);
 
    it('should save a new message and that message should be returned from Parse', function(done){
      var result;
      var randomName = 'Name #'+ Math.floor(Math.random()*10000000)
      var randomMessage = 'Message #'+ Math.floor(Math.random()*10000000)
      $('.name-input').val(randomName);
      $('.submit-button').click();
      
      $('.message-input').val(randomMessage);
      $('.submit').click();
 
      setTimeout(function(){
 
        var query = new Parse.Query(MessageClass);
        query.equalTo('message', randomMessage);
        query.find({
          success: function(results) {
            result = results[0];
            expect(result.get('message')).to.equal(randomMessage);
            done();
          },
          error: function(results, error) {
            done(error.description);
          }
        });
 
      }, 2000)
    }); // end it()

      it ('should append the new message to the ul', function(done) {
          var randomName = 'Name #'+ Math.floor(Math.random()*10000000)
          var randomMessage = 'Message #'+ Math.floor(Math.random()*10000000)
    
          $('.name-input').val(randomName);
          $('.submit-button').click();
          
          $('.message-input').val(randomMessage);
          $('.submit').click();

          setTimeout(function(){
            expect ($('.chat-window ul li').last().text()).to.equal(randomName + ' a few seconds ago ' + randomMessage)
            done();
          }, 2000);
      });
      // end it()

      // working on this
      it ('should not send a message to parse if input is left blank', function(){
        $('.name-input').val('')
        $('.submit-button').click()
        expect($('.name-input')).to.throw(Error)

      })










   
  }); // end of describe ()
})();
