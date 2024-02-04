const AWS = require('aws-sdk');
const config = require('./../../config.js');
const uuidv1 = require('uuid/v1');

//Initiates a scan operation to retrieve all items from a specified DynamoDB table. Sends a response with the retrieved vehicles or an error message.
const getVehicles = function (req, res) {
    AWS.config.update(config.aws_remote_config);

    const docClient = new AWS.DynamoDB.DocumentClient();

    const params = {
        TableName: config.aws_table_name
    };

    docClient.scan(params, function (err, data) {

        if (err) {
            console.log(err)
            res.send({
                success: false,
                message: err
            });
        } else {
            const { Items } = data;
            res.send({
                success: true,
                vehicles: Items
            });
        }
    });
}

//Vehicle registration/add
const vregister = function (req, res) {
    AWS.config.update(config.aws_remote_config);
    const docClient = new AWS.DynamoDB.DocumentClient();
    const Item = { ...req.body };
    Item.id = uuidv1(); //generate a unique identifier for the new item
    var params = {
        TableName: config.aws_table_name,
        Item: Item
    };

    // Call DynamoDB to add the item to the table
    docClient.put(params, function (err, data) {
        if (err) {
            res.send({
                success: false,
                message: err
            });
        } else {
            res.send({
                success: true,
                message: 'Added vehicle',
                vehicle: data
            });
        }
    });
}

module.exports = {
    getVehicles,
    vregister
}
