var SNWindow = require('../page_objects/sn_interface.page.js');
var IncidentFormPage = require('../page_objects/incident_form.page.js');
var storage = require('../persistent_values.js');

var instance_url = storage.instance_url;
var username = storage.login_creds.username;
var password = storage.login_creds.password;

describe('should show all fields for an end user in incident.do', function(){
	this.timeout(0);

	it('sets up the page object, then logs in as admin', function(done){
		SNWindow.setInstanceUrl(instance_url).open();
		browser.login_as(username, password);
	});

	it('impersonates an end user', function(done){
		SNWindow.impersonateUser('Joe Employee');
	});

	it('navigates to a New Incident form, then verifies the existence of its fields', function(done){
		SNWindow.navToNewRecordForm('incident');
		var fieldsArePresent = IncidentFormPage.verifyFieldsAsEndUser();
		expect(fieldsArePresent).to.be.true;
	});

});