/**
 * Created by changyoung on 17. 3. 17.
 */

//Data size implementation
const scrape = require('website-scraper');
var getSize = require('get-folder-size');

var options = {
    urls: ['http://www.dogdrip.net/index.php?_filter=search&mid=dogdrip&search_target=title&search_keyword=MB&document_srl=122760852&page=1'],
    directory: './dir/'
};

scrape(options,function(error, result){
    getSize(options.directory, function(error, size) {
        //send size to client
        console.log((size / 1024 / 1024).toFixed(2) + ' Mb');
    });
});


