var chai = require('chai');
// var utils = require('../utility/utilities.js');
var fields = require('./incident_fields.js');
expect = chai.expect;
chai.Should();

describe('incident.do-- Verify fields as ITIL user', function(){
	this.timeout(0);
	it('logs in as an admin', function(done){
		browser.login_as(browser, 'https://dev20728.service-now.com', 'madmin', 'madmin');
		var user_dropdown_visible = browser.isVisible('#user_info_dropdown');
		expect(user_dropdown_visible).to.be.true;
	});

	it('impersonates an ITIL user', function(done){
		browser.impersonate_user(browser, 'ITIL User');
		var user_name = browser.getText('.user-name');
		expect(user_name).to.be.string('ITIL User');
	});

	it('(as ITIL User) navigates to Create Incident', function(done){
		browser.navigate_via_filter(browser, 'incident.do');
		// var current_url = browser.getUrl();
		// console.log('current url is: ' + current_url);
		// expect(current_url).to.have.string('incident.do');
	});

	it('(as ITIL User) verifies visibility of default fields', function(done){
		for (i=0; i<fields.defaults_ITIL.length; i++){
			// console.log('Checking if ' + fields.defaults_ITIL[i] + 'is visible');			
			var visible = browser.isVisible(fields.defaults_ITIL[i]);
			expect(visible).to.be.true;
		};
	});

	it('(as ITIL User) verifies visibility of Notes fields', function(done){
		for (i=0; i<fields.notes_ITIL.length; i++){
			// console.log('Checking if ' + fields.notes_ITIL[i] + 'is visible');			
			var visible = browser.isVisible(fields.notes_ITIL[i]);
			expect(visible).to.be.true;
		};
	});

	it('(as ITIL User) verifies visibility of Related Records fields', function(done){
		for (i=0; i<fields.rel_recs_ITIL.length; i++){
			// console.log('Checking if ' + fields.rel_recs_ITIL[i] + 'is visible');			
			var visible = browser.isVisible(fields.rel_recs_ITIL[i]);
			expect(visible).to.be.true;
		};
	});

	it('(as ITIL User) verifies visibility of Closure Information fields', function(done){
		for (i=0; i<fields.closure_info_ITIL.length; i++){
			// console.log('Checking if ' + fields.closure_info_ITIL[i] + 'is visible');			
			var visible = browser.isVisible(fields.closure_info_ITIL[i]);
			expect(visible).to.be.true;
		};
	});

});

