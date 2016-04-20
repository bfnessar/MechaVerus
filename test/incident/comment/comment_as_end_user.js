/* NOT FINISHED. Come back to this please. */

var SNWindow = require('../page_objects/SNInterface.page.js');
var IncidentRecordPage = require('../page_objects/IncidentRecord.page.js');
var storage = require('../persistent_values.js');

var instance_url = storage.instance_url;
var username = storage.login_creds.username;
var password = storage.login_creds.password;

describe('should allow an end user to comment on a personally-owned, open incident', function(){
	this.timeout(0);

	it('sets up the page object, then logs in as an end user', function(done){
		SNWindow.setInstanceUrl(instance_url).open();
		browser.login_as(username, password);
	});

	it('impersonates an end user', function(done){
		SNWindow.impersonateUser('Joe Employee');
	});

	it('navigates to an existing incident record, comments on it, then verifies that the comment was logged', function(done){
		SNWindow.halt();
	});
});

