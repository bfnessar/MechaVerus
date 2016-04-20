var SNWindow = require('/page_objects/SNInterface.page.js');
var IncidentRecordPage = require('/page_objects/IncidentRecord.page.js');
var storage = require('/persistent_values.js');

var instance_url = storage.instance_url;
var open_incident_url = storage.stock_incidents.calledByEU_open;
var closed_incident_url = storage.stock_incidents.calledByEU_closed;
var username = storage.login_creds.username;
var password = storage.login_creds.password;

describe('verifies that UI Actions are present for an ITIL user on existing incident records', function(){
	this.timeout(0);

	it('sets up the page object, then logs in as admin', function(done){
		SNWindow.setInstanceUrl(instance_url).open();
		browser.login_as(username, password);
	});

	it('impersonates an ITIL user', function(done){
		SNWindow.impersonateUser('Joe Employee');
	});

	it('navigates to an Open Incident record, then verifies that the UI actions are present', function(done){
		SNWindow.navToExistingRecord(open_incident_url);
		// var ui_actions_verified = IncidentRecordPage.verifyUIActionsAs('end user', 'open');
		// ui_actions_verified.should.be.true;
		IncidentRecordPage.uiActionExists('follow').should.be.true;
		IncidentRecordPage.uiActionExists('UpDaTe').should.be.true;
		IncidentRecordPage.uiActionExists('RESOLVE').should.be.true;
		IncidentRecordPage.uiActionExists('lOdge').should.be.false;
	});

	it('navigates to a Closed Incident record, then verifies that the UI actions are present', function(done){
		SNWindow.navToExistingRecord(closed_incident_url);
		// var ui_actions_verified = IncidentRecordPage.verifyUIActionsAs('end user', 'closed');
		// ui_actions_verified.should.be.true;
		IncidentRecordPage.uiActionExists('follow').should.be.true;
		IncidentRecordPage.uiActionExists('UpDaTe').should.be.true;
		IncidentRecordPage.uiActionExists('RESOLVE').should.be.true;
		IncidentRecordPage.uiActionExists('lOdge').should.be.false;
	});
});