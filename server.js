/**
 * Created by changyoung on 17. 3. 16.
 */

//Server implementation
const http = require('http');
const scrape = require('website-scraper');
const rmdir = require('rimraf');
var getSize = require('get-folder-size');

const keyURL = 'url';
const defaultDir = 'default';
const port = 3000;


const requestHandler = function(request, response) {
    var body = [];

    //get json data, parse, and send back size
    request.on('data', function(chunk){
        body.push(chunk);
    }).on('end', function(){
        body = Buffer.concat(body).toString(); //receive all data to string

        var url = JSON.parse(body)[keyURL];
        console.log(url);
        //parse, and give it to option
        var options = {
            urls: url,
            directory: defaultDir
        };

        //Scrape pages, and get size
        scrape(options).then(function(result)  {
            //If successfully get data from the link
            var prom1 = new Promise(function(resolve, reject){
                getSize(options.directory, function(error, size){
                    if(error){
                        reject(Error(error));
                    }
                    else {
                        rmdir(defaultDir, console.log);
                        var folderSize = ((size / 1024 / 1024).toFixed(3) + ' Mb');
                        resolve(folderSize);
                    }
                });
            });
            prom1.then(function(size){
                response.end(size);
            }, function(error){
                response.end(Error(error));
            });
        }, function(err) {
            //if there's error to get data from link
            response.end(Error(err))
        });
    });
};

const server = http.createServer(requestHandler);
server.listen(port);

