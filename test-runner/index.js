const webdriver = require( 'selenium-webdriver' )

// ---
// default browser configs
// ---
const defaults = {
  "os" : "OS X",
  "os_version" : "Mojave",
  "resolution" : "1024x768",
  "browserstack.user" : "username",
  "browserstack.key" : "key",
  "browserstack.console": "errors",
  "browserstack.local" : "true",
  "build": "test",
  "project": "test"
}

// ---
// browsers to test
// ---
const browsers = [
  {
    "browserName" : "Chrome",
    "browser_version" : "41.0"
  },
  {
    "browserName" : "Safari",
    "browser_version" : "10.0",
    "os_version" : "Sierra"
  }
]

module.exports = ( tests, url ) => {

  // ---
  // Asynchronous forEach loop
  // helper function
  // ---
  async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array)
    }
  }

  // ---
  // runner
  // ---
  const run = async () => {

    // ---
    // Iterate through all browsers and run the tests on them
    // ---
    await asyncForEach( browsers, async ( b ) => {

      // ---
      // Merge default configs with current browser
      // ---
      const capabilities = Object.assign( {}, defaults, b )

      // ---
      // Start and connect to remote browser
      // ---
      console.info( '-- Starting remote browser hang on --', capabilities.browserName )
      const browser = await new webdriver.Builder().
        usingServer( 'http://hub-cloud.browserstack.com/wd/hub' ).
        withCapabilities( capabilities ).
        build()

      // ---
      // Navigate to page which needs to be checked (url)
      // ---
      console.log('-- Navigate to URL --')
      await browser.get( url )

      // ---
      // Run the tests asynchronously
      // ---
      console.log( '-- Run tests --- ' )
      await asyncForEach( tests, async ( test ) => {
        await test( browser, url, capabilities, webdriver )
      } )

      // ---
      // Quit the remote browser when all tests for this browser are done
      // and move on to next browser
      // ---
      browser.quit()

    } )

  }

  // ---
  // Start the tests
  // ---
  run()

}
