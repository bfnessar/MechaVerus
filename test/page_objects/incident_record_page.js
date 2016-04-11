/*

*/

// Requirements/ Imports
var page = require('./page');
var sn_homepage = require('./sn_homepage');

// Object definition and constrction
function IncidentRecordPage (webdriver, instance_url){
	var last_comment;
	page.call(this, webdriver, instance_url);
};
IncidentRecordPage.prototype = Object.create(page.prototype);
IncidentRecordPage.prototype.constructor = IncidentRecordPage;

// Methods
IncidentRecordPage.prototype.check_username = function(){
	this.driver.frameParent();
	return this.driver.getText('.user-name');
};
IncidentRecordPage.prototype.leave_comment = function(){
	var now = new Date();
	var comment_text = 'Comment testing, logged at: <' + now.toString() + '>';
	// this.driver.waitForExist('#activity-stream-textarea', 10000);
	this.driver.pause(7000);
    this.driver.setValue('#activity-stream-textarea', comment_text);
    this.last_comment = comment_text;
    this.driver.waitForExist('.activity-submit', 10000);
    this.driver.click('.activity-submit');
    this.driver.pause(3000);
    // return {
    // 	timestamp: now.toString() // Use this timestamp for verification
    // };
};
IncidentRecordPage.prototype.verify_last_comment = function(){
    var last_comment_identifier = 'li.sn-activity:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > ul:nth-child(1) > li:nth-child(1) > div:nth-child(1) > div:nth-child(1)';
	this.driver.waitForExist(last_comment_identifier, 10000);
	var pages_last_comment = this.driver.getText(last_comment_identifier);
	if (pages_last_comment == this.last_comment){
		return true;
	}	else {
		return false;
	};
};

module.exports = IncidentRecordPage;