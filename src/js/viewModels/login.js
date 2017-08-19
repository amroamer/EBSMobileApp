/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your about ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'ojs/ojinputtext', 'ojs/ojbutton','ojs/ojdialog' , 'ojs/ojprogressbar'],
    function(oj, ko, $, app) {

        function AboutViewModel() {
            var self = this;

            // Header Config
            self.headerConfig = {
                'viewName': 'header',
                'viewModelFactory': app.getHeaderModel()
            };
			
			
			self.progressValue = ko.observable(0);
		 /*  self.progressValue.subscribe(function(newValue) {
			  console.log("new value " + newValue);
			if(newValue == 100) {
			  $("#progressbar").remove();
			  $("#progresscircle").remove();
			  $("#loadingRegion").removeAttr("aria-busy");
			  $("#loadingRegion").removeAttr("aria-describedby");
			  $("#loadingRegion").text("Done!");
			  	$("#modalDialog1").ojDialog("close");
				 window.clearInterval( self.intevalId);
			}
		  }); */
		  
		/*    self.intevalId = window.setInterval(function() {
			  // console.log("set interval");
                    if (self.progressValue() !== -1)
                      self.progressValue(self.progressValue() + 1);
                  }, 100); */


            self.usernameLabel = ko.observable(oj.Translations.getTranslatedString('username'));
            self.passwordLabel = ko.observable(oj.Translations.getTranslatedString('password'));

            self.loginLabel = ko.observable(oj.Translations.getTranslatedString('login'));
            self.resetLabel = ko.observable(oj.Translations.getTranslatedString('reset'));
            self.okLabel = ko.observable(oj.Translations.getTranslatedString('ok'));

            self.usernameInput = ko.observable("");
            self.passwordInput = ko.observable("");


            self.resetClick = function(data, event) {
                self.usernameInput("");
                self.passwordInput("");
                return true;
            }
			
			
			
			self.handleOKClose = $("#okButton").click(function() {
				$("#modalDialog1").ojDialog("close"); });


            self.loginClick = function(data, event) {
				
	/* 			 $("#modalDialog1").ojDialog("open");
					$("#okButton").click(function() {
				$("#modalDialog1").ojDialog("close"); }); */

				 

                if (self.usernameInput() == null || self.usernameInput() === "" || self.passwordInput() == null || self.passwordInput() === "") {
                    alert(oj.Translations.getTranslatedString('emptyUserNameAndPassword'));
                } else {

                    console.log(self.usernameInput());
                    console.log(self.passwordInput());

                    var loginURL = 'http://192.168.1.118:7101/EBSMobile/rest/employee/'+self.usernameInput()+'/'+ self.passwordInput();
   								  //http://127.0.0.1:7101/EBSMobile/rest/employee/{userName}/{password}
                    $.ajax({
                        type: 'GET',
                        url: loginURL,
                        contentType: "application/json; charset=utf-8",
                        success: function(response) {
                           // alert(response.login);
							localStorage.setItem("loggedInUsername", self.usernameInput());
							         
							oj.Router.rootInstance.go('profile'); 
                           
                        },
                        error: function(xhr, textStatus, errorThrown) {
                            alert("error");

                        }
                    });
                }


                return true;
            }


            // Below are a subset of the ViewModel methods invoked by the ojModule binding
            // Please reference the ojModule jsDoc for additionaly available methods.

            /**
             * Optional ViewModel method invoked when this ViewModel is about to be
             * used for the View transition.  The application can put data fetch logic
             * here that can return a Promise which will delay the handleAttached function
             * call below until the Promise is resolved.
             * @param {Object} info - An object with the following key-value pairs:
             * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
             * @param {Function} info.valueAccessor - The binding's value accessor.
             * @return {Promise|undefined} - If the callback returns a Promise, the next phase (attaching DOM) will be delayed until
             * the promise is resolved
             */
            self.handleActivated = function(info) {
                // Implement if needed
            };

            /**
             * Optional ViewModel method invoked after the View is inserted into the
             * document DOM.  The application can put logic that requires the DOM being
             * attached here.
             * @param {Object} info - An object with the following key-value pairs:
             * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
             * @param {Function} info.valueAccessor - The binding's value accessor.
             * @param {boolean} info.fromCache - A boolean indicating whether the module was retrieved from cache.
             */
            self.handleAttached = function(info) {
                // Implement if needed
            };


            /**
             * Optional ViewModel method invoked after the bindings are applied on this View. 
             * If the current View is retrieved from cache, the bindings will not be re-applied
             * and this callback will not be invoked.
             * @param {Object} info - An object with the following key-value pairs:
             * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
             * @param {Function} info.valueAccessor - The binding's value accessor.
             */
            self.handleBindingsApplied = function(info) {
                // Implement if needed
            };

            /*
             * Optional ViewModel method invoked after the View is removed from the
             * document DOM.
             * @param {Object} info - An object with the following key-value pairs:
             * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
             * @param {Function} info.valueAccessor - The binding's value accessor.
             * @param {Array} info.cachedNodes - An Array containing cached nodes for the View if the cache is enabled.
             */
            self.handleDetached = function(info) {
                // Implement if needed
            };
        }

        /*
         * Returns a constructor for the ViewModel so that the ViewModel is constrcuted
         * each time the view is displayed.  Return an instance of the ViewModel if
         * only one instance of the ViewModel is needed.
         */
        return new AboutViewModel();
    }
);