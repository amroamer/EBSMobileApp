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
        'ojs/ojarraytabledatasource'],
  function(oj,ko, app) {
    function RequestsListViewModel(params) {
      var self = this;
	  
	  
	    // Header Config
            self.headerConfig = {
                'viewName': 'header',
                'viewModelFactory': app.getHeaderModel()
            };
			
			  self.allItems = ko.observableArray([]);
            var lastItemId = self.allItems().length;

            self.selectedItems = ko.observableArray([]);
			self.selectedIds = ko.observableArray([]);
            self.currentItemId = ko.observable();
			
			
		
			self.addEmpCertificateRequest = function(data, event){
				console.log("addEmpCertificateRequest");
				oj.Router.rootInstance.go('addRequest'); 
						//self.clickedButton(event.currentTarget.id);
				return true;
			}
			
			
			self.certificationId=ko.observable("");
			self.certificationName=ko.observable("");
			self.endorsementRequired=ko.observable("");
			self.justification=ko.observable("");
			self.noOfCopies=ko.observable("");
			self.personId=ko.observable("");
			self.requestDate=ko.observable("");
			self.status=ko.observable("");
			self.userName=ko.observable("");
			self.toWhomArabic = ko.observable("");

			
			this.gotoContent = function(event, ui) {
				
				console.log(" requests list go to content" );
                if (ui.option === 'selection') {
                    // Access selected elements via ui.items
                    var selectedIdsArray = $.map(ui.items, function(selectedListItem) {
                        return selectedListItem.id;
                    });
                    self.selectedIds(selectedIdsArray); // show selected list item elements' ids
                }

				
				
                // self.slide();
                if (ui.option === 'currentItem' && ui.value != null) {
                    // Access current item via ui.item
                    self.currentItemId(ui.item.attr('id'));

                    var row = self.allItems()[self.currentItemId()];
			
					
					console.log(row);
						self.certificationName(row.certificationName);
						localStorage.setItem("certificationName", row.certificationName);
			self.endorsementRequired(row.endorsementRequired);
			localStorage.setItem("endorsementRequired",row.endorsementRequired);
			self.justification(row.justification);
			localStorage.setItem("justification", row.justification);
			self.noOfCopies(row.noOfCopies);
			localStorage.setItem("noOfCopies", row.noOfCopies);
			self.personId(row.personId);
			localStorage.setItem("personId", row.personId);
			self.requestDate(row.requestDate);
			localStorage.setItem("requestDate", row.requestDate);
			self.status(row.status);
			localStorage.setItem("status", row.status);
			self.userName(row.userName);
			localStorage.setItem("userName", row.userName);
			
			self.toWhomArabic(row.whomNameArabic);
			localStorage.setItem("whomNameArabic", row.whomNameArabic);	
					
					console.log(	self.certificationName());	
					oj.Router.rootInstance.go('requestContent'); 
					
					
                }
            };
			
			
			var empCertificateUrl = 'http://192.168.1.118:7101/EBSMobile/rest/empCertificate/getEmpCertificateHistory/'+ localStorage.getItem("loggedInUsername") ;
					//http://localhost:7101/EBSMobile/rest/empCertificate/{userName}
					//192.168.1.117
            var arr = [];


			self.dataSource = new oj.ArrayTableDataSource(self.allItems(), {
                        idAttribute: "certificationId"
            });

            $.ajax({
                type: 'GET',
                url: empCertificateUrl,
                success: function(response) {
                   console.log("success ="+response);
		
                $.each(response, function(i, item) {
					console.log(item);
					
			
					 self.allItems.push({
                        "certificationId": item.certificationId,
                        "certificationName": this.certificationName,
                        "endorsementRequired": this.endorsementRequired,
                        "justification": this.justification,
                        "noOfCopies": this.noOfCopies,
                        "personId": this.personId,
                        "requestDate": this.requestDate,
                        "status": this.status,
                        "whomNameArabic": this.whomNameArabic,
                        "userName": this.userName
                    });
						 
                 });
				 
				 console.log("items " + self.allItems().length);
                 self.dataSource.add(self.allItems());


                },
                error: function(xhr, textStatus, errorThrown) {
                    alert(textStatus);
                }
            });
			

    /*   // retrieve about items to render the list
      self.aboutOptions = new oj.ArrayTableDataSource(params.list, {idAttribute: 'id'});

      self.handleActivated = function() {
        var contentElem = document.getElementsByClassName('oj-applayout-content')[0];
        contentElem.style.paddingTop = 0;
      }

      self.handleBindingsApplied = function(info) {
        if (app.pendingAnimationType === 'navParent') {
          app.preDrill();
        }
      };

      self.handleTransitionCompleted = function(info) {
        if (app.pendingAnimationType === 'navParent') {
          app.postDrill();
        }
      }; */

    }
    return RequestsListViewModel;
  });
