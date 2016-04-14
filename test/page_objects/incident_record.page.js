var snInterfacePage = require('./sn_interface.page');

/* PRECONDITION: The browser is currently on an existing record page */
var incidentRecordPage = Object.create(snInterfacePage, {
	// Internal variables
	var last_comment;

	// Getters for page elements
	comment_textarea: {get: function() { return browser.element('#activity-stream-textarea');} },
	comment_submit_button: {get: function() { return browser.element('.activity-submit'); } },
	last_comment_element: {get: function() {return browser.element('li.sn-activity:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > ul:nth-child(1) > li:nth-child(1) > div:nth-child(1) > div:nth-child(1)'); } },

	// Override/Create methods
	leaveComment: {value: function() {
		browser.frame('gsft_main');
		var now = new Date();
		var comment_text = 'Comment testing, logged at: <' + now.toString() + '>';
		this.driver.pause(7000); // We usually have to give this page a lot of time to load
		this.comment_textarea.setValue(comment_text); // Type the comment to the text box
		this.last_comment = comment_text; // Store the comment for verification later
		this.comment_submit_button.waitForExist(10000); // Make sure the submit button is there
		this.comment_submit_button.click(); // Submit the comment
		this.driver.pause(3000); // Wait a little more just to be safe
	} },

	verifyLastComment: { value: function() {
		browser.frame('gsft_main');
		this.last_comment_element.waitForExist(10000);
		var actual_last_comment = this.last_comment_element.getText();
		if (actual_last_comment == this.last_comment){
			return true;
		}	else {
			return false;
		};
	} },
});

module.exports = incidentRecordPage