var SNWindow = require('../page_objects/sn_interface.page.js');
var IncidentFormPage = require('../page_objects/incident_form.page.js');

var storage = require('../persistent_values.js');
// Likewise, move these guys.
var instance_url = storage.instance_url;
var username = storage.login_creds.username;
var password = storage.login_creds.password;

describe('should show all fields for an ITIL user in incident.do', function(){
	this.timeout(0);

	it('sets up the page object, then logs in as admin', function(done){
		SNWindow.setInstanceUrl(instance_url).open();
		browser.login_as(username, password);
	});

	it('impersonates an ITIL user', function(done){
		SNWindow.impersonateUser('ITIL User');
	});

	it('navigates to a New Incident form, then verifies its fields', function(done){
		SNWindow.navToNewRecordForm('incident'); // Remove ".do" from this end of the implementation
		var defaultFieldsPresent = IncidentFormPage.verifyFieldsAsITIL();
		expect(defaultFieldsPresent).to.be.true;
	});

});
