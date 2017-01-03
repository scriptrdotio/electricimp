# Electricimp Connector

## About Electricimp
Electric Imp offers an innovative and powerful Internet of Things platform that securely connects devices with advanced cloud computing resources. Electric Imp provides a fully integrated hardware, OS, security, APIs and cloud services. The Electric Imp [platform](https://electricimp.com/platform/) enables innovative commercial and industrial applications and empowers manufacturers to manage and quickly scale their connected products and services to millions of users.

## Purpose of the scriptr.io connector for Electric Imp Build APIs
The Electric Imp Build APIbeta provides developers with a means to access the functionality of Electric Imp’s web-based IDE by other means, allowing them to develop imp application models using the tools of their choice.

The purpose of this connector is to simplify and streamline the way you access Electric Imp Build APIs from scriptr.io, by providing you with a few native objects and functions that you can directly integrate into your own scripts. Our purpose is to encourage developers to use electric imp in combination with scriptr.io.

## Components
- electricimp/config.js: This script is a configuration js file in which the URL prefix to all electricimp's APIs as well as the Build API Keys of the developer's account.
- electricimp/electricimpClient.js: This script contains the generic function (callAPI) that authorize and call any Electric Imp Build API based on the parameters sent.
- electricimp/model.js: The model resource represents an imp application and comprises agent and device code. 
- electricimp/device.js: The device resource represents any imp-enabled device. It provides access to the same information currently displayed in the IDE.
- electricimp/test/test.js: Is a sample test API that creates a model and perform some object functions on it.

## How to use
- [Sign up](https://ide.electricimp.com/login) for an Electric Imp account.
- Set the Electric Imp API key retrieved from the developers Build APIs Key [page](https://ide.electricimp.com/ide/) in the config.js file.
