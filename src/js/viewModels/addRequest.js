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
    function ADDRequestViewModel(params) {
      var self = this;
	   self.val= ko.observable();
	     self.currentColor = ko.observable("red");
		 
		 
		 
		 
	   self.requestDateLbl = ko.observable(oj.Translations.getTranslatedString("requestDate"));
	   self.employmentCertificationNameLbl = ko.observable(oj.Translations.getTranslatedString("employmentCertificationName"));
	   self.toWhomArabicLbl = ko.observable(oj.Translations.getTranslatedString("toWhomArabic"));
	   self.endosermentRequiredLbl = ko.observable(oj.Translations.getTranslatedString("endosermentRequired"));
	   self.justificationLbl = ko.observable(oj.Translations.getTranslatedString("justification"));
	   self.noOfCopiesLbl = ko.observable(oj.Translations.getTranslatedString("noOfCopies"));
	    self.statusLbl = ko.observable(oj.Translations.getTranslatedString("status"));
		self.addRequestLbl = ko.observable(oj.Translations.getTranslatedString("addRequest"));
			self.submitBtnLbl = ko.observable(oj.Translations.getTranslatedString("submit"));
	  self.yesLbl = ko.observable(oj.Translations.getTranslatedString("yes"));
			self.noLbl = ko.observable(oj.Translations.getTranslatedString("no"));
	    // Header Config
            self.headerConfig = {
                'viewName': 'header',
                'viewModelFactory': app.getHeaderModel()
            };
			
			self.allItems = ko.observableArray([]);
			
			this.certificateNamesList = ko.observableArray([]);
			
			self.endosermentRequiredArr = ko.observableArray([
			     {value:  self.yesLbl(), label: self.yesLbl()},
				      {value: self.noLbl(), label: self.noLbl()}
			
			]);
			
			console.log("getEmpCertNames");
			
			  var getEmpCertNamesUrl = 'http://192.168.1.118:7101/EBSMobile/rest/empCertificate/getEmpCertNames';
            //http://localhost:7101/EBSMobile/rest/empCertificate/getEmpCertNames
                //192.168.1.117
                var arr = [];


			self.dataSource = new oj.ArrayTableDataSource(self.allItems(), {
                        idAttribute: "certificateName"
            });

            $.ajax({
                type: 'GET',
                url: getEmpCertNamesUrl,
                success: function(response) {
                   	console.log(response);
		
                $.each(response, function(i, item) {
					console.log(item);
					self.certificateNamesList.push({
                        "certificateName": item.certificateName
                    });
						 
                 });
				 
			/* 	 console.log("items " + self.allItems().length);
                    self.dataSource.add(self.allItems()); */


                },
                error: function(xhr, textStatus, errorThrown) {
                    alert(textStatus);
                }
            });
			
			 
			 
			 
			 self.submitEmpCertificateRequest = function(data, event){
				console.log("submitEmpCertificateRequest");
				oj.Router.rootInstance.go('requestApproversList'); 
						//self.clickedButton(event.currentTarget.id);
				return true;
			}

    }
    return ADDRequestViewModel;
  });
