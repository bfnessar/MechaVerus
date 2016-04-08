/*	==========================
	ATTRIBUTES:
	 	OWNED:
	 		* this.instance_url
		INHERITED FROM PAGE.js:
			* this.driver
			* this.url
	METHODS:
		OWNED:
			* login_as(username, password)
			* impersonate_user(username)
			* navToNewRecordForm(target)
		INHERITED FROM PAGE.js:
			* open()
			* waitFor(locator, timeout)
	========================== */


var page = require('./page');
var IncidentFormPage = require('./incident_form_page');
function SN_Homepage (webdriver, instance_url) {
	this.instance_url = instance_url;
	page.call(this, webdriver, instance_url);
}
// I don't understand object construction and inheritance and stuff, but these two lines come from Matt B's page.
SN_Homepage.prototype = Object.create(page.prototype);
SN_Homepage.prototype.constructor = SN_Homepage;
/* Define actual functions here, separated by semicolons. */
SN_Homepage.prototype.login_as = function(username, password) {
	// Should determine beforehand whether user is logged in already. Doesn't do so yet.
	// Assumes that if the user is calling this function, s/he is not logged in.
	// Consequently, it assumes that the user_name and password fields are available and writable.
	// this.driver.url(this.instance_url);
	this.driver.frame('gsft_main');
	this.driver.setValue('#user_name', username);
	this.driver.setValue('#user_password', password);
	this.driver.click('#sysverb_login');
	this.driver.frameParent();
};
SN_Homepage.prototype.impersonate_user = function(username) {
	this.driver.frameParent();
    this.driver.click('#user_info_dropdown'); // Click the user dropdown
    this.driver.click('.dropdown-menu > li:nth-child(2) > a:nth-child(1)'); // Click on Impersonate User
    this.driver.waitForExist('#s2id_autogen3', 5000); // Wait for menu to appear
    this.driver.click('#s2id_autogen3'); // Click on the text field
    this.driver.waitForExist('#s2id_autogen4_search', 5000); // Supposed to wait for options to populate
    this.driver.setValue('#s2id_autogen4_search',username); // Enter username as text
    // this.driver.debug();
    this.driver.pause(5000);
    this.driver.keys(['Enter']); // Submit
    this.driver.pause(3000);
    // this.driver.waitForExist('#filter', 3000);
    this.driver.frameParent();
};
SN_Homepage.prototype.navToNewRecordForm = function(target) {
	// Can navigate to a new incident, problem, or change request.
	this.driver.frameParent();
	this.driver.waitForExist('#filter');
	this.driver.setValue('#filter', target);
	this.driver.pause(1000);
	this.driver.keys(['Enter']);
	this.driver.pause(1000);
	// this.driver.frame('gsft_main'); // This line used to be fine, but now it breaks the test. Replaced with frameParent(), though I'm not sure why.
	this.driver.frameParent();

	if (target == "incident.do"){
		return new IncidentFormPage(this.driver, this.instance_url);
	}	else {
		console.log("This functionality is not supported yet! We need to create a page object for " + target);
		return false;
	};
};

module.exports = SN_Homepage;