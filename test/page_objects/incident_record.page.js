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
	verifyUIActionsAs: {value: function(user_role, incident_state){
		if (user_role == "ITIL user" && incident_state == "open") {
			var ui_buttons = [
				// TOP of page
				'#connectFollow',
					'.dropdown-toggle', // Dropdown on 'Follow' button
					'li.connect-follow > a:nth-child(1)', // Follow->Follow
					'.connect-inframe > a:nth-child(1)', // Follow->OpenConnectMini
					'.dropdown-menu > li:nth-child(5) > a:nth-child(1)', // Follow->OpenConnectFull
				'button.form_action_button:nth-child(4)',
				'button.form_action_button:nth-child(5)',
				// BOTTOM of page
				'button.form_action_button:nth-child(1)',
				'button.form_action_button:nth-child(2)',
			];
		}
		else if (user_role == "ITIL user" && incident_state == "closed") {
			var ui_buttons = [
				'#connectFollow', // Follow (button)
					'.dropdown-toggle', // Follow (dropdown button)
					'li.connect-follow > a:nth-child(1)', // Follow->Follow
					'.connect-inframe > a:nth-child(1)', // Follow->OpenConnectMini
					'.dropdown-menu > li:nth-child(5) > a:nth-child(1)' // Follow->OpenConnectFull
			];
		}
		else if (user_role == "end user" && incident_state == "open") {
			var ui_buttons = [
				// TOP of page
				'#connectFollow', // Follow (button)
					'.dropdown-toggle', // Follow (dropdown button)
					'li.connect-follow > a:nth-child(1)', // Follow->Follow
					'.connect-inframe > a:nth-child(1)', // Follow->OpenConnectMini
					'.dropdown-menu > li:nth-child(5) > a:nth-child(1)', // Follow->OpenConnectFull
				'button.form_action_button:nth-child(4)', // Update
				'button.form_action_button:nth-child(5)', // ResolveIncident
				// BOTTOM of page
				'button.form_action_button:nth-child(1)', // Update
				'button.form_action_button:nth-child(2)', // ResolveIncident
			];
		}
		else if (user_role == "end user" && incident_state == "closed") {
			/* Unique: EU is already following this closed incident; is that the case for all EU-opened closed incidents?
				Not sure, but I'm just copy/pasting the selectors for now. Come back to this later if it is not scalable as is. */
			var ui_buttons = [
				'#connectUnfollow', // (Un)follow(ing) (button)
				'.dropdown-toggle', // Following (dropdown button)
				'li.connect-unfollow > a:nth-child(1)', // Following->Unfollow
				'.connect-inframe > a:nth-child(1)', // Following->OpenConnectMini
				'.dropdown-menu > li:nth-child(5) > a:nth-child(1)', // Following->OpenConnectFull
			];
		}
		else {
			console.log("I couldn't recognize " + user_role + " as a user role, and/or could not recognize " + incident_state + " as an incident state");
			return false;
		};

		var found = []; var not_found = [];
		ui_buttons.forEach(function(entry){
			if(!browser.isExisting(entry)){
				not_found.push(entry);
			}	else {
				found.push(entry);
			};
		});
		if (not_found.length > 0){
			console.log("Could not find the following UI Actions: " + not_found);
			return false;
		}	else {
			return true;
		};
	} },

	verifyFieldsExistAs: {value: function(user_role, incident_state){
		if (user_role == "ITIL user" && incident_state == "open") {
			;
		}
		else if (user_role == "ITIL user" && incident_state == "closed") {
			;
		}
		else if (user_role == "end user" && incident_state == "open") {
			;
		}
		else if (user_role == "end user" && incident_state == "closed") {
			;
		}
		else {
			console.log("I couldn't recognize " + user_role + " as a user role, and/or could not recognize " + incident_state + " as an incident state");
		};
	} },

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

	// Should account for user roles AND open/closed incidents (amounts to 4 cases)
	verifyReadOnlyAs: {value: function(user_role, incident_state) {
		// Figures out which set of fields to check for
		if (user_role == "end user" && incident_state == "open") {
			var fieldsRO = [
				'#sys_readonly\\.incident\\.number',
				'#sys_readonly\\.incident\\.opened_at',
				'#sys_readonly\\.incident\\.closed_at',
				'#sys_readonly\\.incident\\.state',
			];
		}
		else if (user_role == "end user" && incident_state == "closed") {
			var fieldsRO = [
				'#sys_readonly\\.incident\\.number',
				'#incident\\.caller_id_label',
				'#sys_readonly\\.incident\\.short_description',
				'#sys_readonly\\.incident\\.opened_at',
				'#sys_readonly\\.incident\\.closed_at',
				'#sys_readonly\\.incident\\.impact',
				'#sys_readonly\\.incident\\.state'
			];
		}
		else if (user_role == "ITIL user" && incident_state == "open") {
			var fieldsRO = [
				'#sys_readonly\\.incident\\.number',
				'#incident\\.priority',
				'#sys_readonly\\.incident\\.opened_at',
				'#incident\\.opened_by_label',
				'#incident\\.closed_by_label',
				'#sys_readonly\\.incident\\.closed_at'
			];
		}
		else if (user_role == "ITIL user" && incident_state == "closed") {
			var fieldsRO = [
				'#sys_readonly\\.incident\\.number',
				'#incident\\.caller_id_label',
				'#incident\\.location_label',
				'#sys_readonly\\.incident\\.category',
				'#sys_readonly\\.incident\\.subcategory',
				'#incident\\.cmdb_ci_label',
				'#sys_readonly\\.incident\\.impact',
				'#sys_readonly\\.incident\\.urgency',
				'#sys_readonly\\.incident\\.priority',
				'#sys_readonly\\.incident\\.short_description',
				'#sys_readonly\\.incident\\.opened_at',
				'#incident\\.opened_by_label',
				'#sys_readonly\\.incident\\.contact_type',
				'#sys_readonly\\.incident\\.state',
				'#incident\\.assignment_group_label',
				'#incident\\.assigned_to_label',
				'#incident\\.problem_id_label',
				'#incident\\.rfc_label',
				'#incident\\.caused_by_label',
				// '#label\\.ni\\.incident\\.knowledge',	// This read-only element doesn't conform to the rules. Maybe a general rule will emerge around whatever "ni" means, but I'll just ignore this issue for now.
				'#sys_readonly\\.incident\\.close_code',
				'#incident\\.close_notes',
				'#incident\\.closed_by_label',
				'#sys_readonly\\.incident\\.closed_at',
			];
		}
		else {
			console.log("I couldn't recognize " + user_role + " as a user role, and/or " + incident_state + " as an incident state.");
			return false;
		};

		// Make sure we've fully-loaded the incident record page
		// browser.waitForExist('#gsft_main');
		// browser.waitForEnabled('#gsft_main');
		// browser.frame('gsft_main');

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