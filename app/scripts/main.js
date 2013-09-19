Parse.initialize("6Uj7OjjpZsh1pwxjc6CJq8h2VC5Mzx0p7LlUNl6C", "B2aoeUOMbKXD9Nc6aCpveM4CWHgXrduugkuYcBuh");

var MessageClass = Parse.Object.extend('MessageClass');
var MessageClassCollection = Parse.Collection.extend({
	model: MessageClass
});

var messages = new MessageClassCollection();

$('document').ready(function() {
	fetchMessageCollection(messages)
	$('.submit').click(function(){
		// event.preventDefault();
		var message = new MessageClass();
		var messageVal = $('.message-input').val();
		message.set('message', messageVal);

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
	messages.fetch({
		success: function(collection) {
			collection.each(function(message){
				addToChatWindow(message);
		});
		},
		error: function(collection, error) {
			console.log(error.description);
		}
	});
};

// adds message to chat-window; probably should set up a template for this li
function addToChatWindow(message) {
	var m = moment(message.createdAt, "ddd MMM DD YYYY HH:mm:ss");
	var li = $('<li>' + '<span class="timestamp">' + m.fromNow() + '</span>' + " " + message.get('message') + '</li>')
	$('.chat').append(li)
	$('.message-input[type="text"]').val('');
};

