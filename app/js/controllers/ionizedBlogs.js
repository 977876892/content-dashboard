// app.controller('BlogPageCtrl', ['$scope', 'filterFilter', function ($scope, filterFilter) {
	app.controller('ionizedBlogs', ['$state','$scope','$http','$rootScope','$cookies','$mdDialog','commonService','$base64', function ($state,$scope, $http,$rootScope,$cookies,$mdDialog,commonService,$base64) {
	
	if(typeof $cookies.get("username")=="undefined"){
				$state.go("access.login");
	}
	else{
		$rootScope.login_category=$cookies.get("category");
		ionizeblogs();
	}	
	function ionizeblogs(){
	
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
	$scope.spelling=false;
	$scope.content=false;
	$scope.imagesArrange=false;
	$scope.enableSubmit=true;
	$scope.AllAreCorrent=function(spelling,content,imagesArrange){
		
		if(spelling && content && imagesArrange)
		{
			$scope.enableSubmit=false;
		}
		else{
			$scope.enableSubmit=true;
		}
	}
	
	 	$scope.rating = 1;
        $rootScope.finalContentrating=$scope.rating;
        $scope.contentRateFunction = function(rating) {
            $rootScope.finalContentrating=rating;
        };
        $scope.ratinggraphic = 1;
        $scope.graphicRateFunction = function(ratinggraphic) {
            $rootScope.finalGraphicRating=ratinggraphic;
        };
	
		$scope.approveBlogs=function(item){
					 $scope.approveBlogItem=item;

            			$mdDialog.show({
                                controller: ApproveDialogController,
                                templateUrl: 'approveTemplate.html',
                                clickOutsideToClose:true,
                                })
                                .then(function(answer) {
                                $scope.status = 'You said the information was "' + answer + '".';
                                }, function() {
                                $scope.status = 'You cancelled the dialog.';
                            });	
		}		
	 function ApproveApiCall(){
                    var item=$scope.approveBlogItem;
					var today_date=new Date();
					var dataObject={
						'title':item.title,
						'content':item.content,
						'blog_id':item.blogid,
						'coverimage':item.image,
						'modified':today_date.getFullYear()+"-"+(today_date.getMonth()+1)+"-"+today_date.getDate(),
                        'key':$cookies.get("key")
					}
                  //  console.log(dataObject);
				$http({
					url:$cookies.get("ION_SERVER")+"/index.php/request?action=approvepost&module=ionize&resource=posts",
					method:'POST',
					headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
					},
					transformRequest: function(obj) {
					var str = [];
					for (var p in obj)
						str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
					return str.join("&");
					},
					data:dataObject
				}).then(function(success){
                    $http.get($cookies.get("ION_SERVER")+"/index.php/request?action=updateblog&module=ionize&resource=posts&blog_id="+item.blogid+"&state=rate&content_rate="+$rootScope.finalContentrating+"&graphic_rate="+$rootScope.finalGraphicRating).then(function(success){
						$mdDialog.show(
                                      $mdDialog.alert()
                                        .parent(angular.element(document.querySelector('#popupContainer')))
                                        .clickOutsideToClose(true)
                                        .textContent('Blog is posted to related doctor is successfully.')
                                        .ok('Ok')
                                        .targetEvent()
                                    ).then(function() {
										ionizeblogs();
                                }, function() {
                                });
						
                    },function(error){});
				
				},function(fail){
					$mdDialog.show(
                                      $mdDialog.alert()
                                        .parent(angular.element(document.querySelector('#popupContainer')))
                                        .clickOutsideToClose(true)
                                        .textContent('Blog Not Approved Please contact medicodesk.')
                                        .ok('Ok')
                                        .targetEvent()
                                    ).then(function() {
                                }, function() {
                                });
				})

    }
            

	 function ApproveDialogController($scope, $mdDialog) {
            $scope.cancel=function(){
                $mdDialog.hide();
            }
            $scope.answer = function(answer) {
            //console.log(answer);
            $mdDialog.hide(answer);
            
            };
            $scope.ApproveBlog = function() {
            ApproveApiCall();
            $mdDialog.hide();
            };
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


 		$scope.rejectBlog=function(item){
                $scope.rejectBlogItem=item;
            			$mdDialog.show({
							controller: DialogController,
							templateUrl: 'rejectTemplate.html',
							clickOutsideToClose:true
							})
							.then(function(answer) {
							$scope.status = 'You said the information was "' + answer + '".';
							}, function() {
							$scope.status = 'You cancelled the dialog.';
							});
		}	

		function DialogController($scope, $mdDialog) {
            $scope.cancel=function(){
                $mdDialog.hide();
            }
            $scope.answer = function(answer) {
            //console.log(answer);
            $mdDialog.hide(answer);
            
            };
            $scope.postComment = function(comment) {
            rejectApicall(comment);
            $mdDialog.hide();
            };
        }

		function rejectApicall(comment){
					var item=$scope.rejectBlogItem;
					var date=new Date();
						var dataObject={
							'title':item.title,
							'content':item.content,
							'blog_id':item.blogid,
							'state':'reject',
							'userid':$cookies.get("USER_ID")
						}
					
					$http({
						url:$cookies.get("ION_SERVER")+"/index.php/request?action=updateblog&module=ionize&resource=posts",
						method:'POST',
						headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
						},
						transformRequest: function(obj) {
						var str = [];
						for (var p in obj)
							str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
						return str.join("&");
						},
						data:dataObject
					}).then(function(success){
						commonService.postComment(item.blogid,comment).then(function(success){
									ionizeblogs();
								},function(error){})
					},function(fail){
						$mdDialog.show(
                                      $mdDialog.alert()
                                        .parent(angular.element(document.querySelector('#popupContainer')))
                                        .clickOutsideToClose(true)
                                        .textContent("Blog Rewrite failed please contact medicodesk")
                                        .ok('Ok')
                                        .targetEvent()
                                    ).then(function() {
										ionizeblogs();
                                }, function() {
                                });
						console.log(fail);
					})
		}



}]);