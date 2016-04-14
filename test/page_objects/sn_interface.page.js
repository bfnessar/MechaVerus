function SNInterface() {
	this.instance_url;

	// filter_field: 	{ };
	// user_dropdown: 	{ };

};
// Define getters for the elements we expect to interact with
SNInterface.prototype = {
	// Getters for logging in
	get username_field() {return browser.element('#user_name')},
	get password_field() {return browser.element('#user_password')},
	get login_button() 	{return browser.element('#sysverb_login')},

	// Getters for impersonating a user
	get dropdown_menu() {return browser.element('#user_info_dropdown')},
	get impersonate_user_button() {return browser.element('.dropdown-menu > li:nth-child(2) > a:nth-child(1)')},
	get impersonate_user_search_bar() {return browser.element('#s2id_autogen3')},
	get impersonate_user_text_field() {return browser.element('#s2id_autogen4_search')},

	// Getters for the Application Navigator
	get filter_field() {return browser.element('#filter')}
};
// This function might be entirely unnecessary
SNInterface.prototype.setInstanceUrl = function(instance_url) {
	this.instance_url = instance_url;
	browser.url(instance_url);
	browser.frame('gsft_main');
	return this;
};
SNInterface.prototype.open = function() {
	browser.url(this.url);
};
SNInterface.prototype.halt = function() {
	return browser.debug();
};

SNInterface.prototype.loginAs = function(username, password) {
	this.username_field.setValue(username);
	this.password_field.setValue(password);
	this.login_button.click();
};

SNInterface.prototype.impersonateUser = function(username) {
	browser.frameParent();
	this.dropdown_menu.click(); // Click the user dropdown
	this.impersonate_user_button.click(); // Click 'Impersonate User'
	this.impersonate_user_search_bar.waitForExist(5000);
	this.impersonate_user_search_bar.click(); // Click into the "Search" field once it exists
	this.impersonate_user_text_field.setValue(username); // Enter the username of your impersonatee
	browser.pause(5000); // Wait for the machine to find that user
	browser.keys(['Enter']); // Select the user
	browser.pause(3000);
	browser.frameParent();
	// return this; // Not sure if this is necessary but it could be useful later
};

SNInterface.prototype.navToNewRecordForm = function(form_name) {
	browser.frameParent();
	this.filter_field.waitForExist();
	this.filter_field.setValue(form_name+'.do');
	browser.pause(3000);
	browser.keys(['Enter']);
	browser.pause(3000);
	browser.frameParent();

	switch (form_name) {
		case 'incident':
			// Return an IncidentForm PageObject

			break;
		case 'change_request':
			//
			break;
		default:
			console.log("I don't recognize this form type");
			return false;
	};
};

module.exports = new SNInterface()