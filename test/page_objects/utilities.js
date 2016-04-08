// Most of the functions call frameParent() at the beginning
// and/or end. Not sure of the importance or reason, but
// sometimes the code doesn't work otherwise.
// The function 'navigate_via_filter()' ends by changing
// the frame to 'gsft_main', which seems to work.

module.exports = {

	// 'browser' is the driver object you are using.
	login_as: function (browser, sn_url, username, password){
		browser.url(sn_url);
		browser.frame('gsft_main');
		browser.setValue('#user_name', username);
		browser.setValue('#user_password', password);
		browser.click('#sysverb_login');
		browser.frameParent();
	},

	// This function assumes that you are logged in as an admin.
	impersonate_user: function (browser, username){
		browser.frameParent();
	    browser.click('#user_info_dropdown'); // Click the user dropdown
	    browser.click('.dropdown-menu > li:nth-child(2) > a:nth-child(1)'); // Click on Impersonate User
	    browser.waitForExist('#s2id_autogen3', 5000); // Wait for menu to appear
	    browser.click('#s2id_autogen3'); // Click on the text field
	    browser.waitForExist('#s2id_autogen4_search', 5000); // Supposed to wait for options to populate
	    browser.setValue('#s2id_autogen4_search',username); // Enter username as text
	    browser.pause(5000);
	    browser.keys(['Enter']); // Submit
	    browser.pause(3000);
	    browser.frameParent();
	},

	// 'entry' can be "incident.do" or "change_request.list"
	navigate_via_filter: function (browser, entry){
		browser.frameParent();
		browser.waitForExist('#filter');
		browser.setValue('#filter', entry);
		browser.pause(1000);
		browser.keys(['Enter']);
		browser.pause(1000);
		browser.frame('gsft_main');
	}
};



