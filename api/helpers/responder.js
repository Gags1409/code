var  http = require('http');
	//	_ = require('lodash');

/**
 * Used by the API to apply common logic to success and error responses.
 * @param req
 * @param res
 */
var responder = function(req, res){
    this.req = req;
    this.res = res;
	this.output = {"image":"","slug":"","title":""};
    this.startTime = new Date().getTime();
};

responder.prototype = {

    /**
     * Formatting a response
     * @param {*} payload
     * @param {number=} status
     */
    success: function(payload, status){

        var response = {
            response: payload || {}
        };

        this.res.status(status || 200);
        this.res.json(response);
    },

    /**
     * Send an API error back to the client
     * Accepts a variety of parameters (method overloading) - mainly because sub systems return error messages in a variety of flavours and data types.
     * Better do all of that logic in a single place.
     *
     * Here are all the valid usage examples:
     *
     * Pass in a HTTP status code and a message
     * responder.error(500, 'Internal server error')
     *
     * Pass in an error string in the first argument (produces as 500):
     * responder.error('Some error')
     *
     * Use generic HTTP error codes and make the application lookup the standard HTTP error message:
     * responder.error(500)
     *
     * Pass in an error object:
     * responder.error({status: 500, message: 'Things gone bad'})
     *
     * Pass in an error object with just a status code:
     * responder.error({status: 500})
     *
     * Pass in an error object with just a message (produces a 500):
     * responder.error({message: 'Whoops error'})
     *
     * @param {number|object|string} arg1
     * @param {number=} arg1.status
     * @param {string=} arg1.message
     * @param {string=} message
     */
    error: function(arg1, message){

        var response = {};

        if(_.isObject(arg1)){

            if(!_.isNumber(arg1.status)){
                arg1.status = 500;
            }

            if(!_.isString(arg1.message) || arg1.message.length === 0){
                arg1.message = http.STATUS_CODES[arg1.status] || 'Unknown error';
            }

            response.status = arg1.status;
            response.message = arg1.message;
        }

        else if(_.isString(arg1)){
            response.status = 500;
            response.message = arg1;
        }

        else{

            if(!_.isNumber(arg1)){
                arg1 = 500;
            }

            if(!_.isString(message) || message.length === 0){
                message = http.STATUS_CODES[arg1] || 'Unknown error';
            }

            response.status = arg1;
            response.message = message;
        }

        this.res.status(response.status);
        this.res.json(response);
    }
};

module.exports = responder;
