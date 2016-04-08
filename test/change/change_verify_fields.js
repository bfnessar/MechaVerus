var chai = require('chai');
expect = chai.expect;
chai.Should();

describe('ServiceNow Change Requests-- Verify fields', function(){
	it('logs in as an admin', function(done){
		this.timeout(0);
		// Log in as an admin
		browser.url('https://dev20728.service-now.com');
		browser.frame('gsft_main');
		browser.setValue('#user_name', 'madmin');
		browser.setValue('#user_password', 'madmin');
		browser.click('#sysverb_login');
		// RELEVANT SHOULD
	});

	it('(as admin) impersonates in ITIL user', function(done){
		this.timeout(0);
		browser.frameParent();
        browser.click('#user_info_dropdown'); // Click the user dropdown
        browser.click('.dropdown-menu > li:nth-child(2) > a:nth-child(1)'); // Click on Impersonate User
        browser.waitForExist('#s2id_autogen3', 5000); // Wait for menu to appear
        browser.click('#s2id_autogen3'); // Click on the text field
        browser.waitForExist('#s2id_autogen4_search', 5000); // Supposed to wait for options to populate
        browser.setValue('#s2id_autogen4_search','ITIL User'); // Enter ITIL User text
        browser.pause(5000);
        browser.keys(['Enter']); // Submit
        browser.pause(3000);
        // RELEVANT SHOULD
	});

	it('(as ITIL) navigates to Create Change Request', function(done){
		this.timeout(0);
		browser.frameParent();
		browser.waitForExist('#filter');
		browser.setValue('#filter', 'change_request.do');
		browser.pause(1000);
		browser.keys(['Enter']);
		browser.pause(1000);
		browser.frame('gsft_main');
		// RELEVANT SHOULD
	});

	it('(as ITIL) checks the default fields', function(done){
		this.timeout(0);
		var fields = [
			'//*[@id="sys_readonly.change_request.number"]', // Number
			'//*[@id="sys_display.change_request.requested_by"]', // Requested by
			'//*[@id="change_request.category"]', // Category
			'//*[@id="sys_display.change_request.cmdb_ci"]', // Configuration item
			'//*[@id="change_request.priority"]', // Priority
			'//*[@id="change_request.risk"]', // Risk
			'//*[@id="change_request.impact"]', // Impact
			'//*[@id="sys_readonly.change_request.approval"]', // Approval
			'//*[@id="change_request.type"]', // Type
			'//*[@id="change_request.state"]', // State
			'//*[@id="sys_readonly.change_request.conflict_status"]', // Conflict status
			'//*[@id="sys_readonly.change_request.conflict_last_run"]', // Conflict last run
			'//*[@id="sys_display.change_request.assignment_group"]', // Assignment group
			'//*[@id="sys_display.change_request.assigned_to"]', // Assigned to
			'//*[@id="change_request.short_description"]', // Short description
			'//*[@id="change_request.description"]'// Descrption
		];
		// Check each field for visibility
		for (i=0; i<fields.length; i++){
			console.log('Checking if ' + fields[i] + ' is visible');
			var visible = browser.isVisible(fields[i]);
			visible.should.be.true;
		};
	});

	// it('(as ITIL) checks the Planning tier of fields', function(done){
	// 	this.timeout(0);
	// 	var fields = [
	// 		'//*[@id="change_request.change_plan"]', // Change plan
	// 		'//*[@id="change_request.backout_plan"]', // Backout plan
	// 		'//*[@id="change_request.test_plan"]' // Test plan
	// 	];
	// 	// Check fields for visibility
	// 	for (i=0; i<fields.length; i++){
	// 		console.log('Checking if ' + fields[i] + 'is visible');
	// 		var visible = browser.isVisibleWithinViewport(fields[i]);
	// 		visible.should.be.true;
	// 	};
	// });

	it('as ITIL checks the Schedule tier of fields', function(done){
		this.timeout(0);
		var fields = [
			'//*[@id="change_request.requested_by_date"]',
			'//*[@id="change_request.start_date"]',
			'//*[@id="change_request.end_date"]',
			'//*[@id="change_request.work_start"]',
			'//*[@id="change_request.work_end"]'
		];
		// Check fields for visibility
		for (i=0; i<fields.length; i++){
			console.log('Checking if ' + fields[i] + 'is visible');
			var visible = browser.isVisibleWithinViewport(fields[i]);
			visible.should.be.true;
		};
	});

	it('as ITIL checks Notes and Closure Information tier of fields', function(done){
		this.timeout(0);
		
	});






});