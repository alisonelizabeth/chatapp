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
    
    // it ('should add a new message with timestamp to a div with the class "chat-window" when the send button is clicked', function(done) {
    //   var randomMessage = 'Message #'+ Math.floor(Math.random()*10000000)
    //   var m = moment(randomMessage.createdAt, "ddd MMM DD YYYY HH:mm:ss");
    //   $('.message-input').val(randomMessage)
    //   $('.submit').click();

    //   setTimeout(function(){
    //     expect($('.chat-window ul li').last().text()).to.equal((m.fromNow()) + ' ' + randomMessage)
    //     done();
    //   },2000)
    // }); // end it()

  }); // end of describe ()
})();
