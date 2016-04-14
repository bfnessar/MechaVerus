var snInterfacePage = require('./sn_interface.page');
var fields = require('../incident/incident_fields_css.js');

var incidentFormPage = Object.create(snInterfacePage, {
	verifyReadOnlyAsEndUser: {value: function() {
	// Verifies that the necessary fields are read-only (and, consequently, that they exist)
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

		// Sample code for retrieving attribute values
		var inc_num = '#sys_readonly\\.incident\\.number';
		var class_getAtt = browser.getAttribute(inc_num, "class");
		console.log("getAttribute(incident_num, 'class'): " + class_getAtt);
		var ronly_app = browser.getAttribute(inc_num, "readonly");
		console.log("getAtt(inc_num, 'readonly'): " + ronly_app);
		var fake_att = browser.getAttribute(inc_num, "lodge");
		console.log("getAtt(inc_num, 'lodge'): " + fake_att);
	 */
		browser.frame('gsft_main');
		var fieldsRO = [ 
			'#sys_readonly\\.incident\\.number',
			'#sys_readonly\\.incident\\.opened_at',
			'#sys_readonly\\.incident\\.closed_at',
			'#sys_readonly\\.incident\\.state',
		];
		// These are the fields that we expect to be read-only:
		var found = []; var not_found = [];
		var verified = []; var not_verified = [];
		fieldsRO.forEach(function(entry){
			// console.log('Checking if ' + entry + ' exists and is read-only');
			if (!browser.isExisting(entry)){
				// If we can't find it, then we can't verify anything and we should just quit now
				not_found.push(entry);
			}
			else { // The element does exist!
				if(	entry.includes("sys_readonly") // id contains "sys_readonly"
					|| true //
					|| true //
					|| true 
				  )	{ // 
					;
				}	else {
					;
				};
				found.push(entry);
			};
		});

		this.halt();

		// if (not_found.length > 0){
		// 	console.log('The following fields either exist, or do not have "#sys_readonly\\. prepended: ');
		// 	console.log(not_found);
		// 	return false;
		// }	else {
		// 	return true;
		// };
	} },

	// Verifies the EXISTENCE of these fields for ITIL
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

	// Verifies the EXISTENCE of these fields for an end user
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

});

module.exports = incidentFormPage

