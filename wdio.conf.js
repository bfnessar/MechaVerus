exports.config = {
    
    //
    // ==================
    // Specify Test Files
    // ==================
    // Define which test specs should run. The pattern is relative to the directory
    // from which `wdio` was called. Notice that, if you are calling `wdio` from an
    // NPM script (see https://docs.npmjs.com/cli/run-script) then the current working
    // directory is where your package.json resides, so `wdio` will be called from there.
    //
    specs: [
        './test/isolation/*.js'
    ],
    // Patterns to exclude.
    exclude: [
        // 'path/to/excluded/files'
    ],
    //
    // ============
    // Capabilities
    // ============
    // Define your capabilities here. WebdriverIO can run multiple capabilities at the same
    // time. Depending on the number of capabilities, WebdriverIO launches several test
    // sessions. Within your capabilities you can overwrite the spec and exclude options in
    // order to group specific specs to a specific capability.
    //
    // First, you can define how many instances should be started at the same time. Let's
    // say you have 3 different capabilities (Chrome, Firefox, and Safari) and you have
    // set maxInstances to 1; wdio will spawn 3 processes. Therefore, if you have 10 spec
    // files and you set maxInstances to 10, all spec files will get tested at the same time
    // and 30 processes will get spawned. The property handles how many capabilities
    // from the same test should run tests.
    //
    capabilities: [{
        browserName: 'firefox'
    }],
    //
    // ===================
    // Test Configurations
    // ===================
    // Define all options that are relevant for the WebdriverIO instance here
    //
    // Level of logging verbosity: silent | verbose | command | data | result | error
    logLevel: 'verbose',
    //
    // Enables colors for log output.
    coloredLogs: true,
    //
    // Saves a screenshot to a given path if a command fails.
    screenshotPath: './errorShots/',
    //
    // Set a base URL in order to shorten url command calls. If your url parameter starts
    // with "/", then the base url gets prepended.
    baseUrl: 'http://localhost',
    //
    // Default timeout for all waitFor* commands.
    waitforTimeout: 1000000,
    //
    // Default timeout in milliseconds for request
    // if Selenium Grid doesn't send response
    connectionRetryTimeout: 90000,
    //
    // Default request retries count
    connectionRetryCount: 3,
    //
    // Initialize the browser instance with a WebdriverIO plugin. The object should have the
    // plugin name as key and the desired plugin options as properties. Make sure you have
    // the plugin installed before running any tests. The following plugins are currently
    // available:
    // WebdriverCSS: https://github.com/webdriverio/webdrivercss
    // WebdriverRTC: https://github.com/webdriverio/webdriverrtc
    // Browserevent: https://github.com/webdriverio/browserevent
    // plugins: {
    //     webdrivercss: {
    //         screenshotRoot: 'my-shots',
    //         failedComparisonsRoot: 'diffs',
    //         misMatchTolerance: 0.05,
    //         screenWidth: [320,480,640,1024]
    //     },
    //     webdriverrtc: {},
    //     browserevent: {}
    // },
    //
    // Test runner services
    // Services take over a specific job you don't want to take care of. They enhance
    // your test setup with almost no effort. Unlike plugins, they don't add new
    // commands. Instead, they hook themselves up into the test process.
    // services: [],//
    // Framework you want to run your specs with.
    // The following are supported: Mocha, Jasmine, and Cucumber
    // see also: http://webdriver.io/guide/testrunner/frameworks.html
    //
    // Make sure you have the wdio adapter package for the specific framework installed
    // before running any tests.
    framework: 'mocha',
    //
    // Test reporter for stdout.
    // The following are supported: dot (default), spec, and xunit
    // see also: http://webdriver.io/guide/testrunner/reporters.html
    // reporters: ['dot'],
    //
    // Options to be passed to Mocha.
    // See the full list at http://mochajs.org/
    //      https://mochajs.org/#usage
    //      https://mochajs.org/#mocha-opts
    mochaOpts: {
        ui: 'bdd'
    },
    //
    // =====
    // Hooks
    // =====
    // WedriverIO provides several hooks you can use to interfere with the test process in order to enhance
    // it and to build services around it. You can either apply a single function or an array of
    // methods to it. If one of them returns with a promise, WebdriverIO will wait until that promise got
    // resolved to continue.
    //
    // Gets executed once before all workers get launched.
    // onPrepare: function (config, capabilities) {
    // },
    //
    // Gets executed before test execution begins. At this point you can access all global
    // variables, such as `browser`. It is the perfect place to define custom commands.
    before: function (capabilities, specs) {
        /* Thinking about whether we should import all data
            here, in the hook, or if it should happen within each
            individual test script. The latter is probably the better idea. */
        // var incidents_fields = require('./test/incident/incident_fields.js');

        /* UTILITY */
        // browser.addCommand("login_as", function(sn_url, username, password){
        //     this.url(sn_url);
        //     this.frame('gsft_main');
        //     this.setValue('#user_name', username);
        //     this.setValue('#user_password', password);
        //     this.click('#sysverb_login');
        //     this.frameParent();
        // });
        // browser.addCommand("impersonate_user", function(username){
        //     this.frameParent();
        //     this.click('#user_info_dropdown'); // Click the user dropdown
        //     this.click('.dropdown-menu > li:nth-child(2) > a:nth-child(1)'); // Click on Impersonate User
        //     this.waitForExist('#s2id_autogen3', 5000); // Wait for menu to appear
        //     this.click('#s2id_autogen3'); // Click on the text field
        //     this.waitForExist('#s2id_autogen4_search', 5000); // Supposed to wait for options to populate
        //     this.setValue('#s2id_autogen4_search',username); // Enter username as text
        //     this.pause(5000);
        //     this.keys(['Enter']); // Submit
        //     this.pause(3000);
        //     this.frameParent();
        // });
        // browser.addCommand("navigate_via_filter", function(entry){
        //     this.frameParent();
        //     this.waitForExist('#filter');
        //     this.setValue('#filter', entry);
        //     this.pause(1000);
        //     this.keys(['Enter']);
        //     this.pause(1000);
        //     this.frame('gsft_main');
        // });


        // /* INCIDENTS SUITE: */
        // browser.addCommand("nav_to_incident", function(url){
        //     this.url(url);
        //     this.pause(3000);
        //     this.frame('gsft_main');
        // });
        // browser.addCommand("leave_comment_on_incident", function(){
        //     var now = new Date();
        //     this.waitForExist('#activity-stream-textarea', 10000);
        //     this.setValue('#activity-stream-textarea', 'Comment testing, logged at: <' + now.toString() + '>' );
        //     this.waitForExist('.activity-submit', 10000);
        //     this.click('.activity-submit');
        //     this.pause(3000);
        //     return {
        //         // This is part of the comment that got left; pass this to the verification function to see if it is actually the last comment
        //         timestamp: now.toString()
        //     };
        // });
        // // Verifies that a comment was logged by checking the text of the 
        // // element that represents the most recent comment, and matching it
        // // to the expected comment.
        // browser.addCommand("verify_last_comment", function (expected_comment){
        //     var last_comment_identifier = 'li.sn-activity:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > ul:nth-child(1) > li:nth-child(1) > div:nth-child(1) > div:nth-child(1)';
        //     this.waitForExist(last_comment_identifier, 10000); // Wait for the most recent comment to appear in the feed
        //     var last_comment_text = this.getText(last_comment_identifier); // Extract the text of that comment
        //     expect(last_comment_text).to.have.string(expected_comment); // Verify that it matches the expected text
        // });

    },
    //
    // Hook that gets executed before the suite starts
    // beforeSuite: function (suite) {
    // },
    //
    // Hook that gets executed _before_ a hook within the suite starts (e.g. runs before calling
    // beforeEach in Mocha)
    // beforeHook: function () {
    // },
    //
    // Hook that gets executed _after_ a hook within the suite starts (e.g. runs after calling
    // afterEach in Mocha)
    // afterHook: function () {
    // },
    //
    // Function to be executed before a test (in Mocha/Jasmine) or a step (in Cucumber) starts.
    // beforeTest: function (test) {
    // },
    //
    // Runs before a WebdriverIO command gets executed.
    // beforeCommand: function (commandName, args) {
    // },
    //
    // Runs after a WebdriverIO command gets executed
    // afterCommand: function (commandName, args, result, error) {
    // },
    //
    // Function to be executed after a test (in Mocha/Jasmine) or a step (in Cucumber) starts.
    // afterTest: function (test) {
    // },
    //
    // Hook that gets executed after the suite has ended
    // afterSuite: function (suite) {
    // },
    //
    // Gets executed after all tests are done. You still have access to all global variables from
    // the test.
    // after: function (capabilities, specs) {
    // },
    //
    // Gets executed after all workers got shut down and the process is about to exit. It is not
    // possible to defer the end of the process using a promise.
    // onComplete: function(exitCode) {
    // }
}
