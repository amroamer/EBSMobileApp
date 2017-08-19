/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

define(['jquery'
], function ($) {

    /**
     * The view model for managing service calls
    */
    function serviceConfig() {
        
        var self = this;
        
        self.contentTypeApplicationJSON = 'application/json';
        
        self.callGetService = function (serviceUrl) {
            var defer = $.Deferred();
            $.ajax({
                type: "GET",
                url: serviceUrl,
                success: function (data) {
                    console.log('Successfully retrieved details at: ' + serviceUrl);
                    defer.resolve(data);
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    console.log("Error retrieving service details at: " + serviceUrl);
                    defer.reject(xhr);
                }
            });
            return $.when(defer);
        };

        self.callPostService = function (serviceUrl, payload, contentType) {
            var payloadStr = JSON.stringify(payload);
            console.log('Payload : '+ payloadStr);
            var defer = $.Deferred();
            $.ajax({
                type: "POST",
                url: serviceUrl,
                contentType: contentType,
                data: payloadStr,
                success: function (data) {
                    console.log('Successfully posted data at: ' + serviceUrl);
                    defer.resolve(data);
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    console.log("Error posting data to the service" + serviceUrl);
                    defer.reject(xhr);
                }
            });
            return $.when(defer);
        };
    }
    
    return new serviceConfig();
});