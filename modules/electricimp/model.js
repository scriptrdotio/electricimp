var config = require("./config.js");
var electricimpClient = require("./electricimpClient.js");

/**
 * This class exposes methods to manipulate a given electricimp model
 * @class Model
 * @constructor Model
 * @param {String} name: The name of the model
 */
function Model(name) {
  
  if (!name) {
    throw {
      "errorCode": "Invalid_Parameter",
      "errorDetail": "name cannot be null or empty"
    };
  }
  
  this.name = name;
  var paramObject = {
    "name": this.name
  };
  
  var url = config.electricimpAPIUrl + "models";
  var httpObj = {
      url: url,
      method: "POST",
      params: paramObject
  };
  try{
    var response = electricimpClient.callApi(httpObj);
    if(response.status=="200" && response.body){
      	var body = JSON.parse(response.body);
      	if(body.success){
          this.id= body.model.id;
          this.name= body.model.name;
          return;
        }
    }
    
  }catch(response){
       throw response.body;
  }
};


/**
 * This method get the model details.  
 * @method getDetails
 * @return {Object} model details
 */
Model.prototype.getDetails = function() {
  return getModelDetails(this.id);
};

/**
 * This method get the model details.  
 * @method getModule
 * @return {Object} model details
 */
Model.prototype.getModule = function(id) {
  this.id = id;
  return getModelDetails(this.id);
};

/**
 * This method delete the model from electricimp.  
 * @method delete
 * @return {Object} success: true/false
 */
Model.prototype.delete = function() {
  return deleteModel(this.id);
};

/**
 * This method restarts all of the devices assigned to a specific model.  
 * @method restart
 * @return {Object} success: true/false
 */
Model.prototype.restart = function() {
  return restartModel(this.id);
};

/**
 * This method update the model name
 * @method updateName
 * @ param {String} newName
 * @return {Object} success: true/false
 */
Model.prototype.updateName = function(newName) {
  return updateModelName(newName, this.id);
};

function getModelDetails(modelId){
  if (!modelId) {
    throw {
      "errorCode": "Invalid_Parameter",
      "errorDetail": "modelIdd cannot be null if Model object is not initiated"
    };
  }
  var http = require("http");
  var url = config.electricimpAPIUrl + "models/" + modelId;
  var httpObj = {
      url: url,
      method: "GET"
  };
  try{
    var response = electricimpClient.callApi(httpObj);
    if(response.status=="200" && response.body){
		return response.body;
    }
    
  }catch(response){
       throw response.body;
  }
};

function deleteModel(modelId){
  if (!modelId) {
    throw {
      "errorCode": "Invalid_Parameter",
      "errorDetail": "modelId cannot be null if Model object is not initiated"
    };
  }
  var http = require("http");
  var url = config.electricimpAPIUrl + "models/" + modelId;
  var httpObj = {
      url: url,
      method: "DELETE"
  };
  try{
    var response = electricimpClient.callApi(httpObj);
    if(response.status=="200" && response.body){
		return response.body;
    }
    
  }catch(response){
       throw response.body;
  }
};

/**
 * This method lists all the models created under your account.  
 * @method findSystems
 * @return {Object} paginated list of models with their complete details
 */
function listModels(){
  
  var url = config.electricimpAPIUrl + "models";
  var httpObj = {
      url: url,
      method: "GET"
    };
  var result = electricimpClient.callApi(httpObj);
  if(result.body)
  	return result.body;
}

/**
 * This method lists all the models created under your account that contain the string name.  
 * @method getModelByName
 * @param {String}  name : value to query on
 * @return {Object} paginated list of models that contain the string name
 */
function getModelByName(name){
  
  var url = config.electricimpAPIUrl + "models?name=" + name;
  var httpObj = {
      url: url,
      method: "GET"
    };
  var result = electricimpClient.callApi(httpObj);
  if(result.body)
  	return result.body;
}

/**
 * This method restarts all of the devices assigned to a specific model of id modelId. 
 * @method restartModel
 * @param {String}  modelId : value to query on
 * @return {Object} success: true/false
 */
function restartModel(modelId){
  
  var url = config.electricimpAPIUrl + "models/" + modelId + "/restart" 
  var httpObj = {
      url: url,
      method: "POST"
    };
  try{
    var response = electricimpClient.callApi(httpObj);
    if(response.status=="200" && response.body){
		return response.body;
    }
    
  }catch(response){
       throw response.body;
  }
}
  
  /**
 * This method restarts all of the devices assigned to a specific model of id modelId. 
 * @method updateModelName
 * @param {String}  modelId : value to query on
 * @return {Object} model new details
 */
function updateModelName(modelName, modelId){
  
  var url = config.electricimpAPIUrl + "models/" + modelId + "?name=" + modelName; 
  var httpObj = {
      url: url,
      method: "PUT"
    };
  try{
    var response = electricimpClient.callApi(httpObj);
    if(response.status=="200" && response.body){
		return response.body;
    }
    
  }catch(response){
       throw response.body;
  }
}