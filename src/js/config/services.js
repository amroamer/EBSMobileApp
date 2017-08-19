/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

define(['config/serviceconfig', 'util/commonhelper'
], function (serviceConfig, commonHelper) {

    /**
     * The view model for managing all services
     */
    function services() {

        var self = this;
        
        var servicesHost = commonHelper.getHost();
        
        self.authenticate = function (payload) {
            var serviceURL = servicesHost + "login";
            return serviceConfig.callPostService(serviceURL, payload, serviceConfig.contentTypeApplicationJSON);
        };
        
        self.getExampleDetails = function () {
            // var serviceURL = servicesHost + apiVersion + "profile";
            var serviceURL = servicesHost + 'exampleService';
            return serviceConfig.callGetService(serviceURL, serviceConfig.contentTypeApplicationJSON);
        };
    };

    return new services();
});