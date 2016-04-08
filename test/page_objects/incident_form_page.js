/*
	CAN BE CALLED BY:
		* sn_homepage
	CAN CALL:
		* sn_homepage

	ATTRIBUTES:
		OWNED:
		INHERITED FROM PAGE:
			* driver
			* url
	METHODS:
		OWNED:
			* check_username()
			* verifyFieldsAsITIL()
		INHERITED FROM PAGE:
			* waitFor(locator, timeout)
			* halt()

*/
// Requirements/ Imports
var page = require('./page');
var sn_homepage = require('./sn_homepage');
var fields = require('../incident/incident_fields_css.js');

// Object definition and construction
function IncidentFormPage (webdriver, instance_url){
	page.call(this, webdriver, instance_url);
};
IncidentFormPage.prototype = Object.create(page.prototype);
IncidentFormPage.prototype.constructor = IncidentFormPage;

// Methods
IncidentFormPage.prototype.check_username = function(){
	this.driver.frameParent();
	return this.driver.getText('.user-name');
};
IncidentFormPage.prototype.verifyFieldsAsEndUser = function(){
	this.driver.frame('gsft_main');
	var found = [];
	var not_found = [];
	// Verify the fields in one swoop
	for (i=0; i<fields.defaults_end_user.length; i++){
		if (!this.driver.isExisting(fields.defaults_end_user[i])){
			not_found.push(fields.defaults_end_user);
		}	else{
			found.push(fields.defaults_end_user[i]);
		};
	};
	if (not_found.length > 0){ // FAILURE
		console.log("Couldn't find the following fields: " + not_found);
		return false;
	} else { // SUCCESS
		// console.log("Found the following!: " + found);
		return true;
	};	
};
IncidentFormPage.prototype.verifyFieldsAsITIL = function(){
	this.driver.frame('gsft_main');
	var found = [];
	var not_found = [];
	// Verify the default fields
	for (i=0; i<fields.defaults_ITIL.length; i++){
		// console.log('Checking if ' + fields.defaults_ITIL[i] + 'is visible');			
		if (!this.driver.isExisting(fields.defaults_ITIL[i])){
			not_found.push(fields.defaults_ITIL[i]);
		}	else{
			found.push(fields.defaults_ITIL[i]);
		};
	};
	// Verify the Notes fields
	for (i=0; i<fields.notes_ITIL.length; i++){
		// console.log('Checking if ' + fields.notes_ITIL[i] + 'is visible');			
		if (!this.driver.isVisible(fields.notes_ITIL[i])){
			not_found.push(fields.notes_ITIL[i]);
		}	else{
			found.push(fields.notes_ITIL[i]);
		};
	};
	// Verify the Related Records fields
	for (i=0; i<fields.rel_recs_ITIL.length; i++){
		// console.log('Checking if ' + fields.rel_recs_ITIL[i] + 'is visible');			
		if (!this.driver.isVisible(fields.rel_recs_ITIL[i])){
			not_found.push(fields.rel_recs_ITIL[i]);
		}	else{
			found.push(fields.rel_recs_ITIL[i]);
		};
	};
	// Verify the Closure Information fields
	for (i=0; i<fields.closure_info_ITIL.length; i++){
		// console.log('Checking if ' + fields.closure_info_ITIL[i] + 'is visible');			
		if (!this.driver.isVisible(fields.closure_info_ITIL[i])){
			not_found.push(fields.closure_info_ITIL[i]);
		}	else{
			found.push(fields.closure_info_ITIL[i]);
		};
	};
	if (not_found.length > 0){
		console.log("Couldn't find the following fields: " + not_found);
		return false;
	}
	else {
		// console.log("Found the following!: " + found);
		return true;
	};
};

module.exports = IncidentFormPage;