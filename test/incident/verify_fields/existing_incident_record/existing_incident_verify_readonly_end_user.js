var SNWindow = require('../page_objects/sn_interface.page.js');
var IncidentRecordPage = require('../page_objects/incident_record.page.js');
var storage = require('../persistent_values.js');

var instance_url = storage.instance_url;
var open_incident_url = storage.stock_incidents.calledByEU_open;
var closed_incident_url = storage.stock_incidents.calledByEU_closed;
var username = storage.login_creds.username;
var password = storage.login_creds.password;

describe('verifies that certain fields in incident.do are read-only to the end user', function(){
	this.timeout(0);

	it('sets up the page object, then logs in as admin', function(done){
		SNWindow.setInstanceUrl(instance_url).open();
		browser.login_as(username, password);
	});

	it('impersonates an end user', function(done){
		SNWindow.impersonateUser('Joe Employee');
	});

	it('navigates to an open Incident record, then verifies that the expected fields are read-only', function(done){
		SNWindow.navToExistingRecord(open_incident_url);
		var read_only_fields_validated = IncidentRecordPage.verifyReadOnlyAs('end user', 'open');
		expect(read_only_fields_validated).to.be.true;
	});

	it('navigates to a closed Incident record, then verifies that the expected fields are read-only', function(done){
		SNWindow.navToExistingRecord(closed_incident_url);
		var read_only_fields_validated = IncidentRecordPage.verifyReadOnlyAs('end user', 'closed');
		expect(read_only_fields_validated).to.be.true;
	});


});