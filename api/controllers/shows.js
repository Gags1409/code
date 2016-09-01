var Responder = require('../helpers/responder');


/**
    * Filter by fields
    * @param {object=} obj
    * @return {boolean} 
*/
function filterByFields(obj) {
	if ('drm' in obj  && 'episodeCount' in obj && obj.drm && obj.episodeCount > 0 ) {
		return true;
	} else {
		return false;
	}
}
/**
    * Filter payload
    * @param {object=} req
	* @param {object=} res
    * @return {boolean} 
*/
function filter(req, res) {
	var responder = new Responder(req, res);
	var payload = req.body.payload;
	var filteredArr = payload.filter(filterByFields);
	var resArr = [];
    filteredArr.forEach( function (elem, index, array){ 
		var resObj = responder.output;
		if(typeof elem.image.showImage != 'undefined' ){
			resObj.image = elem.image.showImage;
		}
		if(typeof elem.slug != 'undefined' ){
			resObj.slug = elem.slug;
		}
		if(typeof elem.title != 'undefined' ){
			resObj.title = elem.title;
		}
		resArr.push(resObj);
	});
	responder.success(resArr, '');
}
//export 
module.exports = {
  filter: filter
};
