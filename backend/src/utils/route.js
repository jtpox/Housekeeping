const path = require('path');
const fs = require('fs');

/*
 * Route Manager
 * Finds all .js files in ./src/route and puts them into the relevent path.
 * 
 * Usage
 * Var express - The main Express instance used in server.js.
 */
module.exports = (express) => {
    const routesPath = path.join(__dirname, '../routes');
    fs.readdir(routesPath, (err, files) => {

        if (err) {
            return console.log('Unable to scan route directory.');
        }

        files.forEach((file) => {
            const isFileADirectory = fs.lstatSync(path.join(routesPath, file)).isDirectory();
            if(!isFileADirectory) {
                /*
                 * Use the file name as a API path.
                 */
                const [apiPath] = file.split('.');
                express.use(`/api/${apiPath}`, require(path.join(routesPath, file)));
            }
        });

    });
};