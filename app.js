'use strict';

var SwaggerExpress = require('swagger-express-mw');
var SwaggerUi = require('swagger-tools/middleware/swagger-ui');
var app = require('express')();
module.exports = app; 

var config = {
   appRoot: __dirname 
};

SwaggerExpress.create(config, function(err, swaggerExpress) {
	if (err) { throw err; }
	// Add swagger-ui (This must be before swaggerExpress.register)
	app.use(SwaggerUi(swaggerExpress.runner.swagger));
	// install middleware
	swaggerExpress.register(app);
	app.use(function(err, req, res, next) {
		if(err) {
			err = {"error" : "Could not decode request: JSON parsing failed"};
		}
		res.statusCode = 400;
		res.json(err);
	});
	app.listen(process.env.PORT || 10010, function(){
		console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
	});
});
