const https = require('https');
const fs = require('fs/promises');
const {logger} = require('./logger.js')
const CustomError = require('./error.js');

let date_ob = new Date();

function httpsGet(hostname_, path_) {
    return new Promise((resolve, reject) => {
        const options = {
            method: 'GET',
            hostname: hostname_,
            port: 443,
            path: path_,
            headers: {
                accept: 'application/json',
                // Authorization: 'Bearer xxxxxxxxxxxxx'
            }
        };

        const req = https.request(options, function (res) {
            const chunks = [];

            res.on('data', function (chunk) {
                chunks.push(chunk);

                
            });

            res.on('end', function () {
                const body = Buffer.concat(chunks);
                resolve(body.toString());

                logger.log(`GET data ${hostname_}/${path_}. \n Time is ${date_ob} \n Status Code: ${res.statusCode}`);

    
            });
        });

        req.on('error', function (err) {

            logger.log(`No GET data ${hostname_}/${path_}.\n Time is ${date_ob} \n Status Code: ${err.statusCode}`);

            
            reject(err);
            
            throw new CustomError(`No GET data ${hostname_}/${path_}.\n Time is ${date_ob} \n Status Code: ${err.statusCode}`);
        });

        req.end();
    });
}

async function writeToFile(fileName, data) {

    try {

        await fs.writeFile(fileName, data);
        console.log(`Wrote data to ${fileName}`);

    } catch (error) {

        console.error(`Got an error trying to write the file: ${error.message}`);

    }
}

async function Task(hostname, path, fileName) {
    try {

        const jsonData = await httpsGet(hostname, path);
        await writeToFile(fileName, jsonData);

    } catch (error) {

        console.error(error);
        
    }
}




const functionName = process.argv[2];

if (functionName === 'Task') {
    
    Task('jsonplaceholder.typicode.com', '/todos', 'data.json'); // node Task.js Task
    
} else {

    console.log('Invalid function name');

}
