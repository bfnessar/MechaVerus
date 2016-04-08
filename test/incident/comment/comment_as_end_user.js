var chai = require('chai');
// var browser = require('../utility/utilities.js');
expect = chai.expect;
chai.Should();

describe('incident.do-- Comment on an incident as an end user', function(){
	this.timeout(0);

	it('logs in as an admin', function(done){
		browser.login_as('https://dev20728.service-now.com', 'madmin', 'madmin');
		var user_dropdown_visible = browser.isVisible('#user_info_dropdown');
		expect(user_dropdown_visible).to.be.true;
	});

	it('impersonates an end user', function(done){
		browser.impersonate_user('Joe Employee');
		var user_name = browser.getText('.user-name');
		expect(user_name).to.be.string('Joe Employee');
	});

	// Active Incident is INC0000003
	it('navigates to an Active Incident (that this user owns) and comments', function(done){
		var active_url = 'https://dev20728.service-now.com/nav_to.do?uri=incident.do?sys_id=e8caedcbc0a80164017df472f39eaed1%26sysparm_view=ess';
		browser.nav_to_incident(active_url);
		var result = browser.leave_comment_on_incident(); // Returns with the timestamp that it (supposedly) left as its comment
		browser.verify_last_comment(result["timestamp"]);
	});

	// Note that a user inherently cannot comment on a Closed or Resolved Incident
});

