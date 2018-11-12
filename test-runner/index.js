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

module.exports = ( tests  ) => {

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
      console.log( '-- Simulate browser start -- ', capabilities.browserName )
      const browser = await new Promise( resolve => setTimeout( resolve, 3000 ) )

      // navigate to url in real world now

      // ---
      // Run the tests asynchronously
      // ---
      console.log( '-- Run tests --- ' )
      await asyncForEach( tests, async ( test ) => {
        await test( capabilities )
      } )

      // Stop browser in real world now and go to next one
      // This should only be logged when the all tests for this browser are finished
      console.log('quit: ', capabilities.browserName)


    } )

  }

  // ---
  // Start the tests
  // ---
  run()

}
