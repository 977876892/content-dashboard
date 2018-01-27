'use strict';
   
/**
 * Config for the router
 */
angular.module('app')

    .config(function($provide){
        $provide.decorator('taOptions', ['taRegisterTool', 'taToolFunctions', '$delegate','textAngularManager','$timeout','$rootScope','taTranslations','$window', function(taRegisterTool, taToolFunctions, taOptions,textAngularManager,$timeout,$rootScope,taTranslations,$window){
            // $delegate is the taOptions we are decorating
            // register the tool with textAngular
             
        taRegisterTool('insertPhoto', {
        iconclass: 'fa fa-picture-o',
        tooltiptext: taTranslations.insertImage.tooltip,
        disabled:"disabled",
       // display:"false",
        action: function(){
           var imageLink;
           imageLink = $window.prompt(taTranslations.insertImage.dialogPrompt, 'http://');
            if(imageLink && imageLink !== '' && imageLink !== 'http://'){
               // return this.$editor().wrapSelection('insertHTML', '<img src="' + imageLink + '" alt="clipbaord image"/>');
              return this.$editor().wrapSelection('insertImage', imageLink, false);
            }
        },
        onElementSelect: {
            element: 'img',
            action: taToolFunctions.imgOnSelectAction
        }
    })
            return taOptions; // whatever you return will be the taOptions            
        }]);
    })   
    .config(
        ['$stateProvider', '$urlRouterProvider', 'JQ_CONFIG','$windowProvider',
            function($stateProvider, $urlRouterProvider, JQ_CONFIG,$windowProvider) {
    
 
                //previous code
                // $urlRouterProvider
                //     .otherwise('/app/dashboard');
                //previous code
                 $urlRouterProvider
                    .otherwise('/access/login');
                $stateProvider

                    .state('app', {
                        abstract: true,
                        url: '/app',
                        templateUrl: 'partials/app.html'
                    })
                    .state('app.dashboard', {
                        url: '/dashboard',
                        templateUrl: 'partials/app_dashboard.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load('chart.js').then(
                                            function() {
                                                return $ocLazyLoad.load('js/controllers/dashboard.js');
                                            }
                                        )
                                        .then(
                                          function(){
                                               return $ocLazyLoad.load('../bower_components/font-awesome/css/font-awesome.css');
                                            }
                                          )/*.then(
                                          function(){
                                                return $ocLazyLoad.load('js/directives/ui-todowidget.js');
                                         }
                                      )*/
                                    ;
                                }
                            ]
                        }
                    })
                    .state('app.widgets', {
                        url: '/widgets',
                        templateUrl: 'partials/widgets.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load(['countTo',
                                        'js/controllers/countto.js', 
                                        'js/controllers/vectormap.js', 
                                        'js/directives/ui-todowidget.js', 
                                        'js/controllers/messages-widget.js',
                                        '../bower_components/font-awesome/css/font-awesome.css'
                                    ]);
                                }
                            ]
                        }
                    })
                    .state('app.searchapp', {
                        url: '/searchapp',
                        templateUrl: 'partials/searchapp.html',
                    })
                    .state('access', {
                        url: '/access',
                        template: '<div ui-view class=""></div>'
                    })
                    .state('access.login', {
                        url: '/login',
                        templateUrl: 'partials/ui-login.html',
                        resolve: {
                            deps: ['uiLoad',
                                function(uiLoad) {
                                    return uiLoad.load(['js/controllers/login.js',
                                        '../bower_components/font-awesome/css/font-awesome.css']);
                                }
                            ]
                        }
                    }) 
                    .state('access.register', {
                        url: '/register',
                        templateUrl: 'partials/ui-register.html'
                        // resolve: {
                        //     deps: ['uiLoad',
                        //         function(uiLoad) {
                        //             return uiLoad.load(['js/controllers/register.js','../bower_components/font-awesome/css/font-awesome.css']);
                        //         }
                        //     ]
                        // }
                    })
                    .state('access.forgotpwd', {
                        url: '/forgotpwd',
                        templateUrl: 'partials/ui-forgotpwd.html',
                        controller:'forgotctrl'
                    })
                    .state('access.404', {
                        url: '/404',
                        templateUrl: 'partials/ui-404.html',
                    })
                    .state('access.500', {
                        url: '/500',
                        templateUrl: 'partials/ui-500.html'
                    })
                    .state('access.lockscreen', {
                        url: '/lockscreen',
                        templateUrl: 'partials/ui-lockscreen.html'
                    })

                .state('app.ui', {
                        url: '/ui',
                        template: '<div ui-view class=""></div>'
                    })
                    .state('app.ui.typography', {
                        url: '/typography',
                        templateUrl: 'partials/ui-typography.html'
                    })
                    .state('app.ui.accordion', {
                        url: '/accordion',
                        templateUrl: 'partials/ui-accordion.html',
                        resolve: {
                            deps: ['uiLoad',
                                function(uiLoad) {
                                    return uiLoad.load(['../bower_components/font-awesome/css/font-awesome.css']);
                                }
                            ]
                        }
                    })
                    .state('app.ui.progress', {
                        url: '/progress',
                        templateUrl: 'partials/ui-progress.html'
                    })
                    .state('app.ui.icons', {
                        url: '/icons',
                        templateUrl: 'partials/ui-icons.html'
                    })
                    .state('app.ui.materialicons', {
                        url: '/material-icons',
                        templateUrl: 'partials/ui-icons-material.html'
                    })
                    .state('app.ui.faicons', {
                        url: '/fontawesome-icons',
                        templateUrl: 'partials/ui-icons-fa.html',
                        resolve: {
                            deps: ['uiLoad',
                                function(uiLoad) {
                                    return uiLoad.load(['../bower_components/font-awesome/css/font-awesome.css']);
                                }
                            ]
                        }

                    })
                    .state('app.ui.glyphicons', {
                        url: '/glyph-icons',
                        templateUrl: 'partials/ui-icons-glyph.html'
                    })
                    .state('app.ui.buttons', {
                        url: '/buttons',
                        templateUrl: 'partials/ui-buttons.html',
                        resolve: {
                            deps: ['uiLoad',
                                function(uiLoad) {
                                    return uiLoad.load(['../bower_components/font-awesome/css/font-awesome.css']);
                                }
                            ]
                        }
                    })
                    .state('app.ui.modals', {
                        url: '/modals',
                        templateUrl: 'partials/ui-modals.html'
                    })
                    .state('app.ui.notifications', {
                        url: '/notifications',
                        templateUrl: 'partials/ui-notifications.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load('cgNotify').then(
                                        function() {
                                            return $ocLazyLoad.load('js/controllers/notify.js');
                                        }
                                    );
                                }
                            ]
                        }
                    })
                    .state('app.ui.tooltips', {
                        url: '/tooltips',
                        templateUrl: 'partials/ui-tooltips.html'
                    })
                    .state('app.ui.sortable', {
                        url: '/sortable',
                        templateUrl: 'partials/ui-sortable.html'
                    })
                    /*.state('app.ui.navbars', {
                        url: '/navbars',
                        templateUrl: 'partials/ui-navbars.html'
                    })*/
                    /*.state('app.ui.extra', {
                        url: '/extra',
                        templateUrl: 'partials/ui-extra.html'
                    })*/
                    .state('app.ui.pagination', {
                        url: '/pagination',
                        templateUrl: 'partials/ui-pagination.html'
                    })
                    .state('app.ui.breadcrumb', {
                        url: '/breadcrumb',
                        templateUrl: 'partials/ui-breadcrumb.html',
                        resolve: {
                            deps: ['uiLoad',
                                function(uiLoad) {
                                    return uiLoad.load(['../bower_components/font-awesome/css/font-awesome.css']);
                                }
                            ]
                        }                        
                    })
                    .state('app.ui.carousel', {
                        url: '/carousel',
                        templateUrl: 'partials/ui-carousel.html'
                    })
                    .state('app.ui.panels', {
                        url: '/panels',
                        templateUrl: 'partials/ui-panels.html'
                    })
                    .state('app.ui.grids', {
                        url: '/grids',
                        templateUrl: 'partials/ui-grids.html'
                    })
                    .state('app.ui.tiles', {
                        url: '/tiles',
                        templateUrl: 'partials/ui-tiles.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load('countTo').then(
                                        function() {
                                            return $ocLazyLoad.load('js/controllers/countto.js');
                                        }
                                    ).then(
                                        function() {
                                            return $ocLazyLoad.load('../bower_components/font-awesome/css/font-awesome.css');
                                        }
                                    );
                                }
                            ]
                        }
                    })
                    .state('app.form', {
                        url: '/form',
                        template: '<div ui-view class=""></div>'
                    })

                .state('app.form.elements', {
                        url: '/elements',
                        templateUrl: 'partials/form-elements.html',
                        resolve: {
                            deps: ['uiLoad',
                                function(uiLoad) {
                                    return uiLoad.load(['../bower_components/font-awesome/css/font-awesome.css']);
                                }
                            ]
                        }
                    })
                    .state('app.form.premade', {
                        url: '/premade',
                        templateUrl: 'partials/form-premade.html',
                        resolve: {
                            deps: ['uiLoad',
                                function(uiLoad) {
                                    return uiLoad.load(['../bower_components/font-awesome/css/font-awesome.css']);
                                }
                            ]
                        }
                    })
                    .state('app.form.components', {
                        url: '/components',
                        templateUrl: 'partials/form-components.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load('colorpicker.module').then(
                                        function() {
                                            return $ocLazyLoad.load('js/controllers/colorpicker.js');
                                        }
                                    ).then(
                                        function() {
                                            return $ocLazyLoad.load('../bower_components/font-awesome/css/font-awesome.css');
                                        }
                                    );
                                }
                            ]
                        }
                    })
                    .state('app.form.wizard', {
                        url: '/wizard',
                        templateUrl: 'partials/form-wizard.html',
                        resolve: {
                            deps: ['uiLoad',
                                function(uiLoad) {
                                    return uiLoad.load(['../bower_components/font-awesome/css/font-awesome.css']);
                                }
                            ]
                        }
                    })
                    .state('app.form.validation', {
                        url: '/validation',
                        templateUrl: 'partials/form-validation.html',
                        resolve: {
                            deps: ['uiLoad',
                                function(uiLoad) {
                                    return uiLoad.load('js/controllers/form-validation.js');
                                }
                            ]
                        }
                    })
                    .state('app.form.fileupload', {
                        url: '/fileupload',
                        templateUrl: 'partials/form-fileupload.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load('angularFileUpload').then(
                                        function() {
                                            return $ocLazyLoad.load('js/controllers/file-upload.js');
                                        }
                                    );
                                }
                            ]
                        }
                    })
                    .state('app.form.slider', {
                        url: '/slider',
                        templateUrl: 'partials/form-slider.html',
                        controller: 'FormSliderCtrl',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load('vr.directives.slider').then(
                                        function() {
                                            return $ocLazyLoad.load('js/controllers/form-slider.js');
                                        }
                                    );
                                }
                            ]
                        }
                    })
                    .state('app.form.editable', {
                        url: '/editable',
                        templateUrl: 'partials/form-editable.html',
                        controller: 'FormXeditableCtrl',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load('xeditable').then(
                                        function() {
                                            return $ocLazyLoad.load('js/controllers/form-xeditable.js');
                                        }
                                    );
                                }
                            ]
                        }
                    })
                    .state('app.form.editors', {
                        url: '/editors',
                        templateUrl: 'partials/form-editors.html',
                        resolve: {
                            deps: ['uiLoad',
                                function(uiLoad) {
                                    return uiLoad.load(['../bower_components/font-awesome/css/font-awesome.css']);
                                }
                            ]
                        }
                            /*,
                                                    controller: 'FormEditorCtrl',
                                                    resolve:  {
                                                        deps: ['$ocLazyLoad',
                                                          function( $ocLazyLoad ){
                                                            return $ocLazyLoad.load('textAngular').then(
                                                                function(){
                                                                    return $ocLazyLoad.load('js/controllers/form-editor.js');
                                                                }
                                                            );
                                                        }]
                                                    }*/
                    })
                     .state('app.form.textAngular',{
                                    url:'/textAngular/{blogId:[0-9]{1,4}}/:graphicStatus',
                                    templateUrl:'textangular/textAngular.html'
                                })
                     .state('app.form.textAngularForReview',{
                        url:'/textAngularForReview/{blogId:[0-9]{1,4}}/:c',
                        templateUrl:'textangular/textAngular-Review.html'  
                    })
                    .state('app.form.masks', {
                        url: '/masks',
                        templateUrl: 'partials/form-masks.html'
                    })
                    .state('app.ui.calendar', {
                        url: '/calendar',
                        templateUrl: 'partials/ui-calendar.html',
                        resolve: {
                            deps: ['$ocLazyLoad', 'uiLoad',
                                function($ocLazyLoad, uiLoad) {
                                    return uiLoad.load(
                                        JQ_CONFIG.fullcalendar.concat('js/controllers/calendar.js')
                                    ).then(
                                        function() {
                                            return $ocLazyLoad.load('ui.calendar');
                                        }
                                    )
                                }
                            ]
                        }
                    })
                    .state('app.ui.pricing', {
                        url: '/pricing',
                        templateUrl: 'partials/ui-pricing.html'
                    })
                    .state('app.ui.profile', {
                        url: '/profile',
                        templateUrl: 'partials/ui-profile.html',
                        resolve: {
                            deps: ['uiLoad',
                                function(uiLoad) {
                                    return uiLoad.load(['../bower_components/font-awesome/css/font-awesome.css']);
                                }
                            ]
                        }
                    })
                     .state('fullviewprofiles', {
                        url: '/fullviewprofiles/{blogId:[0-9]{1,4}}',
                        templateUrl: 'partials/profiles/profile_fullview.html',
                        //controller:'fullviewctrl'
                    })
                   
                    .state('app.ui.timeline', {
                        url: '/timeline',
                        templateUrl: 'partials/ui-timeline.html'
                    })
                    .state('app.ui.invoice', {
                        url: '/invoice',
                        templateUrl: 'partials/ui-invoice.html'
                    })
                    .state('app.ui.members', {
                        url: '/members',
                        templateUrl: 'partials/ui-members.html',
                        resolve: {
                            deps: ['uiLoad',
                                function(uiLoad) {
                                    return uiLoad.load(['js/controllers/members.js', '../bower_components/font-awesome/css/font-awesome.css']);
                                }
                            ]
                        }

                    })
                    .state('app.ui.search', {
                        url: '/search',
                        templateUrl: 'partials/ui-search.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load(['js/filters/search-startfrom.js', 'js/controllers/search.js', 'js/directives/ui-searchtabs.js','../bower_components/font-awesome/css/font-awesome.css']);
                                }
                            ]
                        }

                    })
                    .state('app.ui.blogs', {
                        url: '/blogs',
                        templateUrl: 'partials/blogs/html/ui-blogs.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load(['js/filters/blogs-startfrom.js', 'partials/blogs/js/blogs.js','../bower_components/font-awesome/css/font-awesome.css']);
                                }
                            ]
                        }
                    })
                    .state('app.ui.myblogs', {
                        url: '/myblogs',
                        templateUrl: 'partials/myblogs/html/ui-my-blogs.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load(['js/filters/blogs-startfrom.js', 'partials/myblogs/js/myblogs.js','../bower_components/font-awesome/css/font-awesome.css']);
                                }
                            ]
                        }
                    })
                     .state('app.ui.completedBlogs', {
                        url: '/completedBlogs',
                        templateUrl: 'partials/completedblogs/html/ui-completed-blogs.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load(['js/filters/blogs-startfrom.js', 'partials/completedblogs/js/completedblogs.js','../bower_components/font-awesome/css/font-awesome.css']);
                                }
                            ]
                        }
                    })
                      .state('app.ui.ionizedBlogs', {
                        url: '/ionizedBlogs',
                        templateUrl: 'partials/ionizedblogs/html/ui-ionized-blogs.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load(['js/filters/blogs-startfrom.js', 'partials/ionizedblogs/js/ionizedblogs.js','../bower_components/font-awesome/css/font-awesome.css']);
                                }
                            ]
                        }
                    })
                      .state('app.ui.ionizedBlogView', {
                        url: '/ionizedBlogItem/{blogId:[0-9]{1,4}}',
                        templateUrl: 'partials/ionizedblogs/html/ui-blog-item-ionized.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load(['../bower_components/font-awesome/css/font-awesome.css']);
                                }
                            ]
                        }
                    })
                     .state('app.ui.reviewBlogs', {
                        url: '/reviewBlogs',
                        templateUrl: 'partials/reviewblogs/html/ui-review-blogs.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load(['js/filters/blogs-startfrom.js', 'partials/reviewblogs/js/reviewBlog.js','../bower_components/font-awesome/css/font-awesome.css']);
                                }
                            ]
                        }
                    })
                    .state('app.ui.assignedBlogs', {
                        url: '/assignedBlogs',
                        templateUrl: 'partials/assignedblogs/html/assigned.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load(['js/filters/blogs-startfrom.js', 'partials/assignedblogs/js/assigned.js','../bower_components/font-awesome/css/font-awesome.css']);
                                }
                            ]
                        }
                    })
                     .state('app.ui.assignedBlogView', {
                        url: '/assignedblog/{blogId:[0-9]{1,4}}',
                        templateUrl: 'partials/assignedblogs/html/assigned-blog-item.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load(['../bower_components/font-awesome/css/font-awesome.css']);
                                }
                            ]
                        }
                    })
                     .state('app.withOutKeyword', {
                        url: '/withoutkeywords',
                        templateUrl: 'partials/ionizetopics/withOutKeywords/withOutKeyword.html'
                       
                    })
                      .state('app.clienttopic', {
                        url: '/clienttopics',
                        templateUrl: 'partials/ionizetopics/clientTopic/clientTopic.html'
                        
                    })
                     .state('app.logout', {
                        url: '/logout',
                        templateUrl: 'partials/ui-logout.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load(['js/filters/blogs-startfrom.js', 'js/controllers/logout.js','../bower_components/font-awesome/css/font-awesome.css']);
                                }
                            ]
                        }
                    })
                    .state('app.ui.blogview', {
                        url: '/blog/{blogId:[0-9]{1,4}}/:category_id/:userId',
                        templateUrl: 'partials/blogs/html/ui-blog-item.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load(['../bower_components/font-awesome/css/font-awesome.css']);
                                }
                            ]
                        }
                    })
                   
		    .state('app.ui.myblogview', {
                        url: '/myblog/{blogId:[0-9]{1,4}}',
                        templateUrl: 'partials/myblogs/html/ui-blog-myblogview-item.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load(['../bower_components/font-awesome/css/font-awesome.css']);
                                }
                            ]
                        }
                    })
                    //blog view for grafic designer
                     .state('app.ui.blogViewForGraphic', {
                        url: '/graphicblogs/{blogId:[0-9]{1,4}}/:contentStatus/:graphicStatus',
                        templateUrl: 'partials/myblogs/html/ui-blog-item-graphic.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load(['../bower_components/font-awesome/css/font-awesome.css']);
                                }
                            ]
                        }
                    })
                     .state('app.ui.completedBlogView', {
                        url: '/completedBlogItem/{blogId:[0-9]{1,4}}',
                        templateUrl: 'partials/completedblogs/html/ui-blog-item-completed.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load(['../bower_components/font-awesome/css/font-awesome.css']);
                                }
                            ]
                        }
                    })
                    .state('app.ui.reviewBlog', {
                        url: '/reviewBlog/{blogId:[0-9]{1,4}}',
                        templateUrl: 'partials/reviewblogs/html/ui-blog-item-review.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load(['../bower_components/font-awesome/css/font-awesome.css']);
                                }
                            ]
                        }
                    })
                    //blog view for grafic designer
                    .state('app.ui.imagecrop', {
                        url: '/imagecrop',
                        templateUrl: 'partials/ui-imagecrop.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load('ngImgCrop').then(
                                        function() {
                                            return $ocLazyLoad.load('js/controllers/imagecrop.js');
                                        }
                                    );
                                }
                            ]
                        }
                    })
                   /* .state('app.ui.faq', {
                        url: '/faq',
                        templateUrl: 'partials/ui-faq.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load(['js/controllers/faq.js']);
                                }
                            ]
                        }
                    })*/
                    .state('app.mail', {
                        abstract: true,
                        url: '/mail',
                        //template: '<div ui-view class=""></div>',
                        templateUrl: 'partials/mail.html',
                        // use resolve to load other dependences
                        resolve: {
                            deps: ['uiLoad',
                                function(uiLoad) {
                                    return uiLoad.load(['../bower_components/font-awesome/css/font-awesome.css', 'js/controllers/mail.js',
                                        'js/services/mail-service.js',
                                        JQ_CONFIG.moment
                                    ]);
                                }
                            ]
                        }
                    })
                    .state('app.mail.list', {
                        url: '/{fold}',
                        templateUrl: 'partials/mail-list.html'
                    })
                    .state('app.mail.compose', {
                        url: '/compose',
                        templateUrl: 'partials/mail-compose.html'
                    })
                    .state('app.mail.view', {
                        url: '/{mailId:[0-9]{1,4}}',
                        templateUrl: 'partials/mail-view.html'
                    })
                    .state('app.charts', {
                        url: '/charts',
                        template: '<div ui-view class=""></div>',
                    })
                    .state('app.charts.morris', {
                        url: '/morris',
                        templateUrl: 'partials/charts-morris.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load('ngMorris').then(
                                        function() {
                                            return $ocLazyLoad.load('js/controllers/morris.js');
                                        }
                                    );
                                }
                            ]
                        }

                    })
                    .state('app.charts.chartjs', {
                        url: '/chartjs',
                        templateUrl: 'partials/charts-chartjs.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load('chart.js').then(
                                        function() {
                                            return $ocLazyLoad.load('js/controllers/chartjs.js');
                                        }
                                    );
                                }
                            ]
                        }
                    })
                    .state('app.charts.flot', {
                        url: '/flot',
                        templateUrl: 'partials/charts-flot.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load(['js/controllers/flot-chart.js']);
                                }
                            ]
                        }
                    })
                    .state('app.charts.sparkline', {
                        url: '/sparkline',
                        templateUrl: 'partials/charts-sparkline.html'

                    })
                    .state('app.charts.easypiechart', {
                        url: '/easypiechart',
                        templateUrl: 'partials/charts-easypiechart.html'

                    })
                    .state('app.charts.rickshaw', {
                        url: '/rickshaw',
                        templateUrl: 'partials/charts-rickshaw.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load(['../bower_components/d3/d3.min.js', 'angular-rickshaw'], {
                                        serie: true
                                    }).then(
                                        function() {
                                            return $ocLazyLoad.load('js/controllers/rickshaw.js');
                                        }
                                    );
                                }
                            ]
                        }
                    })
                    .state('app.tables', {
                        url: '/tables',
                        template: '<div ui-view class=""></div>'
                    })
                    .state('app.tables.basic', {
                        url: '/basic',
                        templateUrl: 'partials/tables-basic.html'
                    })
                    // .state('app.tables.data', {
                    //     url: '/data',
                    //     templateUrl: 'partials/tables-data.html'
                    // })
                    .state('app.tables.data', {
                        url: '/data',
                        templateUrl: 'partials/transactions/html/tables-data.html'
                    })
                    .state('app.tables.settlements', {
                        url: '/settlements',
                        templateUrl: 'partials/transactions/html/settlements_fullview.html'
                    })
                    .state('app.tables.transactions', {
                        url: '/transactions',
                        templateUrl: 'partials/transactions/html/tables-data-transactions.html'
                    })
                    .state('app.tables.footable', {
                        url: '/footable',
                        templateUrl: 'partials/tables-footable.html'
                    })
                    .state('app.tables.nggrid', {
                        url: '/nggrid',
                        templateUrl: 'partials/tables-nggrid.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load('ngGrid').then(
                                        function() {
                                            return $ocLazyLoad.load('js/controllers/table-nggrid.js');
                                        }
                                    );
                                }
                            ]
                        }
                    })
                    .state('app.tables.uigrid', {
                        url: '/uigrid',
                        templateUrl: 'partials/tables-uigrid.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load('ui.grid').then(
                                        function() {
                                            return $ocLazyLoad.load('js/controllers/table-uigrid.js');
                                        }
                                    );
                                }
                            ]
                        }
                    })
                    .state('app.tables.editable', {
                        url: '/editable',
                        templateUrl: 'partials/tables-editable.html',
                        controller: 'FormXeditableCtrl',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load('xeditable').then(
                                        function() {
                                            return $ocLazyLoad.load('js/controllers/form-xeditable.js');
                                        }
                                    );
                                }
                            ]
                        }
                    }) 
                    .state('app.tables.smart', {
                        url: '/smart',
                        templateUrl: 'partials/table-smart.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load('smart-table').then(
                                        function() {
                                            return $ocLazyLoad.load('js/controllers/table-smart.js');
                                        }
                                    );
                                }
                            ]
                        }
                    })
                     .state('profiles', {
                        url: '/profiles',
                        templateUrl: 'partials/profiles/profile.html',
                        controller:'profileCtrl'
                    })

                .state('app.layout', {
                        url: '/layout',
                        template: '<div ui-view class=""></div>'
                    })
                    .state('app.layout.default', {
                        url: '/default',
                        templateUrl: 'partials/layout-default.html'
                    })
                    .state('app.layout.collapsed', {
                        url: '/collapsed',
                        templateUrl: 'partials/layout-collapsed.html'
                    })
                    .state('app.layout.chat', {
                        url: '/chat',
                        templateUrl: 'partials/layout-chat.html'
                    })
                    .state('app.layout.boxed', {
                        url: '/boxed',
                        templateUrl: 'partials/layout-boxed.html'
                    })
                    .state('app.ui.vectormaps', {
                        url: '/vectormaps',
                        templateUrl: 'partials/ui-vectormaps.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load('js/controllers/vectormap.js');
                                }
                            ]
                        }
                    })
                    .state('app.ui.googlemapfull', {
                        url: '/googlemapfull',
                        templateUrl: 'partials/ui-googlemapfull.html',
                        resolve: {
                            deps: ['uiLoad',
                                function(uiLoad) {
                                    return uiLoad.load([
                                        'js/map/load-google-maps.js',
                                        'js/map/ui-map.js',
                                        'js/map/map.js'
                                    ]).then(
                                        function() {
                                            return loadGoogleMaps();
                                        }
                                    );
                                }
                            ]
                        }

                    })
                     //reports tab
                     .state('app.tables.reportes_blogs', {
                        url: '/reportes_blogs',
                        templateUrl: 'partials/reportes/blogs/html/reportes_blog.html'
                    }) 
                    .state('app.tables.reportes_query', {
                        url: '/reportes_query',
                        templateUrl: 'partials/reportes/query/html/reportes_query.html'
                    })
                    .state('app.tables.reportes_leeds', {
                        url: '/reportes_leeds',
                        templateUrl: 'partials/reportes/leeds/html/reportes_leeds.html'
                    })
                    .state('app.tables.reportes_visits', {
                        url: '/reportes_visits',
                        templateUrl: 'partials/reportes/visits/html/hospitallist.html'
                    })
                     .state('app.tables.reportes_credits', {
                        url: '/reportes_credits',
                        templateUrl: 'partials/reportes/credits/html/reportes_credits.html'
                    })
                     .state('app.tables.reportes_email_newsletter', {
                        url: '/reportes_email_newsletter',
                        templateUrl: 'partials/reportes/email_newsletter/html/reportes_email_newsletter.html'
                    })
             //reports hospital full data tab

             //ion manager Settelment tab
              .state('app.tables.process', {
                        url: '/process',
                        templateUrl: 'partials/settlements/process.html'
                    })
                    .state('app.tables.all_transations', {
                        url: '/all_transations',
                        templateUrl: 'partials/settlements/all_transations.html'
                    })
            //ion manager settlement tab
                     .state('app.tables.hospital_blogs_fulldata', {
                        url: '/hospital_blogs_fulldata/{categoryId:[0-9]{1,4}}/{teamId:[0-9]{1,4}}',
                        templateUrl: 'partials/reportes/blogs/html/hospitalWiseBlogs.html'
                    })
                     .state('app.tables.hospital_questions_fulldata', {
                        url: '/hospital_questions_fulldata/{teamId:[0-9]{1,4}}',
                        templateUrl: 'partials/reportes/query/html/hospitalwiseQueries.html'
                    })
                      .state('app.tables.hospital_visits_fulldata', {
                        url: '/hospital_visits_fulldata/{teamId:[0-9]{1,4}}',
                        templateUrl: 'partials/reportes/visits/html/hospitalwiseVisits.html'
                    })
                     .state('app.tables.hospital_leads_data', {
                        url: '/hospital_leads_data/{teamId:[0-9]{1,4}}',
                        templateUrl: 'partials/reportes/leeds/html/leadsListByHospital.html'
                    })
                      .state('app.tables.hospital_credits_fulldata', {
                        url: '/hospital_credits_fulldata/{teamId:[0-9]{1,4}}',
                        templateUrl: 'partials/reportes/credits/html/hospitalWiseCredits.html'
                    })
                       .state('app.tables.email_newsletter_fulldata', {
                        url: '/email_newsletter_fulldata/{teamId:[0-9]{1,4}}',
                        templateUrl: 'partials/reportes/email_newsletter/html/hospitalWiseNewsletter.html'
                    })
                    //  .state('app.ui.my_approve_blogs', {  hospital_leads_data
                    //     url: '/my_approve_blogs',
                    //     templateUrl: 'partials/my_approve_blogs/my_approve_blogs.html'

                    // })
                     .state('app.ui.my_approve_blogs', {
                        url: '/my_approve_blogs',
                        templateUrl: 'partials/my_approve_blogs/my_approve_blogs.html'
                        
                    })
                      .state('app.ui.my_approve_blogs_fullview', {
                        url: '/my_approve_blogs_fullview/{blogId:[0-9]{1,4}}',
                        templateUrl: 'partials/my_approve_blogs/my_approve_blog_fullview.html',
                        
                    })
            }
        ]
    );
