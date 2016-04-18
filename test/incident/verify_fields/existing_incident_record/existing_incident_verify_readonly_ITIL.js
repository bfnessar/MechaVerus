var SNWindow = require('../page_objects/sn_interface.page.js');
var IncidentRecordPage = require('../page_objects/incident_record.page.js');
var storage = require('../persistent_values.js');

var instance_url = storage.instance_url;
var open_incident_url = storage.stock_incidents.calledByITIL_open;
var closed_incident_url = storage.stock_incidents.calledByITIL_closed;
var username = storage.login_creds.username;
var password = storage.login_creds.password;

describe('verifies that certain fields in an incident record are read-only to the ITIL user', function(){
	this.timeout(0);

	it('sets up the page object, then logs in as admin', function(done){
		SNWindow.setInstanceUrl(instance_url).open();
		browser.login_as(username, password);
	});

	it('impersonates an ITIL user', function(done){
		SNWindow.impersonateUser('ITIL User');
	});

	it('navigates to an Open Incident record, then verifies that the expected fields are read-only', function(done){
		SNWindow.navToExistingRecord(open_incident_url);
		var read_only_fields_validated = IncidentRecordPage.verifyReadOnlyAs('ITIL user', 'open');
		expect(read_only_fields_validated).to.be.true;
	});

	it('navigates to a Closed Incident record, then verifies that the expected fields are read-only', function(done){
		SNWindow.navToExistingRecord(closed_incident_url);
		var read_only_fields_validated = IncidentRecordPage.verifyReadOnlyAs('ITIL user', 'closed');
		expect(read_only_fields_validated).to.be.true;
	});

});