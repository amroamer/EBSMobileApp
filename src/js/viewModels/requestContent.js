/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
'use strict';
define(['ojs/ojcore','knockout',
        'appController',
        'ojs/ojlistview',
        'ojs/ojarraytabledatasource','ojs/ojinputtext','ojs/ojselectcombobox', 'ojs/ojradioset'],
  function(oj,ko, app) {
    function RequestContentViewModel(params) {
      var self = this;
	   self.val= ko.observable();
	     self.currentColor = ko.observable("red");
		 
		 console.log("RequestContentViewModel");
		 
		 	  self.allItems = ko.observableArray([]);
            var lastItemId = self.allItems().length;

            self.selectedItems = ko.observableArray([]);
			self.selectedIds = ko.observableArray([]);
            self.currentItemId = ko.observable();
			
			
	   self.requestDateLbl = ko.observable(oj.Translations.getTranslatedString("requestDate"));
	   self.employmentCertificationNameLbl = ko.observable(oj.Translations.getTranslatedString("employmentCertificationName"));
	   self.toWhomArabicLbl = ko.observable(oj.Translations.getTranslatedString("toWhomArabic"));
	   self.endosermentRequiredLbl = ko.observable(oj.Translations.getTranslatedString("endosermentRequired"));
	   self.justificationLbl = ko.observable(oj.Translations.getTranslatedString("justification"));
	   self.noOfCopiesLbl = ko.observable(oj.Translations.getTranslatedString("noOfCopies"));
	    self.statusLbl = ko.observable(oj.Translations.getTranslatedString("status"));
		self.addRequestLbl = ko.observable(oj.Translations.getTranslatedString("addRequest"));
			self.submitBtnLbl = ko.observable(oj.Translations.getTranslatedString("submit"));
			self.backBtnLbl = ko.observable(oj.Translations.getTranslatedString("back"));
	  
	    // Header Config
            self.headerConfig = {
                'viewName': 'header',
                'viewModelFactory': app.getHeaderModel()
            };
			 self.backToRequestHistoryList = function(data, event){
				console.log("backToRequestHistoryList");
				oj.Router.rootInstance.go('requestsList'); 
						//self.clickedButton(event.currentTarget.id);
				return true;
			}
			
			
				
		

		
			 // Retrieve
			self.certificationName = ko.observable(localStorage.getItem("certificationName"));
			
			self.endorsementRequired = ko.observable(localStorage.getItem("endorsementRequired"));
			
			self.justification = ko.observable(localStorage.getItem("justification"));
			
			self.noOfCopies = ko.observable(localStorage.getItem("noOfCopies"));
			
			self.status = ko.observable(localStorage.getItem("status"));
			
			self.requestDate = ko.observable(localStorage.getItem("requestDate"));
			
			self.certificationName = ko.observable(localStorage.getItem("certificationName"));
			
			self.whomNameArabic = ko.observable(localStorage.getItem("whomNameArabic"));
		 
			 
			 /* self.saveAndSubmitEmpCertificateRequest = function(data, event){
				console.log("submitEmpCertificateRequest");
				oj.Router.rootInstance.go('requests'); 
						//self.clickedButton(event.currentTarget.id);
				return true;
			}
			
			this.gotoContent = function(event, ui) {
				
				console.log(" requests list go to content" );
                if (ui.option === 'selection') {
                    // Access selected elements via ui.items
                    var selectedIdsArray = $.map(ui.items, function(selectedListItem) {
                        return selectedListItem.id;
                    });
                    self.selectedIds(selectedIdsArray); // show selected list item elements' ids
                }

            };
			
			
			
			var transactionId = "1234";
			
			var empCertificateUrl = 'http://192.168.1.118:7101/EBSMobile/rest/approval/getRequestApproversList/'+ transactionId;
					//http://localhost:7101/EBSMobile/rest/approval/getRequestApproversList/1
					//192.168.1.117
            var arr = [];


			self.dataSource = new oj.ArrayTableDataSource(self.allItems(), {
                        idAttribute: "displayName"
            });

            $.ajax({
                type: 'GET',
                url: empCertificateUrl,
                success: function(response) {
                   console.log("success ="+response);
		
                $.each(response, function(i, item) {
					console.log(item);
					
			
					  self.allItems.push({
                        "displayName": item.displayName
                    }); 
						 
                 });
				 
				 console.log("items " + self.allItems().length);
                 self.dataSource.add(self.allItems());


                },
                error: function(xhr, textStatus, errorThrown) {
                    alert(textStatus);
                }
            });
			 */

    }
    return RequestContentViewModel;
  });
