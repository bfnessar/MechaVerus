var SNWindow = require('../page_objects/SNInterface.page.js');
var IncidentFormPage = require('../page_objects/IncidentForm.page.js');
var storage = require('../persistent_values.js');

var instance_url = storage.instance_url;
var username = storage.login_creds.username;
var password = storage.login_creds.password;

describe('verifies that certain fields in incident.do are read-only to an ITIL user', function(){
	this.timeout(0);

	it('sets up the page object, then logs in as admin', function(done){
		SNWindow.setInstanceUrl(instance_url).open();
		browser.login_as(username, password);
	});

	it('impersonates an ITIL user', function(done){
		SNWindow.impersonateUser('ITIL User');
	});

	it('navigates to a new incident form, then verifies the read-only status of its fields', function(done){
		SNWindow.navToNewRecordForm('incident');
		var read_only_fields_validated = IncidentFormPage.verifyReadOnlyAs('ITIL user');
		expect(read_only_fields_validated).to.be.true;
	});
});