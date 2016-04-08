// Taken from https://github.com/Matt-B/mocha-webdriver-page-objects-example/blob/master/test/page-objects/page.js

function Page(webdriver, url) {
	this.driver = webdriver;
	this.url = url; // Might change periodically; I want an attribute that stores just the SN instance's url
};

Page.prototype.open = function() {
	this.driver.url(this.url);
	return this;
};

Page.prototype.waitFor = function(locator, timeout) {
	var waitTimeout = timeout || 20000;
	var driver = this.driver;
	return driver.waitForExist(locator, timeout);
};

Page.prototype.halt = function(){
	var driver = this.driver;
	return driver.debug();
}

module.exports = Page;