var chai = require('chai');
var expect = chai.expect;
chai.Should();

var SNHomepage = require('../page_objects/sn_homepage.js');
var storage = require('../persistent_values.js');
var instance_url = storage.instance_url;
var username = storage.login_creds.username;
var password = storage.login_creds.password;

describe('Verifies the presence of all fields in incident.do as presented to an end user', function(){
	this.timeout(0);
	var snHomepage;
	var incFormPage;

	it('instantiates, then logs in as an admin', function(done){
		snHomepage = new SNHomepage(browser, instance_url);
		snHomepage.open();
		snHomepage.login_as(username, password);
	});
	it('impersonates an end user', function(done){
		snHomepage.impersonate_user('Joe Employee');
	});
	it('navigates to a new incident form, then verifies the fields', function(done){
		incFormPage = snHomepage.navToNewRecordForm('incident.do');
		var all_fields_present = incFormPage.verifyFieldsAsEndUser();
		expect(all_fields_present).to.be.true;
	});
});