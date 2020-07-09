'use strict';
console.log('loading function');
var AWS = require('aws-sdk');
AWS.config.region = 'ap-east-1';

exports.handler = async (event, context) => {
    const documentClient = new AWS.DynamoDB.DocumentClient();
    
    let responseBody = "";
    let statusCode = 0;
    
    if (event.body) {
        const { gamedate, username, name, taken_num, return_num, fluc_ratio } = JSON.parse(event.body);
        var params = {
            TableName: "pk_eachgame_results",
            Item: {
                gamedate: gamedate,
                username: username,
                name: name,
                taken_num: taken_num,
                return_num: return_num,
                fluc_ratio: fluc_ratio
            }
        };
    }
    
    try {
        const data = await documentClient.put(params).promise();
        responseBody = JSON.stringify(data);
        statusCode = 201;
    } catch(err) {
        responseBody = `Unable to put product:${err}`;
        statusCode = 403;
    }
    
    const response = {
        statusCode: statusCode,
        headers: {
            "Content-Type":"application/json"
        },
        body: responseBody
    };
    
    return response;
};
