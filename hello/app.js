var AWS = require('aws-sdk');
var docClient = new AWS.DynamoDB.DocumentClient();

const fetchData = (tableName) =>
    new Promise((resolve, reject) => {
        var params = {
            TableName: tableName
        };

        function onScan(err, data) {
            if (err) {
                console.error('Unable to scan the table. Error JSON:', JSON.stringify(err, null, 2));
                reject(err);
            } else {
                // print all the movies
                console.log('Scan succeeded.');
                const items = [];
                data.Items.forEach(function (user) {
                    items.push(user);
                });
                resolve(items);

                // continue scanning if we have more movies, because
                // scan can retrieve a maximum of 1MB of data
                // if (typeof data.LastEvaluatedKey != 'undefined') {
                //     console.log('Scanning for more...');
                //     params.ExclusiveStartKey = data.LastEvaluatedKey;
                //     docClient.scan(params, onScan);
                // }
            }
        }
        docClient.scan(params, onScan);
    });

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 *
 */
exports.lambdaHandler = async (event, context) => {
    let response;
    try {
        const users = await fetchData('users');
        response = {
            'statusCode': 200,
            'body': JSON.stringify({
                message: 'hello world',
                users
            })
        };
    } catch (err) {
        console.error(err);
        return err;
    }

    return response;
};
