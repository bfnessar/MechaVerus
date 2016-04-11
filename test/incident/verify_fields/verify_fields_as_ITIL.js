// Currently assumes that the user's Form Settings are NOT
// on Tabbed Forms


var chai = require('chai');
var expect = chai.expect;
chai.Should();

var SNHomepage = require('../page_objects/sn_homepage.js'); // PageObject that represents the SN home page
var storage = require('../persistent_values.js');
var instance_url = storage.instance_url;
var username = storage.login_creds.username;
var password = storage.login_creds.password;

describe('Verifies the presence of all fields in incident.do as presented to an ITIL user', function(){
	this.timeout(0);

	var snHomepage;
	var incFormPage;

	it('instantiates, then logs in as an admin', function(done){
		snHomepage = new SNHomepage(browser, instance_url);
		snHomepage.open();
		snHomepage.login_as(username, password);
	});

	it('impersonates an ITIL user', function(done){
		snHomepage.impersonate_user('ITIL User');
	});

	it('navigates to a new incident form and verifies all fields', function(done){
		incFormPage = snHomepage.navToNewRecordForm('incident.do');
		var all_fields_present = incFormPage.verifyFieldsAsITIL();
		expect(all_fields_present).to.be.true;
	});
});

