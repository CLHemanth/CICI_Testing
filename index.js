

var https = require('follow-redirects').https;
var fs = require('fs');

var qs = require('querystring');

var options = {
    'method': 'POST',
    'hostname': 'bigganga.zee5.com',
    'path': '/wp-admin/admin-ajax.php',
    'rejectUnauthorized': false,
    'headers': {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    'maxRedirects': 20
};

async function getRequest() {
    return new Promise(async function (resolve, reject) {

        var req = https.request(options, function (res) {
            var chunks = [];

            res.on("data", function (chunk) {
                chunks.push(chunk);
            });

            res.on("end", function (chunk) {
                var body = Buffer.concat(chunks);
                console.log("------------------", body.toString());
            });

            res.on("error", function (error) {
                console.error(error);
            });
        });

        var postData = qs.stringify({
            'action': 'state_country',
            'country_name': 'india'
        });

        req.write(postData);

        req.end();
    })
 }

exports.handler = async event => {
    try {
        //const result = await getRequest();
        return {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(event.body),
        };
    } catch (error) {
        console.log('Error is:', error);
        return {
            statusCode: 400,
            body: error.message,
        };
    }
};

