var chai = require('chai');
// var utils = require('../utility/utilities.js');
// var fields = require('./incident_fields.js');
expect = chai.expect;
chai.Should();

describe('incident.do-- Comment on an incident as ITIL', function(){
	this.timeout(0);

	it('logs in as admin', function(done){
		browser.login_as('https://dev20728.service-now.com', 'madmin', 'madmin');
		var user_dropdown_visible = browser.isVisible('#user_info_dropdown');
		expect(user_dropdown_visible).to.be.true;
	});

	it('impersonates an ITIL user', function(done){
		browser.impersonate_user('ITIL User');
		var user_name = browser.getText('.user-name');
		expect(user_name).to.be.string('ITIL User'); // Verify that the new user-name is "ITIL User"
	});

	// Active Incident is INC0000016
	it('navigates to an Active Incident and comments', function(done){
		var active_url = 'https://dev20728.service-now.com/nav_to.do?url=incident.do?sys_id=46e3e949a9fe19810069b824ba2c761a';
		browser.nav_to_incident(active_url);
		var result = browser.leave_comment_on_incident(); // Returns with the timestamp that it (supposedly) left as its comment
		browser.verify_last_comment(result["timestamp"]);
	});

	// Resolved Incident is INC0000041
	it('navigates to a Resolved Incident and comments', function(done){
		var resolved_url = 'https://dev20728.service-now.com/nav_to.do?uri=incident.do?sys_id=471eb058a9fe198100f89592e1ea93d3';
		browser.nav_to_incident(resolved_url);
		var result = browser.leave_comment_on_incident(); // Returns with the timestamp that it (supposedly) left as its comment
		browser.verify_last_comment(result["timestamp"]);
	});

});
