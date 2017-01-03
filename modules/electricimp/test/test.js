var electricimpClient = require("../electricimpClient.js");
var model = require("../model.js");

var resp = new model.Model("xxxxx");

var updateNameResult = resp.updateName("xccccxx");
console.log("Model name update result: " + updateNameResult);

var modelDetails = resp.getDetails();
console.log("Model details result: " + modelDetails);

var deleteResults = resp.delete();
console.log("Model delete result: " + deleteResults);


