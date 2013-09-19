Parse.initialize("6Uj7OjjpZsh1pwxjc6CJq8h2VC5Mzx0p7LlUNl6C", "B2aoeUOMbKXD9Nc6aCpveM4CWHgXrduugkuYcBuh");

var MessageClass = Parse.Object.extend('MessageClass');
var MessageClassCollection = Parse.Collection.extend({
	model: MessageClass
});

var messages = new MessageClassCollection();

$('document').ready(function() {
	$('.submit').click(function(event){
		event.preventDefault();
		var message = new MessageClass();
		var messageVal = $('.message-input').val();
		message.set('message', messageVal);

		message.save(null, {
			success: function(results) {
				console.log(results)
			},
			error: function(results, error){
				console.log(error.description)
			}
		});
	});


}); // end of document ready 









