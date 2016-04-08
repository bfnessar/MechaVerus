var chai = require('chai');
// var utils = require('../utility/utilities.js');
var fields = require('../incident/incident_fields.js');
expect = chai.expect;
chai.Should();

describe('incident.do-- Verify fields as an unpriveleged end user', function(){
	this.timeout(0);
	it('logs in as an admin', function(done){
		browser.login_as('https://dev20728.service-now.com', 'madmin', 'madmin');
		var user_dropdown_visible = browser.isVisible('#user_info_dropdown');
		expect(user_dropdown_visible).to.be.true;
	});

	it('impersonates an end user', function(done){
		browser.impersonate_user('Johnny Five');
		var user_name = browser.getText('.user-name');
		expect(user_name).to.be.string('Johnny Five');
	});

	it('(as end user) navigates to Create Incident', function(done){
		browser.navigate_via_filter('incident.do');
		// browser.waitUntil(browser.getUrl().includes('incident.do'), 10000);
		// var current_url = browser.getUrl();
		// expect(current_url).to.have.string('incident.do');
	});

	it('(as end user) verifies the default fields', function(done){
		for (i=0; i<fields.defaults_unpriveleged.length; i++){
			// console.log('Checking if ' + fields.defaults_unpriveleged[i] + 'is visible');			
			var visible = browser.isVisible(fields.defaults_unpriveleged[i]);
			expect(visible).to.be.true;
		};
	});

});