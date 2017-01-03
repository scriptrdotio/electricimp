var config = require("./config.js");
var http = require("http");


/**
 * Invoke a given electricImp
 * @method callApi
 * @param {Object} params : the parameters of the http call to issue
 * 	{String} params.url : the url of the targeted API
 *	{String} params.method : (optional) the http method to use when invoking the electricimpClient API
 *	{Object} params.headers: (optional) the http headers to send to the electricimpClient API
 *	{Object} params.params: (optional) the parameters that are expected by the electricimpClient API
 */
function callApi(params) {
  try {   
     return _callElectricimpApi(params);
  }catch(response) {
     throw response;
  }
};

function _callElectricimpApi(params) {
  var apiKey = config.apiKey;
  if (params.params) {
    params.params = _paramsToString(params.params);
  }else{
    params.params = _paramsToString({});
  }
  if(!params["headers"]){
    params["headers"]={};
  }
  if(!params["params"]){
    params["params"]={};
  }
  params["headers"]["Authorization"] = "Basic " + btoa("97a5f69d74bf3cbc5ee5a38f23ff1469");
  params["headers"] = params["headers"]  ? params["headers"] :{};
  params["url"] = (params["url"].indexOf(config.electricimpAPIUrl) > -1)  ? params["url"] :config.electricimpAPIUrl + params["url"];
  var response = http.request(params);
  if (response.status == "200") {
    return response;
  }else {
	
    throw response;
  }
};

function _paramsToString(params) {
  
  var newParams = {};
  for (var p in params) {
    
    if (typeof(params[p]) != "object") {
    	newParams[p] = "" +  params[p];
    }else {
      newParams[p] = params[p];
    }
  }
  
  return newParams;
};	