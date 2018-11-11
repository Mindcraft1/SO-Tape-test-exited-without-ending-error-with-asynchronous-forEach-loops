const tape = require( 'tape' )

module.exports = async ( capabilities ) => {

  return new Promise( resolve => {

    tape( `Frontend test ${capabilities.browserName} ${capabilities.browser_version}`, async ( t ) => {

      // simulate body handling
      const body = await new Promise(resolve => setTimeout(resolve, 3000))

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
