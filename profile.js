/*
 * Require https module
 */
const https = require('https');

/*
 * Require http module
 */
const http = require('http');

/*
 * Prints message to the console
 *
 * @param string    username    name of user
 * @param number    badgecount  number of earned badges
 * @param number    points      number of JavaScript points
 *
 */
function printMessage(username, badgeCount, points) {
    const message = `${username} has ${badgeCount} total badge(s) and ${points} points in JavaScript`;
    console.log(message);
}

/*
 * Prints error message to the console
 *
 * @param Error error instance of error object
 *
 */
function printError(error) {
    console.log(error.message);
}

/*
 * Connects to an API and retreives information
 *
 * @param string username user's name gathered using the Process object
 *
 */
function get(username) {
    try {
        const request = https.get(`https://teamtreehouse.com/${username}.json`, (response) => {
            if (response.statusCode == 200) {
                let body ='';
                //read the data
                response.on('data', data => {
                    body += data.toString();
                });
                response.on('end', () => {
                    try {
                        //parse the data
                        const profile = JSON.parse(body);
                        //print the data
                        printMessage(
                            username, 
                            profile.badges.length, 
                            profile.points.JavaScript
                        );
                    } catch(error) {
                        printError(error);
                    }
                }); 
            } else {
                const message = `There was an error getting the profile for ${username} (${http.STATUS_CODES[response.statusCode]})`;
                const statusCode = new Error(message);
                printError(statusCode);
            }
        });
        request.on('error', printError);
    } catch (error) {
        printError(error);   
    }

}

/*
 * Explicitly state the method available 
 *  to those who require 'profile'
 *
 */
module.exports.get = get;