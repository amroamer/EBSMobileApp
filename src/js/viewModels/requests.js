
/*
 * Your dashboard ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'ojs/ojlistview', 'ojs/ojarraytabledatasource', 'ojs/ojbutton', 'ojs/ojinputtext'],
    function(oj, ko, $, app) {

        function RequestsViewModel() {
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
			
			self.requestId = ko.observable("");
            self.requestNameEn = ko.observable("");
            self.requestNameAr = ko.observable("");
			
			var requestsUrl = 'http://192.168.1.118:7101/EBSMobile/rest/requestservice' ;
            //http://127.0.0.1:7101/EBSMobile/jersey/request
                //192.168.1.117
                var arr = [];


			self.dataSource = new oj.ArrayTableDataSource(self.allItems(), {
                        idAttribute: "requestId"
            });

            $.ajax({
                type: 'GET',
                url: requestsUrl,
                success: function(response) {
                   
		
                $.each(response, function(i, item) {
					console.log(item);
					self.allItems.push({
                        "requestId": item.requestId,
                        "requestNameEn": this.requestNameEn,
                        "requestNameAr": this.requestNameAr
                    });
						 
                 });
				 
				 console.log("items " + self.allItems().length);
                    self.dataSource.add(self.allItems());


                },
                error: function(xhr, textStatus, errorThrown) {
                    alert(textStatus);
                }
            });
			
			
			this.gotoContent = function(event, ui) {
				
				oj.Router.rootInstance.go('requestsList'); 
               
              /*   if (ui.option === 'selection') {
                    // Access selected elements via ui.items
                    var selectedIdsArray = $.map(ui.items, function(selectedListItem) {
						
                        return selectedListItem.id;
                    });
                    self.selectedIds(selectedIdsArray); // show selected list item elements' ids
                }

                if (ui.option === 'currentItem' && ui.value != null) {
                    // Access current item via ui.item
                    self.currentItemId(ui.item.attr('id'));

                    var row = self.allItems()[self.currentItemId()];
					
				
				
					self.requestNameEn("test");
          
					
					
					
					    $("#page1").toggleClass("demo-page1-hide");
                $("#page2").toggleClass("demo-page2-hide"); 
					
					   $("#page1").hide();
					$("#page2").show(); */
               
            
               // }
            };
			
			self.slide = function() {

             
            }
			
			this.gotoList = function(event, ui) {
				
				
				
					   $("#page2").hide();
					$("#page1").show();
					    $("#page1").toggleClass("demo-page1-hide");
                $("#page2").toggleClass("demo-page2-hide"); 
                //self.slide();
                /*   $("#listview").ojListView("option", "currentItem", null);
                  self.slide(); */
            };

			

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
            self.handleActivated = function(params) {
                // Implement if needed
				
					
				var parentRouter = params.valueAccessor().params['ojRouter']['parentRouter'];
				
				// add aboutList as default state on child router
				var routerConfigOptions = {
				  'requestsList': { label: 'requestsList', isDefault: true },
				};

				//self.router = parentRouter.createChildRouter('requests').configure(routerConfigOptions);
				
				 return oj.Router.sync();
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
        return new RequestsViewModel();
    }
);