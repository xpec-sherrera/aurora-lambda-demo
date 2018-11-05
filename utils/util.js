const Validator = require('jsonschema').Validator;
const v = new Validator();

exports.validateSchema = function(json, schema){
	if( !json || !schema )return {valid: false, errors: ["Can't validate schema, null arguments"]};
	let validation = v.validate(json, schema);
	return {valid: validation.errors && validation.errors.length === 0, errors: validation.errors};
};

exports.buildSchemaErrorsMessage = function(errors){
	let error = {};
	if( errors && errors.length > 0 ){
		error.message = "";
		errors.forEach(function(err){
			if( error.message !== "" ){
				error.message += ", ";
			}
			error.message += err;
		});
	}
	return error.message;
};