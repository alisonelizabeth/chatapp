Parse.initialize("6Uj7OjjpZsh1pwxjc6CJq8h2VC5Mzx0p7LlUNl6C", "B2aoeUOMbKXD9Nc6aCpveM4CWHgXrduugkuYcBuh");

var MessageClass = Parse.Object.extend('MessageClass');
var MessageClassCollection = Parse.Collection.extend({
        model: MessageClass
});

var messages = new MessageClassCollection();

        $('.chat-wrapper').hide();
$('document').ready(function() {

        $('.modal').modal('show');

        $('.modal-dialog').animate({ "left": "+=1033px" }, 3000)



        $('.submit-button').click(function(){
                if (validateForm($('.name-input'))) {
                        inputUserName();
                        $('.submit-button').attr('data-dismiss', 'modal')
                        $('.chat-wrapper').slideDown(3000);
                }
        });



        fetchMessageCollection(messages);

        $('.submit').click(function(event){
                event.preventDefault();
                if (validateForm($('.message-input')))
                var message = new MessageClass();
                var messageVal = $('.message-input').val();

                message.set('message', messageVal);
                message.set('username', inputUserName());
                message.set('color', randomColor);

                message.save(null, {
                        success: function(results) {
                                console.log(results)
                                addToChatWindow(results);
                                $('.message-input[type="text"]').val('');

                        },
                        error: function(results, error){
                                console.log(error.description)
                        }
                });
        });
}); // end of document ready

// Functions
// fetches MessageCollection
function fetchMessageCollection(messages) {
        setInterval(function() {
        messages.fetch({
                success: function(collection) {
                        $('.chat-window .chat').html('');
                        collection.each(function(message){
                                addToChatWindow(message);
                                $('.chat-window').scrollTop($('.chat-window')[0].scrollHeight);
                });
                },
                error: function(collection, error) {
                        console.log(error.description);
                }
        });
}, 3000)
};

// adds message to chat-window; probably should set up a template for this li
function addToChatWindow(message) {
        m = moment(message.createdAt, "ddd MMM DD YYYY HH:mm:ss");
        var chatTemplate = _.template( $('#chat-template').text())
        var renderedTemplate = chatTemplate( {message: message} )
        $('.chat').append(renderedTemplate);
        $('.chat-window').scrollTop($('.chat-window')[0].scrollHeight);
};

function inputUserName() {
        var username = $('.name-input').val();
        return username;
};

function validateForm(input) {
        var valid = true
        input.removeClass('warning')
        $('.error').text('')

        if (input.val() === '') {
                input.addClass('warning');
                valid = false
        }
        return valid
};

var color = Math.floor(Math.random()*16777215).toString(16);
randomColor = '#' + color;