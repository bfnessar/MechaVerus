function SNInterface() {
	this.instance_url;
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
/* 	I'm going to establish the standard that ANY function that
	causes a state change must end with frame('gsft_main')
	or browser.frameParent() */
/*  For functions that cause a state change, but aren't meant
	to return any particular information-- should they still
	return 'this'? Maybe there are benefits to doing that, but
	I'm not sure what they would be. Hold on to that thought. */
		// Oh hey, one benefit would be that you can chain
		// methods in the test spec, as long as all chained
		// methods return the page object itself, for code
		// that looks like asynchronous syntax.
SNInterface.prototype.setInstanceUrl = function(instance_url) {
	// I should change the name of this function, because its role is going to be something like "navigate to SN homepage"
	this.instance_url = instance_url;
	browser.url(instance_url);
	browser.frame('gsft_main');
	return this;
};
// And let's eventually get rid of this one altogether (can't do it now bc all the test scripts call open() so it should have SOME definition)
SNInterface.prototype.open = function() {
	return this;
};
SNInterface.prototype.halt = function() {
	return browser.debug();
	return this;
};

SNInterface.prototype.loginAs = function(username, password) {
	browser.frameParent();
	this.username_field.setValue(username);
	this.password_field.setValue(password);
	this.login_button.click();
	browser.frameParent();
	return this;
};
SNInterface.prototype.impersonateUser = function(username) {
	browser.frameParent();
	this.dropdown_menu.click(); // Click the user dropdown
	this.impersonate_user_button.click(); // Click 'Impersonate User'
	this.impersonate_user_search_bar.waitForExist(5000);
	this.impersonate_user_search_bar.click(); // Click into the "Search" field once it exists
	this.impersonate_user_text_field.setValue(username); // Enter the username of your impersonatee
	browser.pause(5000); // Wait for the machine to find that user
	// browser.waitForExist('#div\\.select2-result-cell:nth-child\\(2\\)');
	// browser.waitForEnabled('#div\\.select2-result-cell:nth-child\\(2\\)');
	browser.keys(['Enter']); // Select the user
	browser.pause(3000);
	browser.frameParent();
	return this; // Not sure if this is necessary but it could be useful later
};
// Should maybe return a new page object? Right now it just navigates the browser.
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
			browser.waitForExist('#gsft_main');
			browser.waitForEnabled('#gsft_main');
			browser.frame('gsft_main');

			// Return an IncidentForm PageObject
			break;
		case 'change_request':
			// Return a ChangeRequest PageObject
			break;
		default:
			console.log("I don't recognize this form type");
			return false;
	};
};
SNInterface.prototype.navToExistingRecord = function(url) {
	browser.url(url);
	browser.pause(3000);

	/* This snippet is useful in IncidentRecordPage.verifyReadOnlyAs(), to make sure that
		the record page has been loaded fully. It probably would be good to move
		that snippet to this here state-change function, but I don't want to 
		change it yet. */
	// // Make sure we've fully-loaded the record page
	browser.waitForExist('#gsft_main');
	browser.waitForEnabled('#gsft_main');
	browser.frame('gsft_main');

	/*	If we're following the rule of "return a page object",
		the we should determine what kind of page object we're
		on, then use a switch statement to return that kind.
		We'd also have to 'require' each page object file and
		instantiate them in some particular way that I don't
		want to have to figure out right now.
		However, since we're not doing that, this function is
		basically a slower, less functional version of open(url).
	*/
};

module.exports = new SNInterface()