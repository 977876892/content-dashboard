// app.controller('BlogPageCtrl', ['$scope', 'filterFilter', function ($scope, filterFilter) {
	app.controller('MyBlogPageCtrl', ['$state','$scope','$http','$rootScope','$base64','$mdDialog','commonService', function ($state,$scope, $http,$rootScope,$base64,$mdDialog,commonService) {
	
	if(sessionStorage.username=="" || sessionStorage.username == undefined){
				$state.go("access.login");
	}
	else{
				$scope.login_categary=sessionStorage.category;
				myblogs();
				 //for blog start from first page
                    $rootScope.selectedIndexForBlogs=0;
                    $rootScope.currentPageForBlogs=1;	
                //for blog start from first page
                //for assign blog start from first page
                    $rootScope.assignedBlogIndex=0;
                    $rootScope.currentPageForAssignedBlogs=1; 
		        //for assign blog start from first page
	}
	function myblogs(){
			commonService.myblogs().then(function mySuccess(response){
				                        //console.log(response);
										$scope.items=response.data.description;
										//console.log($scope.items);
										$scope.totalItems=response.data.description.length;
									});	
	}
	 $scope.releaseTheBlog=function(item){
    var confirm = $mdDialog.confirm()
					          .title('Are you want to Release the Blog?')
                              .ok('Yes')
					          .cancel('No'); 
			$mdDialog.show(confirm).then(function() {
				commonService.releaseTheBlog(sessionStorage.USER_ID,item.blogid,sessionStorage.category)
							   .then(function(success){
								
								$mdDialog.show(
                                      $mdDialog.alert()
                                        .parent(angular.element(document.querySelector('#popupContainer')))
                                        .clickOutsideToClose(true)
                                        .textContent("Blog Released Successfully.")
                                        .ok('Ok')
                                        .targetEvent()
                                    ).then(function() {
										myblogs();
                                }, function() {
                                });
				  
    },function(error){
								$mdDialog.show(
                                      $mdDialog.alert()
                                        .parent(angular.element(document.querySelector('#popupContainer')))
                                        .clickOutsideToClose(true)
                                        .textContent("Blog Release Failed Contact Medicodesk.")
                                        .ok('Ok')
                                        .targetEvent()
                                    ).then(function() {
										myblogs();
                                }, function() {
                                });
    })
                  },function() {
                    
                  });	
              }
			   $scope.imagesCompleted=function(item){
				  // console.log(item);
    var confirm = $mdDialog.confirm()
					          .title('If images are completed click yes else no.')
                              .ok('Yes')
					          .cancel('No'); 
			$mdDialog.show(confirm).then(function() {
							   commonService.imagesCompleted(item.blogid).then(function(success){
								$mdDialog.show(
                                      $mdDialog.alert()
                                        .parent(angular.element(document.querySelector('#popupContainer')))
                                        .clickOutsideToClose(true)
                                        .textContent("Images are delivered to content writer successfully.")
                                        .ok('Ok')
                                        .targetEvent()
                                    ).then(function() {
										myblogs();
                                }, function() {
                                });
										
				  
    },function(error){
								$mdDialog.show(
                                      $mdDialog.alert()
                                        .parent(angular.element(document.querySelector('#popupContainer')))
                                        .clickOutsideToClose(true)
                                        .textContent("Please check internet and then Contact Medicodesk.")
                                        .ok('Ok')
                                        .targetEvent()
                                    ).then(function() {
										myblogs();
                                }, function() {
                                });
    })
                  },function() {
                    
                  });	
              }
				
		$scope.search = {};
 
	$scope.resetFilters = function () {
		// needs to be a function or it won't trigger a $watch
		$scope.search = {};
	};


 
	// pagination controls
	$scope.currentPage = 1;
	//$scope.totalItems =$scope.totalItems;
	$scope.entryLimit = 10; // items per page
	$scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
 	
	// $watch search to update pagination
	$scope.$watch('search', function (newVal, oldVal) {
		//$scope.filtered = filterFilter($scope.items, newVal);
	//	$scope.totalItems = $scope.filtered.length;
		$scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
		$scope.currentPage = 1;
	}, true);
}]);