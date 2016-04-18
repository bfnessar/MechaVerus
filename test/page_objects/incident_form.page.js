var snInterfacePage = require('./sn_interface.page');
var fields = require('../incident/incident_fields_css.js');

var incidentFormPage = Object.create(snInterfacePage, {

	// Verifies the EXISTENCE of form fields for ITIL
	verifyFieldsAsITIL: { value: function() {
		browser.frame('gsft_main');
		var found = [];
		var not_found = [];
		// Verify the default fields
		var defaults = fields.defaults_ITIL;
		defaults.forEach(function(entry){
			// console.log('Checking if ' + entry + ' exists');			
			if (!browser.isExisting(entry)){
				not_found.push(entry);
			}	else {
				found.push(entry);
			};
		});
		// Verify the Notes fields
		var notes = fields.notes_ITIL;
		notes.forEach(function(entry){
			// console.log('Checking if ' + entry + 'exists');
			if(!browser.isExisting(entry)){
				not_found.push(entry);
			}	else {
				found.push(entry);
			};
		});
		// Verify the Related Records fields
		var rel_recs = fields.rel_recs_ITIL;
		rel_recs.forEach(function(entry){
			// console.log('Checking if ' + entry + ' exists');
			if(!browser.isExisting(entry)){
				not_found.push(entry);
			}	else {
				found.push(entry);
			};
		});
		// Verify the Closure Information fields
		var closure_info = fields.closure_info_ITIL;
		closure_info.forEach(function(entry){
			// console.log('Checking if ' + entry + ' exists');
			if(!browser.isExisting(entry)){
				not_found.push(entry);
			}	else {
				found.push(entry);
			};
		});

		if (not_found.length > 0){
			console.log("Couldn't find the following fields: " + not_found);
			return false;
		}
		else {
			// console.log("Found the following!: " + found);
			return true;
		};
	} },

	// Verifies the EXISTENCE of form fields for an end user
	verifyFieldsAsEndUser: { value: function() {
		browser.frame('gsft_main');
		var found = [];
		var not_found = [];

		var arr = fields.defaults_end_user;
		arr.forEach(function(entry){
			if (!browser.isExisting(entry)){
				not_found.push(entry);
			}	else {
				found.push(entry);
			};
		});
		if (not_found.length > 0){
			console.log("Couldn't find the following fields: " + not_found);
			return false;
		} else {
			return true;
		};
	} },

	verifyReadOnlyAs: {value: function(user_role) {
		// Verifies that the necessary fields are read-only (and, consequently, that they exist)
		/*  Depending on the user role, we verify a different set of fields.
			That said, the verification process is exacrly the same either way.
			The corresponding function in IncidentRecordPage requires the parameter 'incident_state',
				which will be either 'open' or 'closed', but in this case a new incident can only be open,
				so we don't have to make that distinction.
		 */
		switch (user_role) {
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
		browser.frame('gsft_main');
		var found = []; var not_found = [];
		var verified = []; var not_verified = [];
		fieldsRO.forEach(function(entry){
		/* 	There are four DOM-based ways to check if an element is read-only:
				1) The value of its 'id' attribute begins with "sys_readonly"
				2) The value of its 'class' attribute is "form-control disabled", e.g. class="form-control disabled"
				3) It has an attribute called 'readonly' that is either set to 'true' or to 'readonly'
				4) Its class attribute is "form-control" AND it has an attribute called 'disabled' which is set to true.
			We iterate over the list of elements and make sure each one satisfies at least one of the checks.
			We do this by calling browser.getAttribute(selector, attribute).
				The function either returns
					* The value of the attribute, if it exists
					* 'null', if the attribute doesn't exist
		 */
			// console.log('Checking if ' + entry + ' exists and is read-only');
			if (!browser.isExisting(entry)){				
				// If we can't find the element, there's no point in trying to verify it.
				not_found.push(entry);
			}
			else {
				// We found the element! Let's verify that it is read-only.
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

module.exports = incidentFormPage

