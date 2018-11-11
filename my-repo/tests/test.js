const tape = require( 'tape' )

module.exports = async ( browser, url, capabilities, driver ) => {

  return new Promise( resolve => {

    tape( `Frontend test ${capabilities.browserName} ${capabilities.browser_version}`, async ( t ) => {

      const body = await browser.wait( driver.until.elementLocated( driver.By.css( 'body' ) ) )

      body.click()

      // Dummy ok
      t.ok(true, 'ok')

      //---
      // Test should end now
      //---
      t.end()

      resolve()

    } )

  })

}
