//function to print message to console
function printMessage(username, badgeCount, points) {
    const message = `${username} has ${badgeCount} total badge(s) and ${points} points in JavaScript`;
    console.log(message);
}

const https = require('https');

function getProfile(username) {
    try {
        const request = https.get(`https://teamtreehouse.com/${username}.json`, (response) => {
            let body ='';
            //read the data
            response.on('data', data => {
                body += data.toString();
            });
            response.on('end', () => {
                //parse the data
                const profile = JSON.parse(body);
                //print the data
                printMessage(
                    username, 
                    profile.badges.length, 
                    profile.points.JavaScript
                );
            });
        });
        request.on('error', error => console.error(`Problem with request: ${error.message}`));
    } catch (error) {
        console.error(error.message);   
    }

}

//capture command line args with process global object
const users = process.argv.slice(2);
users.forEach(getProfile);
