/*
 * Require profile module
 */
const profile = require('./profile.js');

/*
 * Capture command line args with process global object
 */
const users = process.argv.slice(2);

/*
 *
 * Execute the get method for each elem in user array
 */
users.forEach(profile.get);