const Utils = require('./utils/util');
const async = require('asyncawait/async');
const await = require('asyncawait/await');
const bcrypt = require('bcrypt');
const UserDAO = require('./dao/user-dao').UserDAO;
const UUID = require('uuid/v1');
const schema = require('./schema.json');

let toResponse = function(code, message){
    return {
        "statusCode": code,
        "headers": {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin" : "*"
        },
        "body": JSON.stringify({
            code: code,
            message: message
        })
    };
};

exports.handler = async((event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    let output = {};
    const body = JSON.parse(event.body);
    const userDAO = new UserDAO();
    console.log("Inside handler, event: " + JSON.stringify(event));
    try{
        const validation = Utils.validateSchema(body, schema);
        if( validation.valid ){
            console.log("Valid, validation: " + JSON.stringify(validation));
            body.id = UUID();
            body.password = bcrypt.hashSync(body.password, process.env.salt || 10);
            const response = await(userDAO.insert(body));
            console.log("Creation response: " + JSON.stringify(response));
            output = toResponse(200, "OK");
        }else{
            console.log("Invalidate schema, errors: " + validation.errors);
            throw new Error(Utils.buildSchemaErrorsMessage(validation.errors));
        }
    }catch(exc){
        console.log("Exception: " + exc.message);
        output = toResponse(500, exc.message);
    } finally {
        context.succeed(output);
    }
});
