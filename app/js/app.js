'use strict';

// Declare app level module which depends on views, and components
angular.module('app', [
    
    'ngAnimate',
    'ngSanitize',
    'ngTouch',
    'ui.router',
    'ui.bootstrap',
    'ui.utils',
    'ui.load',
    'ui.jq',
    'oc.lazyLoad',
    'perfect_scrollbar',
    'angular-inview',
    'angular-loading-bar',
    'textAngular',
    'ngAria',
    'ngMaterial',
    'ngMessages',
    'froala',
    'lfNgMdFileInput',
    'base64',
    'timer',
    'ngStorage'
]).value('froalaConfig', {
		toolbarInline: false,
		placeholderText: 'Enter Text Here'
	});;

  
     