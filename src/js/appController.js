/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your application specific code will go here
 */
define(['ojs/ojcore','knockout', 'ojs/ojrouter', 'ojs/ojarraytabledatasource', 'ojs/ojoffcanvas', 'ojs/ojbutton'],
  function(oj,ko) {
     function ControllerViewModel() {
      var self = this;
	  
	  
	    'use strict';
        // Set debug mode and log level
        oj.Assert.forceDebug();
        oj.Logger.option('level',  oj.Logger.LEVEL_INFO);

	  
	   self.mobileAppName = ko.observable(oj.Translations.getTranslatedString("mobileAppName"));
	   self.profile = ko.observable(oj.Translations.getTranslatedString("profile"));
	   self.worklist = ko.observable(oj.Translations.getTranslatedString("worklist"));
	   self.about = ko.observable(oj.Translations.getTranslatedString("about"));
	   self.requests = ko.observable(oj.Translations.getTranslatedString("requests"));
	   self.requestsList = ko.observable(oj.Translations.getTranslatedString("requestHistoryList"));
	   self.addRequest = ko.observable(oj.Translations.getTranslatedString("addRequest"));
	   self.requestApproversList = ko.observable(oj.Translations.getTranslatedString("requestApproversList"));
	  self.request= ko.observable(oj.Translations.getTranslatedString("request"));
	
      // Router setup
      self.router = oj.Router.rootInstance;
      self.router.configure({
		   'login': {label: 'Login', isDefault: true},
		   'profile': {label: self.profile()},
		   'requests': {label:  self.requests()},
		   'dashboard': {label:  self.worklist()},
		   'incidents': {label: 'Incidents'},
		   'customers': {label: 'Customers'},
		   'about': {label:  self.about()},
		   'requestsList': {label:  self.requestsList()},
		    'addRequest': {label:  self.addRequest()} ,
			'requestApproversList' : {label:self.requestApproversList()},
			'requestContent' : {label:self.request()}
			
      });
	  
	  
      oj.Router.defaults['urlAdapter'] = new oj.Router.urlParamAdapter();
      self.moduleConfig = self.router.moduleConfig;

      // Navigation setup
      var navData = [
	  {name: self.profile(), id: 'profile',
       iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-person-icon-24'},
	  {name:  self.requests(), id: 'requests',
       iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-chart-icon-24'},
      {name:  self.worklist(), id: 'dashboard',
       iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-chart-icon-24'},
      /* {name: 'Incidents', id: 'incidents',
       iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-fire-icon-24'},
      {name: 'Customers', id: 'customers',
       iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-people-icon-24'}, */
    
      {name: self.about(), id: 'about',
       iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-info-icon-24'}
      ];
      self.navDataSource = new oj.ArrayTableDataSource(navData, {idAttribute: 'id'});

	  
	 
	  
	  
      // Drawer setup
      self.toggleDrawer = function() {
        return oj.OffcanvasUtils.toggle({selector: '#navDrawer', modality: 'modal', content: '#pageContent'});
      }
      // Add a close listener so we can move focus back to the toggle button when the drawer closes
      $("#navDrawer").on("ojclose", function() { $('#drawerToggleButton').focus(); });

      // Header Setup
      self.getHeaderModel = function() {
        var headerFactory = {
          createViewModel: function(params, valueAccessor) {
            var model =  {
              pageTitle: self.router.currentState().label,
              handleBindingsApplied: function(info) {
                // Adjust content padding after header bindings have been applied
                self.adjustContentPadding();
              },
              toggleDrawer: self.toggleDrawer
            };
            return Promise.resolve(model);
          }
        }
        return headerFactory;
      }

      // Method for adjusting the content area top/bottom paddings to avoid overlap with any fixed regions. 
      // This method should be called whenever your fixed region height may change.  The application
      // can also adjust content paddings with css classes if the fixed region height is not changing between 
      // views.
      self.adjustContentPadding = function () {
        var topElem = document.getElementsByClassName('oj-applayout-fixed-top')[0];
        var contentElem = document.getElementsByClassName('oj-applayout-content')[0];
        var bottomElem = document.getElementsByClassName('oj-applayout-fixed-bottom')[0];

        if (topElem) {
          contentElem.style.paddingTop = topElem.offsetHeight+'px';
        }
        if (bottomElem) {
          contentElem.style.paddingBottom = bottomElem.offsetHeight+'px';
        }
        // Add oj-complete marker class to signal that the content area can be unhidden.
        // See the override.css file to see when the content area is hidden.
        contentElem.classList.add('oj-complete');
      }
    }

    return new ControllerViewModel();
  }
);
