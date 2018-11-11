const testRunner = require( '../../test-runner' )
const url = 'http://localhost:9999/my-repo'

// tests to run
const tests = [
  require('./test.js')
]

testRunner( tests, url )
