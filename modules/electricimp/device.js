var config = require("./config.js");
var electricimpClient = require("./electricimpClient.js");

/**
 * This class exposes methods to get and edit an electricimp device
 * @class Device
 * @constructor Device
 * @param {String} id: The id of the device to get 
 */
function Device(id) {
  
  if (!id) {
    throw {
      "errorCode": "Invalid_Parameter",
      "errorDetail": "id cannot be null or empty"
    };
  }
  var url = config.electricimpAPIUrl + "/devices/"+id;
  var httpObj = {
      url: url,
      method: "GET"
  };
  try{
    var response = electricimpClient.callApi(httpObj);
    if(response.status=="200" && response.body){
      	var body = JSON.parse(response.body);
      	if(body.success){
          this.id= id;
          return;
        }
    }
    
  }catch(response){
       throw response.body;
  }
};



/**
 * This method delete the device from electricimp.  
 * @method delete
 * @return {Object} success: true/false
 */
Device.prototype.delete = function() {
  return deleteDevice(this.id);
};

/**
 * This method restarts all of the devices assigned to a specific device.  
 * @method restart
 * @return {Object} success: true/false
 */
Device.prototype.restart = function() {
  return restartDevice(this.id);
};

/**
 * This method updates the device model id.  
 * @method updateModel
 * @return {Object} success: true/false
 */
Device.prototype.updateModel = function(modelId) {
  return updateDeviceModel(this.id, modelId);
};

function updateDeviceModel(deviceId, modelId){
  if (!deviceId) {
    throw {
      "errorCode": "Invalid_Parameter",
      "errorDetail": "deviceId cannot be null if Device object is not initiated"
    };
  }
  if (!modelId){
    modelId="";
  }
  var http = require("http");
  var url = config.electricimpAPIUrl + "devices/" + deviceId + "?model_id=" + modelId;
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

function deleteDevice(deviceId){
  if (!deviceId) {
    throw {
      "errorCode": "Invalid_Parameter",
      "errorDetail": "deviceId cannot be null if Device object is not initiated"
    };
  }
  var http = require("http");
  var url = config.electricimpAPIUrl + "devices/" + deviceId;
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
 * This method lists all the devices created under your account.  
 * @method listDevices
 * @return {Object} paginated list of devices with their complete details
 */
function listDevices(){
  
  var url = config.electricimpAPIUrl + "devices";
  var httpObj = {
      url: url,
      method: "GET"
    };
  var result = electricimpClient.callApi(httpObj);
  if(result.body)
  	return result.body;
}

/**
 * This method restarts a device of id
 * @method restartDevice
 * @param {String}  deviceId : value to query on
 * @return {Object} success: true/false
 */
function restartDevice(deviceId){
  
  var url = config.electricimpAPIUrl + "devices/" + deviceId + "/restart" 
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
  
 