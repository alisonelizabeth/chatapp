Parse.initialize("6Uj7OjjpZsh1pwxjc6CJq8h2VC5Mzx0p7LlUNl6C", "B2aoeUOMbKXD9Nc6aCpveM4CWHgXrduugkuYcBuh");

var MessageClass = Parse.Object.extend('MessageClass');
var MessageClassCollection = Parse.Collection.extend({
	model: MessageClass
});

var messages = new MessageClassCollection();

$('document').ready(function() {
	$('.modal').modal('show');

	$('.submit-button').click(function(){
		if (validateForm($('.name-input'))) {
			username = $('.name-input').val();
			$('button.close').click();	
		}	
	});

	fetchMessageCollection(messages);

	$('.submit').click(function(event){
		event.preventDefault();
		if (validateForm($('.message-input')))
		var message = new MessageClass();
		var messageVal = $('.message-input').val();

		message.set('message', messageVal);
		message.set('username', username);

		message.save(null, {
			success: function(results) {
				console.log(results)
				addToChatWindow(results);
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
	var previousLength = 0
	messages.fetch({
		success: function(collection) {
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
	var m = moment(message.createdAt, "ddd MMM DD YYYY HH:mm:ss");
	var li = $('<li>' + '<span class="username">' + message.get('username') + '</span>' + ' ' + '<span class="timestamp">' + m.fromNow() + '</span>' + " " + message.get('message') + '</li>')
	$('.chat').append(li);
	$('.chat-window').scrollTop($('.chat-window')[0].scrollHeight);
	$('.message-input[type="text"]').val('');
};

function inputUserName(userName) {
	var name = $('.name-input').val();
	$('.submit-button').click(function(){
		$('.modal-dialog').close();
	});
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
