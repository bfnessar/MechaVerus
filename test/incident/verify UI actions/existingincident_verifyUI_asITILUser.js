var SNWindow = require('../page_objects/SNInterface.page.js');
var IncidentRecordPage = require('../page_objects/IncidentRecord.page.js');
var storage = require('../persistent_values.js');

var instance_url = storage.instance_url;
var open_incident_url = storage.stock_incidents.calledByITIL_open;
var closed_incident_url = storage.stock_incidents.calledByITIL_closed;
var username = storage.login_creds.username;
var password = storage.login_creds.password;

describe('verifies that UI Actions are present for an ITIL user on existing incident records', function(){
	this.timeout(0);

	it('sets up the page object, then logs in as admin', function(done){
		SNWindow.setInstanceUrl(instance_url).open();
		browser.login_as(username, password);
	});

	it('impersonates an ITIL user', function(done){
		SNWindow.impersonateUser('ITIL User');
	});

	it('navigates to an Open Incident record, then verifies that the UI actions are present', function(done){
		SNWindow.navToExistingRecord(open_incident_url);
		var elementsToCheck = [
			'#connectFollow',	// Follow button
			'#sysverb_update',	// Update button
			'#resolve_incident',// Resolve button
		];
		elementsToCheck.forEach(function(entry){
			// console.log("Looking for " + entry);
			IncidentRecordPage.uiActionExists(entry).should.be.true;
		});
	});

	it('navigates to a Closed Incident record, then verifies that the UI actions are present', function(done){
		SNWindow.navToExistingRecord(closed_incident_url);
		var elementsToCheck = ['#connectFollow'];
		elementsToCheck.forEach(function(entry){
			// console.log("Looking for " + entry);
			IncidentRecordPage.uiActionExists(entry).should.be.true;
		});
	});
});