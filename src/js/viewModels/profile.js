/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your profile ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'appController'],
 function(oj, ko, $, app) {
  
    function ProfileViewModel() {
      var self = this;

      // Header Config
      self.headerConfig = {'viewName': 'header', 'viewModelFactory': app.getHeaderModel()};
	  
	  
	  
			self.empUserName = ko.observable(oj.Translations.getTranslatedString('empUserName'));
            self.empFullName = ko.observable(oj.Translations.getTranslatedString('empFullName'));

            self.empNumber = ko.observable(oj.Translations.getTranslatedString('empNumber'));
            self.empEmailAddress = ko.observable(oj.Translations.getTranslatedString('empEmailAddress'));
            self.empGradeName = ko.observable(oj.Translations.getTranslatedString('empGradeName'));
            self.empPositionName = ko.observable(oj.Translations.getTranslatedString('empPositionName'));

            self.empOrgName = ko.observable(oj.Translations.getTranslatedString('empOrgName'));
            self.empSupervisor = ko.observable(oj.Translations.getTranslatedString('empSupervisor'));
            self.backLabel = ko.observable(oj.Translations.getTranslatedString('back'));
			
			
				
			self.content = ko.observable("");
			 self.userName = ko.observable("");
            self.fullName = ko.observable("");
            self.employeeNumber = ko.observable("");
            self.emailAddress = ko.observable("");
            self.gradeName = ko.observable("");
            self.positionName = ko.observable("");
            self.ogrName = ko.observable("");
            self.supervisor = ko.observable("");
            self.empimage = ko.observable("");

           
			/* this.selectedItems = ko.observableArray([]);

            self.allItems = ko.observableArray([]);
            var lastItemId = this.allItems().length;

            self.selectedItems = ko.observableArray([]); */ // observable bound to selection option to monitor current selections

			// alert(localStorage.getItem("loggedInUsername"));


            var repo_url = 'http://192.168.1.118:7101/EBSMobile/rest/employee/' + localStorage.getItem("loggedInUsername");
			//http://127.0.0.1:7101/EBSMobile/jersey/employee/1056001066/
			//192.168.1.117
            var arr = [];




            $.ajax({
                type: 'GET',
                url: repo_url,
                success: function(response) {
					console.log(response);
					self.content(response);
					self.userName(response.userName);
                    self.fullName(response.fullName);
					
					app.empFullName (response.fullName);
					
					
                    self.employeeNumber(response.employeeNumber);
                    self.emailAddress(response.emailAddress);
                    self.gradeName(response.gradeName);
                    self.positionName(response.positionName);
                    self.ogrName(response.orgName);
                    self.supervisor(response.supervisor);
                    self.empimage('data:image/gif;base64,'+response.image);
					app.empImage ('data:image/gif;base64,'+response.image);

                },
                error: function(xhr, textStatus, errorThrown) {
                    alert(textStatus);
                }
            });

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
    return new ProfileViewModel();
  }
);
