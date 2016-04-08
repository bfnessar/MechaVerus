var chai = require('chai');
var utils = require('../../utility/utilities.js');
expect = chai.expect;
chai.Should();

describe('incident.do-- Verify UI actions as ITIL for a new incident form', function(){
	this.timeout(0);
	it('logs in as admin', function(done){
		utils.login_as(browser, 'https://dev20728.service-now.com', 'madmin', 'madmin');
		var user_dropdown_visible = browser.isVisible('#user_info_dropdown');
		expect(user_dropdown_visible).to.be.true;
	});

	it('impersonates an ITIL user', function(done){
		utils.impersonate_user(browser, 'ITIL User');
		var user_name = browser.getText('.user-name');
		expect(user_name).to.be.string('ITIL User');
	});

	it('navigates to a new incident', function(done){
		utils.navigate_via_filter(browser, 'incident.do');
		var current_url = browser.getUrl();
		browser.pause(3000);
		// expect(current_url).to.have.string('incident.do');
	});

	it('verifies that the bottom-banner buttons exist', function(done){
		var bottom_banner_buttons = [
			'#sysverb_insert',
			'#resolve_incident' 
		];
		for (i=0; i < bottom_banner_buttons.length; i++){
			// console.log('Checking if ' + bottom_banner_buttons[i] + ' is visible');
			var exists = browser.isExisting(bottom_banner_buttons[i]);
			expect(exists).to.be.true;
		};
	});

	// How to access the top-banner buttons?
		// I guess I'll need to extract the source/HTML to find those buttons
	it('verifies that the top-banner buttons exist', function(done){
		browser.debug();
		var top_banner_buttons = [
			''
		];



	});


});