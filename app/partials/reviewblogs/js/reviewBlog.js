// app.controller('BlogPageCtrl', ['$scope', 'filterFilter', function ($scope, filterFilter) {

	app.controller('reviewBlogs', ['$state','$scope','$http','$rootScope','commonService', function ($state,$scope, $http,$rootScope,commonService) {

	if(sessionStorage.username=="" || sessionStorage.username == undefined){
				$state.go("access.login");
	}
	else{
		//for blog start from first page
                    $rootScope.selectedIndexForBlogs=0;
                    $rootScope.currentPageForBlogs=1;	
				//for blog start from first page
		$rootScope.login_category=sessionStorage.category;
		commonService.getReviewBlogs(sessionStorage.category,sessionStorage.USER_ID).then(function mySuccess(response){
				 if(response.data.toString().localeCompare("No data Available")==0)
				 {
					 $scope.noDataAvailable=true;
				 }
				 else{
					 $scope.noBlogsAvailable=false;
					 $scope.items=response.data.description;
                	 $scope.totalItems=response.data.description.length;
				 }
        });
	}	

	$scope.search = {};
	$scope.resetFilters = function () {
		// needs to be a function or it won't trigger a $watch
		$scope.search = {};
	};

	// pagination controls

	$scope.currentPage = 1;

	$scope.totalItems =$scope.totalItems;

	$scope.entryLimit = 15; // items per page

	$scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);

	// $watch search to update pagination

	$scope.$watch('search', function (newVal, oldVal) {

		//$scope.filtered = filterFilter($scope.items, newVal);

	//	$scope.totalItems = $scope.filtered.length;

		$scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);

		$scope.currentPage = 1;

	}, true);

}]);