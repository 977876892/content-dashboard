// app.controller('BlogPageCtrl', ['$scope', 'filterFilter', function ($scope, filterFilter) {
	app.controller('assignedBlogCtrl', ['$state','$scope','$http','$rootScope','$window','$mdDialog','commonService','$location','$anchorScroll', function ($state,$scope, $http,$rootScope,$window,$mdDialog,commonService,$location,$anchorScroll) {

	if(sessionStorage.username==""){
				$state.go("access.login");
	}
	else{
         $rootScope.login_category=sessionStorage.category;
          //for blog start from first page
				$rootScope.selectedIndexForBlogs=0;
				$rootScope.currentPageForBlogs=1;	
				//for blog start from first page
         if(sessionStorage.category==22)
         {
                getAssignedBlogsForRM();
         }
         else{
                 getAssignedBlogsFunction();
         }
    }
        $scope.assignedBlogFullview=function(id,index){
                //$rootScope.selectedIndexForBlogs=index;
                $rootScope.assignedBlogIndex=index;
                $state.go("app.ui.assignedBlogView",{blogId:id});

        }
        //pagination scrolling
            $rootScope.existingCurrentPageForAssignedblogs=function(currentPage){
                    $rootScope.currentPageForAssignedBlogs=currentPage;
            }
	    //pagination scrolling
    
    function getAssignedBlogsFunction(){
             commonService.getAssignedBlogs()
            .then(function(response){
                console.log(response);
                $scope.items=response.data.description;
                $scope.totalItems=response.data.description.length;
                if(typeof $rootScope.assignedBlogIndex=="undefined")
					{
						// console.log($rootScope.selectedIndexForBlogs);
						// $location.hash(0);
      					// $anchorScroll();
					}
				else
					{
						console.log($rootScope.assignedBlogIndex);
						$location.hash($rootScope.assignedBlogIndex);
      					$anchorScroll();
					}
				noOfBlogsPerPage($scope.totalItems);
            });
    }
    function getAssignedBlogsForRM(){
       commonService.getAssignedBlogsForRM()
        .then(function(response){
                console.log(response);
                $scope.items=response.data.description;
                $scope.totalItems=response.data.description.length;
                 if(typeof $rootScope.assignedBlogIndex=="undefined")
					{
						// console.log($rootScope.selectedIndexForBlogs);
						// $location.hash(0);
      					// $anchorScroll();
					}
				else
					{
						//console.log($rootScope.selectedIndexForBlogs);
						$location.hash($rootScope.assignedBlogIndex);
      					$anchorScroll();
					}
				noOfBlogsPerPage($scope.totalItems);
            });
    }
	$scope.saveBlogAsIonize=function(item){
					console.log(item);
					//return;
                  	var confirm = $mdDialog.confirm()
                          .title('Are you sure C.W and G.D work Complted?')
                                    .ok('Yes')
                                    .cancel('No'); 
                          $mdDialog.show(confirm).then(function() {
                        var today_date=new Date();
                        var dataObject={
                          'title':item.title,
                          'content':item.content,
                          'blog_id':item.id,
                          'modified':today_date.getFullYear()+"-"+(today_date.getMonth()+1)+"-"+today_date.getDate(),
                          'state':'ionize',
                        }
                  
                   commonService.ionizetheBlog(dataObject).then(function(success){
                      $mdDialog.show(
                                  $mdDialog.alert()
                                    .parent(angular.element(document.querySelector('#popupContainer')))
                                    .clickOutsideToClose(true)
                                    .textContent("Blog Completed successfully.")
                                    .ok('Ok')
                                    .targetEvent()
                                ).then(function() {
                                            if(sessionStorage.category==22)
                                            {
                                                   // console.log("if");
                                                    getAssignedBlogsForRM();
                                            }
                                            else{
                                                    getAssignedBlogsFunction();
                                            }
                                    // getAssignedBlogsFunction();
                                }, function() {
                                });
                    },function(fail){
                      console.log(fail);
                      $mdDialog.show(
                                      $mdDialog.alert()
                                        .parent(angular.element(document.querySelector('#popupContainer')))
                                        .clickOutsideToClose(true)
                                        .textContent('Your Blog Is Not Ionize Please Check Your Internet Connection And Then Contact Medicodesk.')
                                        .ok('Ok')
                                        .targetEvent()
                                    )
                    })
                });
                  //console.log(htmlContent);
              }
	//select option
             commonService.getAllContentWriters().then(function(success){
                     $scope.contentWriter=success.data.description;
            },function(error){
                $mdDialog.show(
                      $mdDialog.alert()
                        .parent(angular.element(document.querySelector('#popupContainer')))
                        .clickOutsideToClose(true)
                        .textContent('Your Not Getting Content Writers Please Check Your Internet Connection And Then Contact Medicodesk.')
                        .ok('Ok')
                        .targetEvent()
                    )
            })
         commonService.getAllgraphicDesigners().then(function(success){
                $scope.graphicDesigner=success.data.description;    
            },function(error){
                $mdDialog.show(
                      $mdDialog.alert()
                        .parent(angular.element(document.querySelector('#popupContainer')))
                        .clickOutsideToClose(true)
                        .textContent('Your Not Getting Graphic Designers Please Check Your Internet Connection And Then Contact Medicodesk.')
                        .ok('Ok')
                        .targetEvent()
                    )
                console.log(error);
            })
           
	//select option
	$scope.assignToContentWriter=function(item){
		$scope.assigntofree=item;
		$mdDialog.show({
				controller: assignController,
				templateUrl: 'contentWriterTemplate.html',
				clickOutsideToClose:true,
				//fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
				})
				.then(function(answer) {
				$scope.status = 'You said the information was "' + answer + '".';
				}, function() {
				$scope.status = 'You cancelled the dialog.';
			});
	}
    $scope.assignToGraphicDesigner=function(item){
		$scope.assigntofree=item;
		$mdDialog.show({
				controller: assignController,
				templateUrl: 'graphicTemplate.html',
				clickOutsideToClose:true,
				//fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
				})
				.then(function(answer) {
				$scope.status = 'You said the information was "' + answer + '".';
				}, function() {
				$scope.status = 'You cancelled the dialog.';
			});
	}
	
	function selectedFreelancerApiCall(selectedWriter,selectedDesigner){
        console.log(selectedDesigner);
        console.log(selectedWriter);

		var assigntofree=$scope.assigntofree;
       console.log(assigntofree);
        if(typeof selectedWriter !='undefined')
        {
                var dataObject={
                                'user_id':assigntofree.created_by,
								'blogid':assigntofree.id,
								//'title':assigntofree.title,
								//'content':assigntofree.content,
								'group_id':sessionStorage.category,
								'category_id':assigntofree.category_id,	
								//created_by means login userid
								'created_by':sessionStorage.USER_ID,
								'content_id':selectedWriter
                            }
                            console.log(dataObject);
                           // return;
                commonService.assignTheBlog(dataObject).then(function(success){
                                        $mdDialog.show(
                                            $mdDialog.alert()
                                                .parent(angular.element(document.querySelector('#popupContainer')))
                                                .clickOutsideToClose(true)
                                                .textContent('Blog is Assigned SuccessFully To Content Writer.')
                                                .ok('Ok')
                                                .targetEvent()
                                            ).then(function() {
                                                 if(sessionStorage.category==22)
                                                    {
                                                            console.log("if");
                                                            getAssignedBlogsForRM();
                                                    }
                                                    else{
                                                            getAssignedBlogsFunction();
                                                    }
                                              //  getAssignedBlogsFunction();
                                        }, function() {
                                        });   
                },function(error){});
        }
        else if(typeof selectedDesigner !='undefined'){
             var dataObject={
                                'user_id':assigntofree.created_by,
								'blogid':assigntofree.id,
								'group_id':sessionStorage.category,
								'category_id':assigntofree.category_id,	
								//created_by means login userid
								'created_by':selectedDesigner
                            }
                            console.log(dataObject);
            commonService.assignTheBlog(dataObject).then(function(success){
                                $mdDialog.show(
                                        $mdDialog.alert()
                                            .parent(angular.element(document.querySelector('#popupContainer')))
                                            .clickOutsideToClose(true)
                                            .textContent('Blog is Assigned Successfully To Graphic Designer.')
                                            .ok('Ok')
                                            .targetEvent()
                                        ).then(function() {
                                             if(sessionStorage.category==22)
                                                {
                                                       // console.log("if");
                                                        getAssignedBlogsForRM();
                                                }
                                                else{
                                                        getAssignedBlogsFunction();
                                                }
                                          //  getAssignedBlogsFunction();
                                    }, function() {
                                    });
            },function(error){});

        }
    }
    
	 function assignController($scope, $mdDialog) {
            $scope.answer = function(answer) {
            $mdDialog.hide(answer);
            };
            $scope.assignTheBlog = function(selectedWriter,selectedDesigner) {
			
                if(typeof selectedWriter!='undefined'||typeof selectedDesigner !='undefined')
                {
                    selectedFreelancerApiCall(selectedWriter,selectedDesigner);  
                    $mdDialog.hide();
                } 
               
            };
        }
		
	$scope.search = {};
	$scope.resetFilters = function () {
		// needs to be a function or it won't trigger a $watch
		$scope.search = {};
	};

   function noOfBlogsPerPage(totalItems){
               // pagination controls
                           // pagination controls
			//console.log($rootScope.currentPageForAssignedBlogs);
			if(typeof $rootScope.currentPageForAssignedBlogs=="undefined")
				{
					$scope.currentPage = 1;
				}
			else{
				$scope.currentPage = $rootScope.currentPageForAssignedBlogs;
			}
		
			$scope.totalItems =totalItems;
			//console.log($scope.totalItems);
			$scope.entryLimit = 10; // items per page
			$scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
			//console.log($scope.noOfPages);
   }
	// $watch search to update pagination
	$scope.$watch('search', function (newVal, oldVal) {
		$scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
		$scope.currentPage = 1;
	}, true);

	$scope.release=function(item){
        $scope.releaseItem=item;
        //console.log($scope.releaseItem);
        $mdDialog.show({
                controller: ReleaseDialogController,
                templateUrl: 'releaseTemplate.html',
                clickOutsideToClose:true,
                //fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
                })
                .then(function(answer) {
                $scope.status = 'You said the information was "' + answer + '".';
                }, function() {
                $scope.status = 'You cancelled the dialog.';
            });
    }
     
     function ReleaseDialogController($scope, $mdDialog) {
            $scope.answer = function(answer) {
            $mdDialog.hide(answer);
            };
            $scope.ReleaseBlog = function(reset_butt) {
                releasefunction(reset_butt);
                $mdDialog.hide();
            };
        }
         function releasefunction(reset_butt) {
               
               console.log($scope.releaseItem);
               console.log(reset_butt);
               
               if(reset_butt==0)
               {
                   commonService.resetToDefault($scope.releaseItem.id,sessionStorage.USER_ID,sessionStorage.category).
                   then(function(success){
                             $mdDialog.show(
                                  $mdDialog.alert()
                                    .parent(angular.element(document.querySelector('#popupContainer')))
                                    .clickOutsideToClose(true)
                                    .textContent("Blog Released successfully")
                                    .ok('Ok')
                                    .targetEvent()
                                ).then(function() {
                                     if(sessionStorage.category==22)
                                        {
                                                getAssignedBlogsForRM();
                                        }
                                        else{
                                                getAssignedBlogsFunction();
                                        }
                                }, function() {
                                });
                },function(error){
                     console.log(error);
                })
               }
               else{
                   console.log($scope.releaseItem);
                   commonService.resetToExistingContent($scope.releaseItem.id,sessionStorage.category,$scope.releaseItem.title,$scope.releaseItem.content)
                    .then(function(success){
                            $mdDialog.show(
                                  $mdDialog.alert()
                                    .parent(angular.element(document.querySelector('#popupContainer')))
                                    .clickOutsideToClose(true)
                                    .textContent("Blog Released successfully")
                                    .ok('Ok')
                                    .targetEvent()
                                ).then(function() {
                                     if(sessionStorage.category==22)
                                        {
                                                getAssignedBlogsForRM();
                                        }
                                        else{
                                                getAssignedBlogsFunction();
                                        }
									
                                }, function() {
                                });
                },function(error){
                     console.log(error);
                })
               }
               
            };
}]);