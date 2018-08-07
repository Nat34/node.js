//function to print message to console
function printMessage(username, badgeCount, points) {
    const message = `${username} has ${badgeCount} total badge(s) and ${points} points in JavaScript`;
    console.log(message);
}

//Require https module
const https = require('https');

//Require http module
const http = require('http');

function printError(error) {
    console.log(error.message);
}

function getProfile(username) {
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

//capture command line args with process global object
const users = process.argv.slice(2);
users.forEach(getProfile);