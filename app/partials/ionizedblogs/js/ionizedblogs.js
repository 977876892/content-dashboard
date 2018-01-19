// app.controller('BlogPageCtrl', ['$scope', 'filterFilter', function ($scope, filterFilter) {
	app.controller('ionizedBlogs', ['$state','$scope','$http','$rootScope','$mdDialog','commonService','$base64', function ($state,$scope, $http,$rootScope,$mdDialog,commonService,$base64) {
	
	if(sessionStorage.username=="" || sessionStorage.username == undefined){
				$state.go("access.login");
	}
	else{
		$rootScope.login_category=sessionStorage.category;
		//for blog start from first page
				$rootScope.selectedIndexForBlogs=0;
				$rootScope.currentPageForBlogs=1;	
				//for blog start from first page
		//for assign blog start from first page
				$rootScope.assignedBlogIndex=0;
				$rootScope.currentPageForAssignedBlogs=1;
		//for assign blog start from first page
		  commonService.ionizeBlogsService().then(function mySuccess(response){
		if(typeof response.data.description=="undefined")
		{
			$scope.items=[];
            $scope.totalItems=0;
		}
		else{
			$scope.items=response.data.description;
            $scope.totalItems=response.data.description.length;
		}	
            });
	}	
	
	
	
	 

	$scope.openEditorView=function(blogid){
		console.log(blogid);
		$state.go('app.form.textAngularForReview',{blogId:blogid,c:1});

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