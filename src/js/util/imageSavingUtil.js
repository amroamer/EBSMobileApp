/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

define([
], function ($) {
    function imageSavingUtil() {
        var self = this;

        var successCallback = function(fileDetails, newFileName) {
            console.log("successfully saved to project directory");
            console.log(fileDetails);
            console.log("Saved image " + newFileName + " to " + fileDetails.nativeURL);
            // Clear the image from cache directory
            self.clearCache();
        };

        var errorinMovingFileCallback = function() {
            console.log("Error in moving image to directory");
        };

        var errorForFolderCallback = function(directory) {
            console.log("Error in getting " + directory + " directory");
        };
        
        self.clearCache = function() {
            var success = function(status) {
                console.log("Cache cleared: " + status);
            };
            var error = function(error) {
                console.log("Error while clearing cache: " + error);
            };
            window.CacheClear(success, error);
        };

        self.saveImage = function(fileEntry, newFileName) {
            console.log('newFileName: ' + newFileName);
            window.resolveLocalFileSystemURL(cordova.file.externalRootDirectory, function(dir) {
                console.log("inside success of root folder");
                dir.getDirectory("Apps Pro", {
                    create: true
                }, function(applicationDirectory) {
                    console.log("inside Apps Pro dir");
                    fileEntry.moveTo(applicationDirectory, newFileName, successCallback(applicationDirectory, newFileName), errorinMovingFileCallback);
                }, errorForFolderCallback("Apps Pro"));
            }, errorForFolderCallback("root"));
        };

        self.onCaptureSuccess = function(imageURI) {
            console.log(imageURI);
            //Move image to root folder
            window.resolveLocalFileSystemURL(imageURI, function(fileEntry) {
                console.log("inside cache folder");
                var oldFileURI = imageURI;
                var fileExtension = "." + oldFileURI.split('.').pop();
                var date = new Date();
                var fullDate = date.toISOString().substr(0, 10);
                var newFileName = "IMG_" + fullDate + "_" + date.getTime() + fileExtension;
                console.log("newFileName: " + newFileName);
                self.saveImage(fileEntry, newFileName);
            }, errorForFolderCallback("cache"));
        };

        self.onCaptureFail = function(error) {
            console.log("Failed to capture image: " + error);
        };
    };
    return new imageSavingUtil();
});
