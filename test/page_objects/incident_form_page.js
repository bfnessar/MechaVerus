/*
	CAN BE CALLED BY:
	CAN CALL:

	ATTRIBUTES:
		OWNED:
		INHERITED FROM PAGE:
	METHODS:
		OWNED:
		INHERITED FROM PAGE:

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
IncidentFormPage.prototype.verifyFieldsAsITIL = function(){
	this.driver.frame('gsft_main');
	// this.driver.isVisible('#sys_readonly\.incident\.number');
	// Verify the default fields

	var found = [];
	var not_found = [];

	console.log('========================================');
	console.log(this.driver.source());
	console.log('========================================');

	for (i=0; i<fields.defaults_ITIL.length; i++){
		console.log('Checking if ' + fields.defaults_ITIL[i] + 'is visible');			
		if (!this.driver.isExisting(fields.defaults_ITIL[i])){
			not_found.push(fields.defaults_ITIL[i]);
		}	else{
			found.push(fields.defaults_ITIL[i]);
		};
	};

	// Verify the Notes fields
	for (i=0; i<fields.notes_ITIL.length; i++){
		console.log('Checking if ' + fields.notes_ITIL[i] + 'is visible');			
		if (!this.driver.isVisible(fields.notes_ITIL[i])){
			not_found.push(fields.notes_ITIL[i]);
		}	else{
			found.push(fields.notes_ITIL[i]);
		};
	};
	// Verify the Related Records fields
	for (i=0; i<fields.rel_recs_ITIL.length; i++){
		console.log('Checking if ' + fields.rel_recs_ITIL[i] + 'is visible');			
		if (!this.driver.isVisible(fields.rel_recs_ITIL[i])){
			not_found.push(fields.rel_recs_ITIL[i]);
		}	else{
			found.push(fields.rel_recs_ITIL[i]);
		};
	};
	// Verify the Closure Information fields
	for (i=0; i<fields.closure_info_ITIL.length; i++){
		console.log('Checking if ' + fields.closure_info_ITIL[i] + 'is visible');			
		if (!this.driver.isVisible(fields.closure_info_ITIL[i])){
			not_found.push(fields.closure_info_ITIL[i]);
		}	else{
			found.push(fields.closure_info_ITIL[i]);
		};
	};

	console.log('FOUND: ' + found);
	console.log('NOT FOUND: ' + not_found);

	return true;
};

module.exports = IncidentFormPage;