var chai = require('chai');
expect = chai.expect;
chai.Should();
var SNHomepage = require('../page_objects/sn_homepage.js');

var instance_url = 'https://dev20728.service-now.com/';
var username = 'madmin'; var password = 'madmin';

describe('incident.do-- Comment on an incident as an end user', function(){
	this.timeout(0);

	var snHomepage;
	var incRecordPage;

	it('instantiates, then logs in as an admin', function(done){
		snHomepage = new SNHomepage(browser, instance_url);
		snHomepage.open();
		snHomepage.login_as(username, password);
	});
	it('impersonates an end user', function(done){
		snHomepage.impersonate_user('Joe Employee');
	});
	it('navigates to an active incident record that is owned by this user', function(done){
		var active_url = 'https://dev20728.service-now.com/nav_to.do?uri=incident.do?sys_id=e8caedcbc0a80164017df472f39eaed1%26sysparm_view=ess';
		incRecordPage = snHomepage.navToExistingRecordForm(active_url);
		incRecordPage.leave_comment();
		// incRecordPage.halt();
		expect(incRecordPage.verify_last_comment()).to.be.true;
		incRecordPage.halt();
	});

});