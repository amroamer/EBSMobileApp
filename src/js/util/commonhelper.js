/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

define([],
  function () {

    function commonHelper() {
        var self = this;
        
        var permissions = cordova.plugins.permissions;
        var permissionTypes = {
            camera: permissions.CAMERA,
            read: permissions.READ_EXTERNAL_STORAGE,
            write: permissions.WRITE_EXTERNAL_STORAGE
        };
        
        self.getHost = function() {
			//'http://192.168.1.118:7101/EBSMobile/rest/empCertificate/getEmpCertificateHistory/'+
            var host = "http://192.168.1.118:7101/EBSMobile/rest";
            return host;
        };
        
        self.requestPermissions = function () {
            var list = [permissionTypes.camera, permissionTypes.read, permissionTypes.write];
            permissions.requestPermissions(
                list,
                function (status) {
                    console.log("Success status: " + status);
                    if (!status.hasPermission) {
                        console.log("Permissions not granted:");
                        console.log(status);
                    }
                },
                function (error) {
                    console.log("Error requesting Permissions");
                    console.log(error);
                }
            );
        };
    }

    return new commonHelper();
});