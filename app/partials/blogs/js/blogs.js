// app.controller('BlogPageCtrl', ['$scope', 'filterFilter', function ($scope, filterFilter) {
	app.controller('BlogPageCtrl', ['$state','$scope','$http','$rootScope','$window','$mdDialog','commonService','$location','$anchorScroll', function ($state,$scope, $http,$rootScope,$window,$mdDialog,commonService,$location,$anchorScroll) {
    console.log(sessionStorage.username);
	if(sessionStorage.username=="" || sessionStorage.username == undefined){
				$state.go("access.login");
	}
	else{
		 var OneSignal = window.OneSignal || [];
            OneSignal.push(["init", {
            appId : "0a2139ab-c73d-46a8-bda1-0c2587c9bb5f",
            autoRegister: true, /* Set to true to automatically prompt visitors */
            notifyButton: {
                enable : true /* Set to false to hide */
            }
			}]);
			OneSignal.push(function () {
				// Occurs when the user's subscription changes to a new value.
				OneSignal.on('subscriptionChange', function (isSubscribed) {
				// console.log("The user's subscription state is now:", isSubscribed);
					OneSignal.getUserId().then(function (userId) {
					// console.log("User ID is", userId);
					});
				});
				});
      		OneSignal.push(['sendTags', {'userid': sessionStorage.USER_ID,'group':sessionStorage.category}]); 
            OneSignal.push(["init", {
                    // Your other init options here
                    persistNotification: false // Automatically dismiss the notification after ~20 seconds in non-mobile Chrome
                    }]);
		 $rootScope.login_category=sessionStorage.category;
		 	//for assign blog start from first page
				$rootScope.assignedBlogIndex=0;
				$rootScope.currentPageForAssignedBlogs=1;
			//for assign blog start from first page
		  if(sessionStorage.category==22)
         {
                getBlogsForRM();
         }
         else if(sessionStorage.category==20){
               gettingOpenBlogs();
         } 
         else{
                 gettingAllBlogs();
         } 
		 //gettingAllBlogs(); 
	function gettingAllBlogs(){
			commonService.getBlogs().then(function(response){
                $scope.items=response.data.description;
                $scope.totalItems=response.data.description.length;
				noOfBlogsPerPage($scope.totalItems);
				if(typeof $rootScope.selectedIndexForBlogs=="undefined") 
					{
						// console.log($rootScope.selectedIndexForBlogs);
						// $location.hash(0);
      					// $anchorScroll();
					}
				else
					{
						//console.log($rootScope.selectedIndexForBlogs);
						$location.hash($rootScope.selectedIndexForBlogs);
      					$anchorScroll();
					}
				 	
            });
	}
	function gettingOpenBlogs(){
		commonService.getOpenBlogs().then(function(response){
                $scope.items=response.data.description;
                console.log( $scope.items)
                $scope.totalItems=response.data.description.length;
				noOfBlogsPerPage($scope.totalItems);
				if(typeof $rootScope.selectedIndexForBlogs=="undefined") 
					{
						// console.log($rootScope.selectedIndexForBlogs);
						// $location.hash(0);
      					// $anchorScroll();
					}
				else
					{
						//console.log($rootScope.selectedIndexForBlogs);
						$location.hash($rootScope.selectedIndexForBlogs);
      					$anchorScroll();
					}
				 	
            });
	}
	function getBlogsForRM(){
			commonService.getBlogsForRM().then(function(response){
                $scope.items=response.data.description;
                $scope.totalItems=response.data.description.length;
				noOfBlogsPerPage($scope.totalItems);
				if(typeof $rootScope.selectedIndexForBlogs=="undefined")
					{
						// console.log($rootScope.selectedIndexForBlogs);
						// $location.hash(0);
      					// $anchorScroll();
					}
				else
					{
						//console.log($rootScope.selectedIndexForBlogs);
						$location.hash($rootScope.selectedIndexForBlogs);
      					$anchorScroll();
					}
            });
	}
		 //select option
						commonService.getAllContentWriters().then(function(success){
								$scope.profiles=success.data.description;
						},function(error){
							$mdDialog.show(
								$mdDialog.alert()
									.parent(angular.element(document.querySelector('#popupContainer')))
									.clickOutsideToClose(true)
									.textContent('Please Check Your Internet Connection And Then Contact Medicodesk.')
									.ok('Ok')
									.targetEvent()
								)
						})
	//select option
	} 

		$scope.openFullView=function(postid,category_id,created_by,index){
			$rootScope.selectedIndexForBlogs=index;
			$state.go('app.ui.blogview',{blogId:postid,category_id:category_id,userId:created_by});
				//app.ui.blogview()
		}
			//pagination scrolling
		$rootScope.existingCurrentPage=function(currentPage){
				$rootScope.currentPageForBlogs=currentPage;
		}
	//pagination scrolling
	
         $scope.assigntome = function(ev,item) { 
               var confirm = $mdDialog.confirm()
					          .title('Would you like to Assign')
                             .ok('Yes')
					          .cancel('No'); 
			$mdDialog.show(confirm).then(function() {
							console.log(item);
							var date=new Date();
						
					        var dataObject={ 
                                'user_id':item.created_by,
								'blogid':item.postid,
								'group_id':sessionStorage.category,
								'category_id':item.category_id,	
								//created_by means login userid
								'created_by':sessionStorage.USER_ID
                            };
							console.log(dataObject);
							commonService.assignTheBlog(dataObject).then(function(success){
								$mdDialog.show(
                                      $mdDialog.alert()
                                        .parent(angular.element(document.querySelector('#popupContainer')))
                                        .clickOutsideToClose(true)
                                        .textContent('Blog is Assigned To You Successfully.')
                                        .ok('Ok')
                                        .targetEvent()
                                    ).then(function() {
										gettingAllBlogs();
                                }, function() {
                                });
							},function(fail){
								console.log(fail);
								$mdDialog.show(
                                      $mdDialog.alert()
                                        .parent(angular.element(document.querySelector('#popupContainer')))
                                        .clickOutsideToClose(true)
                                        .textContent('Blog Is Not Assigned Please Check Your Internet Connection And Then Contact Medicodesk.')
                                        .ok('Ok')
                                        .targetEvent()
                                    )
							})
						
					   $scope.status = 'yes.';
                      console.log($scope.status);
                  },function() {
                    $scope.status = 'no.';
                    console.log($scope.status);
                  });	            
				 };
				

	
	$scope.assigntofreelancer=function(item){
		
		$scope.assigntofree=item;
		$mdDialog.show({
				controller: assignDialogController,
				templateUrl: 'freelancerTemplate.html',
				clickOutsideToClose:true,
				//fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
				})
				.then(function(answer) {
				$scope.status = 'You said the information was "' + answer + '".';
				}, function() {
				$scope.status = 'You cancelled the dialog.';
			});
	}
	
	function freelancerApiCall(selectedprofile,ev){
		var assigntofree=$scope.assigntofree;
		var dataObject={
                                'user_id':assigntofree.created_by,
								'blogid':assigntofree.postid,
								'group_id':4,
								'category_id':assigntofree.category_id,	
								'created_by':selectedprofile           
		}
		commonService.assignTheBlog(dataObject).then(function(success){
						
									$mdDialog.show(
                                      $mdDialog.alert()
                                        .parent(angular.element(document.querySelector('#popupContainer')))
                                        .clickOutsideToClose(true)
                                        .textContent('Blog is Assigned To Content Writer successfully.')
                                        .ok('Ok')
                                        .targetEvent()
                                    ).then(function() {
										gettingAllBlogs();
                                }, function() {
                                });
								 	
								//location.reload(true);
								//window.location.reload();
							},function(error){
								$mdDialog.show(
                                      $mdDialog.alert()
                                        .parent(angular.element(document.querySelector('#popupContainer')))
                                        .clickOutsideToClose(true)
                                        .textContent('Blog is Not Assigned To Content Writer Please Check Your Internet Connection And Then Contact Medicodesk.')
                                        .ok('Ok')
                                        .targetEvent()
                                    ).then(function() {
                                 
                                }, function() {
                                });
								console.log(fail);
							})
					// },
					// function(error){
					// 	console.log(error);
					// })
							
    }
            

	 function assignDialogController($scope, $mdDialog) {
            $scope.answer = function(answer) {
            $mdDialog.hide(answer);
            };
            $scope.ApproveBlog = function(selectedoperator) {
				console.log(selectedoperator);
            freelancerApiCall(selectedoperator);
            $mdDialog.hide();
            };
        }
		
	// $scope.showConfirm = function(ev) {
 //    // Appending dialog to document.body to cover sidenav in docs app
 //    var confirm = $mdDialog.confirm()
 //          .title('Would you like to Assign')
 //          .ok('Please do it!')
 //          .cancel('Sounds like a scam');

 //    $mdDialog.show(confirm).then(function() {
 //      $scope.status = 'You decided to get rid of your debt.';
 //    }, function() {
 //      $scope.status = 'You decided to keep your debt.';
 //    });
 //  };
	// create empty search model (object) to trigger $watch on update
	$scope.search = {};
 
	$scope.resetFilters = function () {
		// needs to be a function or it won't trigger a $watch
		$scope.search = {};
	};



   function noOfBlogsPerPage(totalItems){
		   // pagination controls
			//console.log($rootScope.currentPageForBlogs);
			if(typeof $rootScope.currentPageForBlogs=="undefined")
				{
					$scope.currentPage = 1;
				}
			else{
				$scope.currentPage = $rootScope.currentPageForBlogs;
			}
			//$scope.currentPage=1;
			
			$scope.totalItems =totalItems;
			//console.log($scope.totalItems);
			$scope.entryLimit = 10; // items per page
			$scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
			//console.log($scope.noOfPages);
   }
    
	
	// $watch search to update pagination
	$scope.$watch('search', function (newVal, oldVal) {
		//$scope.filtered = filterFilter($scope.items, newVal);
	//	$scope.totalItems = $scope.filtered.length;
		$scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
		$scope.currentPage = 1;
	}, true);
}]);