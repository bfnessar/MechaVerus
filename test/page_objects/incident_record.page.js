var snInterfacePage = require('./sn_interface.page');

/* PRECONDITION: The browser is currently on an existing record page */
var incidentRecordPage = Object.create(snInterfacePage, {
	internals: {
		last_comment: ""
	}, 

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
		this.internal.last_comment = comment_text; // Store the comment for verification later
		this.comment_submit_button.waitForExist(10000); // Make sure the submit button is there
		this.comment_submit_button.click(); // Submit the comment
		this.driver.pause(3000); // Wait a little more just to be safe
	} },

	verifyLastComment: { value: function() {
		browser.frame('gsft_main');
		this.last_comment_element.waitForExist(10000);
		var actual_last_comment = this.last_comment_element.getText();
		if (actual_last_comment == this.internals.last_comment){
			return true;
		}	else {
			return false;
		};
	} },

	verifyReadOnlyAs: {value: function(user_role) {
		switch (user_role){
			case 'end user':
				var fieldsRO = [
					'#sys_readonly\\.incident\\.number',
					'#sys_readonly\\.incident\\.opened_at',
					'#sys_readonly\\.incident\\.closed_at',
					'#sys_readonly\\.incident\\.state',
				];
				break;
			case 'ITIL user':
				var fieldsRO = [
					'#sys_readonly\\.incident\\.number',
					'#incident\\.priority',
					'#sys_readonly\\.incident\\.opened_at',
					'#incident\\.opened_by_label',
					'#incident\\.closed_by_label',
					'#sys_readonly\\.incident\\.closed_at'
				];
				break;
			default:
				console.log("I don't recognize " + user_role + " as a user role");
				return false;
		};
		browser.frameParent();
		// if (browser.waitForExist('gsft_main', 5000)){
		// 	browser.frame('gsft_main');
		// };

		var found = []; var not_found = [];
		var verified = []; var not_verified = [];
		fieldsRO.forEach(function(entry){
			if (!browser.isExisting(entry)){
				not_found.push(entry);
			}
			else {
				found.push(entry);
				var case1 = entry.includes("sys_readonly"); // The element has "sys_readonly" in its name
				var case2 = browser.getAttribute(entry, 'class') == 'form-control disabled'; // The element has an attribute called class, with a value of 'form-control disabled'
				var case3 = String(browser.getAttribute(entry, 'readonly')).match(/^(true|readonly)$/); // The element has an attribute called 'readonly' that is set to either 'true' or 'readonly'
				var case4a = browser.getAttribute(entry, 'class') == 'form-control'; // The element has an attribute called 'class', with a value of 'form-control'. Condition 4a must be joined with 4b.
				var case4b = String(browser.getAttribute(entry, 'disabled')).match(/^(true|disabled)$/); // The element has an attribute called 'disabled' that is set to either 'true' or 'disabled'
				if (case1 || case2 || case3 || (case4a && case4b) ){
					verified.push(entry);
				}	else {
					not_verified.push(entry);
				};
			};
		});
		if ((not_verified.length > 0) || (not_found.length > 0)) {
			console.log('The following elements either do not appear on the page, or are not verifiably read-only: ');
			console.log("\tNOT FOUND: " + not_found);
			console.log("\tNOT VERIFIED AS READ-ONLY: " + not_verified);
			return false;
		}	else {
			return true;
		};
	} }, 

});

module.exports = incidentRecordPage